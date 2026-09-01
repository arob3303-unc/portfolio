import React from "react";

export type FlyDirection = "left" | "right" | "top" | "bottom" | "none";

/* Where a tile starts before it converges on the grid. Outer tiles come from
   their own side of the viewport so the whole grid collapses inward. */
const OFFSETS: Record<FlyDirection, { dx: string; dy: string }> = {
  left: { dx: "-45vw", dy: "0px" },
  right: { dx: "45vw", dy: "0px" },
  top: { dx: "0px", dy: "-40vh" },
  bottom: { dx: "0px", dy: "40vh" },
  none: { dx: "0px", dy: "0px" },
};

type TileProps = {
  from?: FlyDirection;
  /** Stagger, in seconds. */
  delay?: number;
  /** Grid placement and any per-tile layout, supplied by the caller. */
  className?: string;
  onClick?: () => void;
  label?: string;
  /**
   * Fill with Carolina blue on hover. Turn this off for tiles the user works
   * inside (a form): the `group` class is dropped too, so the descendant
   * `group-hover:` text colours stay inert rather than going black on black.
   */
  hoverable?: boolean;
  children: React.ReactNode;
};

export default function Tile({
  from = "none",
  delay = 0,
  className = "",
  onClick,
  label,
  hoverable = true,
  children,
}: TileProps) {
  const { dx, dy } = OFFSETS[from];
  const interactive = typeof onClick === "function";

  return (
    <div
      className={[
        "tile-animate relative flex flex-col overflow-hidden rounded-xl",
        "border border-edge bg-tile p-6 text-chalk transition-colors duration-300",
        hoverable ? "group hover:bg-carolina hover:text-ink" : "",
        // Inset ring: the grid clips overflow during the fly-in, and an
        // outset ring on an edge tile would be clipped with it.
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-carolina",
        interactive ? "cursor-pointer text-left" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        {
          "--dx": dx,
          "--dy": dy,
          "--d": `${delay}s`,
        } as React.CSSProperties
      }
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.();
              }
            }
          : undefined
      }
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? label : undefined}
    >
      {children}
    </div>
  );
}

/** Section heading used inside a tile. */
export function TileTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-xs uppercase tracking-[0.2em] text-ash transition-colors duration-300 group-hover:text-ink/60">
      {children}
    </h2>
  );
}
