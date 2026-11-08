# hasan-portfolio

Personal cybersecurity portfolio of **Hasan (@hasan8babiker)**: CTF writeups, security articles and the projects I build while training toward a cybersecurity engineer role.

**Live site:** https://hasan8babiker.github.io/hasan-portfolio

---

## About

I'm a self-taught cybersecurity learner focused on offensive security (CTFs and pentesting) and building a public body of work. I learn through TryHackMe, picoCTF and personal Python projects, and I document what I learn here.

## What's on the site

- **Writeups:** TryHackMe rooms and CTF challenges, with commands, reasoning and takeaways
- **Articles:** notes and explainers on security topics I'm studying
- **Projects:** tools I've built, mostly in Python and Bash

## Tech Stack

| Area | Tools |
|---|---|
| Framework | React (SPA) with Vite |
| Routing | react-router-dom |
| UI | shadcn/ui |
| SEO | react-helmet-async (Open Graph, Twitter cards, JSON-LD), sitemap.xml |
| Hosting | GitHub Pages |

**Design:** terminal-inspired theme with a dark background (`#0A0D12`), mint green accents (`#39D98A`), an amber cursor (`#F5A623`) and monospace typography.

## Project Structure

```
hasan-portfolio/
├── public/              # static assets, sitemap.xml
├── src/
│   ├── components/      # shared UI components
│   ├── pages/           # Articles, ArticleDetail, Writeups, WriteupDetail, ...
│   ├── data/            # articles.json, writeups.json
│   └── main.tsx
├── index.html
└── vite.config.ts
```

Adjust the folder names to match your repo if they differ.

## Adding Content

Writeups and articles live in JSON files. Add a new entry and the site renders it automatically.

```json
{
  "slug": "nmap-basic-port-scans",
  "title": "Nmap Basic Port Scans",
  "platform": "TryHackMe",
  "difficulty": "Easy",
  "tags": ["nmap", "networking", "port-scanning"],
  "content": "Short summary or full markdown of the writeup."
}
```

| Field | Description |
|---|---|
| `slug` | URL-safe ID used in the route (`/writeups/<slug>`) |
| `title` | Display title |
| `platform` | TryHackMe, picoCTF, etc. |
| `difficulty` | Easy, Medium or Hard |
| `tags` | List of topic tags |
| `content` | Writeup or article body |

## Run Locally

```bash
git clone https://github.com/hasan8babiker/hasan-portfolio.git
cd hasan-portfolio
npm install
npm run dev
```

Build for production:

```bash
npm run build
npm run preview
```

## Deploy

The site is hosted on GitHub Pages. Build the project and publish the `dist/` folder, either with a GitHub Actions workflow or a deploy script (such as `gh-pages`). Set `base` in `vite.config.ts` to `/hasan-portfolio/` so assets and routes resolve under the repo path.

## Roadmap

- [x] Writeups and articles pages with detail views
- [x] SEO metadata and sitemap
- [ ] More TryHackMe and picoCTF writeups
- [ ] Projects page (port scanner, banner grabber, CTF decoder)
- [ ] Certification progress (Security+, eJPT, PNPT)

## Contact

- GitHub: [@hasan8babiker](https://github.com/hasan8babiker)
- Portfolio: https://hasan8babiker.github.io/hasan-portfolio

---

*Happy Hunting.*