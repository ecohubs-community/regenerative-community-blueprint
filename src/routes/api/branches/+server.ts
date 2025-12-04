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

		// If user has no personal branches, create a default one
		if (personalBranches.length === 0) {
			const defaultBranchName = `${user.login}/workspace`;
			
			try {
				// Get the main branch reference
				const { data: mainRef } = await octokit.rest.git.getRef({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					ref: 'heads/main'
				});

				// Create the default workspace branch
				await octokit.rest.git.createRef({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					ref: `refs/heads/${defaultBranchName}`,
					sha: mainRef.object.sha
				});

				// Add the newly created branch to the list
				const { data: newBranch } = await octokit.rest.repos.getBranch({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					branch: defaultBranchName
				});
				
				personalBranches.push(newBranch);
			} catch (createError) {
				console.error('Failed to create default workspace branch:', createError);
				// Continue even if creation fails
			}
		}

		// Transform branches to user-friendly format (remove username prefix)
		const workspaces = personalBranches.map(branch => ({
			name: branch.name.replace(`${user.login}/`, ''),
			fullName: branch.name,
			commit: branch.commit.sha,
			isDefault: branch.name === `${user.login}/workspace`
		}));

		return json({
			workspaces,
			currentUser: user.login,
			defaultWorkspace: `${user.login}/workspace`
		});

	} catch (error) {
		console.error('Failed to fetch workspaces:', error);
		return json({ error: 'Failed to fetch workspaces' }, { status: 500 });
	}
}
