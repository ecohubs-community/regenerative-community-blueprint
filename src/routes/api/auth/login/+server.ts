import { redirect } from '@sveltejs/kit';
import { githubConfig, appUrl } from '$lib/server/env';

export async function GET() {
	if (!githubConfig.clientId) {
		return new Response('GitHub OAuth not configured', { status: 500 });
	}

	const params = new URLSearchParams({
		client_id: githubConfig.clientId,
		redirect_uri: `${appUrl}/api/auth/callback`,
		scope: 'user repo',
		state: Math.random().toString(36).substring(7) // Simple state for CSRF protection
	});

	const githubAuthUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;

	throw redirect(302, githubAuthUrl);
}
