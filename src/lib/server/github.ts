import { Octokit } from '@octokit/rest';
import { GITHUB_TOKEN } from '$env/static/private';

export function getGitHubClient(): Octokit {
	const token = GITHUB_TOKEN;
	if (!token) {
		throw new Error('GITHUB_TOKEN environment variable is not set');
	}

	return new Octokit({
		auth: token
	});
}

export function getOctokit(token: string): Octokit {
	return new Octokit({
		auth: token
	});
}
