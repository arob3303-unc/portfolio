import type { Metadata } from "next";
import Image from "next/image";
import Tile, { TileTitle } from "../Components/Tile";
import Contact from "../Components/Contact";

export const metadata: Metadata = {
  title: "Contact — Austin Robinson",
  description: "Get in touch with Austin Robinson.",
};

const LINKS = [
  {
    href: "https://github.com/arob3303-unc",
    src: "/Github.png",
    label: "GitHub",
    handle: "arob3303-unc",
  },
  {
    href: "https://www.linkedin.com/in/austin-robinson-60617b296/",
    src: "/ln-pic.png",
    label: "LinkedIn",
    handle: "Austin Robinson",
  },
];

export default function ContactPage() {
  return (
    <section>
      <h1 className="mb-2 font-display text-4xl text-chalk sm:text-5xl">
        Contact
      </h1>
      <p className="mb-8 max-w-2xl text-sm text-ash">
        Looking for a software engineering internship. Send me a message and
        I&apos;ll reply.
      </p>

      <div className="grid grid-cols-1 gap-4 overflow-hidden lg:grid-cols-3">
        <Tile from="left" delay={0} hoverable={false} className="lg:col-span-2">
          <TileTitle>Send a message</TileTitle>
          <div className="mt-4">
            <Contact />
          </div>
        </Tile>

        <div className="flex flex-col gap-4">
          <Tile from="right" delay={0.06}>
            <TileTitle>Elsewhere</TileTitle>
            <ul className="mt-4 space-y-3">
              {LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="-mx-2 flex items-center gap-3 rounded px-2 py-1 text-sm text-chalk transition-colors duration-300 hover:bg-ink/10 group-hover:text-ink"
                  >
                    <Image src={l.src} alt="" width={22} height={22} className="h-[22px] w-[22px] object-contain" />
                    <span>
                      {l.label}
                      <span className="block text-xs text-ash transition-colors duration-300 group-hover:text-ink/60">
                        {l.handle}
                      </span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </Tile>

          <Tile from="right" delay={0.12} className="flex-1">
            <TileTitle>Resume</TileTitle>
            <p className="mt-3 text-sm leading-relaxed text-chalk/90 transition-colors duration-300 group-hover:text-ink">
              A one-page summary of my education, projects, and stack.
            </p>
            <a
              href="/resume.pdf"
              download="Austin-Robinson-Resume.pdf"
              className="mt-4 inline-block w-fit rounded-md border border-carolina px-4 py-2 text-sm text-carolina transition-colors hover:bg-ink/10 group-hover:border-ink group-hover:text-ink"
            >
              Download PDF
            </a>
          </Tile>
        </div>
      </div>
    </section>
  );
}
