# RideScore DC Hackathon 2026

Website for the RideScore DC hackathon, built with [VitePress](https://vitepress.dev) and deployed to GitHub Pages.

```sh
npm install
npm run dev      # local dev server
npm run build    # production build -> docs/.vitepress/dist
```

Pushes to `main` deploy automatically via `.github/workflows/deploy.yml`.
One-time setup: in the repo, go to **Settings → Pages → Source** and select **GitHub Actions**.

Content lives in `docs/`. The landing page is `docs/index.md`; add more pages as Markdown files and link them in `docs/.vitepress/config.mts`.

## Authoring notes

- In fenced code blocks, write `<<text>>` for a value the reader must replace with their own. The markers are removed and the text is shown in red (see `docs/.vitepress/placeholders.ts`).
