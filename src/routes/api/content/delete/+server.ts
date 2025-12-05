import { json, type RequestHandler } from '@sveltejs/kit';
import { getOctokit } from '$lib/server/github';
import { githubConfig } from '$lib/server/env';

interface GitHubFile {
	path: string;
	sha: string;
	type: string;
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
		const { path, recursive = false } = await request.json();

		if (!path) {
			return json({ error: 'Path is required' }, { status: 400 });
		}

		const octokit = getOctokit(session.access_token);
		const branch = session.currentBranch || `${session.user.login}/workspace`;
		const repoPath = path.startsWith('content/') ? path : `content/${path}`;

		// Get the content at the path
		const { data: contentData } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: repoPath,
			ref: branch
		});

		// Check if it's a directory
		if (Array.isArray(contentData)) {
			if (!recursive) {
				return json({ error: 'Path is a directory. Use recursive=true to delete directories.' }, { status: 400 });
			}

			// Get the full tree to find all files in this directory
			const { data: tree } = await octokit.rest.git.getTree({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				tree_sha: branch,
				recursive: '1'
			});

			// Filter files that are in this directory
			const filesToDelete = tree.tree?.filter((item: GitHubFile) => 
				item.path?.startsWith(repoPath + '/') && item.type === 'blob'
			) || [];

			if (filesToDelete.length === 0) {
				return json({ error: 'Directory is empty or not found' }, { status: 404 });
			}

			// Delete each file in the directory
			for (const file of filesToDelete) {
				try {
					// Get current SHA for each file
					const { data: fileData } = await octokit.rest.repos.getContent({
						owner: githubConfig.owner!,
						repo: githubConfig.repo!,
						path: file.path!,
						ref: branch
					});

					if (!Array.isArray(fileData) && 'sha' in fileData) {
						await octokit.rest.repos.deleteFile({
							owner: githubConfig.owner!,
							repo: githubConfig.repo!,
							path: file.path!,
							message: `Delete ${file.path}`,
							sha: fileData.sha,
							branch
						});
					}
				} catch (fileError) {
					console.error(`Failed to delete ${file.path}:`, fileError);
					// Continue with other files
				}
			}

			return json({ success: true, deletedCount: filesToDelete.length });
		}

		// It's a single file
		if (!('sha' in contentData)) {
			return json({ error: 'Invalid file' }, { status: 400 });
		}

		// Delete the file
		await octokit.rest.repos.deleteFile({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: repoPath,
			message: `Delete ${repoPath}`,
			sha: contentData.sha,
			branch
		});

		return json({ success: true });
	} catch (error) {
		console.error('Delete error:', error);
		if (error && typeof error === 'object' && 'status' in (error as { status?: number })) {
			const status = (error as { status?: number }).status;
			if (status === 404) {
				return json({ error: 'File not found' }, { status: 404 });
			}
		}
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to delete file' },
			{ status: 500 }
		);
	}
};
