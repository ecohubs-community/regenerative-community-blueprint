import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

interface SessionData {
	user: {
		id: number;
		login: string;
		name: string | null;
		email: string | null;
		avatar_url: string;
	};
	access_token: string;
	expires_at: string;
}

export const GET: RequestHandler = async ({ cookies }) => {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ authenticated: false }, { status: 401 });
	}

	try {
		const session: SessionData = JSON.parse(sessionCookie);

		// Check if session has expired
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ authenticated: false }, { status: 401 });
		}

		return json({
			authenticated: true,
			user: session.user
		});

	} catch (error) {
		console.error('Session parsing error:', error);
		cookies.delete('session', { path: '/' });
		return json({ authenticated: false }, { status: 401 });
	}
};
