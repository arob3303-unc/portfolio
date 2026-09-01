"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Project } from "../data/projects";

type Props = {
  project: Project | null;
  onClose: () => void;
};

export default function ProjectModal({ project, onClose }: Props) {
  const panelRef = useRef<HTMLDivElement>(null);
  const open = project !== null;

  useEffect(() => {
    if (!open) return;

    // Both handlers live inside the effect so the listeners are attached once
    // per open, not re-subscribed on every render.
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    const onPointerDown = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("mousedown", onPointerDown);

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("mousedown", onPointerDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  if (!project) return null;

  return (
    <div
      className="animate-fade-in fixed inset-0 z-50 flex items-center justify-center bg-ink/80 p-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={panelRef}
        className="animate-rise-in flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden rounded-xl border border-edge bg-tile"
      >
        <div className="flex items-start justify-between gap-4 border-b border-edge px-6 py-4">
          <h2
            id="project-modal-title"
            className="font-display text-2xl text-chalk"
          >
            {project.title}
          </h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 rounded-md border border-edge px-3 py-1 text-sm text-ash transition-colors hover:border-carolina hover:bg-carolina hover:text-ink"
          >
            Close
          </button>
        </div>

        <div className="overflow-y-auto px-6 py-5">
          <div className="mb-5 overflow-hidden rounded-lg border border-edge bg-ink">
            <Image
              src={project.image}
              alt={`Screenshot of ${project.title}`}
              width={project.imageWidth}
              height={project.imageHeight}
              sizes="(max-width: 768px) 100vw, 700px"
              className="h-auto w-full object-contain"
            />
          </div>

          <ul className="space-y-3">
            {project.bullets.map((bullet, i) => (
              <li key={i} className="flex gap-3 text-sm leading-relaxed text-chalk/90">
                <span aria-hidden className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-carolina" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap items-center gap-4">
            {project.tech.map((t) => (
              <Image
                key={t.src}
                src={t.src}
                alt={t.label}
                title={t.label}
                width={32}
                height={32}
                className="h-8 w-8 object-contain transition-transform duration-300 hover:scale-110"
              />
            ))}
          </div>

          {project.link && (
            <a
              href={project.link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-md border border-carolina px-4 py-2 text-sm text-carolina transition-colors hover:bg-carolina hover:text-ink"
            >
              {project.link.label} &rarr;
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
