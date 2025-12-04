import { json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	
	// If the request is from a form submission, redirect to login
	return json({ success: true });
};

export const GET: RequestHandler = async ({ cookies }) => {
	cookies.delete('session', { path: '/' });
	
	// Redirect to login page
	throw redirect(302, '/admin/login');
};
