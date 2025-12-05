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
		const articleId = formData.get('articleId') as string | null;

		if (!file) {
			return json({ error: 'No file provided' }, { status: 400 });
		}

		if (!articleId) {
			return json({ error: 'Article ID is required' }, { status: 400 });
		}

		// Read file as base64
		const arrayBuffer = await file.arrayBuffer();
		const buffer = Buffer.from(arrayBuffer);
		const base64Content = buffer.toString('base64');

		// Generate path in static/uploads/{articleId}/
		const timestamp = Date.now();
		const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
		const path = `static/uploads/${articleId}/${timestamp}-${sanitizedName}`;

		const octokit = getOctokit(session.access_token);
		const branch = session.currentBranch || `${session.user.login}/workspace`;

		// Upload file to GitHub
		await octokit.rest.repos.createOrUpdateFileContents({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path,
			message: `Upload image for article ${articleId}: ${file.name}`,
			content: base64Content,
			branch
		});

		// Return the proxy URL for workspace content (will work immediately in editor/preview)
		// The path will be correct for published content too (static files)
		const proxyUrl = `/api/image-proxy/uploads/${articleId}/${timestamp}-${sanitizedName}?branch=${encodeURIComponent(branch)}`;
		const staticUrl = `/uploads/${articleId}/${timestamp}-${sanitizedName}`;
		
		return json({
			success: true,
			url: proxyUrl,  // Use proxy URL so it works immediately
			staticUrl,      // Also return static URL for reference
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
