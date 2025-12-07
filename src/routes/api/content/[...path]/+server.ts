import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

interface ContentRequest {
	content: string;
	frontmatter?: Record<string, unknown>;
	message?: string;
}

interface FrontmatterData {
	[key: string]: unknown;
}

interface GitHubError {
	status: number;
	message?: string;
}

export async function GET({ params, url, cookies }) {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const session = JSON.parse(sessionCookie);
		
		// Check if session has expired
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ error: 'Session expired' }, { status: 401 });
		}

		const path = params.path;
		const branch = url.searchParams.get('branch') || session.currentBranch || 'main';

		if (!path) {
			return json({ error: 'Path is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get the file content
		const { data: file } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${path}`,
			ref: branch
		});

		if ('type' in file && file.type !== 'file') {
			return json({ error: 'Path is not a file' }, { status: 400 });
		}

		if (!('content' in file) || !('encoding' in file)) {
			return json({ error: 'Invalid file response' }, { status: 500 });
		}

		// Decode the content
		const content = Buffer.from(file.content, file.encoding as 'base64').toString('utf-8');

		// Parse based on file type
		const extension = path.split('.').pop()?.toLowerCase();
		let parsedContent: { content: string; frontmatter?: FrontmatterData } = { content };

		if (extension === 'md') {
			// Parse markdown frontmatter
			const parsed = matter(content);
			parsedContent = {
				frontmatter: parsed.data,
				content: parsed.content
			};
		} else if (extension === 'json') {
			// Parse JSON
			try {
				parsedContent = JSON.parse(content);
			} catch {
				// Invalid JSON syntax
				return json({ error: 'Invalid JSON file' }, { status: 400 });
			}
		}

		return json({
			path,
			branch,
			type: extension,
			sha: file.sha,
			...parsedContent
		});

	} catch (error) {
		console.error('Failed to fetch content:', error);
		// Error is logged but handled by specific responses where possible
		
		if (error && typeof error === 'object' && 'status' in (error as GitHubError)) {
			const status = (error as GitHubError).status;
			if (status === 422) {
				return json({ error: 'Branch already exists' }, { status: 409 });
			}
			if (status === 404) {
				// Most common case: the requested content file does not exist in this branch
				return json({ error: 'File not found' }, { status: 404 });
			}
		}
		
		return json({ error: 'Failed to fetch content' }, { status: 500 });
	}
}

export async function POST({ params, request, cookies }) {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const session = JSON.parse(sessionCookie);
		
		// Check if session has expired
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ error: 'Session expired' }, { status: 401 });
		}

		const path = params.path;
		const branch = session.currentBranch || 'main';

		if (!path) {
			return json({ error: 'Path is required' }, { status: 400 });
		}

		const { content, frontmatter, message } = await request.json() as ContentRequest;

		// Allow empty content for new articles (content can be empty string)
		if (content === undefined || content === null) {
			return json({ error: 'Content is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Prepare file content based on type
		const extension = path.split('.').pop()?.toLowerCase();
		let fileContent: string;
		let commitMessage = message;

		if (extension === 'md') {
			// Combine frontmatter and content for markdown
			const frontmatterStr = frontmatter ? 
				`---\n${Object.entries(frontmatter).map(([key, value]) => 
					`${key}: ${Array.isArray(value) ? value.map(v => `\n  - ${v}`).join('') : value}`
				).join('\n')}\n---\n\n` : '';
			fileContent = frontmatterStr + content;
			commitMessage = commitMessage || `Update article: ${path}`;
		} else if (extension === 'json') {
			// Stringify JSON content
			fileContent = typeof content === 'string' ? content : JSON.stringify(content, null, 2);
			commitMessage = commitMessage || `Update ${path}`;
		} else {
			fileContent = content;
			commitMessage = commitMessage || `Update ${path}`;
		}

		// Helper to get the current file SHA (if it exists)
		const getCurrentSha = async (): Promise<string | undefined> => {
			try {
				const { data: currentFile } = await octokit.rest.repos.getContent({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					path: `content/${path}`,
					ref: branch
				});
				if ('sha' in currentFile) {
					return currentFile.sha;
				}
			} catch {
				// File doesn't exist, that's okay for creation
			}
			return undefined;
		};

		// Function to perform the save with the latest SHA
		const performSave = async () => {
			const currentSha = await getCurrentSha();
			const { data } = await octokit.rest.repos.createOrUpdateFileContents({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: `content/${path}`,
				message: commitMessage,
				content: Buffer.from(fileContent).toString('base64'),
				sha: currentSha,
				branch
			});
			return data;
		};

		let updatedFile;
		try {
			updatedFile = await performSave();
		} catch (error: unknown) {
			if (error && typeof error === 'object' && 'status' in error && (error as { status?: number }).status === 409) {
				// Conflict: refetch SHA and retry once
				try {
					updatedFile = await performSave();
				} catch (retryError: unknown) {
					if (
						retryError &&
						typeof retryError === 'object' &&
						'status' in retryError &&
						(retryError as { status?: number }).status === 409
					) {
						return json(
							{
								error:
									'Content conflict: this file has changed since you opened it. Please reload and try again.'
							},
							{ status: 409 }
						);
					}
					throw retryError;
				}
			} else {
				throw error;
			}
		}

		// Check if this is the first commit in a personal workspace and auto-publish
		let autoPublished = false;
		if (branch.includes('/') && updatedFile.commit?.sha) {
			try {
				// Get commit count for this branch
				const { data: commits } = await octokit.rest.repos.listCommits({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					sha: branch,
					per_page: 1
				});

				// If this is the first commit, auto-publish the workspace
				if (commits.length === 1) {
					const workspaceName = branch.split('/')[1]; // Extract workspace name from "username/workspace"
					
					// Create publish tag
					const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
					const tagName = `published-${workspaceName}-${timestamp}`;

					await octokit.rest.git.createTag({
						owner: githubConfig.owner!,
						repo: githubConfig.repo!,
						tag: tagName,
						message: `Auto-publish workspace: ${workspaceName} (first commit)`,
						object: updatedFile.commit.sha,
						type: 'commit'
					});

					await octokit.rest.git.createRef({
						owner: githubConfig.owner!,
						repo: githubConfig.repo!,
						ref: `refs/tags/${tagName}`,
						sha: updatedFile.commit.sha
					});

					autoPublished = true;
				}
			} catch (publishError) {
				console.warn('Failed to auto-publish workspace:', publishError);
				// Don't fail the save operation if auto-publish fails
			}
		}

		return json({
			success: true,
			path,
			branch,
			sha: updatedFile.commit.sha,
			message: commitMessage,
			autoPublished
		});

	} catch (error) {
		console.error('Failed to save content:', error);
		// Error is logged but handled by generic response
		return json({ error: 'Failed to save content' }, { status: 500 });
	}
}

export async function DELETE({ params, cookies }) {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const session = JSON.parse(sessionCookie);
		
		// Check if session has expired
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ error: 'Session expired' }, { status: 401 });
		}

		const path = params.path;
		const branch = session.currentBranch || 'main';

		if (!path) {
			return json({ error: 'Path is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get current file SHA
		const { data: currentFile } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${path}`,
			ref: branch
		});

		if (!('sha' in currentFile)) {
			return json({ error: 'File not found' }, { status: 404 });
		}

		// Delete the file
		await octokit.rest.repos.deleteFile({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${path}`,
			message: `Delete ${path}`,
			sha: currentFile.sha,
			branch: branch
		});

		return json({
			success: true,
			path,
			branch,
			message: `Deleted ${path}`
		});

	} catch (error) {
		console.error('Failed to delete content:', error);
		return json({ error: 'Failed to delete content' }, { status: 500 });
	}
}
