import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

interface ContentStats {
	articles: number;
	totalFiles: number;
}

interface RecentActivity {
	type: 'commit' | 'pr' | 'branch';
	title: string;
	description: string;
	timestamp: string;
	author: string;
	authorAvatar?: string;
	url?: string;
	status?: string;
}

interface WorkspaceInfo {
	name: string;
	fullName: string;
	isDefault: boolean;
	lastCommit?: {
		message: string;
		date: string;
	};
}

interface DashboardStats {
	content: ContentStats;
	recentActivity: RecentActivity[];
	workspaces: WorkspaceInfo[];
	pendingChanges: number;
	openPRs: number;
}

export async function GET({ cookies }) {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const session = JSON.parse(sessionCookie);
		
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ error: 'Session expired' }, { status: 401 });
		}

		const octokit = new Octokit({ auth: session.access_token });
		const username = session.user.login;
		const workspaceBranch = session.currentBranch || `${username}/workspace`;

		// Fetch all data in parallel
		const [contentStats, recentActivity, workspaces, pendingChanges, openPRs] = await Promise.all([
			getContentStats(octokit, workspaceBranch),
			getRecentActivity(octokit, username),
			getUserWorkspaces(octokit, username),
			getPendingChanges(octokit, workspaceBranch),
			getOpenPRs(octokit, username)
		]);

		const stats: DashboardStats = {
			content: contentStats,
			recentActivity,
			workspaces,
			pendingChanges,
			openPRs
		};

		return json(stats);

	} catch (error) {
		console.error('Failed to fetch dashboard stats:', error);
		return json({ error: 'Failed to fetch dashboard stats' }, { status: 500 });
	}
}

async function getContentStats(octokit: Octokit, branch: string): Promise<ContentStats> {
	try {
		const { data: tree } = await octokit.rest.git.getTree({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			tree_sha: branch,
			recursive: '1'
		});

		const contentItems = tree.tree?.filter(item => 
			item.path?.startsWith('content/') && 
			item.type === 'blob'
		) || [];

		// Count only markdown articles
		const articles = contentItems.filter(item => 
			item.path?.startsWith('content/articles/') && 
			item.path?.endsWith('.md')
		).length;

		return {
			articles,
			totalFiles: contentItems.length
		};
	} catch (error) {
		console.error('Failed to get content stats:', error);
		return { articles: 0, totalFiles: 0 };
	}
}

async function getRecentActivity(octokit: Octokit, username: string): Promise<RecentActivity[]> {
	const activities: RecentActivity[] = [];

	try {
		// Get recent commits from user's branches
		const { data: branches } = await octokit.rest.repos.listBranches({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			per_page: 100
		});

		const userBranches = branches.filter(b => b.name.startsWith(`${username}/`));

		// Get commits from user's branches
		for (const branch of userBranches.slice(0, 3)) {
			try {
				const { data: commits } = await octokit.rest.repos.listCommits({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					sha: branch.name,
					per_page: 5
				});

				commits.forEach(commit => {
					if (commit.author?.login === username) {
						activities.push({
							type: 'commit',
							title: commit.commit.message?.split('\n')[0] || 'Commit',
							description: `in ${branch.name.split('/')[1] || branch.name}`,
							timestamp: commit.commit.author?.date || '',
							author: commit.author?.login || 'Unknown',
							authorAvatar: commit.author?.avatar_url,
							url: commit.html_url
						});
					}
				});
			} catch {
				// Skip branches that fail
			}
		}

		// Get recent PRs by user
		const { data: prs } = await octokit.rest.pulls.list({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			state: 'all',
			per_page: 10
		});

		prs.filter(pr => pr.user?.login === username).forEach(pr => {
			activities.push({
				type: 'pr',
				title: pr.title,
				description: `#${pr.number}`,
				timestamp: pr.created_at,
				author: pr.user?.login || 'Unknown',
				authorAvatar: pr.user?.avatar_url,
				url: pr.html_url,
				status: pr.state
			});
		});

		// Sort by timestamp and return top 10
		return activities
			.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
			.slice(0, 10);

	} catch (error) {
		console.error('Failed to get recent activity:', error);
		return [];
	}
}

async function getUserWorkspaces(octokit: Octokit, username: string): Promise<WorkspaceInfo[]> {
	try {
		const { data: branches } = await octokit.rest.repos.listBranches({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			per_page: 100
		});

		const userBranches = branches.filter(b => b.name.startsWith(`${username}/`));
		const workspaces: WorkspaceInfo[] = [];

		for (const branch of userBranches) {
			const workspaceName = branch.name.split('/').slice(1).join('/');
			
			try {
				const { data: commits } = await octokit.rest.repos.listCommits({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					sha: branch.name,
					per_page: 1
				});

				workspaces.push({
					name: workspaceName,
					fullName: branch.name,
					isDefault: workspaceName === 'workspace',
					lastCommit: commits[0] ? {
						message: commits[0].commit.message?.split('\n')[0] || '',
						date: commits[0].commit.author?.date || ''
					} : undefined
				});
			} catch {
				workspaces.push({
					name: workspaceName,
					fullName: branch.name,
					isDefault: workspaceName === 'workspace'
				});
			}
		}

		return workspaces.sort((a, b) => {
			if (a.isDefault) return -1;
			if (b.isDefault) return 1;
			return a.name.localeCompare(b.name);
		});

	} catch (error) {
		console.error('Failed to get user workspaces:', error);
		return [];
	}
}

async function getPendingChanges(octokit: Octokit, workspaceBranch: string): Promise<number> {
	try {
		const { data: comparison } = await octokit.rest.repos.compareCommits({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			base: 'main',
			head: workspaceBranch
		});

		// Filter to only include content/ directory changes
		// This excludes config files, .env.example, etc. that may differ between branches
		const contentFiles = comparison.files?.filter(file => 
			file.filename.startsWith('content/')
		) || [];

		return contentFiles.length;
	} catch {
		return 0;
	}
}

async function getOpenPRs(octokit: Octokit, username: string): Promise<number> {
	try {
		const { data: prs } = await octokit.rest.pulls.list({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			state: 'open'
		});

		return prs.filter(pr => pr.user?.login === username).length;
	} catch {
		return 0;
	}
}
