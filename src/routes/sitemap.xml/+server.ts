import { buildGraph } from '$lib/server/graph';
import { SITE_URL } from '$lib/config/site';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = async () => {
	const graph = await buildGraph();

	const staticPages = [
		{ url: '/', changefreq: 'monthly', priority: '1.0' },
		{ url: '/articles', changefreq: 'weekly', priority: '0.8' }
	];

	const articlePages = graph.articles.map((article) => ({
		url: `/articles/${article.slug}`,
		changefreq: 'weekly',
		priority: '0.6'
	}));

	const allPages = [...staticPages, ...articlePages];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
	.map(
		(page) => `  <url>
    <loc>${SITE_URL}${page.url}</loc>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml.trim(), {
		headers: {
			'Content-Type': 'application/xml',
			'Cache-Control': 'max-age=0, s-maxage=3600'
		}
	});
};
