export type Tech = { src: string; label: string };

export type Project = {
  slug: string;
  title: string;
  image: string;
  /** Screenshot aspect, used to size the modal image without layout shift. */
  imageWidth: number;
  imageHeight: number;
  tech: Tech[];
  bullets: string[];
  link?: { href: string; label: string };
};

export const TECH: Record<string, Tech> = {
  python: { src: "/Python.png", label: "Python" },
  java: { src: "/Java.png", label: "Java" },
  js: { src: "/JavaScript.png", label: "JavaScript" },
  ts: { src: "/TypeScript.png", label: "TypeScript" },
  react: { src: "/React.png", label: "React" },
  next: { src: "/Next.js.png", label: "Next.js" },
  html: { src: "/HTML5.png", label: "HTML5" },
  css: { src: "/CSS3.png", label: "CSS3" },
  postgres: { src: "/post.png", label: "PostgreSQL" },
  api: { src: "/OpenAPI.png", label: "APIs" },
  vercel: { src: "/Vercel.png", label: "Vercel" },
};

/* Ordered strongest-first: this is the order a recruiter reads them in. */
export const projects: Project[] = [
  {
    slug: "haybale-game",
    title: "HayBale Game",
    image: "/project1.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.postgres, TECH.react, TECH.api],
    bullets: [
      "Developed first in PyGame for HackNC in 2023, but then earlier this year I decided to make it an online game.",
      "Used Phaser.js for web compatibility.",
      "I used Next.js and React for the front-end (like this website).",
      "Supabase for user authentication and their database for online users.",
      "The database and user auth integration caused challenges but overcoming this enhanced my problem solving for this type of integration.",
    ],
    link: {
      href: "https://www.youtube.com/watch?v=noK9FcLZ3vM&t=0s",
      label: "YouTube demo",
    },
  },
  {
    slug: "stock-market-algorithm",
    title: "Stock Market Algorithm",
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
      "Insight: Zoom experienced a significant surge in share price during the COVID-19 pandemic, followed by a steady decline post-pandemic. This algorithm is well-suited for capturing gains during such \u201cboom\u201d periods and managing trades over the following decade. Given the current unprecedented rise in share prices of several AI companies, applying this strategy to AI stocks could potentially yield profitable results.",
    ],
  },
  {
    slug: "news-scraper",
    title: "News Scraper",
    image: "/news.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.api, TECH.html, TECH.css, TECH.js],
    bullets: [
      "HTML and CSS frontend. API route using Python for backend.",
      "It was for personal use, I wanted to develop something that would gather articles from all news sites.",
    ],
  },
  {
    slug: "discord-bot",
    title: "Discord Bot",
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
    image: "/pygame.png",
    imageWidth: 1800,
    imageHeight: 1750,
    tech: [TECH.python],
    bullets: [
      "Two player game developed in PyGame.",
      "Fairly simple but first project using PyGame and used it as a starter for my HayBale game.",
      "One player uses WASD and another uses the arrow keys and they shoot each other. Both have 10 total health.",
    ],
  },
  {
    slug: "python-autoclicker",
    title: "Python Autoclicker",
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
    link: {
      href: "https://github.com/arob3303-unc/portfolio",
      label: "GitHub repo",
    },
  },
];
