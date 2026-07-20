# SalvatoreG.github.io

Personal portfolio website — built with [Astro](https://astro.build), Three.js for 3D visuals, and content collections for projects/work entries.

Live: https://adamska-01.github.io/SalvatoreG.github.io

## Stack

- **Astro 7** — static site generation
- **Three.js** — 3D scenes/visuals
- **Content collections** — Markdown-driven personal projects & work entries
- **TypeScript**

## Structure

```
src/
  pages/              routes (index, about, contact, projects, work)
  content/
    personal-projects/ Markdown entries for personal projects
    work-projects/      Markdown entries for work experience
    pages/               misc page content
  components/         Astro/UI components
  layouts/            page layouts
  scripts/three/      Three.js scene logic
  assets/             images per project (PersonalProjects/, WorkProjects/)
public/               static files (favicon, downloads, 3D models)
```

## Development

```bash
npm install
npm run dev       # local dev server
npm run build     # type-check + build to dist/
npm run preview   # preview production build
npm run check     # astro check (type-check only)
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with
[`withastro/action`](https://github.com/withastro/action) and publishes `dist/`
via GitHub Pages (Actions-based deployment — no manual build/upload step needed).

Site is served as a GitHub Pages *project* site, so `astro.config.mjs` sets
`base: '/SalvatoreG.github.io'` accordingly.
