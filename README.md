# Bivlios corporate site

A small, fast, static, responsive one-page website for **Bivlios Ltd.**, the company behind **Books Giant** and **BooksTube**. Optimized for corporate introductions, partnerships and international inquiries.

## Content

- Copy is written in Hebrew first and translated to English. All texts live in `script.js` (`copy.en` / `copy.he`); the English text is also in `index.html` as the initial render.
- Hero: "We love books." Books Giant (create) is shown with Zoe (`assets/zoe-write.jpg`), BooksTube (read & listen) with Kai (`assets/key-read.jpg`).
- Contact buttons link to the Books Giant contact page (`/en/contact` or `/he/contact` by language); the displayed email is `info@booksgiant.com`.
- Hero image: Kai with a magic wand (`assets/kai-wand.webp`, transparent background).
- Vercel Web Analytics is loaded from `/_vercel/insights/script.js` (enable it in the Vercel project's Analytics tab).

## Files

- `index.html` — structure, SEO metadata, initial English text
- `styles.css` — design, responsive layout, RTL
- `script.js` — EN/HE copy, language toggle, language-specific links
- `assets/` — logos (`logo-white.png`, `booksgiant-logo.png`, `bookstube-logo.png`), Zoe & Kai images, fallback illustrations
- `favicon.png`, `apple-touch-icon.png`, `social-preview.png` — icons and share image
- `robots.txt`, `sitemap.xml`, `vercel.json`, `.vercelignore` — deployment / indexing

## Deploy

The GitHub repo is connected to Vercel (framework "Other", no build command). Every push to `main` goes live; other branches get preview URLs. Roll back from Vercel → Deployments → Promote to Production.

Preview locally: `python3 -m http.server 8000`, then open http://localhost:8000.

## Content and contact

Based on the live public pages at:
- https://bivlios.com/
- https://www.booksgiant.com/en
- https://www.booksgiant.com/he/private
- https://bookstube.ai/en
- https://www.booksgiant.com/en/terms

Contact buttons link to the Books Giant contact page (EN/HE by language); the displayed email is `info@booksgiant.com`. Public product links and address should be double checked right before launch.

## Updating copy or colors

- Color tokens are at the top of `styles.css` (start with `--purple`, `--royal`, `--yellow`, `--pink`).
- Content translations live in `script.js` in the `copy.en` and `copy.he` objects. The English fallback content is also present in `index.html` for SEO and no-JavaScript accessibility.
- Product cards, illustrations and footer text can be edited directly in `index.html`.
