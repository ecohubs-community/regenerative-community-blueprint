/**
 * Unified Article Type System
 * 
 * All content is now an "article" with hierarchical parent-child relationships.
 * This replaces the previous domain/topic/module/article separation.
 */

export interface ArticleMeta {
	id: string;
	slug: string;
	title: string;
	icon?: string;
	parentId?: string | null;
	order?: number;
	createdAt?: string;
	updatedAt?: string;
	// Legacy fields for backward compatibility during migration
	climate?: string[];
	budget?: string[];
	size?: string[];
	summary?: string;
	description?: string;
	// Additional custom metadata
	[key: string]: unknown;
}

export interface Article extends ArticleMeta {
	content: string;
	children?: Article[];
}

export interface ArticleTreeNode {
	id: string;
	slug: string;
	path: string;
	title: string;
	icon?: string;
	parentId?: string | null;
	order?: number;
	children: ArticleTreeNode[];
	isExpanded?: boolean;
	hasChanges?: boolean;
	changeStatus?: 'added' | 'modified' | 'removed' | 'renamed';
}

export interface ArticleFrontmatter {
	id?: string;
	title?: string;
	icon?: string;
	parentId?: string | null;
	order?: number;
	// Content fields
	summary?: string;
	description?: string;
	tags?: string[];
	// Filter fields
	climate?: string[];
	budget?: string[];
	size?: string[];
	[key: string]: unknown;
}

export interface EditorContent {
	frontmatter: ArticleFrontmatter;
	content: string;
}

// Helper to generate a unique article ID
export function generateArticleId(): string {
	return crypto.randomUUID().split('-')[0];
}

// Helper to generate slug from title
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

// Default icons for different article types/levels
export const DEFAULT_ICONS = {
	root: 'tabler:file-text',
	folder: 'tabler:folder',
	document: 'tabler:file-text',
	// Legacy type icons
	domain: 'tabler:world',
	topic: 'tabler:book',
	module: 'tabler:package',
	article: 'tabler:file-text'
} as const;
