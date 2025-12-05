import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import MiniSearch from 'minisearch';
import matter from 'gray-matter';

interface SearchDocument {
	id: string;
	title: string;
	content: string;
	type: 'domain' | 'topic' | 'module' | 'article';
	path: string;
	climate?: string[];
	budget?: string[];
	size?: string[];
	domain?: string;
	topic?: string;
}

interface ContentMetadata {
	climate?: string[];
	budget?: string[];
	size?: string[];
	domain?: string;
	topic?: string;
}

interface ExtractedContent {
	title?: string;
	content: string;
	[metadata: string]: unknown;
}

interface SearchResponse {
	success: boolean;
	results?: Array<{
		id: string;
		title: string;
		content: string;
		type: string;
		path: string;
		score: number;
		metadata?: {
			climate?: string[];
			budget?: string[];
			size?: string[];
			domain?: string;
			topic?: string;
		};
	}>;
	total?: number;
	query?: string;
	filters?: {
		type?: string;
		climate?: string;
		budget?: string;
		size?: string;
	};
	error?: string;
}

function createSearchIndex(documents: SearchDocument[]): MiniSearch<SearchDocument> {
	const index = new MiniSearch({
		fields: ['title', 'content', 'type'],
		storeFields: ['id', 'title', 'content', 'type', 'path', 'climate', 'budget', 'size', 'domain', 'topic'],
		searchOptions: {
			fuzzy: 0.2,
			prefix: true,
			boost: {
				title: 2,
				type: 1.5
			}
		}
	});

	index.addAll(documents);
	return index;
}

async function extractContentFromFile(octokit: Octokit, path: string, branch: string): Promise<ExtractedContent | null> {
	try {
		const { data: file } = await octokit.rest.repos.getContent({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${path}`,
			ref: branch
		});

		if (!('content' in file) || !('encoding' in file)) {
			return null;
		}

		const content = Buffer.from(file.content, file.encoding as 'base64').toString('utf-8');
		const extension = path.split('.').pop()?.toLowerCase();

		let title = '';
		let processedContent = content;
		let metadata: ContentMetadata = {};

		if (extension === 'md') {
			// Parse markdown frontmatter
			const parsed = matter(content);
			title = parsed.data.title || path.split('/').pop()?.replace('.md', '') || '';
			processedContent = parsed.content;
			metadata = {
				climate: parsed.data.climate || [],
				budget: parsed.data.budget || [],
				size: parsed.data.size || []
			};
		} else if (extension === 'json') {
			// Parse JSON
			try {
				const jsonData = JSON.parse(content);
				title = jsonData.title || '';
				metadata = {
					domain: jsonData.domain || undefined,
					topic: jsonData.topic || undefined
				};
				processedContent = `${jsonData.title} ${jsonData.description || ''}`;
			} catch {
				return null;
			}
		}

		return {
			title,
			content: processedContent,
			...metadata
		};

	} catch {
		return null;
	}
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

	// Process each content file
	for (const item of tree.tree || []) {
		if (!item.path?.startsWith('content/') || item.type !== 'blob') {
			continue;
		}

		const relativePath = item.path.replace('content/', '');
		const pathParts = relativePath.split('/');

		// Determine content type from path
		let type: 'domain' | 'topic' | 'module' | 'article';
		if (pathParts[0] === 'domains') {
			type = 'domain';
		} else if (pathParts[0] === 'topics') {
			type = 'topic';
		} else if (pathParts[0] === 'modules') {
			type = 'module';
		} else if (pathParts[0] === 'articles') {
			type = 'article';
		} else {
			continue; // Skip other directories
		}

		const contentData = await extractContentFromFile(octokit, relativePath, branch);
		if (!contentData || !contentData.title) {
			continue;
		}

		const document: SearchDocument = {
			id: relativePath,
			title: contentData.title || '',
			content: contentData.content || '',
			type,
			path: relativePath,
			climate: contentData.climate as string[] | undefined,
			budget: contentData.budget as string[] | undefined,
			size: contentData.size as string[] | undefined,
			domain: contentData.domain as string | undefined,
			topic: contentData.topic as string | undefined
		};

		documents.push(document);
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
		const type = url.searchParams.get('type') || undefined;
		const climate = url.searchParams.get('climate') || undefined;
		const budget = url.searchParams.get('budget') || undefined;
		const size = url.searchParams.get('size') || undefined;

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
				title: 2,
				type: 1.5
			}
		});

		// Apply filters
		const filters = { type, climate, budget, size };
		const filteredResults = searchResults.filter(result => {
			if (filters.type && result.type !== filters.type) {
				return false;
			}
			if (filters.climate && result.climate && !result.climate.includes(filters.climate)) {
				return false;
			}
			if (filters.budget && result.budget && !result.budget.includes(filters.budget)) {
				return false;
			}
			if (filters.size && result.size && !result.size.includes(filters.size)) {
				return false;
			}
			return true;
		});

		// Format results
		const formattedResults = filteredResults.map(result => ({
			id: result.id,
			title: result.title,
			content: result.content,
			type: result.type,
			path: result.path,
			score: result.score,
			metadata: {
				climate: result.climate,
				budget: result.budget,
				size: result.size,
				domain: result.domain,
				topic: result.topic
			}
		}));

		const response: SearchResponse = {
			success: true,
			results: formattedResults,
			total: formattedResults.length,
			query,
			filters: Object.fromEntries(Object.entries(filters).filter(([, v]) => v !== undefined))
		};

		return json(response);

		} catch {
			return json({ error: 'Search failed' }, { status: 500 });
		}
}
