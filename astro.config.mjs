// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';


// Deployed as a GitHub Pages *project* site, so all URLs live under /SalvatoreG.github.io
export default defineConfig({
	site: 'https://adamska-01.github.io',
	base: '/SalvatoreG.github.io',
	integrations: [sitemap()],
	compressHTML: true,
});