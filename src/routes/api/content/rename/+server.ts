import { json, type RequestHandler } from '@sveltejs/kit';
import { getOctokit } from '$lib/server/github';
import { githubConfig } from '$lib/server/env';

interface GitHubFile {
	path: string;
	sha: string;
	type: string;
}

/**
 * Rename a file or directory in the content repository.
 * For files: copies content to new path and deletes old path.
 * For directories: copies all files to new paths and deletes old paths.
 */
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
		const { oldPath, newPath } = await request.json();

		if (!oldPath || !newPath) {
			return json({ error: 'Both oldPath and newPath are required' }, { status: 400 });
		}

		if (oldPath === newPath) {
			return json({ error: 'Old and new paths are the same' }, { status: 400 });
		}

		const octokit = getOctokit(session.access_token);
		const branch = session.currentBranch || `${session.user.login}/workspace`;
		const oldRepoPath = oldPath.startsWith('content/') ? oldPath : `content/${oldPath}`;
		const newRepoPath = newPath.startsWith('content/') ? newPath : `content/${newPath}`;

		// Get the content at the old path
		const { data: contentData } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: oldRepoPath,
			ref: branch
		});

		// Check if it's a directory
		if (Array.isArray(contentData)) {
			// Get the full tree to find all files in this directory
			const { data: tree } = await octokit.rest.git.getTree({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				tree_sha: branch,
				recursive: '1'
			});

			// Filter files that are in this directory
			const filesToMove = tree.tree?.filter((item: GitHubFile) => 
				item.path?.startsWith(oldRepoPath + '/') && item.type === 'blob'
			) || [];

			if (filesToMove.length === 0) {
				return json({ error: 'Directory is empty or not found' }, { status: 404 });
			}

			// Move each file
			for (const file of filesToMove) {
				const relativePath = file.path!.substring(oldRepoPath.length);
				const newFilePath = newRepoPath + relativePath;

				try {
					// Get file content
					const { data: fileData } = await octokit.rest.repos.getContent({
						owner: githubConfig.owner!,
						repo: githubConfig.repo!,
						path: file.path!,
						ref: branch
					});

					if (!Array.isArray(fileData) && 'content' in fileData && 'sha' in fileData) {
						// Create file at new path
						await octokit.rest.repos.createOrUpdateFileContents({
							owner: githubConfig.owner!,
							repo: githubConfig.repo!,
							path: newFilePath,
							message: `Rename ${file.path} to ${newFilePath}`,
							content: fileData.content,
							branch
						});

						// Delete old file
						await octokit.rest.repos.deleteFile({
							owner: githubConfig.owner!,
							repo: githubConfig.repo!,
							path: file.path!,
							message: `Remove old path ${file.path}`,
							sha: fileData.sha,
							branch
						});
					}
				} catch (fileError) {
					console.error(`Failed to move ${file.path}:`, fileError);
					// Continue with other files
				}
			}

			return json({ success: true, movedCount: filesToMove.length });
		}

		// It's a single file
		if (!('content' in contentData) || !('sha' in contentData)) {
			return json({ error: 'Invalid file' }, { status: 400 });
		}

		// Create file at new path
		await octokit.rest.repos.createOrUpdateFileContents({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: newRepoPath,
			message: `Rename ${oldRepoPath} to ${newRepoPath}`,
			content: contentData.content,
			branch
		});

		// Delete old file
		await octokit.rest.repos.deleteFile({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: oldRepoPath,
			message: `Remove old path ${oldRepoPath}`,
			sha: contentData.sha,
			branch
		});

		return json({ success: true });
	} catch (error) {
		console.error('Rename error:', error);
		if (error && typeof error === 'object' && 'status' in (error as { status?: number })) {
			const status = (error as { status?: number }).status;
			if (status === 404) {
				return json({ error: 'File or directory not found' }, { status: 404 });
			}
			if (status === 422) {
				return json({ error: 'Target path already exists' }, { status: 409 });
			}
		}
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to rename' },
			{ status: 500 }
		);
	}
};
