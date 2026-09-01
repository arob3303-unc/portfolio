"use client";

import { FILTER_TECH } from "../data/projects";

type Props = {
  selected: Set<string>;
  onToggle: (label: string) => void;
  onClear: () => void;
  shown: number;
  total: number;
};

/**
 * The stadium pill from the wireframe. Multi-select, AND logic: a project has
 * to carry every checked tag. Filters the All Projects grid only.
 */
export default function TechFilter({
  selected,
  onToggle,
  onClear,
  shown,
  total,
}: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div
        role="group"
        aria-label="Filter All Projects by technology"
        className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-edge bg-tile px-5 py-4 sm:px-7"
      >
        {FILTER_TECH.map((t) => {
          const on = selected.has(t.label);
          return (
            <button
              key={t.label}
              type="button"
              aria-pressed={on}
              onClick={() => onToggle(t.label)}
              className={`rounded-full border px-3 py-1.5 text-xs leading-none transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina focus-visible:ring-offset-2 focus-visible:ring-offset-ink ${
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

      {/* The bar sits above Prominent Projects but does not filter it, so say so. */}
      <p className="text-xs text-ash">
        {selected.size === 0 ? (
          "Filters the All Projects grid below."
        ) : (
          <>
            Showing {shown} of {total} in All Projects.{" "}
            <button
              type="button"
              onClick={onClear}
              className="text-carolina underline underline-offset-4 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina"
            >
              Clear filters
            </button>
          </>
        )}
      </p>

      <p className="sr-only" aria-live="polite">
        {shown} of {total} projects shown.
      </p>
    </div>
  );
}
