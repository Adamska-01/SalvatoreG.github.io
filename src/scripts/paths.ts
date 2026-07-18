/**
 * Joins a site-relative path with the configured base path
 * (the site deploys under /SalvatoreG.github.io on GitHub Pages).
 */
export function withBase(path: string): string {
	const base = import.meta.env.BASE_URL.replace(/\/$/, '');

	return `${base}/${path.replace(/^\//, '')}`;
}