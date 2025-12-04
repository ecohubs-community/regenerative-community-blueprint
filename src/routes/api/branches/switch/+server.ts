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

		const { workspaceName } = await request.json();

		if (!workspaceName) {
			return json({ error: 'Workspace name is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get current user to verify this is their workspace
		const { data: user } = await octokit.rest.users.getAuthenticated();
		const fullWorkspaceName = workspaceName === 'workspace' ? `${user.login}/workspace` : `${user.login}/${workspaceName}`;

		// Verify the workspace exists and belongs to the user
		try {
			await octokit.rest.repos.getBranch({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				branch: fullWorkspaceName
			});
		} catch {
			// Error indicates workspace doesn't exist or user doesn't have access
			return json({ error: 'Workspace not found' }, { status: 404 });
		}

		// Store the current workspace in session for future API calls
		const updatedSession = {
			...session,
			currentBranch: fullWorkspaceName,
			currentWorkspace: workspaceName
		};

		cookies.set('session', JSON.stringify(updatedSession), {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 8 * 60 * 60 // 8 hours
		});

		return json({
			success: true,
			currentWorkspace: workspaceName,
			currentBranch: fullWorkspaceName,
			message: `Switched to workspace: ${workspaceName}`
		});

	} catch (error) {
		console.error('Failed to switch workspace:', error);
		// Error is logged but handled by generic response
		return json({ error: 'Failed to switch workspace' }, { status: 500 });
	}
}
