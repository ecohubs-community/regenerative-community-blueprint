import { json, type RequestHandler } from '@sveltejs/kit';
import { getOctokit } from '$lib/server/github';
import { githubConfig } from '$lib/server/env';

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
		const { path } = await request.json();

		if (!path) {
			return json({ error: 'Path is required' }, { status: 400 });
		}

		const octokit = getOctokit(session.access_token);
		const branch = session.currentBranch || `${session.user.login}/workspace`;
		const repoPath = path.startsWith('content/') ? path : `content/${path}`;

		// Get the file to get its SHA
		const { data: fileData } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: repoPath,
			ref: branch
		});

		if (Array.isArray(fileData) || !('sha' in fileData)) {
			return json({ error: 'Invalid file' }, { status: 400 });
		}

		// Delete the file
		await octokit.rest.repos.deleteFile({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: repoPath,
			message: `Delete ${repoPath}`,
			sha: fileData.sha,
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
