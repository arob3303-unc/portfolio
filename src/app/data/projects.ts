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
  fastapi: { label: "FastAPI" },
  rabbitmq: { label: "RabbitMQ" },
  websockets: { label: "WebSockets" },
  docker: { label: "Docker" },
  k8s: { label: "Kubernetes" },
  aws: { label: "AWS (EC2)" },
  clerk: { label: "Clerk" },
  html: { src: "/HTML5.png", label: "HTML5" },
  css: { src: "/CSS3.png", label: "CSS3" },
  postgres: { src: "/post.png", label: "PostgreSQL" },
  sqlmodel: { label: "SQLModel" },
  supabase: { label: "Supabase" },
  api: { src: "/OpenAPI.png", label: "APIs" },
  openai: { label: "OpenAI API" },
  azureopenai: { label: "Azure OpenAI" },
  alloy: { label: "Alloy" },
  sat: { label: "SAT solvers" },
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
    slug: "vechter-field-diagnostic",
    title: "Vechter Home Solutions — Field Diagnostic App",
    summary: "Built and shipped a full-stack diagnostic web app used by field sales reps to test client systems on-site and generate tailored recommendations, contributing to $100K–$250K in weekly revenue.",
    year: "2026",
    featured: true,
    tech: [
      TECH.ts,
      TECH.react,
      TECH.next,
      TECH.vercel
    ],
    problem: "Reps visiting homes had no fast way to actually test a homeowner's existing solar output or backup power setup — they were relying on guesswork or manual paperwork, which slowed down the sales process and led to mismatched recommendations.",
    role: "Designed and built the application end-to-end: the on-site diagnostic test flows for solar and backup power systems, the logic that flags problems in a homeowner's current setup, and the recommendation output reps use to close the sale during the visit.",
    challenge: "The test calulations. A lot of inaccuracies when it came to calculating the data user's inputted.",
    outcome: "Deployed to the sales team and used on every in-home visit. Directly tied to $100k–$250k in weekly revenue by giving reps a data-backed pitch instead of a generic one.",
    bullets: [],
    links: [
      {
        href: "https://solar-testing-site.vercel.app",
        label: "Website Link",
      },
    ],
  },
  {
    slug: "learnwithai",
    title: "LearnWithAI — AI-Powered Lecture Summarizer",
    summary: "Helped create an application with a student side and a professor side at UNC Chapel Hill to help student's understand course work directly on the site without needing to go anywhere else. Professors are able to drop course work in and student's can use AI to help understand certain parts of it. Group project with 3 other people.",
    year: "2026",
    featured: true,
    tech: [
      TECH.angular,
      TECH.fastapi,
      TECH.python,
      TECH.ts,
      TECH.rabbitmq,
      TECH.websockets,
      TECH.k8s,
      TECH.docker,
      TECH.postgres,
      TECH.sqlmodel,
      TECH.azureopenai,
      TECH.api,
    ],
    problem: "Students having to go to different sites to use AI to help understand concepts from professor notes. They might even have to pay for it...",
    role: "Helped with the design and implementation of the front-end portions of the application.",
    challenge: "Merge conflicts on different branches caused a lot of headaches. We did not have much experience with working with other people on different branches so when pushing to main, it caused several issues we have not seen. We figured it out though and pushed through the project.",
    outcome: "Worked with a group to fully develop a functioning application to help students with learning. ",
    bullets: [
      "Collaborated in a 4-person team to engineer a modular learning management platform enabling students to upload lecture audio/text and receive automated AI summaries via Azure OpenAI.",
      "Implemented a real-time event system via WebSockets, streaming background worker job statuses directly to the frontend client with an automated HTTP polling fallback mechanism.",
      "Architected a type-safe backend infrastructure using SQLModel for data persistence in PostgreSQL, securing endpoints.",
      "Containerized the application ecosystem using Docker and established non-mutating validation pipelines (Ruff, Pyright, Prettier), deploying the final infrastructure onto an OKD Kubernetes cluster.",
    ],
    links: [
      {
        href: "https://github.com/comp423-26s/learn-with-ai-team-f4",
        label: "GitHub Repo Link",
      },
      {
        href: "https://www.youtube.com/watch?v=geon3StgtOA",
        label: "Youtube Demo"
      }
    ],
  },
  {
    slug: "anticheat-formal-verification",
    title: "Formal Verification of a Client-Side Anti-Cheat System",
    summary:
      "Modelled an open-source anti-cheat in Alloy and used SAT-based model checking to find states where its detection could be bypassed.",
    year: "February — May 2026",
    featured: true,
    tech: [TECH.cpp, TECH.alloy, TECH.sat],
    bullets: [
      "Conducted a formal security analysis of the Ultimate AntiCheat open-source framework by abstracting C++ source code into a relational state-transition model.",
      "Defined critical security properties using First-Order Logic and LTL to verify system integrity against memory modification, debugger attachment, and unauthorized module injection.",
      "Utilized the Alloy Analyzer to perform automated SAT-based model checking, exhaustively exploring state spaces to identify logic flaws and potential memory “leakage” that could bypass detection.",
      "Identified and documented counterexamples where legitimate system states could be spoofed or where detection mechanisms failed to trigger enforcement, providing mathematically grounded security assurances.",
    ],
    // TODO(austin): the four fields below render as the write-up above the
    // bullets. Left empty rather than invented — fill them in your own words.
    // problem: "",
    // role: "",
    // challenge: "",
    // outcome: "",
  },

  /* ── Real projects ───────────────────────────────────────────────────── */
  {
    slug: "extro-stock-forecaster",
    title: "Extro — Stock Market Forecaster",
    summary:
      "A full-stack portfolio simulator that pairs fictional balances with AI-generated investment feedback.",
    year: "June 2025 — Present",
    tech: [
      TECH.next,
      TECH.ts,
      TECH.react,
      TECH.python,
      TECH.flask,
      TECH.openai,
      TECH.clerk,
      TECH.sql,
      TECH.aws,
      TECH.api,
    ],
    bullets: [
      "Developed a full-stack financial dashboard where users log in and simulate long-term portfolio growth using fictional balances.",
      "Integrated OpenAI API using Flask in the backend to generate personalized investment advice. The AI analyzes user-selected companies, provides performance feedback, profit summaries, and recommendations on whether to invest.",
      "Implemented secure authentication and data persistence using Clerk (login) and a Flask + SQL RESTful API architecture deployed on AWS EC2.",
      "Result: Built an intelligent, cloud-ready simulation platform combining AI reasoning with financial analytics to enhance user engagement and learning in investing.",
    ],
  },
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
    tech: [
      TECH.python, 
      TECH.api
    ],
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
  // {
  //   slug: "placeholder-1",
  //   title: "TODO — project name",
  //   summary: "TODO — one line on what it does.",
  //   tech: [TECH.r],
  //   bullets: ["TODO — what you built, how, and what was hard about it."],
  // },
  // {
  //   slug: "placeholder-2",
  //   title: "TODO — project name",
  //   summary: "TODO — one line on what it does.",
  //   tech: [TECH.cpp],
  //   bullets: ["TODO — what you built, how, and what was hard about it."],
  // },
  // {
  //   slug: "placeholder-3",
  //   title: "TODO — project name",
  //   summary: "TODO — one line on what it does.",
  //   tech: [TECH.c],
  //   bullets: ["TODO — what you built, how, and what was hard about it."],
  // },
  // {
  //   slug: "placeholder-4",
  //   title: "TODO — project name",
  //   summary: "TODO — one line on what it does.",
  //   tech: [TECH.prolog],
  //   bullets: ["TODO — what you built, how, and what was hard about it."],
  // },
  // {
  //   slug: "placeholder-5",
  //   title: "TODO — project name",
  //   summary: "TODO — one line on what it does.",
  //   tech: [TECH.angular, TECH.node],
  //   bullets: ["TODO — what you built, how, and what was hard about it."],
  // },
  // {
  //   slug: "placeholder-6",
  //   title: "TODO — project name",
  //   summary: "TODO — one line on what it does.",
  //   tech: [TECH.java, TECH.sql],
  //   bullets: ["TODO — what you built, how, and what was hard about it."],
  // },
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
