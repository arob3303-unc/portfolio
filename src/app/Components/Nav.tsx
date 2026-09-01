"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <header className="w-full border-b border-edge/60">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-[1600px] items-center justify-center gap-6 px-4 py-5 sm:gap-10"
      >
        {LINKS.map(({ href, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              aria-current={active ? "page" : undefined}
              className={[
                "border-b-2 pb-1 text-sm tracking-wide transition-colors duration-200 sm:text-base",
                active
                  ? "border-carolina text-chalk"
                  : "border-transparent text-ash hover:border-carolina/60 hover:text-chalk",
              ].join(" ")}
            >
              {label}
            </Link>
          );
        })}

        <a
          href="/resume.pdf"
          download="Austin-Robinson-Resume.pdf"
          className="rounded-md border border-edge px-3 py-1.5 text-sm tracking-wide text-chalk transition-colors duration-200 hover:border-carolina hover:bg-carolina hover:text-ink"
        >
          Resume
        </a>
      </nav>
    </header>
  );
}
