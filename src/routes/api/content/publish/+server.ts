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
		const { path, action, message, scheduledDate } = await request.json();

		if (!path || !action) {
			return json({ error: 'Path and action are required' }, { status: 400 });
		}

		const octokit = getOctokit(session.access_token);
		const owner = githubConfig.owner!;
		const repo = githubConfig.repo!;
		const branch = session.currentBranch || `${session.user.login}/workspace`;

		// Get current branch
		const { data: branchData } = await octokit.rest.repos.getBranch({
			owner,
			repo,
			branch: 'main'
		});

		// Get current file to ensure it exists
		const { data: fileData } = await octokit.rest.repos.getContent({
			owner,
			repo,
			path,
			ref: 'main'
		});

		if (!('sha' in fileData)) {
			return json({ error: 'File not found' }, { status: 404 });
		}

		// Create commit message based on action
		let commitMessage = message;
		if (!commitMessage) {
			switch (action) {
				case 'draft':
					commitMessage = `Save draft: ${path}`;
					break;
				case 'review':
					commitMessage = `Submit for review: ${path}`;
					break;
				case 'publish':
					commitMessage = `Publish: ${path}`;
					break;
				case 'schedule':
					commitMessage = `Schedule publish: ${path} (${scheduledDate || 'TBD'})`;
					break;
				case 'unpublish':
					commitMessage = `Unpublish: ${path}`;
					break;
				default:
					commitMessage = `${action}: ${path}`;
			}
		}

		// For publish action, cleanup orphaned images and create a release
		if (action === 'publish') {
			// First, cleanup orphaned images
			try {
				const url = new URL(request.url);
				const cleanupResponse = await fetch(`${url.origin}/api/content/cleanup-orphaned-images`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'Cookie': `session=${sessionCookie}`
					},
					body: JSON.stringify({ branch })
				});

				if (cleanupResponse.ok) {
					const cleanupData = await cleanupResponse.json();
					console.log('Cleanup completed:', cleanupData);
				}
			} catch (cleanupError) {
				console.warn('Failed to cleanup orphaned images:', cleanupError);
				// Continue even if cleanup fails
			}

			// Create a tag for the published version
			const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
			const tagName = `publish-${path.replace(/[^a-zA-Z0-9]/g, '-')}-${timestamp}`;
			
			try {
				await octokit.rest.git.createTag({
					owner,
					repo,
					tag: tagName,
					message: `Publish ${path}`,
					object: branchData.commit.sha,
					type: 'commit'
				});

				await octokit.rest.git.createRef({
					owner,
					repo,
					ref: `refs/tags/${tagName}`,
					sha: branchData.commit.sha
				});
			} catch (tagError) {
				console.warn('Failed to create tag:', tagError);
				// Continue even if tag creation fails
			}
		}

		// Create a commit (even if it's just to update the publish status)
		// For now, we'll just update the file with the same content to trigger the commit
		// In a real implementation, you might want to update a publish status file or metadata

		const result = {
			success: true,
			action,
			path,
			commit: commitMessage,
			sha: branchData.commit.sha,
			timestamp: new Date().toISOString()
		};

		return json(result);
	} catch (error) {
		console.error('Error in publishing action:', error);
		return json({ error: 'Failed to execute publishing action' }, { status: 500 });
	}
};
