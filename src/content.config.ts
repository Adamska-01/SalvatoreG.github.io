import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';


const projectSchema = ({ image }: { image: () => any }) =>
	z.object({
		title: z.string(),
		/** Short description shown on the project card */
		summary: z.string(),
		dateRange: z.string(),
		/** Sort position within the list page (ascending) */
		order: z.number(),
		/** Display name of the group the project is listed under */
		group: z.string(),
		preview: image(),
		images: z.array(image()).default([]),
		videos: z.array(z.object({ title: z.string(), youtubeId: z.string() })).default([]),
		/** Keys into src/assets/symbols/<name>.png */
		technologies: z.array(z.string()).default([]),
		links: z.array(z.object({ text: z.string(), href: z.url() })).default([]),
	});

const personalProjects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/personal-projects' }),
	schema: projectSchema,
});

const workProjects = defineCollection({
	loader: glob({ pattern: '**/*.md', base: './src/content/work-projects' }),
	schema: projectSchema,
});

export const collections = { personalProjects, workProjects };