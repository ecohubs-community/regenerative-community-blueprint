import { Octokit } from '@octokit/rest';

export function getGitHubClient(): Octokit {
	const token = process.env.GITHUB_TOKEN;
	if (!token) {
		throw new Error('GITHUB_TOKEN environment variable is not set');
	}

	return new Octokit({
		auth: token
	});
}
