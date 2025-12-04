import { json, redirect } from '@sveltejs/kit';
import { githubConfig, appUrl } from '$lib/server/env';
import { Octokit } from '@octokit/rest';


interface GitHubTokenResponse {
	access_token: string;
	token_type: string;
	scope: string;
}

export async function GET({ url, cookies }) {
	const code = url.searchParams.get('code');
	const state = url.searchParams.get('state');
	// TODO: Implement state validation for CSRF protection
	// State is stored for future security implementation

	if (!code) {
		return json({ error: 'No authorization code provided' }, { status: 400 });
	}

	// Validate configuration
	if (!githubConfig.clientId || !githubConfig.clientSecret) {
		return json({ error: 'GitHub OAuth not properly configured' }, { status: 500 });
	}

	if (!githubConfig.owner || !githubConfig.repo) {
		return json({ error: 'GitHub repository not configured' }, { status: 500 });
	}

	try {
		console.log('Starting OAuth callback with code:', code.substring(0, 10) + '...');
		
		// Exchange code for access token
		const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
			method: 'POST',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: new URLSearchParams({
				client_id: githubConfig.clientId!,
				client_secret: githubConfig.clientSecret!,
				code: code,
				redirect_uri: `${appUrl}/api/auth/callback`
			})
		});

		if (!tokenResponse.ok) {
			const errorText = await tokenResponse.text();
			console.error('Token exchange failed:', tokenResponse.status, errorText);
			return json({ error: 'Token exchange failed', details: errorText }, { status: tokenResponse.status });
		}

		const tokenData: GitHubTokenResponse = await tokenResponse.json();

		if (!tokenData.access_token) {
			console.error('No access token in response:', tokenData);
			return json({ error: 'Failed to obtain access token', details: tokenData }, { status: 400 });
		}

		console.log('Access token obtained successfully');

		// Get user information
		const octokit = new Octokit({ auth: tokenData.access_token });
		const { data: user } = await octokit.rest.users.getAuthenticated();

		console.log('User authenticated:', user.login);

		// Verify repository access or organization membership
		let hasAccess = false;

		if (githubConfig.org) {
			// Check organization membership
			try {
				await octokit.rest.orgs.getMembershipForUser({
					org: githubConfig.org!,
					username: user.login
				});
				hasAccess = true;
				console.log('Organization membership confirmed');
			} catch (error) {
				console.error('Organization membership check failed:', error);
			}
		} else {
			// Check repository collaborator status
			try {
				await octokit.rest.repos.checkCollaborator({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					username: user.login
				});
				hasAccess = true;
				console.log('Repository access confirmed');
			} catch (error) {
				console.error('Repository access check failed:', error);
			}
		}

		if (!hasAccess) {
			console.error('Access denied for user:', user.login);
			return json({ 
				error: 'Access denied. User is not a member of the organization or repository.',
				user: user.login,
				owner: githubConfig.owner,
				repo: githubConfig.repo,
				org: githubConfig.org
			}, { status: 403 });
		}

		// Create session
		const sessionData = {
			user: {
				id: user.id,
				login: user.login,
				name: user.name,
				email: user.email,
				avatar_url: user.avatar_url
			},
			access_token: tokenData.access_token,
			expires_at: new Date(Date.now() + 8 * 60 * 60 * 1000).toISOString() // 8 hours
		};

		console.log('Creating session for user:', user.login);

		cookies.set('session', JSON.stringify(sessionData), {
			path: '/',
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'lax',
			maxAge: 8 * 60 * 60 // 8 hours
		});

		console.log('Session created, redirecting to /admin');

		// Redirect to admin dashboard
		throw redirect(302, '/admin');

	} catch (error) {
		console.error('GitHub OAuth callback error:', error);
		
		// Check if it's a redirect error (which is actually success)
		if (error && typeof error === 'object' && 'status' in error && error.status === 302) {
			console.log('Redirecting successfully');
			throw error; // Re-throw the redirect
		}
		
		// Log more detailed error information
		if (error instanceof Error) {
			console.error('Error message:', error.message);
			console.error('Error stack:', error.stack);
		}
		
		return json({ 
			error: 'Authentication failed',
			details: error instanceof Error ? error.message : 'Unknown error'
		}, { status: 500 });
	}
}
