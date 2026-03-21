import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import MiniSearch from 'minisearch';
import matter from 'gray-matter';

interface SearchDocument {
	id: string;
	title: string;
	content: string;
	path: string;
	parentId?: string | null;
}

interface SearchResponse {
	success: boolean;
	results?: Array<{
		id: string;
		title: string;
		content: string;
		path: string;
		score: number;
		metadata?: {
			parentId?: string | null;
		};
	}>;
	total?: number;
	query?: string;
	error?: string;
}

function createSearchIndex(documents: SearchDocument[]): MiniSearch<SearchDocument> {
	const index = new MiniSearch({
		fields: ['title', 'content'],
		storeFields: ['id', 'title', 'content', 'path', 'parentId'],
		searchOptions: {
			fuzzy: 0.2,
			prefix: true,
			boost: {
				title: 2
			}
		}
	});

	index.addAll(documents);
	return index;
}

async function buildSearchIndex(octokit: Octokit, branch: string): Promise<MiniSearch<SearchDocument>> {
	// Get the content tree
	const { data: tree } = await octokit.rest.git.getTree({
		owner: githubConfig.owner!,
		repo: githubConfig.repo!,
		tree_sha: branch,
		recursive: '1'
	});

	const documents: SearchDocument[] = [];

	// Process only article files
	for (const item of tree.tree || []) {
		if (!item.path?.startsWith('content/articles/') ||
			!item.path?.endsWith('.md') ||
			item.type !== 'blob') {
			continue;
		}

		try {
			const { data: file } = await octokit.rest.repos.getContent({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: item.path,
				ref: branch
			});

			if (!('content' in file) || !('encoding' in file)) {
				continue;
			}

			const content = Buffer.from(file.content, file.encoding as 'base64').toString('utf-8');
			const parsed = matter(content);

			const relativePath = item.path.replace('content/', '');
			const slug = relativePath.replace('articles/', '').replace('.md', '');
			const id = parsed.data.id || slug;

			const document: SearchDocument = {
				id,
				title: parsed.data.title || slug,
				content: parsed.content,
				path: relativePath,
				parentId: parsed.data.parentId || null
			};

			documents.push(document);
		} catch (error) {
			console.error(`Failed to process ${item.path}:`, error);
		}
	}

	return createSearchIndex(documents);
}

export async function GET({ url, cookies }): Promise<Response> {
	const sessionCookie = cookies.get('session');

	if (!sessionCookie) {
		return json({ error: 'Unauthorized' }, { status: 401 });
	}

	try {
		const session = JSON.parse(sessionCookie);

		// Check if session has expired
		if (new Date(session.expires_at) < new Date()) {
			cookies.delete('session', { path: '/' });
			return json({ error: 'Session expired' }, { status: 401 });
		}

		const query = url.searchParams.get('q') || '';

		if (!query.trim()) {
			return json({ error: 'Search query is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });
		const branch = session.currentBranch || 'main';

		// Build search index
		const searchIndex = await buildSearchIndex(octokit, branch);

		// Perform search
		const searchResults = searchIndex.search(query, {
			fuzzy: 0.2,
			prefix: true,
			boost: {
				title: 2
			}
		});

		// Format results
		const formattedResults = searchResults.map(result => ({
			id: result.id,
			title: result.title,
			content: result.content.slice(0, 200),
			path: result.path,
			score: result.score,
			metadata: {
				parentId: result.parentId
			}
		}));

		const response: SearchResponse = {
			success: true,
			results: formattedResults,
			total: formattedResults.length,
			query
		};

		return json(response);

	} catch {
		return json({ error: 'Search failed' }, { status: 500 });
	}
}
