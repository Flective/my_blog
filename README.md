# My Blog — Astro + Keystatic + Vercel

A clean, literary blog built with Astro, Keystatic CMS, and deployed on Vercel. Three content types: Posts, Essays (with auto table-of-contents), and Projects.

---

## Stack

| Layer     | Tool             | Why                                              |
|-----------|------------------|--------------------------------------------------|
| Framework | Astro 4          | Fast, content-native, MDX support                |
| CMS       | Keystatic        | File-based, Git-native, beautiful `/keystatic` UI |
| Styling   | Plain CSS        | Zero dependencies, full control                  |
| Hosting   | Vercel           | Free tier, auto-deploys on Git push              |
| Content   | MDX files        | In `src/content/` — yours forever               |

---

## Local Development (Day 1)

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev
```

Open `http://localhost:4321` — site is live.  
Open `http://localhost:4321/keystatic` — CMS admin is live.

---

## Personalize First

Before deploying, do a find-replace across the project for these placeholders:

| Placeholder         | Replace with              | Files                                    |
|---------------------|---------------------------|------------------------------------------|
| `Your Name`         | Your actual name          | `Header.astro`, `Footer.astro`, `BaseLayout.astro`, `index.astro` |
| `you@example.com`   | Your email                | `about.astro`                            |
| `Y` (favicon text)  | Your initial              | `public/favicon.svg`                     |

Also update the hero text in `src/pages/index.astro` and the bio in `src/pages/about.astro`.

---

## Deploying to Vercel

### Step 1 — Push to GitHub

```bash
git init
git add .
git commit -m "initial commit"
# Create a new repo on github.com, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2 — Connect to Vercel

1. Go to [vercel.com](https://vercel.com) → **Add New Project**
2. Import your GitHub repo
3. Framework preset: **Astro** (auto-detected)
4. Click **Deploy** — done

Your site is live at `your-project.vercel.app`.

---

## Writing Content

### In the CMS (recommended)

Visit `/keystatic` on your local dev server. From there you can:
- Create / edit **Posts**, **Essays**, or **Projects**
- Upload images (stored in `public/images/`)
- Write in Markdown with live preview
- Save → file appears in `src/content/` → Git commit → auto-deploy

### By hand (for power users)

Drop an `.mdx` file directly into `src/content/posts/`, `src/content/essays/`, or `src/content/projects/` with the correct frontmatter:

**Posts:**
```mdx
---
title: My Post Title
date: 2025-03-01
excerpt: One sentence summary.
tags:
  - tag-one
  - tag-two
---

Your content here...
```

**Essays** (same, plus optional `subtitle` field; use `##` headings for auto-TOC):
```mdx
---
title: My Essay Title
subtitle: An optional subheading
date: 2025-03-01
excerpt: One sentence summary.
tags:
  - cognition
---

## First Section

Content...

## Second Section

More content...
```

**Projects** (adds `status` field):
```mdx
---
title: My Project
date: 2025-03-01
status: active   # active | completed | concept
excerpt: What it is.
tags:
  - music
---

Content...
```

---

## Production CMS (Optional)

By default, Keystatic runs in **local** mode — great for dev, but the `/keystatic` admin won't work on the deployed Vercel URL.

To enable the CMS on your live site (so you can write from anywhere):

1. **Set up GitHub OAuth App**  
   Go to GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App  
   - Homepage URL: `https://your-project.vercel.app`  
   - Callback URL: `https://your-project.vercel.app/api/keystatic/github/oauth/callback`

2. **Add environment variables to Vercel**  
   In Vercel project settings → Environment Variables:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=your_client_id
   KEYSTATIC_GITHUB_CLIENT_SECRET=your_client_secret
   KEYSTATIC_SECRET=any_random_32_char_string
   ```

3. **Update `keystatic.config.ts`** — change `kind: 'local'` to:
   ```ts
   storage: {
     kind: 'github',
     repo: 'YOUR_USERNAME/YOUR_REPO',
   },
   ```

4. Redeploy. Now `/keystatic` on your live site lets you write and publish — commits go straight to your GitHub repo.

---

## Custom Domain (Free on Vercel)

1. Buy a domain anywhere (Namecheap, Cloudflare Registrar are cheap)
2. Vercel project → Settings → Domains → Add
3. Follow DNS instructions (usually just add a CNAME record)
4. SSL is automatic

---

## Project Structure

```
src/
├── components/
│   ├── Card.astro          # Reusable content card
│   ├── Header.astro        # Sticky nav header
│   └── Footer.astro        # Site footer
├── content/
│   ├── config.ts           # Collection schemas
│   ├── posts/              # Short posts (.mdx)
│   ├── essays/             # Long essays (.mdx)
│   └── projects/           # Project entries (.mdx)
├── layouts/
│   └── BaseLayout.astro    # HTML shell, SEO meta
├── pages/
│   ├── index.astro         # Homepage
│   ├── about.astro         # About page
│   ├── posts/
│   │   ├── index.astro     # Posts listing
│   │   └── [slug].astro    # Individual post
│   ├── essays/
│   │   ├── index.astro     # Essays listing
│   │   └── [slug].astro    # Individual essay (+ TOC)
│   ├── projects/
│   │   ├── index.astro     # Projects listing
│   │   └── [slug].astro    # Individual project
│   └── api/keystatic/      # CMS API routes
└── styles/
    └── global.css          # Full design system
```

---

## Customizing the Design

All design tokens are CSS variables at the top of `src/styles/global.css`:

```css
:root {
  --bg:           #FAF8F3;   /* page background */
  --accent:       #8B5E3C;   /* links, hover states */
  --font-display: 'Cormorant Garamond', serif;  /* headings */
  --font-body:    'Lora', serif;                /* body text */
  /* etc. */
}
```

Change `--accent` to shift the color throughout. Change fonts by updating the Google Fonts import at the top of `global.css` and the `--font-*` variables.

---

## Commands

| Command         | Action                          |
|-----------------|---------------------------------|
| `npm run dev`   | Start local dev server          |
| `npm run build` | Build for production            |
| `npm run preview` | Preview production build locally |
