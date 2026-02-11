# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development - runs Astro dev server (port 4321)
npm run dev

# Build static site for production
npm run build

# Preview production build locally
npm run preview

# Sanity Studio (CMS) - runs on port 3333
npm run sanity:dev

# Deploy Sanity Studio to Sanity's hosting
npm run sanity:deploy
```

No test runner or linter is configured.

## Architecture

Astro-based static blog (SSG) with Sanity CMS as the headless content backend. All pages are pre-rendered at build time. React is used only for `PortableText.tsx` (rich text rendering); everything else is Astro components with vanilla JS for interactivity.

### Tech Stack
- **Astro 5** with `output: 'static'` — full SSG, no server runtime
- **Sanity v5** — headless CMS with GROQ queries
- **Tailwind CSS v4** — configured via CSS `@theme` directive in `src/styles/global.css` (no `tailwind.config.js`)
- **React 19** — only for `@portabletext/react` component
- **TypeScript** — strict mode via `astro/tsconfigs/strict`

### Data Flow

1. Sanity CMS stores content (posts, authors, categories with references between them)
2. `src/lib/sanity.ts` contains the Sanity client and all query functions (`getPosts`, `getPost`, `getCategories`, `getPostsByCategory`, etc.)
3. Dynamic routes (`blog/[slug].astro`, `categories/[slug].astro`) use `getStaticPaths()` to fetch all slugs at build time
4. `urlFor(source)` helper transforms Sanity image references to optimized CDN URLs — always chain `.width().height().url()`
5. Rich text bodies use `PortableText.tsx` React component with custom serializers for headings, links, images, and code blocks

### Key Files

- **`src/lib/sanity.ts`** — Sanity client setup + 7 query functions. Uses `PUBLIC_SANITY_*` env vars. CDN enabled in production, disabled in dev.
- **`src/lib/utils.ts`** — `cn()` (clsx + tailwind-merge for class merging), `formatDate()`, `calculateReadingTime()`
- **`src/layouts/Layout.astro`** — Master layout with full SEO: meta tags, Open Graph, Twitter cards, JSON-LD structured data (BlogPosting or WebSite schema). Props: `title` (required), `description`, `ogImage`, `canonicalUrl`, `type`, `publishedTime`, `author`
- **`src/sanity/schemas/`** — Three schemas: `post` (with SEO object, Portable Text body, code blocks), `author` (with social links), `category` (with unused `color` field for Tailwind class)
- **`src/styles/global.css`** — Tailwind v4 theme config (Inter font, blue primary palette, CSS variables for colors), global base styles, and `.prose` styles for blog content rendering

### Conventions

- **Astro components** (`.astro`) for all structure/layout; **React** (`.tsx`) only when `@portabletext/react` is needed
- **Conditional classes**: use `class:list` in Astro, `cn()` from utils for Tailwind class conflicts
- **Image sizes**: featured images 1200x675, thumbnails 600x400, avatars 32-80px — always include `loading="lazy"`
- **GROQ queries**: parameterized with `{ slug }` second argument (never string interpolation)
- **Pages**: static pages at root (`about.astro`, `contact.astro`, `404.astro`), dynamic content under `blog/` and `categories/`

### Gotchas

- **`site` in `astro.config.mjs`** and sitemap URL in `public/robots.txt` are placeholders — must be updated before deploying
- **Contact form** (`contact.astro`) has no backend — form submission is not wired up
- **Sanity project ID** is hardcoded in `sanity.config.ts` and `sanity.cli.ts` separately from the `PUBLIC_SANITY_PROJECT_ID` env var — keep them in sync
- **`calculateReadingTime()`** in `utils.ts` exists but is not used anywhere yet

### Environment Variables

Copy `.env.example` to `.env` and fill in values:
```
PUBLIC_SANITY_PROJECT_ID=your-project-id
PUBLIC_SANITY_DATASET=production
```

The `PUBLIC_` prefix exposes these to client-side code (appropriate since Sanity APIs are public read-only).

### Sanity Content Model

- **Post** → references **Author** (many-to-one) and **Categories** (many-to-many)
- Post `body` is Portable Text supporting: h2-h4, blockquotes, bold/italic/code marks, links, images with captions, and syntax-highlighted code blocks (JS, TS, HTML, CSS, Python, Bash, JSON)
- Post has optional `seo` object (metaTitle max 60 chars, metaDescription max 160 chars, ogImage 1200x630)
