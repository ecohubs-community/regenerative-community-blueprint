import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

interface MoveRequest {
	articlePath: string;
	newParentId: string | null;
	newOrder?: number;
}

export async function POST({ request, cookies }) {
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

		const { articlePath, newParentId, newOrder } = await request.json() as MoveRequest;
		const branch = session.currentBranch || 'main';

		if (!articlePath) {
			return json({ error: 'Article path is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get the current file content
		const { data: currentFile } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${articlePath}`,
			ref: branch
		});

		if (!('content' in currentFile) || !('sha' in currentFile)) {
			return json({ error: 'File not found' }, { status: 404 });
		}

		// Decode and parse the content
		const content = Buffer.from(currentFile.content, 'base64').toString('utf-8');
		const parsed = matter(content);

		// Update the parentId in frontmatter
		parsed.data.parentId = newParentId;
		
		// Update order if provided
		if (newOrder !== undefined) {
			parsed.data.order = newOrder;
		}

		// Reconstruct the file content with updated frontmatter
		const updatedContent = matter.stringify(parsed.content, parsed.data);

		// Save the updated file
		await octokit.rest.repos.createOrUpdateFileContents({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${articlePath}`,
			message: `Move article: ${articlePath}${newParentId ? ` under ${newParentId}` : ' to root'}`,
			content: Buffer.from(updatedContent).toString('base64'),
			sha: currentFile.sha,
			branch
		});

		return json({
			success: true,
			path: articlePath,
			newParentId,
			newOrder,
			branch
		});

	} catch (error) {
		console.error('Failed to move article:', error);
		return json({ error: 'Failed to move article' }, { status: 500 });
	}
}
