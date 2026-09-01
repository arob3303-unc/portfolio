"use client";

import { useMemo, useState } from "react";
import TechFilter from "./TechFilter";
import ProminentProjects from "./ProminentProjects";
import AllProjectsGrid from "./AllProjectsGrid";
import { projects } from "../data/projects";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-5 font-display text-2xl text-chalk sm:text-3xl">
      {children}
    </h2>
  );
}

/**
 * Owns the filter state for the projects page. The filter narrows All Projects
 * only — the prominent three are always shown.
 */
export default function ProjectsExplorer() {
  const [selected, setSelected] = useState<Set<string>>(new Set());

  /* AND: a project has to carry every checked tag. */
  const visible = useMemo(() => {
    if (selected.size === 0) return projects;
    return projects.filter((p) => {
      const labels = new Set(p.tech.map((t) => t.label));
      return [...selected].every((s) => labels.has(s));
    });
  }, [selected]);

  const toggle = (label: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (!next.delete(label)) next.add(label);
      return next;
    });

  return (
    <div className="flex flex-col gap-12">
      <TechFilter
        selected={selected}
        onToggle={toggle}
        onClear={() => setSelected(new Set())}
        shown={visible.length}
        total={projects.length}
      />

      <section>
        <SectionTitle>Prominent Projects</SectionTitle>
        <ProminentProjects />
      </section>

      <section>
        <SectionTitle>All Projects</SectionTitle>
        <AllProjectsGrid visible={visible} />
      </section>
    </div>
  );
}
