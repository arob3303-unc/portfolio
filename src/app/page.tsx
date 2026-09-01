import Image from "next/image";
import Link from "next/link";
import PhotoLightbox from "./Components/PhotoLightbox";
import Tile, { TileTitle } from "./Components/Tile";
import { TECH } from "./data/projects";

type Skill = { label: string; logo?: string };

/* Grouped rather than one flat logo wall: a recruiter scanning this wants to
   know the shape of the experience, not just count icons. Logos are attached
   where one exists in /public; the rest render as plain chips. */
const SKILL_GROUPS: { group: string; items: Skill[] }[] = [
  {
    group: "Programming languages (by proficiency)",
    items: [
      { label: "Python", logo: TECH.python.src },
      { label: "Java", logo: TECH.java.src },
      { label: "TypeScript", logo: TECH.ts.src },
      { label: "JavaScript", logo: TECH.js.src },
      { label: "R" },
      { label: "C++" },
      { label: "C" },
    ],
  },
  {
    group: "Frameworks & tools",
    items: [
      { label: "React.js", logo: TECH.react.src },
      { label: "Angular" },
      { label: "AI agentic tools" },
      { label: "Node.js" },
      { label: "Flask" },
      { label: "Docker" },
      { label: "Kubernetes" },
      { label: "AWS (EC2)" },
      { label: "Scalable application architecture" },
      { label: "RESTful API design", logo: TECH.api.src },
      { label: "Maven" },
      { label: "Spring Boot" },
      { label: "Next.js", logo: TECH.next.src },
      { label: "HTML5", logo: TECH.html.src },
      { label: "CSS3", logo: TECH.css.src },
      { label: "Vercel", logo: TECH.vercel.src },
    ],
  },
  {
    group: "Data & analysis",
    items: [
      { label: "SQL" },
      { label: "PostgreSQL", logo: TECH.postgres.src },
      { label: "SQLModel / SQLAlchemy" },
      { label: "pandas" },
      { label: "NumPy" },
      { label: "scikit-learn" },
      { label: "JSON" },
      { label: "Matplotlib" },
    ],
  },
];

export default function Home() {
  return (
    <div className="grid grid-cols-1 gap-4 overflow-hidden lg:grid-cols-3 lg:auto-rows-[minmax(130px,auto)]">
      {/* Who am I / bio */}
      <Tile
        from="top"
        delay={0}
        className="lg:col-span-2 lg:col-start-1 lg:row-start-1"
      >
        <TileTitle>Who am I</TileTitle>
        <p className="mt-3 text-sm leading-relaxed text-chalk/90 transition-colors duration-300 group-hover:text-ink sm:text-base">
          I&apos;m a recent Graduate of 
          the University of North Carolina at Chapel Hill. I have a deep
          curiosity to understand how the world works. I think understanding how
          people think and learning code is essential to create innovative
          products that will transcend this world. I enjoy diving into
          challenges, learning new concepts, and applying them to make a
          positive impact.
        </p>
      </Tile>

      {/* Photo */}
      <Tile
        from="right"
        delay={0.06}
        className="!p-0 lg:col-start-3 lg:row-start-1 lg:row-span-2"
      >
        <PhotoLightbox
          src="/find-me.jpg"
          alt="Aerial drone photo — Austin is somewhere in it"
          width={3840}
          height={2160}
          className="min-h-[260px] w-full flex-1"
        />
      </Tile>

      {/* Student / career */}
      {/* TODO(austin): replace with your own one-liner. */}
      <Tile
        from="left"
        delay={0.12}
        className="lg:col-start-1 lg:row-start-2"
      >
        <TileTitle>Student / Career</TileTitle>
        <p className="mt-3 text-sm leading-relaxed text-chalk/90 transition-colors duration-300 group-hover:text-ink">
          B.S. Computer Science UNC Chapel Hill.
          Currently looking for software engineering roles.
        </p>
      </Tile>

      {/* Name + GitHub */}
      <Tile
        from="bottom"
        delay={0.18}
        className="justify-center lg:col-start-2 lg:row-start-2 lg:row-span-2"
      >
        <div className="flex items-center justify-between gap-5">
          <h1 className="shrink-0 font-display text-3xl leading-tight text-chalk transition-colors duration-300 group-hover:text-ink sm:text-4xl">
            Austin
            <br />
            Robinson
          </h1>
          {/* flex-1 lets the avatar claim whatever width the name leaves, so
              it fills the tile; aspect-square keeps it a true circle. */}
          <a
            href="https://github.com/arob3303-unc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Austin Robinson on GitHub"
            className="relative aspect-square w-full min-w-[96px] max-w-[176px] flex-1 overflow-hidden rounded-full border-2 border-edge transition-[transform,border-color] duration-200 hover:scale-105 group-hover:border-ink/40"
          >
            <Image
              src="/IMG_4026.png"
              alt="Austin Robinson"
              fill
              sizes="(max-width: 1024px) 45vw, 176px"
              className="object-cover"
            />
          </a>
        </div>
      </Tile>

      {/* Caption for the drone photo above */}
      <Tile
        from="right"
        delay={0.24}
        className="lg:col-start-3 lg:row-start-3"
      >
        <TileTitle>the Photo</TileTitle>
        <p className="mt-3 text-sm leading-relaxed text-chalk/90 transition-colors duration-300 group-hover:text-ink">
          I enjoy traveling and taking drone pictures :)
          <br/>Were you able to find me??
        </p>
        <p className="mt-2 text-xs leading-relaxed text-ash transition-colors duration-300 group-hover:text-ink/60">
          click the photo to enlarge it
        </p>
      </Tile>

      {/* Technologies */}
      <Tile
        from="left"
        delay={0.3}
        className="lg:col-start-1 lg:row-start-3 lg:row-span-3"
      >
        <TileTitle>Technologies I have worked with</TileTitle>
        <div className="mt-4 space-y-5">
          {SKILL_GROUPS.map((g) => (
            <div key={g.group}>
              <h3 className="font-display text-[10px] uppercase tracking-[0.16em] text-ash transition-colors duration-300 group-hover:text-ink/60">
                {g.group}
              </h3>
              <ul className="mt-2 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li
                    key={it.label}
                    className="inline-flex items-center gap-1.5 rounded-md border border-edge px-2 py-1 text-[11px] leading-none text-chalk/90 transition-colors duration-300 group-hover:border-ink/30 group-hover:text-ink"
                  >
                    {it.logo && (
                      <Image
                        src={it.logo}
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 shrink-0 object-contain"
                      />
                    )}
                    {it.label}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Tile>

      {/* Education / timeline */}
      <Tile
        from="bottom"
        delay={0.36}
        className="lg:col-start-2 lg:col-span-2 lg:row-start-4 lg:row-span-2"
      >
        <TileTitle>Education &amp; timeline</TileTitle>
        <ol className="mt-4 space-y-4">
          {[
            {
              when: "Now",
              what: "Developer at Vechter Home Solutions. I also build and maintain websites for local businesses.",
            },
            {
              when: "2023 — 2026",
              what: "UNC Chapel Hill — Computer Science & Economics.",
            },
            {
              when: "2022 — 2023",
              what: "Online classes alongside a full-time job at a manufacturing plant.",
            },
            {
              when: "2020 — 2021",
              what: "High school, cashier at Food Lion, and tennis.",
            },
          ].map((row) => (
            <li key={row.when} className="flex flex-col gap-1 sm:flex-row sm:gap-4">
              <span className="shrink-0 font-display text-sm text-carolina transition-colors duration-300 group-hover:text-ink sm:w-40">
                {row.when}
              </span>
              <span className="text-sm leading-relaxed text-chalk/90 transition-colors duration-300 group-hover:text-ink">
                {row.what}
              </span>
            </li>
          ))}
        </ol>
        <Link
          href="/projects"
          className="mt-6 inline-block w-fit text-xs uppercase tracking-[0.2em] text-ash underline-offset-4 transition-colors duration-300 hover:underline group-hover:text-ink/60"
        >
          See all projects &rarr;
        </Link>
      </Tile>
    </div>
  );
}
