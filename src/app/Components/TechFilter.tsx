"use client";

import type React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { FILTER_TECH } from "../data/projects";

type Props = {
  selected: Set<string>;
  onToggle: (label: string) => void;
  onClear: () => void;
  shown: number;
  total: number;
};

function Arrow({
  dir,
  disabled,
  onClick,
}: {
  dir: "left" | "right";
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === "left" ? "Scroll filters left" : "Scroll filters right"}
      className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-ash transition-colors hover:text-chalk focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina disabled:pointer-events-none disabled:opacity-25"
    >
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-3.5 w-3.5">
        <path
          d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

/**
 * A compact stadium rail of tech chips. Only a handful are visible at once —
 * the rest scroll horizontally, and chips stay checkable while you scroll.
 * Multi-select, AND logic: a project has to carry every checked tag.
 */
export default function TechFilter({
  selected,
  onToggle,
  onClear,
  shown,
  total,
}: Props) {
  const rail = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const sync = useCallback(() => {
    const el = rail.current;
    if (!el) return;
    // 1px of slack: fractional scroll widths never land exactly on the end.
    setAtStart(el.scrollLeft <= 1);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    sync();
    const el = rail.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => ro.disconnect();
  }, [sync]);

  const nudge = (by: number) =>
    rail.current?.scrollBy({
      left: by,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
    });

  /* Click-and-drag to scroll the rail. Mouse only — touch and pen already get
     native momentum scrolling, and capturing those would take it away. */
  const drag = useRef({ active: false, startX: 0, startLeft: 0, moved: false });
  const suppressClick = useRef(false);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = rail.current;
    if (e.pointerType !== "mouse" || !el) return;
    drag.current = {
      active: true,
      startX: e.clientX,
      startLeft: el.scrollLeft,
      moved: false,
    };
    // Deliberately NOT capturing the pointer here: an active pointer capture
    // retargets the follow-up `click` to this rail, so chips would never
    // receive it. Capture is taken lazily below, once a real drag begins.
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    const el = rail.current;
    if (!d.active || !el) return;
    const dx = e.clientX - d.startX;
    // A few pixels of slop, so a slightly shaky click still toggles a chip.
    if (!d.moved && Math.abs(dx) > 4) {
      d.moved = true;
      // Now that it is a drag and not a click, capture so it keeps tracking
      // when the cursor leaves the rail.
      el.setPointerCapture(e.pointerId);
    }
    if (d.moved) el.scrollLeft = d.startLeft - dx;
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.current.active) return;
    const dragged = drag.current.moved;
    drag.current.active = false;
    const el = rail.current;
    if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    if (!dragged) return;
    // Swallow the click this drag is about to produce, so releasing on top of
    // a chip doesn't toggle it. Cleared next tick if no click follows.
    suppressClick.current = true;
    setTimeout(() => {
      suppressClick.current = false;
    }, 0);
  };

  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
      <div className="flex max-w-full items-center gap-1.5 rounded-full border border-edge bg-tile py-1.5 pl-2 pr-2">
        <Arrow dir="left" disabled={atStart} onClick={() => nudge(-200)} />

        <div
          ref={rail}
          onScroll={sync}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={() => (drag.current.active = false)}
          onClickCapture={(e) => {
            if (!suppressClick.current) return;
            e.preventDefault();
            e.stopPropagation();
          }}
          role="group"
          aria-label="Filter by technology"
          // ~5 chips wide; the rest scroll. Scrollbar hidden — the arrows, the
          // grab cursor and the cut-off chip at the edge are the affordance.
          className="flex w-[19rem] cursor-grab select-none items-center gap-1.5 overflow-x-auto [scrollbar-width:none] active:cursor-grabbing sm:w-[24rem] [&::-webkit-scrollbar]:hidden"
        >
          {FILTER_TECH.map((t) => {
            const on = selected.has(t.label);
            return (
              <button
                key={t.label}
                type="button"
                aria-pressed={on}
                onClick={() => onToggle(t.label)}
                className={`shrink-0 rounded-full border px-2.5 py-1 text-[11px] leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina ${
                  on
                    ? "border-carolina bg-carolina font-medium text-ink"
                    : "border-transparent text-ash hover:bg-tile-hi hover:text-chalk"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <Arrow dir="right" disabled={atEnd} onClick={() => nudge(200)} />
      </div>

      {selected.size > 0 && (
        <p className="text-xs text-ash">
          {shown} of {total}.{" "}
          <button
            type="button"
            onClick={onClear}
            className="text-carolina underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina"
          >
            Clear
          </button>
        </p>
      )}

      <p className="sr-only" aria-live="polite">
        {shown} of {total} projects shown.
      </p>
    </div>
  );
}
