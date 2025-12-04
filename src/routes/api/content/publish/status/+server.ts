import { json, type RequestHandler } from '@sveltejs/kit';
import { Octokit } from '@octokit/rest';

function getGitHubClient(): Octokit {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		throw new Error('GITHUB_TOKEN environment variable is not set');
	}

	return new Octokit({
		auth: token
	});
}

export const GET: RequestHandler = async ({ url, cookies }) => {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	const path = url.searchParams.get('path');
	if (!path) {
		return json({ error: 'Path parameter is required' }, { status: 400 });
	}

	try {
		const octokit = getGitHubClient();
		const owner = process.env.GITHUB_OWNER!;
		const repo = process.env.GITHUB_REPO!;

		// Get file content and metadata
		const { data: fileData } = await octokit.rest.repos.getContent({
			owner,
			repo,
			path
		});

		if (!('sha' in fileData)) {
			return json({ error: 'Path is not a file' }, { status: 400 });
		}

		// Get commit history to determine publishing status
		const { data: commits } = await octokit.rest.repos.listCommits({
			owner,
			repo,
			path,
			per_page: 10
		});

		// Check if file has been published (look for publish-related commits)
		const publishCommits = commits.filter((commit) => 
			commit.commit.message?.toLowerCase().includes('publish') ||
			commit.commit.message?.toLowerCase().includes('release')
		);

		const isPublished = publishCommits.length > 0;
		const latestCommit = commits[0];

		const status = {
			isPublished,
			publishDate: isPublished ? publishCommits[0]?.commit.committer?.date : undefined,
			publishedBy: isPublished ? publishCommits[0]?.commit.author?.name : undefined,
			version: commits.length,
			lastModified: latestCommit?.commit.committer?.date || new Date().toISOString(),
			sha: fileData.sha
		};

		return json({ status });
	} catch (error) {
		console.error('Error fetching publishing status:', error);
		return json({ error: 'Failed to fetch publishing status' }, { status: 500 });
	}
};
