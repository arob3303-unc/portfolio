"use client";

import { useEffect, useState } from "react";

export type ColumnBreakpoint = { query: string; cols: number };

/* Each ladder mirrors the grid-cols-* classes on one grid. Keep them in sync:
   the expanded detail panel is spliced in at a row boundary, and that boundary
   is only correct if this agrees with the CSS. Widest first. */

/** AllProjectsGrid: grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 */
export const GRID_COLS: ColumnBreakpoint[] = [
  { query: "(min-width: 1024px)", cols: 3 },
  { query: "(min-width: 640px)", cols: 2 },
];

/** ProminentProjects: grid-cols-1 sm:grid-cols-2 */
export const TWO_COLS: ColumnBreakpoint[] = [
  { query: "(min-width: 640px)", cols: 2 },
];

const BASE_COLS = 1;

/**
 * The number of columns the given grid is currently rendering.
 *
 * Starts at BASE_COLS so the server render and the first client render agree —
 * no hydration mismatch. An effect corrects it before any click is possible,
 * and the value is only ever read to place a panel that does not exist until
 * the user expands something.
 *
 * Pass a module-level constant: the array is a dependency of the effect, so a
 * literal built inline would resubscribe on every render.
 */
export default function useColumnCount(
  breakpoints: ColumnBreakpoint[] = GRID_COLS,
) {
  const [cols, setCols] = useState(BASE_COLS);

  useEffect(() => {
    const lists = breakpoints.map((b) => ({
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
  }, [breakpoints]);

  return cols;
}
