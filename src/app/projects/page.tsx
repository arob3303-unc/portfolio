import type { Metadata } from "next";
import ProjectsExplorer from "../Components/ProjectsExplorer";

export const metadata: Metadata = {
  title: "Projects — Austin Robinson",
  description:
    "Full-stack web apps, games, and an algorithmic trading backtester.",
};

export default function ProjectsPage() {
  return (
    <section>
      {/* Visually dropped at Austin's request; kept for document outline. */}
      <h1 className="sr-only">Projects</h1>
      <ProjectsExplorer />
    </section>
  );
}
