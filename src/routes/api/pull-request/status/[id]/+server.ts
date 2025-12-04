import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

interface PullRequestStatusResponse {
	success: boolean;
	pullRequest?: {
		id: number;
		number: number;
		title: string;
		body: string;
		state: 'open' | 'closed' | 'merged';
		mergeable?: boolean;
		mergeable_state?: 'clean' | 'dirty' | 'unstable' | 'blocked';
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
		merged_at?: string;
		review_status?: {
			total: number;
			approved: number;
			changes_requested: number;
			pending: number;
		};
		conflicts?: boolean;
	};
	error?: string;
}

export async function GET({ params, cookies }): Promise<Response> {
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

		const prId = params.id;

		if (!prId) {
			return json({ error: 'Pull request ID is required' }, { status: 400 });
		}

		// Validate PR ID is a number
		const prNumber = parseInt(prId, 10);
		if (isNaN(prNumber)) {
			return json({ error: 'Invalid pull request ID' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get pull request details
		const { data: pullRequest } = await octokit.rest.pulls.get({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			pull_number: prNumber
		});

		// Get detailed PR status including mergeability
		let detailedStatus: {
			mergeable?: boolean;
			mergeable_state?: 'clean' | 'dirty' | 'unstable' | 'blocked';
		} = {};
		try {
			const { data: prDetails } = await octokit.rest.pulls.get({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				pull_number: prNumber,
				mediaType: {
					previews: ['mergeable']
				}
			});
			detailedStatus = prDetails as typeof detailedStatus;
		} catch (error) {
			console.warn('Failed to fetch detailed PR status:', error);
		}

		// Get review status
		const reviewStatus = { total: 0, approved: 0, changes_requested: 0, pending: 0 };
		try {
			const { data: reviews } = await octokit.rest.pulls.listReviews({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				pull_number: prNumber
			});

			// Count reviews by state (only latest review per user counts)
			const latestReviews = new Map();
			reviews.forEach(review => {
				const userId = review.user?.id;
				if (userId) {
					latestReviews.set(userId, review);
				}
			});

			latestReviews.forEach(review => {
				reviewStatus.total++;
				switch (review.state) {
					case 'APPROVED':
						reviewStatus.approved++;
						break;
					case 'CHANGES_REQUESTED':
						reviewStatus.changes_requested++;
						break;
					case 'PENDING':
						reviewStatus.pending++;
						break;
				}
			});
		} catch (error) {
			console.warn('Failed to fetch review status:', error);
		}

		// Check for conflicts
		let hasConflicts = false;
		try {
			if (detailedStatus.mergeable_state) {
				hasConflicts = detailedStatus.mergeable_state === 'dirty';
			}
		} catch (error) {
			console.warn('Could not determine conflict status:', error);
		}

		const response: PullRequestStatusResponse = {
			success: true,
			pullRequest: {
				id: pullRequest.id,
				number: pullRequest.number,
				title: pullRequest.title,
				body: pullRequest.body || '',
				state: pullRequest.state as 'open' | 'closed' | 'merged',
				mergeable: detailedStatus.mergeable,
				mergeable_state: detailedStatus.mergeable_state,
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
				updated_at: pullRequest.updated_at,
				merged_at: pullRequest.merged_at || undefined,
				review_status: reviewStatus,
				conflicts: hasConflicts
			}
		};

		return json(response);

	} catch (error) {
		console.error('Failed to fetch pull request status:', error);
		
		// Handle specific GitHub API errors
		if (error && typeof error === 'object' && 'status' in error) {
			if (error.status === 404) {
				return json({ error: 'Pull request not found' }, { status: 404 });
			}
		}
		
		return json({ error: 'Failed to fetch pull request status' }, { status: 500 });
	}
}
