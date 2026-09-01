"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import Tile, { type FlyDirection } from "./Tile";
import ProjectDetail, { TechLogos } from "./ProjectDetail";
import { Chevron } from "./ProminentProjects";
import useColumnCount from "./useColumnCount";
import type { Project } from "../data/projects";

/* Column-agnostic on purpose: any rule derived from the column count is wrong
   at two of the three breakpoints, and the server can't know the count anyway.
   Cycling four directions still reads as a converge-from-all-sides scatter. */
const FLY_CYCLE: FlyDirection[] = ["left", "top", "right", "bottom"];

/** Starts after the three prominent rows, and caps so card 18 isn't held back. */
const loadDelay = (i: number) => 0.24 + Math.min(i * 0.035, 0.35);

export default function AllProjectsGrid({ visible }: { visible: Project[] }) {
  const [open, setOpen] = useState<string | null>(null);
  const cols = useColumnCount();

  /* The 45vw fly-in is a page-load signature. Re-running it every time a chip
     is toggled would be nauseating, so after the load animation has finished,
     cards that newly enter the filtered set just fade up in place. */
  const [entryMode, setEntryMode] = useState<"load" | "filter">("load");
  useEffect(() => {
    const t = setTimeout(() => setEntryMode("filter"), 1600);
    return () => clearTimeout(t);
  }, []);

  const triggers = useRef(new Map<string, HTMLButtonElement | null>());
  const panelRef = useRef<HTMLDivElement>(null);

  const expandedIndex = visible.findIndex((p) => p.slug === open);
  const expanded = expandedIndex === -1 ? null : visible[expandedIndex];

  useEffect(() => {
    if (!expanded) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    panelRef.current?.scrollIntoView({
      block: "nearest",
      behavior: reduce ? "auto" : "smooth",
    });
  }, [expanded]);

  const close = (returnFocus = true) => {
    if (returnFocus && open) triggers.current.get(open)?.focus();
    setOpen(null);
  };

  if (visible.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-edge bg-tile/50 px-6 py-12 text-center text-sm text-ash">
        No projects use all of those together. Try removing a filter.
      </p>
    );
  }

  const children: React.ReactNode[] = visible.map((p, i) => {
    const isOpen = p.slug === open;
    return (
      <Tile
        // Keyed by slug, never index: .tile-animate is mount-triggered, so an
        // index key would re-animate every surviving card on each filter toggle.
        key={p.slug}
        from={entryMode === "load" ? FLY_CYCLE[i % FLY_CYCLE.length] : "none"}
        delay={entryMode === "load" ? loadDelay(i) : 0}
        hoverable={false}
        className={`!p-0 aspect-square ${
          isOpen ? "ring-2 ring-inset ring-carolina" : ""
        }`}
      >
        <h3 className="flex flex-1 font-normal">
          <button
            type="button"
            ref={(el) => {
              triggers.current.set(p.slug, el);
            }}
            id={`ap-trigger-${p.slug}`}
            aria-expanded={isOpen}
            {...(isOpen ? { "aria-controls": "all-projects-panel" } : {})}
            onClick={() => (isOpen ? close(false) : setOpen(p.slug))}
            className="group/card flex h-full w-full flex-col p-5 text-left transition-colors duration-300 hover:bg-carolina hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-carolina"
          >
            <span className="font-display text-base leading-tight text-chalk transition-colors duration-300 group-hover/card:text-ink sm:text-lg">
              {p.title}
            </span>
            <span className="mt-2 text-xs leading-relaxed text-ash transition-colors duration-300 group-hover/card:text-ink/70">
              {p.summary}
            </span>
            <span className="mt-auto flex items-center justify-between gap-3 pt-4">
              <span className="flex flex-wrap items-center gap-2">
                <TechLogos tech={p.tech} />
              </span>
              <Chevron open={isOpen} />
            </span>
          </button>
        </h3>
      </Tile>
    );
  });

  /* The panel is its own full-width grid child, spliced in at the END of the
     expanded card's row. Making the card itself col-span-full instead would
     push it to the next row and leave dead cells behind it. */
  if (expanded) {
    const insertAt = Math.min(
      (Math.floor(expandedIndex / cols) + 1) * cols,
      visible.length,
    );
    children.splice(
      insertAt,
      0,
      <div
        key="all-projects-panel"
        id="all-projects-panel"
        ref={panelRef}
        role="region"
        aria-labelledby={`ap-trigger-${expanded.slug}`}
        className="animate-rise-in col-span-full rounded-xl border border-carolina/40 bg-tile-hi p-6"
      >
        <div className="mb-5 flex items-baseline justify-between gap-4">
          <h4 className="font-display text-xl text-chalk">{expanded.title}</h4>
          {expanded.year && (
            <span className="shrink-0 text-xs text-ash">{expanded.year}</span>
          )}
        </div>

        <ProjectDetail project={expanded} />

        <button
          type="button"
          onClick={() => close()}
          className="mt-6 rounded-md border border-edge px-3 py-2 text-xs text-ash transition-colors hover:border-carolina hover:text-carolina focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina"
        >
          Collapse
        </button>
      </div>,
    );
  }

  return (
    // One flat keyed array, not sliced sibling expressions: separate expressions
    // are separate child slots, and a card crossing a slot boundary would
    // remount and re-fire its fly-in.
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) close();
      }}
      className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3"
    >
      {children}
    </div>
  );
}
