import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

interface PullRequestRequest {
	title?: string;
	body?: string;
	head: string; // source branch
	base?: string; // target branch, defaults to 'main'
	draft?: boolean;
}

interface PullRequestResponse {
	success: boolean;
	pullRequest?: {
		id: number;
		number: number;
		title: string;
		body: string;
		state: 'open' | 'closed' | 'merged';
		head: {
			ref: string;
			sha: string;
		};
		base: {
			ref: string;
			sha: string;
		};
		html_url: string;
		created_at: string;
		updated_at: string;
	};
	error?: string;
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

		const data: PullRequestRequest = await request.json();

		// Validate required fields
		if (!data.head) {
			return json({ error: 'Head branch is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });
		const baseBranch = data.base || 'main';

		// Verify both branches exist
		try {
			await octokit.rest.repos.getBranch({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				branch: data.head
			});

			await octokit.rest.repos.getBranch({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				branch: baseBranch
			});
		} catch {
			return json({ error: 'One or both branches do not exist' }, { status: 404 });
		}

		// Get commit history for the head branch to generate a summary
		let commitSummary = '';
		try {
			// Compare branches to get commits between them
			const { data: comparison } = await octokit.rest.repos.compareCommits({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				base: baseBranch,
				head: data.head
			});

			if (comparison.commits && comparison.commits.length > 0) {
				const recentCommits = comparison.commits.slice(-10); // Get last 10 commits
				const commitMessages = recentCommits.map(commit => 
					`- ${commit.commit.message?.split('\n')[0]} (${commit.sha?.substring(0, 7)})`
				).join('\n');
				commitSummary = `\n\n## Recent Changes\n${commitMessages}`;
			}
		} catch (error) {
			console.warn('Failed to fetch commit history:', error);
		}

		// Generate default title and body if not provided
		const title = data.title || `Feature: ${data.head}`;
		const body = data.body || `Pull request from \`${data.head}\` to \`${baseBranch}\`${commitSummary}`;

		// Create the pull request
		const { data: pullRequest } = await octokit.rest.pulls.create({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			title,
			body,
			head: data.head,
			base: baseBranch,
			draft: data.draft || false
		});

		const response: PullRequestResponse = {
			success: true,
			pullRequest: {
				id: pullRequest.id,
				number: pullRequest.number,
				title: pullRequest.title,
				body: pullRequest.body || '',
				state: pullRequest.state as 'open' | 'closed' | 'merged',
				head: {
					ref: pullRequest.head.ref,
					sha: pullRequest.head.sha
				},
				base: {
					ref: pullRequest.base.ref,
					sha: pullRequest.base.sha
				},
				html_url: pullRequest.html_url,
				created_at: pullRequest.created_at,
				updated_at: pullRequest.updated_at
			}
		};

		return json(response);

	} catch (error) {
		console.error('Failed to create pull request:', error);
		
		// Handle specific GitHub API errors
		if (error && typeof error === 'object' && 'status' in error) {
			if (error.status === 422) {
				return json({ error: 'Pull request already exists or no changes between branches' }, { status: 409 });
			}
			if (error.status === 403) {
				return json({ error: 'Insufficient permissions to create pull request' }, { status: 403 });
			}
		}
		
		return json({ error: 'Failed to create pull request' }, { status: 500 });
	}
}
