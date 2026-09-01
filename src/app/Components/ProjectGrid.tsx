"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import Tile, { type FlyDirection } from "./Tile";
import ProjectModal from "./ProjectModal";
import { projects, type Project } from "../data/projects";

/* 9 projects fill a 3x3 grid exactly. Outer columns fly in from their own
   side; the middle column comes from above or below depending on its row. */
function directionFor(index: number): FlyDirection {
  const col = index % 3;
  const row = Math.floor(index / 3);
  if (col === 0) return "left";
  if (col === 2) return "right";
  return row === 0 ? "top" : "bottom";
}

export default function ProjectGrid() {
  const [active, setActive] = useState<Project | null>(null);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <Tile
            key={project.slug}
            from={directionFor(i)}
            delay={i * 0.06}
            className="min-h-[180px] justify-between"
            onClick={() => setActive(project)}
            label={`Open details for ${project.title}`}
          >
            <h2 className="font-display text-xl text-chalk transition-colors duration-300 group-hover:text-ink">
              {project.title}
            </h2>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {project.tech.map((t) => (
                <Image
                  key={t.src}
                  src={t.src}
                  alt={t.label}
                  title={t.label}
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              ))}
            </div>

            <span className="mt-4 text-xs uppercase tracking-[0.2em] text-ash transition-colors duration-300 group-hover:text-ink/60">
              View details
            </span>
          </Tile>
        ))}
      </div>

      <ProjectModal project={active} onClose={close} />
    </>
  );
}
