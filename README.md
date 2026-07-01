# Jinxin Zhao Homepage

This is a small static academic homepage designed for GitHub Pages. It has no npm dependencies: the content lives in `src/site-data.json`, the generated website lives in `docs/`, and `scripts/build-site.mjs` turns the content file into HTML.

## Update Content

1. Edit `src/site-data.json`.
2. Run `node scripts/build-site.mjs`.
3. Preview locally with `python3 -m http.server 4173 --directory docs`.
4. Commit and push the repository.

If you have npm or pnpm installed, `npm run build` or `pnpm run build` will run the same builder.

## GitHub Pages Setup

For the existing `JinxinMonash/jinxinzhao.github.io` repository:

1. Push these files to GitHub.
2. In GitHub, open **Settings -> Pages**.
3. Easiest maintenance: set **Source** to "GitHub Actions". The included workflow builds from `src/site-data.json` and deploys `docs/`.
4. Simple fallback: set **Source** to "Deploy from a branch", branch `main`, folder `/docs`.
5. Keep `docs/CNAME` if you want `home.jinxinzhao.org`.

For the custom domain, the DNS for `home.jinxinzhao.org` should point to GitHub Pages with a CNAME record targeting `JinxinMonash.github.io`. GitHub can then issue the HTTPS certificate from **Settings -> Pages**.

## Files

- `src/site-data.json`: editable site content.
- `scripts/build-site.mjs`: no-dependency static site builder.
- `docs/index.html`: generated homepage.
- `docs/assets/site.css`: website styling.
- `docs/assets/hero-systems-pharmacology.png`: generated biomedical hero asset.
- `docs/assets/jinxin-zhao-cv.pdf`: downloadable CV.
