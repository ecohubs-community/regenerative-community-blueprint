import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

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

		const { workspaceName, publishMessage } = await request.json();

		if (!workspaceName) {
			return json({ error: 'Workspace name is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get current user
		const { data: user } = await octokit.rest.users.getAuthenticated();
		const fullWorkspaceName = `${user.login}/${workspaceName}`;

		// Verify the workspace exists
		try {
			await octokit.rest.repos.getBranch({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				branch: fullWorkspaceName
			});
		} catch {
			return json({ error: 'Workspace not found' }, { status: 404 });
		}

		// Check if workspace has already been published (has a tag)
		const tagPattern = `published-${workspaceName}`;
		const { data: existingTags } = await octokit.rest.repos.listTags({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			per_page: 100
		});

		const isAlreadyPublished = existingTags.some(tag => tag.name.startsWith(tagPattern));
		
		if (isAlreadyPublished) {
			return json({ 
				error: 'Workspace has already been published',
				alreadyPublished: true 
			}, { status: 409 });
		}

		// Get the latest commit SHA from the workspace
		const { data: branchData } = await octokit.rest.repos.getBranch({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			branch: fullWorkspaceName
		});

		// Create a publish tag with timestamp
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		const tagName = `published-${workspaceName}-${timestamp}`;

		// Create the tag
		await octokit.rest.git.createTag({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			tag: tagName,
			message: publishMessage || `Publish workspace: ${workspaceName}`,
			object: branchData.commit.sha,
			type: 'commit'
		});

		// Create the reference
		await octokit.rest.git.createRef({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			ref: `refs/tags/${tagName}`,
			sha: branchData.commit.sha
		});

		return json({
			success: true,
			published: true,
			tagName,
			commit: branchData.commit.sha,
			message: `Workspace "${workspaceName}" has been published successfully`
		});

	} catch (error) {
		console.error('Failed to publish workspace:', error);
		return json({ error: 'Failed to publish workspace' }, { status: 500 });
	}
}

export async function GET({ url, cookies }) {
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

		const workspaceName = url.searchParams.get('workspace');
		if (!workspaceName) {
			return json({ error: 'Workspace parameter is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get current user
		const { data: user } = await octokit.rest.users.getAuthenticated();
		const fullWorkspaceName = `${user.login}/${workspaceName}`;

		// Check if workspace has been published
		const tagPattern = `published-${workspaceName}`;
		const { data: tags } = await octokit.rest.repos.listTags({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			per_page: 100
		});

		const publishTags = tags.filter(tag => tag.name.startsWith(tagPattern));
		const isPublished = publishTags.length > 0;

		// Get workspace info
		const { data: branchData } = await octokit.rest.repos.getBranch({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			branch: fullWorkspaceName
		});

		// Get commit count for this workspace
		const { data: commits } = await octokit.rest.repos.listCommits({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			sha: fullWorkspaceName,
			per_page: 1
		});

		return json({
			workspace: workspaceName,
			isPublished,
			publishCount: publishTags.length,
			latestPublish: publishTags[0] || null,
			commitCount: commits.length,
			lastCommit: branchData.commit.commit
		});

	} catch (error) {
		console.error('Failed to get workspace publish status:', error);
		return json({ error: 'Failed to get workspace publish status' }, { status: 500 });
	}
}
