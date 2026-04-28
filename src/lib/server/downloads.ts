import { readFileSync, existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export type ManifestTemplate = {
  relPath: string;
  title: string;
  files: Record<string, string>;
};

export type Manifest = {
  generated: string;
  formats: string[];
  bundles: Record<string, string>;
  templates: ManifestTemplate[];
};

export type SingleTemplateDownloads = {
  type: 'single';
  generated: string;
  formats: string[];
  files: Record<string, string>;
  bundles: Record<string, string>;
};

export type SpecDownload = {
  type: 'spec';
  generated: string;
  title: string;
  formats: string[];
  files: Record<string, string>;
};

export type CoreManifest = {
  generated: string;
  entries: Array<{
    slug: string;
    title: string;
    generated: string;
    formats: string[];
    files: Record<string, string>;
  }>;
};

export type IndexTemplateDownloads = {
  type: 'index';
  generated: string;
  formats: string[];
  bundles: Record<string, string>;
  templates: Array<{
    layer: string;
    title: string;
    slug: string;
    files: Record<string, string>;
  }>;
};

export type TemplateDownloads = SingleTemplateDownloads | IndexTemplateDownloads;
export type ArticleDownloads = TemplateDownloads | SpecDownload;

let cachedTemplates: Manifest | null | undefined;
let cachedCore: CoreManifest | null | undefined;

/**
 * Resolve a static-assets-relative path robustly.
 *
 * `process.cwd()` works in dev but during Vite/Vercel prerender the cwd may not
 * be the project root, so we anchor on this module's file location and walk up.
 * In bundled output the source path differs from the original; we try a few
 * candidate roots in order and return the first one that contains the file.
 */
function resolveAssetPath(relPath: string): string | null {
  const here = path.dirname(fileURLToPath(import.meta.url));
  const candidates = [
    path.resolve(here, '../../..', relPath), // src/lib/server/foo.ts → project root
    path.resolve(here, '../../../..', relPath), // bundled at one level deeper
    path.resolve(here, '../../../../..', relPath), // bundled two deeper
    path.resolve(process.cwd(), relPath) // last resort
  ];
  return candidates.find((p) => existsSync(p)) ?? null;
}

function loadJson<T>(relPath: string): T | null {
  try {
    const abs = resolveAssetPath(relPath);
    if (!abs) return null;
    return JSON.parse(readFileSync(abs, 'utf8')) as T;
  } catch {
    return null;
  }
}

export function loadManifest(): Manifest | null {
  if (cachedTemplates !== undefined) return cachedTemplates;
  cachedTemplates = loadJson<Manifest>('static/downloads/manifest-templates.json');
  return cachedTemplates;
}

export function loadCoreManifest(): CoreManifest | null {
  if (cachedCore !== undefined) return cachedCore;
  cachedCore = loadJson<CoreManifest>('static/downloads/manifest-core.json');
  return cachedCore;
}

export function getArticleDownloads(slug: string): ArticleDownloads | null {
  const tpl = getTemplateDownloads(slug);
  if (tpl) return tpl;

  const core = loadCoreManifest();
  if (core) {
    const entry = core.entries.find((e) => e.slug === slug);
    if (entry) {
      return {
        type: 'spec',
        generated: entry.generated,
        title: entry.title,
        formats: entry.formats,
        files: entry.files
      };
    }
  }
  return null;
}

export function getTemplateDownloads(slug: string): TemplateDownloads | null {
  const manifest = loadManifest();
  if (!manifest) return null;

  if (slug === 'rcos-templates') {
    return {
      type: 'index',
      generated: manifest.generated,
      formats: manifest.formats,
      bundles: manifest.bundles,
      templates: manifest.templates.map((t) => {
        const layer = t.relPath.split('/')[0];
        const slugPath = t.relPath.replace(/\.md$/, '');
        return {
          layer,
          title: t.title,
          slug: `rcos-templates/${slugPath}`,
          files: t.files
        };
      })
    };
  }

  const prefix = 'rcos-templates/';
  if (!slug.startsWith(prefix)) return null;
  const relPath = slug.slice(prefix.length) + '.md';
  const entry = manifest.templates.find((t) => t.relPath === relPath);
  if (!entry) return null;
  return {
    type: 'single',
    generated: manifest.generated,
    formats: manifest.formats,
    files: entry.files,
    bundles: manifest.bundles
  };
}
