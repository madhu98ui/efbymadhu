# Frame — Photography Website

A minimal, elegant photography portfolio built with React, TypeScript, and Vite.

## Features

- **Hero** — Full-viewport hero with subtle zoom on hover
- **Gallery** — Responsive grid; click any image to open the lightbox
- **Lightbox** — Full-screen viewer with previous/next and keyboard (←/→, Esc)
- **About** — Short intro section
- **Footer** — Contact and social links

## Run locally

```bash
cd photography-website
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

## Customize

- **Photos** — Edit `src/data/photos.ts` to add or replace images (use your own URLs or paths).
- **Copy & links** — Update `src/components/Header.tsx`, `Footer.tsx`, and `About.tsx` with your name, email, and social links.
- **Styling** — Colors and fonts are in `src/index.css` (`:root`). Hero background is set in `src/components/Hero.tsx`.

Images in the sample data use Unsplash. Replace with your own assets for production.
