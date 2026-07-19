// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { satteri } from '@astrojs/markdown-satteri';


/** Make Markdown links to other sites open in a new tab. */
const externalLinks = {
	name: 'external-links',
	element: {
		filter: ['a'],
		/** @param {import('hast').Element} node @param {import('satteri').HastVisitorContext} ctx */
		visit(node, ctx) {
			const href = node.properties?.href;
			if (typeof href === 'string' && /^https?:\/\//.test(href)) {
				ctx.setProperty(node, 'target', '_blank');
				ctx.setProperty(node, 'rel', 'noopener noreferrer');
			}
		},
	},
};

// Deployed as a GitHub Pages *project* site, so all URLs live under /SalvatoreG.github.io
export default defineConfig({
	site: 'https://adamska-01.github.io',
	base: '/SalvatoreG.github.io',
	integrations: [sitemap()],
	compressHTML: true,
	markdown: {
		processor: satteri({ hastPlugins: [externalLinks] }),
	},
});