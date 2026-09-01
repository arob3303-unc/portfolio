# CLAUDE.md

Context for AI agents working in this repo. Read this first.

## What this is

Austin Robinson's personal **portfolio website** — the thing he sends to employers and
recruiters. Every change should be judged by one question: *does this make a hiring
engineer more likely to take him seriously?*

- **Owner:** Austin Robinson (GitHub [`arob3303-unc`](https://github.com/arob3303-unc))
- **Repo:** https://github.com/arob3303-unc/portfolio
- **Background:** Economics + Computer Science student at UNC Chapel Hill
- **Deployed via:** Vercel

## Stack

| | |
|---|---|
| Framework | Next.js 15 (App Router), `next dev --turbopack` |
| UI | React 19 |
| Language | TypeScript 5 (`strict: true`) |
| Styling | Tailwind 3.4 **+ a large hand-written `globals.css`** |
| Dialogs | sweetalert2 (contact-form success toast) |
| Path alias | `@/*` → `./src/*` |

```bash
npm run dev     # local dev on :3000
npm run build   # production build — run before declaring work done
npm run lint    # eslint (next/core-web-vitals)
```

## Layout of the code

The whole site is currently **one page**, not multiple routes:

```
src/app/
  layout.tsx              root layout: <header>, <main>, <footer> w/ GitHub + LinkedIn links
  page.tsx                "use client" — the entire site: nav, About, Projects, Contact sections
  globals.css             ~535 lines of hand-written CSS — the real styling authority
  Components/
    Modal.tsx             ~361 lines. All 9 projects, hard-coded as JSX inside onClick handlers
    Contact.tsx           contact form → web3forms API → sweetalert2 confirmation
```

Nav links are in-page anchors (`#about`, `#projects`, `#contact-sec`), not routes.

### Known pain points

- **`Modal.tsx` hard-codes every project as inline JSX** inside `openModal()` calls. There is
  no data model. Adding or editing a project means editing deeply nested markup. This should
  become a typed `projects.ts` data array rendered by a generic card/modal component.
- **`globals.css` and Tailwind fight each other.** Most real styling lives in `globals.css`;
  Tailwind is barely used. Pick one — the redesign standardizes on Tailwind + CSS variables.
- `page.tsx` is `"use client"` in its entirety, so nothing server-renders.
- `Modal.tsx` uses the deprecated `layout="intrinsic"` prop on `next/image`.
- The web3forms access key is committed in `Contact.tsx`. It's a public-by-design key, so this
  is not a leak, but don't add other secrets next to it.

## Design direction (the in-progress redesign)

Austin is rehauling the visual design. A wireframe lives at `d:\Games\wireframefor_website.png`.

**Color system — all-black, high contrast:**

- Background: black
- Cards / panels / text: grey → white
- **Hover accent: Tar Heel blue `#4B9CD3`** — UNC's color, chosen deliberately because he
  goes there. Cards take this background on hover.

This *replaces* the old navy `#2C3E50` / `#1a2631` palette and the purple `#826a82` accent.
If you see those hex values, they are legacy and should be migrated.

**Layout — bento grid.** Per the wireframe, the home page is an asymmetric grid of cards:
who-am-i / bio (wide), photo of Austin (tall), student-career blurb, name + GitHub link,
image caption, a tall technologies-I-use list, and a wide education/career timeline.

**Signature animation:** on page load, the outer cards **fly inward** from off-screen to
their grid positions. This is the design's centerpiece, not a decoration — keep it. Respect
`prefers-reduced-motion` and make sure the grid is fully readable if animation is skipped.

**Nav:** Home · Projects · Contact, centered at the top.

## Projects page philosophy

Deliberate curation beats a chronological dump. The agreed approach:

- **4–6 featured projects**, each with real depth: the problem, Austin's specific role, tech
  choices *and the reasoning behind them*, a genuinely hard thing he hit, and the outcome.
- **Recency-weighted but not strictly chronological.** Older work earns a slot only if it's
  among his most impressive or shows range.
- **Cut anything whose repo would embarrass him.** A tutorial-shaped project actively hurts
  next to a strong recent one.
- **An archive strip** at the bottom: titles, one line each, repo links — volume without dilution.

The nine projects currently in `Modal.tsx` are the raw pool to curate from: HayBale Game,
Discord Bot, 2D Game, News Scraper, Stock Market Algorithm, Drone Website, 1v1 PyGame,
Python Autoclicker, Portfolio Website.

## Assets in `public/`

- **Photos of Austin:** `IMG_9363.jpg` (currently used), `me.jpg`, `me.jpeg`
- **Resume:** `resume_may_done (2).pdf` — note the spaces and parens in the filename; URL-encode
  or rename it if you touch the download link
- **Social:** `Github.png`, `ln-pic.png`
- **Tech logos:** `Python.png`, `React.png`, `Next.js.png`, `TypeScript.png`, `JavaScript.png`,
  `Java.png`, `HTML5.png`, `CSS3.png`, `PyTorch.png`, `ML.png`, `CNN.png`, `Kaggle.png`,
  `OpenAPI.png`, `post.png` (PostgreSQL), `Vercel.png`, `pygame.png`
- **Project screenshots:** `project1.png`, `bot.png`, `2Dgame.png`, `news.png`, `algo.png`,
  `drone.png`, `pygamee.jpg`, `auto.png`, `website.png`, `phaser.jpg`, `ai.webp`

## Working conventions

- Run `npm run build` before calling a change done — a passing dev server is not proof.
- Don't commit or push unless Austin asks.
- This is a public repo an employer may read. Keep code and comments professional.
- **Keep this file current.** When the structure, palette, or project list changes, update
  the relevant section here in the same pass so the next session isn't working from a stale map.
