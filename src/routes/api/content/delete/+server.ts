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

		// Get the file to get its SHA
		const { data: fileData } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path,
			ref: branch
		});

		if (Array.isArray(fileData) || !('sha' in fileData)) {
			return json({ error: 'Invalid file' }, { status: 400 });
		}

		// Delete the file
		await octokit.rest.repos.deleteFile({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path,
			message: `Delete ${path}`,
			sha: fileData.sha,
			branch
		});

		return json({ success: true });
	} catch (error) {
		console.error('Delete error:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to delete file' },
			{ status: 500 }
		);
	}
};
