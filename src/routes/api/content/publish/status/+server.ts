import { json, type RequestHandler } from '@sveltejs/kit';
import { getOctokit } from '$lib/server/github';
import { githubConfig } from '$lib/server/env';

export const GET: RequestHandler = async ({ url, cookies }) => {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	let session;
	try {
		session = JSON.parse(sessionCookie);
	} catch {
		return json({ error: 'Invalid session' }, { status: 401 });
	}

	const path = url.searchParams.get('path');
	if (!path) {
		return json({ error: 'Path parameter is required' }, { status: 400 });
	}

	// Normalize to repository path (all content lives under content/)
	const repoPath = `content/${path}`;

	try {
		const octokit = getOctokit(session.access_token);
		const owner = githubConfig.owner!;
		const repo = githubConfig.repo!;

		// Get file content and metadata from the default branch (main)
		const { data: fileData } = await octokit.rest.repos.getContent({
			owner,
			repo,
			path: repoPath
		});

		if (!('sha' in fileData)) {
			return json({ error: 'Path is not a file' }, { status: 400 });
		}

		// Get commit history to determine publishing status
		const { data: commits } = await octokit.rest.repos.listCommits({
			owner,
			repo,
			path: repoPath,
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
		// If the file does not exist on the default branch, treat it as an unpublished draft
		if (error && typeof error === 'object' && 'status' in error && error.status === 404) {
			const draftStatus = {
				isPublished: false,
				publishDate: undefined,
				publishedBy: undefined,
				version: 0,
				lastModified: new Date().toISOString(),
				sha: undefined
			};
			return json({ status: draftStatus });
		}

		console.error('Error fetching publishing status:', error);
		return json({ error: 'Failed to fetch publishing status' }, { status: 500 });
	}
};
