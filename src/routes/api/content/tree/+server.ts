import { json } from '@sveltejs/kit';
import { githubConfig } from '$lib/server/env';
import { Octokit } from '@octokit/rest';

interface ContentNode {
	path: string;
	type: 'file' | 'dir';
	name: string;
	sha?: string;
	size?: number;
	url?: string;
	children?: ContentNode[];
	metadata?: Record<string, any>;
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

		// Filter and organize content tree
		const contentTree = await organizeContentTree(tree.tree || [], octokit, branch);

		return json({
			branch,
			tree: contentTree,
			sha: tree.sha
		});

	} catch (error) {
		console.error('Failed to fetch content tree:', error);
		return json({ error: 'Failed to fetch content tree' }, { status: 500 });
	}
}

interface GitHubTreeItem {
	path: string;
	mode: string;
	type: string;
	sha: string;
	size?: number;
	url?: string;
}

async function organizeContentTree(items: GitHubTreeItem[], octokit: Octokit, branch: string): Promise<ContentNode[]> {
	// Filter to only include content directory items
	const contentItems = items.filter(item => 
		item.path?.startsWith('content/') && 
		!item.path?.includes('.gitkeep')
	);

	// Create a hierarchical structure
	const root: ContentNode[] = [];
	const nodeMap = new Map<string, ContentNode>();

	// First pass: create all nodes
	contentItems.forEach(item => {
		const path = item.path?.replace('content/', '') || '';
		const parts = path.split('/');
		const name = parts[parts.length - 1];
		
		const node: ContentNode = {
			path,
			type: item.type === 'blob' ? 'file' : 'dir',
			name,
			sha: item.sha,
			size: item.size,
			url: item.url,
			children: []
		};

		nodeMap.set(path, node);
	});

	// Second pass: fetch metadata for JSON and Markdown files
	const metadataPromises: Promise<void>[] = [];
	nodeMap.forEach((node) => {
		if (node.type === 'file' && (node.name.endsWith('.json') || node.name.endsWith('.md'))) {
			const promise = (async () => {
				try {
					const { data } = await octokit.rest.repos.getContent({
						owner: githubConfig.owner!,
						repo: githubConfig.repo!,
						path: `content/${node.path}`,
						ref: branch
					});
					
					if ('content' in data && typeof data.content === 'string') {
						const content = Buffer.from(data.content, 'base64').toString('utf-8');
						
						if (node.name.endsWith('.json')) {
							node.metadata = JSON.parse(content);
						} else if (node.name.endsWith('.md')) {
							// Parse frontmatter from markdown
							const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
							if (frontmatterMatch) {
								const frontmatterStr = frontmatterMatch[1];
								const metadata: Record<string, any> = {};
								
								// Simple YAML parser for frontmatter
								frontmatterStr.split('\n').forEach(line => {
									const colonIndex = line.indexOf(':');
									if (colonIndex > 0) {
										const key = line.substring(0, colonIndex).trim();
										let value: any = line.substring(colonIndex + 1).trim();
										
										// Handle arrays
										if (value.startsWith('[') && value.endsWith(']')) {
											value = value.slice(1, -1).split(',').map((v: string) => v.trim().replace(/^["']|["']$/g, ''));
										} else if (value.startsWith('-')) {
											// Multi-line array
											value = [value.substring(1).trim().replace(/^["']|["']$/g, '')];
										} else {
											// Remove quotes
											value = value.replace(/^["']|["']$/g, '');
										}
										
										metadata[key] = value;
									}
								});
								
								node.metadata = metadata;
							}
						}
					}
				} catch (error) {
					console.error(`Failed to fetch metadata for ${node.path}:`, error);
				}
			})();
			metadataPromises.push(promise);
		}
	});

	// Wait for all metadata to be fetched
	await Promise.all(metadataPromises);

	// Third pass: build hierarchy
	nodeMap.forEach((node, path) => {
		const parts = path.split('/');
		
		if (parts.length === 1) {
			// Root level item
			root.push(node);
		} else {
			// Find parent and add as child
			const parentPath = parts.slice(0, -1).join('/');
			const parent = nodeMap.get(parentPath);
			if (parent && parent.children) {
				parent.children.push(node);
			}
		}
	});

	// Sort by type (directories first) then by name
	const sortNodes = (nodes: ContentNode[]) => {
		nodes.sort((a, b) => {
			if (a.type !== b.type) {
				return a.type === 'dir' ? -1 : 1;
			}
			return a.name.localeCompare(b.name);
		});
		nodes.forEach(node => {
			if (node.children) {
				sortNodes(node.children);
			}
		});
	};

	sortNodes(root);
	return root;
}
