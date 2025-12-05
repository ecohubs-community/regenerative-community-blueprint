import { json, type RequestHandler } from '@sveltejs/kit';
import { getOctokit } from '$lib/server/github';
import { githubConfig } from '$lib/server/env';

interface FileItem {
	path: string;
	type: string;
	sha?: string;
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	let session;
	try {
		session = JSON.parse(sessionCookie);
	} catch {
		return json({ error: 'Invalid session' }, { status: 401 });
	}

	try {
		const { branch } = await request.json();

		if (!branch) {
			return json({ error: 'Branch is required' }, { status: 400 });
		}

		const octokit = getOctokit(session.access_token);
		const owner = githubConfig.owner!;
		const repo = githubConfig.repo!;

		// 1. Get all markdown files in content/articles
		const articlesResponse = await octokit.rest.repos.getContent({
			owner,
			repo,
			path: 'content/articles',
			ref: branch
		});

		if (!Array.isArray(articlesResponse.data)) {
			return json({ error: 'Invalid articles directory' }, { status: 400 });
		}

		// 2. Collect all image references from all articles
		const imageReferences = new Set<string>();
		const articleIds = new Set<string>();

		for (const file of articlesResponse.data) {
			if (file.type === 'file' && file.name.endsWith('.md')) {
				const contentResponse = await octokit.rest.repos.getContent({
					owner,
					repo,
					path: file.path,
					ref: branch
				});

				if ('content' in contentResponse.data) {
					const content = Buffer.from(contentResponse.data.content, 'base64').toString('utf-8');
					
					// Extract article ID from frontmatter
					const idMatch = content.match(/^id:\s*(.+)$/m);
					if (idMatch) {
						articleIds.add(idMatch[1].trim());
					}

					// Find all image references in markdown
					const imageMatches = content.matchAll(/!\[.*?\]\(([^)]+)\)/g);
					for (const match of imageMatches) {
						imageReferences.add(match[1]);
					}
				}
			}
		}

		// 3. Get all files in static/uploads
		let uploadsFiles: FileItem[] = [];
		try {
			const uploadsResponse = await octokit.rest.repos.getContent({
				owner,
				repo,
				path: 'static/uploads',
				ref: branch
			});

			if (Array.isArray(uploadsResponse.data)) {
				// Get all subdirectories (article IDs)
				for (const item of uploadsResponse.data) {
					if (item.type === 'dir') {
						const articleDirResponse = await octokit.rest.repos.getContent({
							owner,
							repo,
							path: item.path,
							ref: branch
						});

						if (Array.isArray(articleDirResponse.data)) {
							uploadsFiles.push(...articleDirResponse.data.map(f => ({
								path: f.path,
								type: f.type,
								sha: 'sha' in f ? f.sha : undefined
							})));
						}
					}
				}
			}
		} catch (error) {
			// uploads directory might not exist yet
			console.log('No uploads directory found');
		}

		// 4. Find orphaned images
		const orphanedImages: string[] = [];
		const orphanedDirs = new Set<string>();

		for (const file of uploadsFiles) {
			if (file.type === 'file') {
				// Extract the URL path that would be in markdown
				const urlPath = file.path.replace('static', '');
				
				// Check if this image is referenced
				if (!imageReferences.has(urlPath)) {
					orphanedImages.push(file.path);
				}
			}
		}

		// 5. Find orphaned directories (article IDs that no longer exist)
		try {
			const uploadsResponse = await octokit.rest.repos.getContent({
				owner,
				repo,
				path: 'static/uploads',
				ref: branch
			});

			if (Array.isArray(uploadsResponse.data)) {
				for (const item of uploadsResponse.data) {
					if (item.type === 'dir') {
						const articleId = item.name;
						if (!articleIds.has(articleId)) {
							orphanedDirs.add(item.path);
						}
					}
				}
			}
		} catch (error) {
			// uploads directory might not exist
		}

		// 6. Delete orphaned images
		const deletedFiles: string[] = [];
		
		for (const imagePath of orphanedImages) {
			try {
				const fileData = await octokit.rest.repos.getContent({
					owner,
					repo,
					path: imagePath,
					ref: branch
				});

				if ('sha' in fileData.data) {
					await octokit.rest.repos.deleteFile({
						owner,
						repo,
						path: imagePath,
						message: `Cleanup: Remove orphaned image ${imagePath}`,
						sha: fileData.data.sha,
						branch
					});
					deletedFiles.push(imagePath);
				}
			} catch (error) {
				console.error(`Failed to delete ${imagePath}:`, error);
			}
		}

		// 7. Delete orphaned directories
		const deletedDirs: string[] = [];
		
		for (const dirPath of orphanedDirs) {
			try {
				// Get all files in the directory
				const dirContents = await octokit.rest.repos.getContent({
					owner,
					repo,
					path: dirPath,
					ref: branch
				});

				if (Array.isArray(dirContents.data)) {
					// Delete all files in the directory
					for (const file of dirContents.data) {
						if (file.type === 'file' && 'sha' in file) {
							await octokit.rest.repos.deleteFile({
								owner,
								repo,
								path: file.path,
								message: `Cleanup: Remove orphaned directory ${dirPath}`,
								sha: file.sha,
								branch
							});
						}
					}
					deletedDirs.push(dirPath);
				}
			} catch (error) {
				console.error(`Failed to delete directory ${dirPath}:`, error);
			}
		}

		return json({
			success: true,
			orphanedImages: orphanedImages.length,
			orphanedDirs: orphanedDirs.size,
			deletedFiles: deletedFiles.length,
			deletedDirs: deletedDirs.length,
			details: {
				deletedFiles,
				deletedDirs: Array.from(deletedDirs)
			}
		});
	} catch (error) {
		console.error('Cleanup error:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to cleanup orphaned images' },
			{ status: 500 }
		);
	}
};
