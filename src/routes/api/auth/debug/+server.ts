import { json } from '@sveltejs/kit';
import { githubConfig, appUrl } from '$lib/server/env';

export async function GET() {
	return json({
		githubConfig: {
			clientId: githubConfig.clientId ? 'SET' : 'MISSING',
			clientSecret: githubConfig.clientSecret ? 'SET' : 'MISSING',
			owner: githubConfig.owner || 'MISSING',
			repo: githubConfig.repo || 'MISSING',
			org: githubConfig.org || 'NOT_SET'
		},
		appUrl: appUrl,
		callbackUrl: `${appUrl}/api/auth/callback`
	});
}
