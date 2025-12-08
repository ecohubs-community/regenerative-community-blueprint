import { Octokit } from '@octokit/rest';

export function getOctokit(token: string): Octokit {
	return new Octokit({
		auth: token
	});
}
