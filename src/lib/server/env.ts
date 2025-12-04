import { env } from '$env/dynamic/private';
import { env as publicEnv } from '$env/dynamic/public';

export const githubConfig = {
	clientId: env.GITHUB_CLIENT_ID,
	clientSecret: env.GITHUB_CLIENT_SECRET,
	owner: env.GITHUB_OWNER,
	repo: env.GITHUB_REPO,
	org: env.GITHUB_ORG
};

export const sessionSecret = env.SESSION_SECRET;

export const appUrl = publicEnv.PUBLIC_APP_URL || 'http://localhost:5173';
