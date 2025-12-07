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

		const { workspaceName, fromWorkspace } = await request.json();

		if (!workspaceName) {
			return json({ error: 'Workspace name is required' }, { status: 400 });
		}

		// Validate workspace name format
		if (!/^[a-zA-Z0-9._-]+$/.test(workspaceName)) {
			return json({ error: 'Invalid workspace name format' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get current user to create personal workspace
		const { data: user } = await octokit.rest.users.getAuthenticated();

		// Create personal workspace name with user prefix
		const fullWorkspaceName = `${user.login}/${workspaceName}`;
		
		// Determine source branch:
		// - If fromWorkspace is empty/undefined/null, use 'main' (fresh start)
		// - If fromWorkspace is 'workspace', use user's default workspace
		// - Otherwise, use the specified workspace with user prefix
		let fromBranchName: string;
		if (!fromWorkspace) {
			// Empty selection = start from main branch
			fromBranchName = 'main';
		} else if (fromWorkspace === 'workspace') {
			fromBranchName = `${user.login}/workspace`;
		} else {
			fromBranchName = `${user.login}/${fromWorkspace}`;
		}

		// Get the reference of the source workspace
		const { data: sourceRef } = await octokit.rest.git.getRef({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			ref: `heads/${fromBranchName}`
		});

		// Create the new workspace
		const { data: newWorkspace } = await octokit.rest.git.createRef({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			ref: `refs/heads/${fullWorkspaceName}`,
			sha: sourceRef.object.sha
		});

		return json({
			success: true,
			workspace: {
				name: workspaceName,
				fullName: fullWorkspaceName,
				sha: newWorkspace.object.sha,
				ref: newWorkspace.ref
			}
		});

	} catch (error) {
		console.error('Failed to create workspace:', error);
		
		if (error && typeof error === 'object' && 'status' in error) {
			if (error.status === 422) {
				return json({ error: 'Workspace already exists' }, { status: 409 });
			}
			if (error.status === 404) {
				return json({ error: 'Source workspace not found' }, { status: 404 });
			}
		}
		
		return json({ error: 'Failed to create workspace' }, { status: 500 });
	}
}
