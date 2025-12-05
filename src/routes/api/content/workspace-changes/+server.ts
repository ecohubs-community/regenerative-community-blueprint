import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

interface WorkspaceChanges {
	files: {
		filename: string;
		status: 'added' | 'modified' | 'removed' | 'renamed';
		patch?: string;
		additions?: number;
		deletions?: number;
	}[];
	commitCount: number;
	lastCommit?: {
		sha: string;
		message: string;
		author: string;
		date: string;
	};
}

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
		const workspaceBranch = session.currentBranch || `${session.user.login}/workspace`;

		// Compare workspace branch with main branch
		const { data: comparison } = await octokit.rest.repos.compareCommits({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			base: 'main',
			head: workspaceBranch
		});

		// Get recent commits for this branch
		const { data: commits } = await octokit.rest.repos.listCommits({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			sha: workspaceBranch,
			per_page: 10
		});

		const changes: WorkspaceChanges = {
			files: comparison.files?.map(file => ({
				filename: file.filename,
				status: file.status as 'added' | 'modified' | 'removed' | 'renamed',
				patch: file.patch,
				additions: file.additions,
				deletions: file.deletions
			})) || [],
			commitCount: comparison.commits?.length || 0,
			lastCommit: commits[0] ? {
				sha: commits[0].sha,
				message: commits[0].commit.message?.split('\n')[0] || '',
				author: commits[0].commit.author?.name || '',
				date: commits[0].commit.author?.date || ''
			} : undefined
		};

		return json(changes);

	} catch (error) {
		console.error('Failed to get workspace changes:', error);
		
		if (error && typeof error === 'object' && 'status' in error) {
			if (error.status === 404) {
				return json({ error: 'Branch not found' }, { status: 404 });
			}
		}
		
		return json({ error: 'Failed to get workspace changes' }, { status: 500 });
	}
}
