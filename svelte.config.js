// import adapter from '@sveltejs/adapter-node';
import adapter from '@sveltejs/adapter-vercel';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';
import rehypeSlug from 'rehype-slug';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	extensions: ['.svelte', '.md'],
	preprocess: [
		vitePreprocess(),
		mdsvex({
			extensions: ['.md'],
			layout: false,
			rehypePlugins: [rehypeSlug]
		})
	],
	kit: {
		adapter: adapter(),
		prerender: {
			// Don't fail the build if a deep link's #anchor isn't found —
			// e.g. /articles/rcos-templates#downloads when the templates manifest
			// hasn't been generated/committed yet.
			handleMissingId: 'warn'
		}
	}
};

export default config;
