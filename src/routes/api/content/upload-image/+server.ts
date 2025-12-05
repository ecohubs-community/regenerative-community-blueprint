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
		const formData = await request.formData();
		const file = formData.get('file') as File;
		const customPath = formData.get('path') as string | null;

		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		// Read file as base64
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const base64Content = buffer.toString('base64');

		// Generate path
		const timestamp = Date.now();
		const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
		const path = customPath || `content/images/${timestamp}-${sanitizedName}`;

		const octokit = getOctokit(session.access_token);
		const branch = session.currentBranch || `${session.user.login}/workspace`;

		// Upload file to GitHub
		await octokit.rest.repos.createOrUpdateFileContents({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path,
			message: `Upload image: ${file.name}`,
			content: base64Content,
			branch
		});

		// Return the path that can be used in markdown
		return json({
			success: true,
			url: `/${path}`,
			path
		});
	} catch (error) {
		console.error('Image upload error:', error);
		return json(
			{ error: error instanceof Error ? error.message : 'Failed to upload image' },
			{ status: 500 }
		);
	}
};
