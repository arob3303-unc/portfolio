import Image from "next/image";
import Link from "next/link";
import Tile, { TileTitle } from "./Components/Tile";
import { TECH } from "./data/projects";

const STACK = [
  TECH.python,
  TECH.java,
  TECH.ts,
  TECH.js,
  TECH.react,
  TECH.next,
  TECH.html,
  TECH.css,
  TECH.postgres,
  TECH.api,
  TECH.vercel,
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
          I&apos;m a passionate student studying Economics and Computer Science
          at the University of North Carolina at Chapel Hill. I have a deep
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
        <div className="relative min-h-[260px] w-full flex-1">
          <Image
            src="/IMG_9363.jpg"
            alt="Austin Robinson"
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 33vw"
            className="object-cover"
          />
        </div>
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
          B.S. Computer Science &amp; B.A. Economics, UNC Chapel Hill.
          Currently looking for software engineering internships.
        </p>
      </Tile>

      {/* Name + GitHub */}
      <Tile
        from="bottom"
        delay={0.18}
        className="justify-center lg:col-start-2 lg:row-start-2 lg:row-span-2"
      >
        <h1 className="font-display text-3xl leading-tight text-chalk transition-colors duration-300 group-hover:text-ink sm:text-4xl">
          Austin
          <br />
          Robinson
        </h1>
        {/* group-hover outranks hover in specificity, so it owns the text
            colour; the link's own hover only tints the background. */}
        <a
          href="https://github.com/arob3303-unc"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-md border border-edge px-3 py-2 text-sm text-chalk transition-colors duration-200 hover:bg-ink/10 group-hover:border-ink/40 group-hover:text-ink"
        >
          <Image src="/Github.png" alt="" width={20} height={20} />
          arob3303-unc
        </a>
      </Tile>

      {/* Image description */}
      {/* TODO(austin): replace with a caption for the photo above. */}
      <Tile
        from="right"
        delay={0.24}
        className="lg:col-start-3 lg:row-start-3"
      >
        <TileTitle>About the photo</TileTitle>
        <p className="mt-3 text-sm leading-relaxed text-chalk/90 transition-colors duration-300 group-hover:text-ink">
          Add a short caption here — where this was taken and what you were
          doing.
        </p>
      </Tile>

      {/* Technologies */}
      <Tile
        from="left"
        delay={0.3}
        className="lg:col-start-1 lg:row-start-3 lg:row-span-3"
      >
        <TileTitle>Technologies I use</TileTitle>
        <ul className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-3">
          {STACK.map((t) => (
            <li key={t.src} className="flex flex-col items-center gap-1.5">
              <Image
                src={t.src}
                alt=""
                width={32}
                height={32}
                className="h-8 w-8 object-contain"
              />
              <span className="text-center text-[10px] leading-tight text-ash transition-colors duration-300 group-hover:text-ink/60">
                {t.label}
              </span>
            </li>
          ))}
        </ul>
      </Tile>

      {/* Education / timeline */}
      {/* TODO(austin): replace these entries with your real timeline. */}
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
              what: "Building side projects and looking for a software engineering internship.",
            },
            {
              when: "2023 — present",
              what: "UNC Chapel Hill — Economics & Computer Science.",
            },
            {
              when: "2023",
              what: "HackNC — built the first version of HayBale Game in PyGame.",
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
