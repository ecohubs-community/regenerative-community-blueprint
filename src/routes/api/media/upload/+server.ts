import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import { randomUUID } from 'crypto';

interface MediaUploadRequest {
	file: string; // base64 encoded file content
	filename: string;
	contentType: string;
}

interface MediaUploadResponse {
	success: boolean;
	path?: string;
	url?: string;
	size?: number;
	sha?: string;
	error?: string;
}

const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/jpg',
	'image/png',
	'image/gif',
	'image/webp',
	'image/svg+xml',
	'image/avif',
	'image/heic',
	'image/heif'
];

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

function validateFileUpload(data: MediaUploadRequest): { valid: boolean; error?: string } {
	if (!data.file || !data.filename || !data.contentType) {
		return { valid: false, error: 'Missing required fields: file, filename, contentType' };
	}

	if (!ALLOWED_MIME_TYPES.includes(data.contentType)) {
		return { valid: false, error: `Unsupported file type: ${data.contentType}` };
	}

	// Decode base64 and check file size
	try {
		const buffer = Buffer.from(data.file, 'base64');
		if (buffer.length > MAX_FILE_SIZE) {
			return { valid: false, error: `File too large. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB` };
		}
	} catch {
		return { valid: false, error: 'Invalid base64 file content' };
	}

	// Validate filename
	if (!/^[a-zA-Z0-9._-]+\.[a-zA-Z0-9]+$/.test(data.filename)) {
		return { valid: false, error: 'Invalid filename format' };
	}

	return { valid: true };
}

function generateUniqueFilename(originalFilename: string): string {
	const extension = originalFilename.split('.').pop();
	const nameWithoutExt = originalFilename.replace(/\.[^/.]+$/, '');
	const uuid = randomUUID().split('-')[0]; // Use first part of UUID for shorter names
	const timestamp = Date.now();
	
	return `${nameWithoutExt}-${timestamp}-${uuid}.${extension}`;
}

export async function POST({ request, cookies }): Promise<Response> {
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

		const data: MediaUploadRequest = await request.json();
		
		// Validate the upload request
		const validation = validateFileUpload(data);
		if (!validation.valid) {
			return json({ error: validation.error }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });
		const branch = session.currentBranch || 'main';

		// Generate unique filename to prevent conflicts
		const uniqueFilename = generateUniqueFilename(data.filename);
		const filePath = `content/media/${uniqueFilename}`;

		// Check if file already exists in the target location
		let currentSha: string | undefined;
		try {
			const { data: existingFile } = await octokit.rest.repos.getContent({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: filePath,
				ref: branch
			});
			if ('sha' in existingFile) {
				currentSha = existingFile.sha;
			}
		} catch {
			// File doesn't exist, that's okay
		}

		// Upload the file to GitHub
		const { data: uploadedFile } = await octokit.rest.repos.createOrUpdateFileContents({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: filePath,
			message: `Upload media: ${uniqueFilename}`,
			content: data.file,
			sha: currentSha,
			branch: branch
		});

		// Return success response with file information
		const response: MediaUploadResponse = {
			success: true,
			path: filePath,
			url: `/${filePath}`,
			size: Buffer.from(data.file, 'base64').length,
			sha: uploadedFile.commit.sha
		};

		return json(response);

	} catch (error) {
		console.error('Media upload failed:', error);
		return json({ error: 'Failed to upload media file' }, { status: 500 });
	}
}

// GET endpoint to list uploaded media files
export async function GET({ cookies }): Promise<Response> {
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

		const octokit = new Octokit({ auth: session.access_token });
		const branch = session.currentBranch || 'main';

		// Get the media directory contents
		const { data: tree } = await octokit.rest.git.getTree({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			tree_sha: branch,
			recursive: '1'
		});

		// Filter for media files
		const mediaFiles = tree.tree?.filter(item => 
			item.path?.startsWith('content/media/') && 
			item.type === 'blob'
		).map(item => ({
			path: item.path,
			name: item.path?.replace('content/media/', ''),
			size: item.size,
			sha: item.sha,
			url: `/${item.path}`
		})) || [];

		return json({
			files: mediaFiles,
			branch,
			total: mediaFiles.length
		});

	} catch (error) {
		console.error('Failed to list media files:', error);
		return json({ error: 'Failed to list media files' }, { status: 500 });
	}
}
