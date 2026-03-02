# SOFIN (Uzbekistan) — Next.js Storytelling Site

## Install / Run (VS Code)
```bash
pnpm i
pnpm dev
```

Build:
```bash
pnpm build
pnpm start
```

## Where to edit content

### i18n messages
- `src/messages/uz.json` (default)
- `src/messages/ru.json`
- `src/messages/en.json`

### Recipes (MDX)
Add files here:
- `src/content/recipes/{locale}/*.mdx`

Frontmatter fields:
- slug, title, excerpt, coverImage, tags[], publishedAt

### Products (JSON)
- `src/content/products/{locale}.json`

### Design tokens (colors, blur, radius)
- `src/styles/globals.css`
Look for `:root { --accent ... }`

## Where to put logo / icons / images

### Brand logo
- Replace: `public/brand/logo.jpg`

### OG image
- Replace: `public/og/sofin-og.png`

### Background image for footer
- Replace: `public/media/footer-bg.svg` (can be .jpg/.png; update `Footer.tsx` background path)

### Any other media
- Put files in `public/media/` and reference as `/media/your-file.ext`

## Add new pages
Create route:
- `src/app/[locale]/(site)/your-page/page.tsx`
Add link in:
- `src/app/[locale]/(site)/layout.tsx` nav array

## Deploy (Vercel)
1) Push repo to GitHub
2) Import in Vercel
3) Set env vars (optional):
   - `NEXT_PUBLIC_SITE_URL=https://sofin.uz`
4) Deploy
