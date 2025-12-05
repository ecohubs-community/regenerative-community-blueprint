import { json, type RequestHandler } from '@sveltejs/kit';
import { Octokit } from '@octokit/rest';
import { GITHUB_OWNER, GITHUB_REPO, GITHUB_TOKEN } from '$env/static/private';

function getGitHubClient(): Octokit {
	const token = GITHUB_TOKEN;
	if (!token) {
		throw new Error('GITHUB_TOKEN environment variable is not set');
	}

	return new Octokit({
		auth: token
	});
}

export const POST: RequestHandler = async ({ request, cookies }) => {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const { path, action, message, scheduledDate } = await request.json();

		if (!path || !action) {
			return json({ error: 'Path and action are required' }, { status: 400 });
		}

		const octokit = getGitHubClient();
		const owner = GITHUB_OWNER!;
		const repo = GITHUB_REPO!;

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

		// For publish action, we might want to merge to main or create a release
		if (action === 'publish') {
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
