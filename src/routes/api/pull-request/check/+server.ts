import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

interface OpenPR {
	number: number;
	title: string;
	html_url: string;
	state: 'open' | 'closed';
	created_at: string;
}

/**
 * Check if there's an open PR for the current workspace/branch
 */
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

		const currentBranch = session.currentBranch;
		
		if (!currentBranch) {
			return json({ 
				hasPR: false, 
				openPR: null,
				message: 'No workspace selected' 
			});
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Search for open PRs from this branch
		const { data: pullRequests } = await octokit.rest.pulls.list({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			state: 'open',
			head: `${githubConfig.owner}:${currentBranch}`
		});

		if (pullRequests.length > 0) {
			const pr = pullRequests[0];
			const openPR: OpenPR = {
				number: pr.number,
				title: pr.title,
				html_url: pr.html_url,
				state: pr.state as 'open' | 'closed',
				created_at: pr.created_at
			};

			return json({
				hasPR: true,
				openPR,
				message: `This workspace has an open pull request (#${pr.number})`
			});
		}

		return json({
			hasPR: false,
			openPR: null,
			message: null
		});

	} catch (error) {
		console.error('Failed to check for open PRs:', error);
		return json({ error: 'Failed to check for open PRs' }, { status: 500 });
	}
}
