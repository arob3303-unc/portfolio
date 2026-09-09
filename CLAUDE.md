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

Three routes, all server components except where noted:

```
src/app/
  layout.tsx              root layout: <Nav>, <main>, <Footer> w/ GitHub + LinkedIn links
  page.tsx                home — the bento grid of Tiles
  projects/page.tsx       projects route
  contact/page.tsx        contact route
  globals.css             Tailwind layers, the tile fly-in keyframes, `.cover-grid`
  data/projects.ts        typed TECH map + the `projects` array (the data model)
  Components/
    Tile.tsx              the bento card: fly-in direction/delay, hover-to-Carolina
    ProjectsExplorer.tsx  "use client" — owns the /projects filter state
    TechFilter.tsx        the stadium filter pill; AND logic, multi-select
    ProminentProjects.tsx the 4 featured projects as a 2x2 of big cover-art tiles
                          (never filtered) — cover screenshot behind the title
    AllProjectsGrid.tsx   the square grid + spliced full-width detail panel
    ProjectDetail.tsx     shared expanded-panel body + TechChips / TechLogos,
                          plus Chevron and ProjectPanel (used by both sections)
    useColumnCount.ts     live grid column count; takes a breakpoint ladder —
                          GRID_COLS (1/2/3) for All Projects, TWO_COLS for the 2x2
    PhotoLightbox.tsx     "use client" — full-screen photo viewer. Click the photo to
                          zoom in on that point, click again to zoom out, drag to pan
                          while zoomed. Esc / ✕ / backdrop close it.
    Nav.tsx               Home · Projects · Contact
    Footer.tsx            GitHub + LinkedIn
    Contact.tsx           contact form → web3forms API → sweetalert2 confirmation
```

Nav links are real routes now, not in-page anchors.

### Known pain points

- ~~`npm run build` fails on Windows with `PageNotFoundError: /_document`~~ — **no longer
  reproduces** (verified 2026-09-05, full static export succeeds). If it comes back, delete
  `.next/` first; that was most likely a stale build cache. `npm run build` is the gate again.
- `IMG_4026.png` (the GitHub avatar) is 8.8 MB for a ~150px circle. `next/image` shrinks it on
  delivery, so visitors are fine, but it bloats the repo. Downscale it when convenient.
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
who-am-i / bio (wide), a tall photo (currently the aerial "find me" drone shot), a
student-career blurb, name + circular GitHub avatar, the photo's caption ("Quiz time!"),
a tall grouped technologies list, and a wide education/career timeline.

**Signature animation:** on page load, the outer cards **fly inward** from off-screen to
their grid positions. This is the design's centerpiece, not a decoration — keep it. Respect
`prefers-reduced-motion` and make sure the grid is fully readable if animation is skipped.

**Nav:** Home · Projects · Contact, centered at the top.

## Projects page philosophy

Deliberate curation beats a chronological dump. The page is built and the structure is
fixed; what remains is Austin filling in content.

**Structure** (per the wireframe at `d:\Games\project-part.png`):

1. A stadium **filter pill** of tech chips. Multi-select, **AND** logic — a project must
   carry every checked chip. Nothing checked shows everything. It filters **All Projects
   only**; Prominent is never filtered — the filter sits inside the All Projects section,
   next to what it acts on.
2. **Prominent Projects** — the 4 entries flagged `featured: true`, as a **2x2 of large
   cover-art tiles**: the project's `cover` screenshot full-bleed behind the title, under a
   `bg-gradient-to-t from-black/95` scrim so the title stays readable on light artwork
   (the Vechter cover is near-white — it sets the floor for how strong that scrim has to
   be). The grid is capped at `max-w-[880px]` and centred, tiles are `aspect-[4/3]`
   (~425x320), and hover shows a Tar Heel blue inset ring only — no fill, no zoom, because
   a blue wash over a screenshot reads as a broken image. A featured project with no
   `cover` gets the `.cover-grid` texture from `globals.css` instead.
3. **All Projects** — every project as a square, 1/2/3 columns, capped at 3 across.
   Deliberately kept plain: the contrast with the 2x2 above is what marks the good ones.

Clicking any card **expands it inline** — no modal. One card open per section.

**The data model is the thing to edit.** `src/app/data/projects.ts` is a single
`projects` array of 12 live entries (plus 6 commented-out placeholders). The four
`featured: true` entries lead the page *and* appear in the grid — one entry, both places,
no duplication. **Array order is tile order** in the 2x2, so reorder the entries to
rearrange it. `cover` is the tile background and is separate from `image`, which is the
screenshot inside the expanded panel. `featuredProjects` and `FILTER_TECH`
are both derived at the bottom of that file, so adding a project with a new tech puts a
new chip in the filter bar automatically. Chip *order* comes from the `TECH` declaration
order; reorder that object to reorder the bar.

Content still owed before deploying:

- **Extro** has a live `site`
  (https://financial-dashboard-gilt-delta.vercel.app/black-swan) but still no `problem` /
  `role` / `challenge` / `outcome` and no `repo`, so its panel is bullets + tech chips +
  one link — thin for a tile flagged as one of the best four.
- **Anti-cheat** has its four write-up fields commented out, and no cover art.
- `public/learnwithai-cover.png` is only 524x300; it upscales in a ~425px tile.
  Re-export at >=900px wide.

**Two invariants worth not breaking:**

- **Key cards by `slug`, never by index.** `.tile-animate` is a mount-triggered CSS
  animation, so index keys re-animate every surviving card on each filter toggle.
- **The expanded panel is a separate `col-span-full` grid child**, spliced in at the end
  of the expanded card's row (hence `useColumnCount`) — **both** sections do this, each
  against its own breakpoint ladder. Making the *card* `col-span-full` instead pushes it
  to the next row and leaves dead cells behind it. The children must
  also be one flat array — sliced sibling expressions are separate child slots, and a
  card crossing a slot boundary remounts and re-fires its fly-in.

## Assets in `public/`

- **Photos of Austin:** `IMG_4026.png` (circular GitHub avatar in the name tile),
  `IMG_4025.png` (graduation photo, currently unused), `IMG_9363.jpg` (legacy)
- **Drone photo:** `find-me.jpg` — 3840×2160 aerial shot in the tall photo tile; the
  "Quiz time!" card asks visitors to spot Austin in it, so it needs its full resolution
- **Resume:** `resume.pdf`
- **Prominent cover art:** `extro-cover.png` (1221x1000), `vechter-cover.png` (1194x572,
  light/cream), `learnwithai-cover.png` (524x300 — too small, needs re-export)
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
