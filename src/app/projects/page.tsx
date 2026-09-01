import type { Metadata } from "next";
import ProjectGrid from "../Components/ProjectGrid";

export const metadata: Metadata = {
  title: "Projects — Austin Robinson",
  description:
    "Full-stack web apps, games, and an algorithmic trading backtester.",
};

export default function ProjectsPage() {
  return (
    <section>
      <h1 className="mb-2 font-display text-4xl text-chalk sm:text-5xl">
        Projects
      </h1>
      <p className="mb-8 max-w-2xl text-sm text-ash">
        Select a project to read what it does, how it was built, and what broke
        along the way.
      </p>
      <ProjectGrid />
    </section>
  );
}
