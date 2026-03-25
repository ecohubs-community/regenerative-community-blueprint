import { SITE_URL, SITE_NAME } from '$lib/config/site';
import type { Article } from '$lib/server/graph';

export function buildWebSiteSchema(): Record<string, unknown> {
	return {
		'@context': 'https://schema.org',
		'@type': 'WebSite',
		name: SITE_NAME,
		url: SITE_URL,
		potentialAction: {
			'@type': 'SearchAction',
			target: `${SITE_URL}/search?q={search_term_string}`,
			'query-input': 'required name=search_term_string'
		}
	};
}

export function buildArticleSchema(
	article: Article,
	breadcrumbs: Article[]
): Record<string, unknown> {
	const schema: Record<string, unknown> = {
		'@context': 'https://schema.org',
		'@type': 'Article',
		headline: article.title,
		url: `${SITE_URL}/articles/${article.slug}`,
		publisher: {
			'@type': 'Organization',
			name: 'EcoHubs Community',
			url: 'https://ecohubs.community'
		},
		isPartOf: {
			'@type': 'WebSite',
			name: SITE_NAME,
			url: SITE_URL
		}
	};

	if (article.summary) {
		schema.description = article.summary;
	}

	if (article.tags?.length) {
		schema.keywords = article.tags.join(', ');
	}

	if (breadcrumbs.length > 1) {
		const parent = breadcrumbs[breadcrumbs.length - 2];
		schema.isPartOf = {
			'@type': 'Article',
			name: parent.title,
			url: `${SITE_URL}/articles/${parent.slug}`
		};
	}

	return schema;
}

export function buildBreadcrumbSchema(
	breadcrumbs: { title: string; slug: string }[]
): Record<string, unknown> {
	const items = [
		{ name: 'Home', url: SITE_URL },
		{ name: 'Articles', url: `${SITE_URL}/articles` },
		...breadcrumbs.map((crumb) => ({
			name: crumb.title,
			url: `${SITE_URL}/articles/${crumb.slug}`
		}))
	];

	return {
		'@context': 'https://schema.org',
		'@type': 'BreadcrumbList',
		itemListElement: items.map((item, index) => ({
			'@type': 'ListItem',
			position: index + 1,
			name: item.name,
			item: item.url
		}))
	};
}
