"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const ZOOM = 3;
/** Drag further than this and the pointer-up is a pan, not a zoom toggle. */
const DRAG_SLOP = 6;

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** Class for the inline thumbnail's wrapper (grid placement, sizing). */
  className?: string;
};

/**
 * Click the thumbnail to open the photo full-screen; click the photo to zoom
 * in on the spot you clicked, click again to zoom back out. While zoomed you
 * can drag to pan. Escape, the close button, or the backdrop all close it.
 */
export default function PhotoLightbox({
  src,
  alt,
  width,
  height,
  className = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  /** Zoom anchor, in percent of the image box, from the click that zoomed in. */
  const [origin, setOrigin] = useState({ x: 50, y: 50 });
  const [pan, setPan] = useState({ x: 0, y: 0 });

  const stageRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);
  /** Live drag bookkeeping; refs so pointermove doesn't re-render per pixel. */
  const drag = useRef({ active: false, moved: false, x: 0, y: 0, panX: 0, panY: 0 });

  const close = useCallback(() => {
    setOpen(false);
    setZoomed(false);
    setPan({ x: 0, y: 0 });
  }, []);

  // Escape closes; while open, the page behind must not scroll.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    // Captured now: on cleanup the ref may already point elsewhere.
    const opener = openerRef.current;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
      opener?.focus();
    };
  }, [open, close]);

  /**
   * Keep the scaled image covering the frame, so panning never drags a black
   * gap into view. The travel is lopsided: the zoom is anchored wherever the
   * click landed, which is rarely the centre.
   */
  const clamp = (next: { x: number; y: number }) => {
    const box = stageRef.current?.getBoundingClientRect();
    if (!box) return next;
    const k = ZOOM - 1;
    const maxX = (k * origin.x * box.width) / 100;
    const minX = -k * (1 - origin.x / 100) * box.width;
    const maxY = (k * origin.y * box.height) / 100;
    const minY = -k * (1 - origin.y / 100) * box.height;
    return {
      x: Math.max(minX, Math.min(maxX, next.x)),
      y: Math.max(minY, Math.min(maxY, next.y)),
    };
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!zoomed) return;
    drag.current = {
      active: true,
      moved: false,
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.moved && Math.hypot(dx, dy) > DRAG_SLOP) d.moved = true;
    if (d.moved) setPan(clamp({ x: d.panX + dx, y: d.panY + dy }));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    const dragged = drag.current.moved;
    drag.current.active = false;
    if (dragged) return; // that was a pan, leave the zoom alone

    if (zoomed) {
      setZoomed(false);
      setPan({ x: 0, y: 0 });
      return;
    }
    // Anchor the zoom on the point that was clicked.
    const box = e.currentTarget.getBoundingClientRect();
    setOrigin({
      x: ((e.clientX - box.left) / box.width) * 100,
      y: ((e.clientY - box.top) / box.height) * 100,
    });
    setPan({ x: 0, y: 0 });
    setZoomed(true);
  };

  return (
    <>
      <button
        ref={openerRef}
        type="button"
        onClick={() => setOpen(true)}
        aria-label={`${alt} — open full screen`}
        className={`group/photo relative block cursor-zoom-in overflow-hidden ${className}`}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 motion-reduce:transition-none group-hover/photo:scale-105"
        />
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt}
          onClick={close}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close photo"
            className="absolute right-4 top-4 z-10 rounded-full border border-white/25 px-3 py-1.5 text-sm text-white transition-colors hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina"
          >
            Close ✕
          </button>

          <p className="pointer-events-none absolute bottom-5 left-1/2 z-10 -translate-x-1/2 text-center text-xs text-white/60">
            {zoomed ? "Drag to look around · click to zoom out" : "Click the photo to zoom in"}
          </p>

          {/* Sized to the photo's own aspect so the frame is the photo: a
              click's coordinates map straight onto the image, no letterboxing. */}
          <div
            ref={stageRef}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={() => (drag.current.active = false)}
            style={{
              aspectRatio: `${width} / ${height}`,
              maxWidth: `min(96vw, calc(88vh * ${width} / ${height}))`,
            }}
            className={`relative w-full touch-none overflow-hidden select-none ${
              zoomed ? "cursor-grab active:cursor-grabbing" : "cursor-zoom-in"
            }`}
          >
            <div
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomed ? ZOOM : 1})`,
                transformOrigin: `${origin.x}% ${origin.y}%`,
              }}
              className="h-full w-full transition-transform duration-300 ease-out motion-reduce:transition-none"
            >
              <Image
                src={src}
                alt={alt}
                fill
                quality={95}
                sizes="96vw"
                draggable={false}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
