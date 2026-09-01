"use client";

import { useEffect, useState } from "react";

/* Mirrors the grid-cols-* classes on AllProjectsGrid. Keep the two in sync:
   the expanded detail panel is spliced in at a row boundary, and that boundary
   is only correct if this agrees with the CSS. Widest first. */
const BREAKPOINTS = [
  { query: "(min-width: 1024px)", cols: 3 },
  { query: "(min-width: 640px)", cols: 2 },
];
const BASE_COLS = 1;

/**
 * The number of columns the grid is currently rendering.
 *
 * Starts at BASE_COLS so the server render and the first client render agree —
 * no hydration mismatch. An effect corrects it before any click is possible,
 * and the value is only ever read to place a panel that does not exist until
 * the user expands something.
 */
export default function useColumnCount() {
  const [cols, setCols] = useState(BASE_COLS);

  useEffect(() => {
    const lists = BREAKPOINTS.map((b) => ({
      mql: window.matchMedia(b.query),
      cols: b.cols,
    }));

    const sync = () => {
      const hit = lists.find((l) => l.mql.matches);
      setCols(hit ? hit.cols : BASE_COLS);
    };

    sync();
    lists.forEach((l) => l.mql.addEventListener("change", sync));
    return () => lists.forEach((l) => l.mql.removeEventListener("change", sync));
  }, []);

  return cols;
}
