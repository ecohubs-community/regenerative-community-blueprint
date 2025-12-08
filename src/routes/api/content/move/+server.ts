import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';
import matter from 'gray-matter';

interface MoveRequest {
	articlePath: string;
	newParentId: string | null;
	newOrder?: number;
	// For reordering: specify target sibling and position
	targetSiblingId?: string | null;
	position?: 'before' | 'after' | 'inside' | 'root';
}

interface ArticleInfo {
	path: string;
	id: string;
	parentId: string | null;
	order: number;
	sha: string;
	content: string;
	frontmatter: Record<string, unknown>;
}

// Order step size - using 100 allows inserting between items without renumbering
const ORDER_STEP = 100;

export async function POST({ request, cookies }) {
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

		const { articlePath, newParentId, newOrder, targetSiblingId, position } = await request.json() as MoveRequest;
		const branch = session.currentBranch;

		if (!branch) {
			return json({ error: 'No workspace selected' }, { status: 400 });
		}

		if (!articlePath) {
			return json({ error: 'Article path is required' }, { status: 400 });
		}

		const octokit = new Octokit({ auth: session.access_token });

		// Get all articles to understand sibling relationships
		const { data: tree } = await octokit.rest.git.getTree({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			tree_sha: branch,
			recursive: '1'
		});

		// Filter to only markdown files in articles directory
		const articleItems = (tree.tree || []).filter(item => 
			item.path?.startsWith('content/articles/') && 
			item.path?.endsWith('.md') &&
			item.type === 'blob'
		);

		// Fetch all article metadata
		const articles: ArticleInfo[] = [];
		await Promise.all(articleItems.map(async (item) => {
			try {
				const { data } = await octokit.rest.repos.getContent({
					owner: githubConfig.owner!,
					repo: githubConfig.repo!,
					path: item.path!,
					ref: branch
				});
				
				if ('content' in data && 'sha' in data) {
					const content = Buffer.from(data.content, 'base64').toString('utf-8');
					const parsed = matter(content);
					const path = item.path!.replace('content/', '');
					const id = (parsed.data.id as string) || path.replace('articles/', '').replace('.md', '');
					
					articles.push({
						path,
						id,
						parentId: (parsed.data.parentId as string | null) || null,
						order: (parsed.data.order as number) ?? 0,
						sha: data.sha,
						content: parsed.content,
						frontmatter: parsed.data
					});
				}
			} catch (error) {
				console.error(`Failed to fetch article ${item.path}:`, error);
			}
		}));

		// Find the article being moved
		const movingArticle = articles.find(a => a.path === articlePath);
		if (!movingArticle) {
			return json({ error: 'Article not found' }, { status: 404 });
		}

		// Determine the new parent ID
		let finalParentId: string | null = newParentId;
		if (position === 'root') {
			finalParentId = null;
		} else if (position === 'inside' && targetSiblingId) {
			finalParentId = targetSiblingId;
		} else if ((position === 'before' || position === 'after') && targetSiblingId) {
			// Find the target sibling and use its parent
			const targetSibling = articles.find(a => a.id === targetSiblingId);
			if (targetSibling) {
				finalParentId = targetSibling.parentId;
			}
		}

		// Get siblings in the target parent (excluding the moving article)
		const siblings = articles
			.filter(a => a.parentId === finalParentId && a.id !== movingArticle.id)
			.sort((a, b) => a.order - b.order);

		// Calculate the new order
		let calculatedOrder: number;
		
		if (newOrder !== undefined) {
			// Explicit order provided
			calculatedOrder = newOrder;
		} else if (position === 'inside' || position === 'root') {
			// Moving inside a parent or to root - place at end
			const maxOrder = siblings.length > 0 ? Math.max(...siblings.map(s => s.order)) : 0;
			calculatedOrder = maxOrder + ORDER_STEP;
		} else if (targetSiblingId && (position === 'before' || position === 'after')) {
			// Reordering among siblings
			const targetSibling = siblings.find(a => a.id === targetSiblingId);
			if (!targetSibling) {
				// Target not found, place at end
				const maxOrder = siblings.length > 0 ? Math.max(...siblings.map(s => s.order)) : 0;
				calculatedOrder = maxOrder + ORDER_STEP;
			} else {
				const targetIndex = siblings.indexOf(targetSibling);
				
				if (position === 'before') {
					if (targetIndex === 0) {
						// Placing before first item
						calculatedOrder = targetSibling.order - ORDER_STEP;
					} else {
						// Place between previous and target
						const prevSibling = siblings[targetIndex - 1];
						calculatedOrder = Math.floor((prevSibling.order + targetSibling.order) / 2);
						
						// If no room, we need to renumber
						if (calculatedOrder === prevSibling.order || calculatedOrder === targetSibling.order) {
							// Renumber all siblings with ORDER_STEP gaps
							await renumberSiblings(octokit, branch, siblings, movingArticle.id);
							// Recalculate after renumbering
							const renumberedPrev = (targetIndex - 1) * ORDER_STEP;
							const renumberedTarget = targetIndex * ORDER_STEP;
							calculatedOrder = Math.floor((renumberedPrev + renumberedTarget) / 2);
						}
					}
				} else {
					// position === 'after'
					if (targetIndex === siblings.length - 1) {
						// Placing after last item
						calculatedOrder = targetSibling.order + ORDER_STEP;
					} else {
						// Place between target and next
						const nextSibling = siblings[targetIndex + 1];
						calculatedOrder = Math.floor((targetSibling.order + nextSibling.order) / 2);
						
						// If no room, we need to renumber
						if (calculatedOrder === targetSibling.order || calculatedOrder === nextSibling.order) {
							// Renumber all siblings with ORDER_STEP gaps
							await renumberSiblings(octokit, branch, siblings, movingArticle.id);
							// Recalculate after renumbering
							const renumberedTarget = targetIndex * ORDER_STEP;
							const renumberedNext = (targetIndex + 1) * ORDER_STEP;
							calculatedOrder = Math.floor((renumberedTarget + renumberedNext) / 2);
						}
					}
				}
			}
		} else {
			// Default: place at end
			const maxOrder = siblings.length > 0 ? Math.max(...siblings.map(s => s.order)) : 0;
			calculatedOrder = maxOrder + ORDER_STEP;
		}

		// Update the moving article
		movingArticle.frontmatter.parentId = finalParentId;
		movingArticle.frontmatter.order = calculatedOrder;
		
		const updatedContent = matter.stringify(movingArticle.content, movingArticle.frontmatter);

		await octokit.rest.repos.createOrUpdateFileContents({
			owner: githubConfig.owner!,
			repo: githubConfig.repo!,
			path: `content/${articlePath}`,
			message: `Move article: ${articlePath}${finalParentId ? ` under ${finalParentId}` : ' to root'}${position === 'before' || position === 'after' ? ` (reorder)` : ''}`,
			content: Buffer.from(updatedContent).toString('base64'),
			sha: movingArticle.sha,
			branch
		});

		return json({
			success: true,
			path: articlePath,
			newParentId: finalParentId,
			newOrder: calculatedOrder,
			branch
		});

	} catch (error) {
		console.error('Failed to move article:', error);
		return json({ error: 'Failed to move article' }, { status: 500 });
	}
}

/**
 * Renumber all siblings with ORDER_STEP gaps to make room for insertions
 */
async function renumberSiblings(
	octokit: Octokit, 
	branch: string, 
	siblings: ArticleInfo[],
	excludeId: string
): Promise<void> {
	const updates = siblings
		.filter(s => s.id !== excludeId)
		.map((sibling, index) => ({
			...sibling,
			newOrder: index * ORDER_STEP
		}))
		.filter(s => s.order !== s.newOrder);

	// Update each sibling that needs renumbering
	for (const update of updates) {
		try {
			// Re-fetch to get latest SHA (in case of concurrent updates)
			const { data: currentFile } = await octokit.rest.repos.getContent({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: `content/${update.path}`,
				ref: branch
			});

			if (!('content' in currentFile) || !('sha' in currentFile)) continue;

			const content = Buffer.from(currentFile.content, 'base64').toString('utf-8');
			const parsed = matter(content);
			parsed.data.order = update.newOrder;
			
			const updatedContent = matter.stringify(parsed.content, parsed.data);

			await octokit.rest.repos.createOrUpdateFileContents({
				owner: githubConfig.owner!,
				repo: githubConfig.repo!,
				path: `content/${update.path}`,
				message: `Reorder article: ${update.path}`,
				content: Buffer.from(updatedContent).toString('base64'),
				sha: currentFile.sha,
				branch
			});
		} catch (error) {
			console.error(`Failed to renumber ${update.path}:`, error);
		}
	}
}
