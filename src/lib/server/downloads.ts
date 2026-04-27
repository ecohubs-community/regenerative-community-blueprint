import { readFileSync } from 'node:fs';
import path from 'node:path';

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

let cached: Manifest | null | undefined;

export function loadManifest(): Manifest | null {
  if (cached !== undefined) return cached;
  try {
    const p = path.resolve('static/downloads/manifest.json');
    cached = JSON.parse(readFileSync(p, 'utf8')) as Manifest;
  } catch {
    cached = null;
  }
  return cached;
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
