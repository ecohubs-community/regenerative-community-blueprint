import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';
import type { ArticleTreeNode } from '$lib/types/article';

// Article metadata from frontmatter
interface ArticleMetadata {
	id?: string;
	title?: string;
	icon?: string;
	parentId?: string | null;
	order?: number;
	[key: string]: unknown;
}

interface GitHubTreeItem {
	path: string;
	mode: string;
	type: string;
	sha: string;
	size?: number;
	url?: string;
}

export async function GET({ url, cookies }) {
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

		const branch = url.searchParams.get('branch') || session.currentBranch || 'main';

		const octokit = new Octokit({ auth: session.access_token });

		// Get the tree for the specified branch
		const { data: tree } = await octokit.rest.git.getTree({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			tree_sha: branch,
			recursive: '1'
		});

		// Build unified article tree
		const articleTree = await buildArticleTree(tree.tree || [], octokit, branch);
		
		return json({
			branch,
			articles: articleTree,
			sha: tree.sha
		});

	} catch (error) {
		console.error('Failed to fetch content tree:', error);
		return json({ error: 'Failed to fetch content tree' }, { status: 500 });
	}
}

/**
 * Build a unified article tree from markdown files in content/articles
 * Articles are organized by parentId relationships defined in frontmatter
 */
async function buildArticleTree(items: GitHubTreeItem[], octokit: Octokit, branch: string): Promise<ArticleTreeNode[]> {
	// Filter to only include markdown files in articles directory
	const articleItems = items.filter(item => 
		item.path?.startsWith('content/articles/') && 
		item.path?.endsWith('.md') &&
		item.type === 'blob'
	);

	// Fetch all article metadata in parallel
	const articleMap = new Map<string, ArticleTreeNode>();
	
	await Promise.all(articleItems.map(async (item) => {
		try {
			const { data } = await octokit.rest.repos.getContent({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: item.path,
				ref: branch
			});
			
			if ('content' in data && typeof data.content === 'string') {
				const content = Buffer.from(data.content, 'base64').toString('utf-8');
				const parsed = matter(content);
				const metadata = parsed.data as ArticleMetadata;
				
				const path = item.path.replace('content/', '');
				const slug = path.replace('articles/', '').replace('.md', '');
				const id = metadata.id || slug;
				
				const node: ArticleTreeNode = {
					id,
					slug,
					path,
					title: metadata.title || slug,
					icon: metadata.icon,
					parentId: metadata.parentId || null,
					order: metadata.order ?? 0,
					children: [],
					hasChanges: false
				};
				
				articleMap.set(id, node);
			}
		} catch (error) {
			console.error(`Failed to fetch article ${item.path}:`, error);
		}
	}));

	// Build tree structure based on parentId relationships
	const rootNodes: ArticleTreeNode[] = [];
	
	articleMap.forEach((node) => {
		if (node.parentId && articleMap.has(node.parentId)) {
			const parent = articleMap.get(node.parentId)!;
			parent.children.push(node);
		} else {
			// Root level article (no parent or parent not found)
			rootNodes.push(node);
		}
	});

	// Sort nodes by order, then by title
	const sortNodes = (nodes: ArticleTreeNode[]) => {
		nodes.sort((a, b) => {
			const orderDiff = (a.order ?? 0) - (b.order ?? 0);
			if (orderDiff !== 0) return orderDiff;
			return a.title.localeCompare(b.title);
		});
		nodes.forEach(node => {
			if (node.children.length > 0) {
				sortNodes(node.children);
			}
		});
	};

	sortNodes(rootNodes);
	return rootNodes;
}
