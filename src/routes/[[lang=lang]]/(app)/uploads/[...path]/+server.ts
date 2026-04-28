import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { Octokit } from '@octokit/rest';
import { githubConfig } from '$lib/server/env';

/**
 * Public image proxy for the frontend.
 * Serves images from the main branch (published content).
 * For workspace/draft images, use /api/image-proxy instead.
 */
export const GET: RequestHandler = async ({ params }) => {
	try {
		const imagePath = params.path;

		if (!imagePath) {
			throw error(400, 'Image path is required');
		}

		// For public access, always use main branch (published content)
		const branch = 'main';
		const fullPath = `static/uploads/${imagePath}`;

		// Use unauthenticated Octokit for public access
		const octokit = new Octokit();
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
				'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
				'Content-Length': imageBuffer.length.toString()
			}
		});
	} catch (err) {
		console.error('Public image proxy error:', err);
		if (err && typeof err === 'object' && 'status' in err) {
			throw err;
		}
		throw error(404, 'Image not found');
	}
};
