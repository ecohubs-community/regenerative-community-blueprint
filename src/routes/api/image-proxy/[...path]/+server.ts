import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { getOctokit } from '$lib/server/github';
import { githubConfig } from '$lib/server/env';

export const GET: RequestHandler = async ({ params, url, cookies }) => {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		throw error(401, 'Unauthorized');
	}

	let session;
	try {
		session = JSON.parse(sessionCookie);
	} catch {
		throw error(401, 'Invalid session');
	}

	try {
		const imagePath = params.path;
		// Use explicit branch from query, then session branch, then fall back to main for viewing
		const branch = url.searchParams.get('branch') || session.currentBranch || 'main';

		if (!imagePath) {
			throw error(400, 'Image path is required');
		}

		// Reconstruct the full path in the repository
		// Images are stored in static/ directory
		const fullPath = imagePath.startsWith('uploads/') ? `static/${imagePath}` : `static/${imagePath}`;

		const octokit = getOctokit(session.access_token);
		const owner = githubConfig.owner!;
		const repo = githubConfig.repo!;

		// Get the file from GitHub
		const { data: fileData } = await octokit.rest.repos.getContent({
			owner,
			repo,
			path: fullPath,
			ref: branch
		});

		if (Array.isArray(fileData) || !('content' in fileData)) {
			throw error(404, 'Image not found');
		}

		// Decode base64 content
		const imageBuffer = Buffer.from(fileData.content, 'base64');

		// Determine content type from file extension
		const ext = imagePath.split('.').pop()?.toLowerCase();
		const contentTypeMap: Record<string, string> = {
			'jpg': 'image/jpeg',
			'jpeg': 'image/jpeg',
			'png': 'image/png',
			'gif': 'image/gif',
			'webp': 'image/webp',
			'svg': 'image/svg+xml',
			'bmp': 'image/bmp',
			'ico': 'image/x-icon'
		};

		const contentType = contentTypeMap[ext || ''] || 'application/octet-stream';

		return new Response(imageBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=3600',
				'Content-Length': imageBuffer.length.toString()
			}
		});
	} catch (err) {
		console.error('Image proxy error:', err);
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(500, 'Failed to load image');
	}
};
