# Jackson Carter — Premium Portfolio

A modern, futuristic, fully responsive personal portfolio for a Creative Designer,
Graphic Designer, Software Developer & Freelancer. Built like a high-end design
agency site with the engineering polish of a developer portfolio.

## ✨ Features

- **Dark mode by default** + light/dark toggle (persisted, no FOUC)
- **Glassmorphism** UI, animated gradient borders, custom scrollbar
- **Framer Motion** scroll-triggered & staggered animations, smooth scrolling
- **Dynamic typing** rotating titles in the hero
- **Animated stat counters**, animated skill bars
- **Particle canvas background** (pure canvas, DPR-aware, reduced-motion safe)
- **Custom cursor** (desktop fine-pointer only)
- **Loading screen**, scroll progress bar, back-to-top
- **Portfolio** with category filtering + project detail modal/lightbox
- **Vertical experience timeline**, auto-rotating **testimonials** carousel
- **Blog cards** (CMS-ready), **contact form** with states + map placeholder
- **SEO**: metadata, OpenGraph, Twitter cards, JSON-LD, sitemap, robots
- **PWA**: web manifest + theme color
- **Accessibility**: semantic landmarks, focus rings, ARIA labels, `prefers-reduced-motion`
- **Mobile-first** responsive across all breakpoints

## 🧱 Tech Stack

- [Next.js 15](https://nextjs.org) (App Router) + React 19
- TypeScript
- Tailwind CSS 3 (+ `tailwindcss-animate`)
- Framer Motion
- Lucide Icons
- ShadCN-style UI primitives (`Button`, `Card`, `Badge`) with `cva` + `tailwind-merge`

## 🚀 Getting Started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve production build
```

## 🛠️ Editing content from the UI (no code)

Go to **`/admin`** to manage every section from the browser — no code editing.

1. Visit `http://localhost:3000/admin`
2. Log in with your password (env var `ADMIN_PASSWORD`, default `admin` for local dev)
3. Edit any section (General, Navigation, Social, Hero, About, Services, Skills,
   Portfolio, Experience, Testimonials, Blog) — add/remove/reorder items
4. Click **Save**, then refresh the homepage

**Images:** every image field (hero, about, project, blog, testimonial photos)
supports **drag-and-drop / click-to-upload** as well as pasting a URL. Uploaded
files are saved to `public/uploads/` via the protected `POST /api/upload`
endpoint (JPG/PNG/WEBP/GIF/SVG, max 8 MB).

How it works:

- Edits are saved to **`content/site-content.json`** via `PUT /api/content`
  (password-protected). The homepage reads this file at request time, so changes
  appear after a refresh — no rebuild required.
- If that file doesn't exist yet, the site falls back to the defaults in `lib/data.ts`.
- **Set a real password** before deploying: copy `.env.example` → `.env.local`
  and change `ADMIN_PASSWORD`.
- **Storage is automatic per environment:** locally, content saves to
  `content/site-content.json` and uploads to `public/uploads/`. On Vercel (where
  the filesystem is read-only) both content and uploads are stored in **Vercel
  Blob** — no code changes needed, it switches based on `BLOB_READ_WRITE_TOKEN`.
  See **Deploy to Vercel** below.

## 🚀 Deploy to Vercel

The site uses server features (the admin API + uploads), so deploy to a host
that runs Next.js. Vercel is the easiest and has a free tier.

**1. Push to GitHub**

```bash
git init
git add -A
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/<you>/<repo>.git
git push -u origin main
```

**2. Import into Vercel**

- Go to [vercel.com/new](https://vercel.com/new) and import the repo.
- Framework preset auto-detects **Next.js** — keep the defaults and deploy.

**3. Add a Blob store (enables the admin to save in production)**

- In your Vercel project → **Storage** → **Create Database** → **Blob**.
- Connecting it automatically adds the `BLOB_READ_WRITE_TOKEN` env var.
- Content and uploaded images now persist to Blob automatically.

**4. Set your admin password**

- Project → **Settings** → **Environment Variables** → add
  `ADMIN_PASSWORD` = *your-strong-password*.
- **Redeploy** so the new env vars take effect.

**5. Done**

- Public site is live at your Vercel URL.
- Manage content at `https://your-site.vercel.app/admin` — edits and image
  uploads save to Blob and persist across deploys.
- The content committed in `content/site-content.json` is the initial seed shown
  until your first save in production.

> Without a Blob store, the public site still renders fine, but admin saves and
> uploads will fail (read-only serverless filesystem). The Blob store is what
> makes the production admin writable.

## 🎨 Customization (in code)

The default/seed content lives in **`lib/data.ts`** (`defaultContent`):

- `siteConfig` — name, role, email, phone, location, availability, URL
- `navLinks`, `socials`, `heroTitles`
- `stats`, `bio`, `services`, `skillGroups`
- `projects`, `experience`, `testimonials`, `blogPosts`

Available icon names for services/socials are defined in `lib/icons.tsx`.
The color palette is defined in `tailwind.config.ts` and CSS variables in
`app/globals.css`.

| Token        | Value     |
| ------------ | --------- |
| Primary      | `#00E5FF` |
| Secondary    | `#7C3AED` |
| Accent       | `#FF4D6D` |
| Background   | `#0A0A0A` |
| Cards        | `#111111` |

## 📁 Structure

```
app/
  layout.tsx        # fonts, SEO metadata (reads content), theme script, providers
  page.tsx          # reads content + section composition + JSON-LD
  globals.css       # theme tokens, glassmorphism, utilities
  manifest.ts / robots.ts / sitemap.ts
  admin/page.tsx    # content manager UI (password-gated)
  api/content/      # GET/PUT site content (PUT requires password)
  api/admin/login/  # password verification
components/
  global/           # navbar, footer, particles, loading, scroll, back-to-top
  sections/         # hero, about, services, skills, portfolio, ...
  ui/               # button, card, badge, section-heading
  admin/            # reusable editor fields (TextField, ArrayEditor, ...)
  animations/       # reveal + stagger helpers
  providers/        # theme provider + content provider
  hooks/            # typing effect
lib/
  data.ts           # content schema + default (seed) content
  content-store.ts  # read/write content/site-content.json (server only)
  icons.tsx         # string-name → Lucide icon registry
  utils.ts          # cn() helper
content/
  site-content.json # created on first save from the admin UI
```

## 🔌 Production notes

- **Contact form**: `components/sections/contact.tsx` currently simulates a submit.
  Wire it to an API route (`app/api/contact/route.ts`) or a service like Resend/Formspree.
- **Google Maps**: replace the placeholder in the contact section with an `<iframe>` embed.
- **Images**: any `https` image URL works (configured in `next.config.mjs`), so
  you can paste image links straight into the admin UI. For best performance,
  host your own assets in `public/`.
- **Blog**: cards are static and structured for easy CMS integration.
