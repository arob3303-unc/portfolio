"use client";

import { useState } from "react";
import Tile from "./Tile";
import ProjectDetail, { TechLogos } from "./ProjectDetail";
import { featuredProjects } from "../data/projects";
import type { FlyDirection } from "./Tile";

const FROM: FlyDirection[] = ["left", "right", "left"];

export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * The three prominent projects, as full-width accordion rows. Never filtered —
 * these are the ones Austin always wants a recruiter to see.
 */
export default function ProminentProjects() {
  const [open, setOpen] = useState<string | null>(null);

  if (featuredProjects.length === 0) return null;

  return (
    <div className="flex flex-col gap-4">
      {featuredProjects.map((p, i) => {
        const isOpen = open === p.slug;
        return (
          <Tile
            key={p.slug}
            from={FROM[i % FROM.length]}
            delay={i * 0.08}
            hoverable={false}
            className={`!p-0 ${isOpen ? "border-carolina/40" : ""}`}
          >
            {/* h3 keeps a real document outline; all styling lives on the button. */}
            <h3 className="flex font-normal">
              <button
                type="button"
                id={`fp-trigger-${p.slug}`}
                aria-expanded={isOpen}
                {...(isOpen ? { "aria-controls": `fp-panel-${p.slug}` } : {})}
                onClick={() => setOpen(isOpen ? null : p.slug)}
                className="group/row flex w-full items-center gap-4 p-6 text-left transition-colors duration-300 hover:bg-carolina hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-carolina"
              >
                <span className="min-w-0 flex-1">
                  <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="font-display text-xl text-chalk transition-colors duration-300 group-hover/row:text-ink sm:text-2xl">
                      {p.title}
                    </span>
                    {p.year && (
                      <span className="text-xs text-ash transition-colors duration-300 group-hover/row:text-ink/70">
                        {p.year}
                      </span>
                    )}
                  </span>
                  <span className="mt-2 block text-sm leading-relaxed text-chalk/80 transition-colors duration-300 group-hover/row:text-ink/80">
                    {p.summary}
                  </span>
                </span>
                <span className="hidden shrink-0 items-center gap-3 sm:flex">
                  <TechLogos tech={p.tech} />
                </span>
                <Chevron open={isOpen} />
              </button>
            </h3>

            {isOpen && (
              <div
                id={`fp-panel-${p.slug}`}
                role="region"
                aria-labelledby={`fp-trigger-${p.slug}`}
                className="animate-rise-in border-t border-edge p-6"
              >
                <ProjectDetail project={p} />
              </div>
            )}
          </Tile>
        );
      })}
    </div>
  );
}
