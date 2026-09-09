"use client";

import type React from "react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Tile, { type FlyDirection } from "./Tile";
import { ProjectPanel, TechLogos } from "./ProjectDetail";
import useColumnCount, { TWO_COLS } from "./useColumnCount";
import { featuredProjects } from "../data/projects";

/* A 2x2 that converges horizontally: each column arrives from its own side. */
const FROM: FlyDirection[] = ["left", "right", "left", "right"];

/**
 * The prominent projects, as a 2x2 of large cover-art tiles. Deliberately a
 * different object from the All Projects cards — cover screenshot behind the
 * title, roughly three times the area — because the whole job of this section
 * is to read as "these are the good ones" before a word is read.
 *
 * Never filtered, so unlike AllProjectsGrid there is no entry mode to switch:
 * these tiles only ever play the page-load fly-in.
 */
export default function ProminentProjects() {
  const [open, setOpen] = useState<string | null>(null);
  const cols = useColumnCount(TWO_COLS);

  const triggers = useRef(new Map<string, HTMLButtonElement | null>());
  const panelRef = useRef<HTMLDivElement>(null);

  const expandedIndex = featuredProjects.findIndex((p) => p.slug === open);
  const expanded = expandedIndex === -1 ? null : featuredProjects[expandedIndex];

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

  if (featuredProjects.length === 0) return null;

  const children: React.ReactNode[] = featuredProjects.map((p, i) => {
    const isOpen = p.slug === open;
    return (
      <Tile
        // Keyed by slug, never index: .tile-animate is mount-triggered.
        key={p.slug}
        from={FROM[i % FROM.length]}
        delay={i * 0.08}
        hoverable={false}
        // 4:3 rather than a true square: at two columns a square tile is
        // taller than it is useful, which is a wall of scroll before the
        // All Projects section.
        className={`!p-0 aspect-[4/3] ${isOpen ? "border-carolina/40" : ""}`}
      >
        <h3 className="flex flex-1 font-normal">
          <button
            type="button"
            ref={(el) => {
              triggers.current.set(p.slug, el);
            }}
            id={`fp-trigger-${p.slug}`}
            aria-expanded={isOpen}
            {...(isOpen ? { "aria-controls": "prominent-panel" } : {})}
            onClick={() => (isOpen ? close(false) : setOpen(p.slug))}
            // `relative` so the fill image anchors to the button, not the Tile.
            className={`relative flex h-full w-full flex-col justify-end p-5 text-left ring-inset ring-carolina transition-shadow duration-200 hover:ring-2 focus-visible:outline-none focus-visible:ring-2 ${
              isOpen ? "ring-2" : ""
            }`}
          >
            {p.cover ? (
              <Image
                src={p.cover}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 944px) 50vw, 425px"
                className="object-cover"
                priority={i < 2}
              />
            ) : (
              <span aria-hidden="true" className="cover-grid absolute inset-0" />
            )}

            {/* Scrim. Strong at the bottom because the title sits there and the
                Vechter cover is near-white — one gradient has to carry both. */}
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/20"
            />

            <span className="relative flex flex-col gap-2">
              <span className="font-display text-xl leading-tight text-chalk sm:text-2xl">
                {p.title}
              </span>
              {p.year && <span className="text-xs text-ash">{p.year}</span>}
              <span className="flex flex-wrap items-center gap-2">
                <TechLogos tech={p.tech} />
              </span>
            </span>
          </button>
        </h3>
      </Tile>
    );
  });

  /* The panel is its own full-width grid child, spliced in at the END of the
     expanded tile's row. Making the tile itself col-span-full instead would
     push it to the next row and leave a dead cell behind it. */
  if (expanded) {
    const insertAt = Math.min(
      (Math.floor(expandedIndex / cols) + 1) * cols,
      featuredProjects.length,
    );
    children.splice(
      insertAt,
      0,
      <ProjectPanel
        key="prominent-panel"
        panelId="prominent-panel"
        labelledBy={`fp-trigger-${expanded.slug}`}
        project={expanded}
        onClose={close}
        panelRef={panelRef}
      />,
    );
  }

  return (
    // One flat keyed array, not sliced sibling expressions: separate
    // expressions are separate child slots, and a tile crossing a slot
    // boundary would remount and re-fire its fly-in.
    <div
      onKeyDown={(e) => {
        if (e.key === "Escape" && open) close();
      }}
      className="mx-auto grid w-full max-w-[880px] grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2"
    >
      {children}
    </div>
  );
}
