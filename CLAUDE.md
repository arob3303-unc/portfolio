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
  globals.css             ~83 lines: Tailwind layers + the tile fly-in keyframes
  data/projects.ts        typed TECH map + the `projects` array (the data model)
  Components/
    Tile.tsx              the bento card: fly-in direction/delay, hover-to-Carolina
    ProjectsExplorer.tsx  "use client" — owns the /projects filter state
    TechFilter.tsx        the stadium filter pill; AND logic, multi-select
    ProminentProjects.tsx the 3 featured accordion rows (never filtered)
    AllProjectsGrid.tsx   the square grid + spliced full-width detail panel
    ProjectDetail.tsx     shared expanded-panel body + TechChips / TechLogos
    useColumnCount.ts     live grid column count (mirrors AllProjectsGrid's cols)
    PhotoLightbox.tsx     "use client" — full-screen photo viewer. Click the photo to
                          zoom in on that point, click again to zoom out, drag to pan
                          while zoomed. Esc / ✕ / backdrop close it.
    Nav.tsx               Home · Projects · Contact
    Footer.tsx            GitHub + LinkedIn
    Contact.tsx           contact form → web3forms API → sweetalert2 confirmation
```

Nav links are real routes now, not in-page anchors.

### Known pain points

- **`npm run build` currently fails on Windows** at the static-export step with
  `PageNotFoundError: Cannot find module for page: /_document`. It reproduces on a clean
  checkout, so it is environmental (Next 15.5.24 + Turbopack), not caused by any one change.
  Compilation and type-checking still pass; `npm run lint` is the reliable local gate until
  this is fixed. Worth chasing — it will likely bite the Vercel deploy.
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
   only**; Prominent is never filtered, which is why the caption under it says so.
2. **Prominent Projects** — the 3 entries flagged `featured: true`, as full-width
   accordion rows.
3. **All Projects** — every project as a square, 1/2/3 columns, capped at 3 across.

Clicking any card **expands it inline** — no modal. One card open per section.

**The data model is the thing to edit.** `src/app/data/projects.ts` is a single
`projects` array of 18. The three `featured: true` entries lead the page *and* appear in
the grid — one entry, both places, no duplication. `featuredProjects` and `FILTER_TECH`
are both derived at the bottom of that file, so adding a project with a new tech puts a
new chip in the filter bar automatically. Chip *order* comes from the `TECH` declaration
order; reorder that object to reorder the bar.

Entries whose title starts `TODO —` are placeholders (3 prominent + 6 grid). They render
as real cards, so fill or delete them before deploying.

**Two invariants worth not breaking:**

- **Key cards by `slug`, never by index.** `.tile-animate` is a mount-triggered CSS
  animation, so index keys re-animate every surviving card on each filter toggle.
- **The expanded panel is a separate `col-span-full` grid child**, spliced in at the end
  of the expanded card's row (hence `useColumnCount`). Making the *card* `col-span-full`
  instead pushes it to the next row and leaves dead cells behind it. The children must
  also be one flat array — sliced sibling expressions are separate child slots, and a
  card crossing a slot boundary remounts and re-fires its fly-in.

## Assets in `public/`

- **Photos of Austin:** `IMG_4026.png` (circular GitHub avatar in the name tile),
  `IMG_4025.png` (graduation photo, currently unused), `IMG_9363.jpg` (legacy)
- **Drone photo:** `find-me.jpg` — 3840×2160 aerial shot in the tall photo tile; the
  "Quiz time!" card asks visitors to spot Austin in it, so it needs its full resolution
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
