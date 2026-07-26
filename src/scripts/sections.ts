import { withBase } from './paths';

/** Shared nav/section metadata — used by NavBar and ContentPanel */
export interface Section {
	id: 'about' | 'projects' | 'work' | 'contact';
	label: string;
	/** Terminal-style path shown in the panel header, e.g. "~/about" */
	panelLabel: string;
	href: string;
	accent: string;
	icon: string;
}

export const sections: Section[] = [
	{
		id: 'about',
		label: 'About',
		panelLabel: '~/about',
		href: withBase('/about/'),
		accent: 'var(--about-color)',
		icon: '<circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line>',
	},
	{
		id: 'projects',
		label: 'Projects',
		panelLabel: '~/projects',
		href: withBase('/projects/'),
		accent: 'var(--projects-color)',
		icon: '<rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line>',
	},
	{
		id: 'work',
		label: 'Work',
		panelLabel: '~/work',
		href: withBase('/work/'),
		accent: 'var(--work-color)',
		icon: '<rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>',
	},
	{
		id: 'contact',
		label: 'Contact',
		panelLabel: '~/contact',
		href: withBase('/contact/'),
		accent: 'var(--contact-color)',
		icon: '<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline>',
	},
];

/** Finds the section whose href prefixes the given pathname, if any. */
export function sectionForPath(pathname: string): Section | undefined {
	const stripSlash = (path: string) => path.replace(/\/$/, '');

	return sections.find((section) => stripSlash(pathname).startsWith(stripSlash(section.href)));
}