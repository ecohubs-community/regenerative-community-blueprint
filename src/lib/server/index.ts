export interface GitHubUser {
	id: number;
	login: string;
	name: string | null;
	email: string | null;
	avatar_url: string;
}

export interface SessionData {
	user: GitHubUser;
	access_token: string;
	expires_at: string;
}

export interface GitHubConfig {
	clientId: string;
	clientSecret: string;
	owner: string;
	repo: string;
	org?: string;
}
