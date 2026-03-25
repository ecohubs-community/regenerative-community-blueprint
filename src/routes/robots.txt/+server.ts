import { SITE_URL } from '$lib/config/site';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const body = `User-agent: *
Disallow: /admin
Disallow: /api/
Disallow: /search
Disallow: /test-markdown

Sitemap: ${SITE_URL}/sitemap.xml`;

	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain'
		}
	});
};
