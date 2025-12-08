import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

export async function GET({ cookies }) {
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

		// Get current user to identify personal branches
		const { data: user } = await octokit.rest.users.getAuthenticated();

		// Get all branches from the repository
		const { data: allBranches } = await octokit.rest.repos.listBranches({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!
		});

		// Filter only personal branches (prefixed with username)
		const personalBranches = allBranches.filter(branch => 
			branch.name.startsWith(`${user.login}/`)
		);

		// Transform branches to user-friendly format (remove username prefix)
		const workspaces = personalBranches.map(branch => ({
			name: branch.name.replace(`${user.login}/`, ''),
			fullName: branch.name,
			commit: branch.commit.sha,
			isDefault: branch.name === `${user.login}/workspace`
		}));

		// Check if user has a valid workspace selected
		const hasValidWorkspace = session.currentBranch && 
			workspaces.some(w => w.fullName === session.currentBranch);

		return json({
			workspaces,
			currentUser: user.login,
			// Only return current workspace if it's valid
			currentWorkspace: hasValidWorkspace ? session.currentWorkspace : null,
			currentBranch: hasValidWorkspace ? session.currentBranch : null,
			// Flag to indicate if user needs to create/select a workspace
			needsWorkspace: workspaces.length === 0 || !hasValidWorkspace
		});

	} catch (error) {
		console.error('Failed to fetch workspaces:', error);
		return json({ error: 'Failed to fetch workspaces' }, { status: 500 });
	}
}
