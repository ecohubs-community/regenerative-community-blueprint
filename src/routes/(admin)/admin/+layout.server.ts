import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
	const sessionCookie = cookies.get('session');

	// Allow access to login page
	if (url.pathname === '/admin/login') {
		return {};
	}

	if (!sessionCookie) {
		throw redirect(302, '/admin/login');
	}

	try {
		const session = JSON.parse(sessionCookie);

		// Check if session has expired
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			throw redirect(302, '/admin/login');
		}

		return {
			user: session.user
		};

	} catch (error) {
		console.error('Session validation error:', error);
		cookies.delete('session', { path: '/' });
		throw redirect(302, '/admin/login');
	}
};
