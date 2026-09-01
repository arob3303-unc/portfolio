export type Tech = { label: string; src?: string };

export type ProjectLink = { href: string; label: string };

export type Project = {
  slug: string;
  title: string;
  /** One line on the collapsed card. Keep it under ~90 characters. */
  summary: string;
  year?: string;
  tech: Tech[];
  /** Body of the expanded panel. */
  bullets: string[];
  repo?: string;
  site?: string;
  /** Anything that is neither a repo nor a live site — a demo video, a write-up. */
  links?: ProjectLink[];
  image?: string;
  /** Screenshot aspect, used to size the image without layout shift. */
  imageWidth?: number;
  imageHeight?: number;

  /* ── Prominent Projects only ───────────────────────────────────────────
     Set `featured` on the three that lead the page. The four fields below
     are the write-up a hiring engineer actually wants; leave any of them
     out and that row simply doesn't render. */
  featured?: boolean;
  problem?: string;
  role?: string;
  challenge?: string;
  outcome?: string;
};

/* `src` is optional: languages like R, Prolog and C have no logo in /public,
   and a chip without one renders as plain text.

   Declaration order here is the chip order in the filter bar — reorder this
   object to reorder the bar. */
export const TECH: Record<string, Tech> = {
  python: { src: "/Python.png", label: "Python" },
  java: { src: "/Java.png", label: "Java" },
  ts: { src: "/TypeScript.png", label: "TypeScript" },
  js: { src: "/JavaScript.png", label: "JavaScript" },
  r: { label: "R" },
  cpp: { label: "C++" },
  c: { label: "C" },
  prolog: { label: "Prolog" },
  sql: { label: "SQL" },
  react: { src: "/React.png", label: "React.js" },
  next: { src: "/Next.js.png", label: "Next.js" },
  angular: { label: "Angular" },
  node: { label: "Node.js" },
  flask: { label: "Flask" },
  docker: { label: "Docker" },
  html: { src: "/HTML5.png", label: "HTML5" },
  css: { src: "/CSS3.png", label: "CSS3" },
  postgres: { src: "/post.png", label: "PostgreSQL" },
  supabase: { label: "Supabase" },
  api: { src: "/OpenAPI.png", label: "APIs" },
  phaser: { label: "Phaser.js" },
  pygame: { label: "PyGame" },
  vercel: { src: "/Vercel.png", label: "Vercel" },
};

/* Ordered strongest-first: this is the order a recruiter reads them in. The
   three `featured` entries lead the page as Prominent Projects and ALSO
   appear in the All Projects grid below — one entry, both places. */
export const projects: Project[] = [
  /* ─────────────────────────────────────────────────────────────────────
     TODO(austin): the three Prominent Projects. Fill these in and delete
     the TODO text. Everything below this block is already real.
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "featured-1",
    title: "TODO — project name",
    summary: "TODO — the one line a recruiter reads before deciding to expand.",
    year: "2026",
    featured: true,
    tech: [TECH.ts, TECH.react, TECH.next],
    problem: "TODO — what problem did this solve, and for whom?",
    role: "TODO — what specifically did you build?",
    challenge: "TODO — the hardest thing you hit, and how you got past it.",
    outcome: "TODO — what shipped, who used it, what it measurably did.",
    bullets: [],
  },
  {
    slug: "featured-2",
    title: "TODO — project name",
    summary: "TODO — the one line a recruiter reads before deciding to expand.",
    year: "2025",
    featured: true,
    tech: [TECH.java, TECH.sql, TECH.docker],
    problem: "TODO — what problem did this solve, and for whom?",
    role: "TODO — what specifically did you build?",
    challenge: "TODO — the hardest thing you hit, and how you got past it.",
    outcome: "TODO — what shipped, who used it, what it measurably did.",
    bullets: [],
  },
  {
    slug: "featured-3",
    title: "TODO — project name",
    summary: "TODO — the one line a recruiter reads before deciding to expand.",
    year: "2025",
    featured: true,
    tech: [TECH.python, TECH.flask, TECH.postgres],
    problem: "TODO — what problem did this solve, and for whom?",
    role: "TODO — what specifically did you build?",
    challenge: "TODO — the hardest thing you hit, and how you got past it.",
    outcome: "TODO — what shipped, who used it, what it measurably did.",
    bullets: [],
  },

  /* ── Real projects ───────────────────────────────────────────────────── */
  {
    slug: "haybale-game",
    title: "HayBale Game",
    summary:
      "A HackNC PyGame prototype rebuilt as an online game on Phaser and Supabase.",
    year: "2023 — 2026",
    image: "/project1.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [
      TECH.react,
      TECH.next,
      TECH.phaser,
      TECH.supabase,
      TECH.postgres,
      TECH.api,
    ],
    bullets: [
      "Developed first in PyGame for HackNC in 2023, but then earlier this year I decided to make it an online game.",
      "Used Phaser.js for web compatibility.",
      "I used Next.js and React for the front-end (like this website).",
      "Supabase for user authentication and their database for online users.",
      "The database and user auth integration caused challenges but overcoming this enhanced my problem solving for this type of integration.",
    ],
    links: [
      {
        href: "https://www.youtube.com/watch?v=noK9FcLZ3vM&t=0s",
        label: "YouTube demo",
      },
    ],
  },
  {
    slug: "stock-market-algorithm",
    title: "Stock Market Algorithm",
    summary:
      "A moving-average trading strategy backtested over 10 years, transaction costs included.",
    year: "2025",
    image: "/algo.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.python, TECH.api],
    bullets: [
      "Developed an algorithmic trading strategy using pandas and the Yahoo Finance API to execute buy/sell decisions based on 50-day and 200-day moving averages.",
      "Accounted for transaction costs (0.04%) to simulate realistic trading conditions.",
      "Result: Backtested strategy yielded a 366.32% return on Zoom (ZM) while demonstrating the impact of transaction costs (-3.13% on Nvidia), highlighting the importance of fee management. Nvidia returned a 0.08% return if no transaction costs were accounted for.",
      "Backtesting: Backtested the above algorithm over a 10-year period (2015-2025), comparing performance against a buy-and-hold strategy.",
      "Result: Algorithm provided a slight outperformance in certain scenarios and demonstrated potential for further optimization with additional parameters being added and accounting for more common transaction costs (brokerage fees, slippage fees, etc.).",
      "Insight: Zoom experienced a significant surge in share price during the COVID-19 pandemic, followed by a steady decline post-pandemic. This algorithm is well-suited for capturing gains during such “boom” periods and managing trades over the following decade. Given the current unprecedented rise in share prices of several AI companies, applying this strategy to AI stocks could potentially yield profitable results.",
    ],
  },
  {
    slug: "news-scraper",
    title: "News Scraper",
    summary:
      "Gathers articles from across news sites into one page — Python API, hand-built front end.",
    image: "/news.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.python, TECH.api, TECH.html, TECH.css, TECH.js],
    bullets: [
      "HTML and CSS frontend. API route using Python for backend.",
      "It was for personal use, I wanted to develop something that would gather articles from all news sites.",
    ],
  },
  {
    slug: "discord-bot",
    title: "Discord Bot",
    summary:
      "A bot for my Discord server that counted down to the next Call of Duty release.",
    image: "/bot.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.python, TECH.api],
    bullets: [
      "Developed for people in my Discord server. It used Discord's API.",
      "It was for fun and I enjoyed seeing people interact with something I developed.",
      "Counted down the days til the next Call of Duty game released.",
    ],
  },
  {
    slug: "drone-website",
    title: "Drone Website",
    summary:
      "A gallery for my drone photography, and the project that taught me JavaScript.",
    image: "/drone.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.html, TECH.css, TECH.js],
    bullets: [
      "I am passionate about drone photography. Made this website for my drone pictures. Allowed people to look at my work.",
      "First project that gave me experience with JS.",
      "A challenge I had was making the website device friendly. I figured it out relatively quickly!",
    ],
  },
  {
    slug: "2d-game",
    title: "2D Game",
    summary:
      "My first game in Java — objects, game panels, and working out how collision works.",
    image: "/2Dgame.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.java],
    bullets: [
      "Developed using Eclipse IDE.",
      "All the code was Java and this was my first time learning about game code.",
      "Experienced with objects, frameworks, and game panels.",
      "Interesting part was learning how collision works within a game.",
    ],
  },
  {
    slug: "1v1-pygame",
    title: "1v1 PyGame",
    summary:
      "A two-player shooter in PyGame that became the starting point for HayBale.",
    image: "/pygame.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.python, TECH.pygame],
    bullets: [
      "Two player game developed in PyGame.",
      "Fairly simple but first project using PyGame and used it as a starter for my HayBale game.",
      "One player uses WASD and another uses the arrow keys and they shoot each other. Both have 10 total health.",
    ],
  },
  {
    slug: "python-autoclicker",
    title: "Python Autoclicker",
    summary:
      "A small utility that automated the repetitive clicking out of a daily task.",
    image: "/auto.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.python],
    bullets: [
      "Developed for personal use.",
      "Allowed me to automate certain tasks that involved repeated clicks.",
    ],
  },
  {
    slug: "portfolio-website",
    title: "Portfolio Website",
    summary:
      "The site you are on — Next.js, React and Tailwind, deployed on Vercel.",
    image: "/website.png",
    imageWidth: 800,
    imageHeight: 750,
    tech: [TECH.react, TECH.next, TECH.ts, TECH.vercel, TECH.css],
    bullets: [
      "The website you are on right now!",
      "Biggest challenge was creating the modal for my project section.",
      "Overcame it by learning more about React components, useState, and JSX Elements.",
      "Deploying the website on Vercel was an interesting process and I did come into some errors related to node_modules in the process.",
    ],
    repo: "https://github.com/arob3303-unc/portfolio",
  },

  /* ─────────────────────────────────────────────────────────────────────
     TODO(austin): six open slots. Fill them in or delete the ones you
     don't need — they render as real cards, so don't ship them as-is.
     `tech` is what puts a chip in the filter bar at the top of the page.
     ───────────────────────────────────────────────────────────────────── */
  {
    slug: "placeholder-1",
    title: "TODO — project name",
    summary: "TODO — one line on what it does.",
    tech: [TECH.r],
    bullets: ["TODO — what you built, how, and what was hard about it."],
  },
  {
    slug: "placeholder-2",
    title: "TODO — project name",
    summary: "TODO — one line on what it does.",
    tech: [TECH.cpp],
    bullets: ["TODO — what you built, how, and what was hard about it."],
  },
  {
    slug: "placeholder-3",
    title: "TODO — project name",
    summary: "TODO — one line on what it does.",
    tech: [TECH.c],
    bullets: ["TODO — what you built, how, and what was hard about it."],
  },
  {
    slug: "placeholder-4",
    title: "TODO — project name",
    summary: "TODO — one line on what it does.",
    tech: [TECH.prolog],
    bullets: ["TODO — what you built, how, and what was hard about it."],
  },
  {
    slug: "placeholder-5",
    title: "TODO — project name",
    summary: "TODO — one line on what it does.",
    tech: [TECH.angular, TECH.node],
    bullets: ["TODO — what you built, how, and what was hard about it."],
  },
  {
    slug: "placeholder-6",
    title: "TODO — project name",
    summary: "TODO — one line on what it does.",
    tech: [TECH.java, TECH.sql],
    bullets: ["TODO — what you built, how, and what was hard about it."],
  },
];

/** The Prominent Projects section, in array order. */
export const featuredProjects = projects.filter((p) => p.featured);

/* Chips in the filter bar: which ones exist comes from the data, so a chip can
   never return zero on its own; the order comes from TECH above. */
const TECH_ORDER = Object.values(TECH).map((t) => t.label);

export const FILTER_TECH: Tech[] = (() => {
  const seen = new Map<string, Tech>();
  for (const p of projects) {
    for (const t of p.tech) seen.set(t.label, t);
  }
  return [...seen.values()].sort(
    (a, b) => TECH_ORDER.indexOf(a.label) - TECH_ORDER.indexOf(b.label),
  );
})();
