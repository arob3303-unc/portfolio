import Image from "next/image";
import type { Ref } from "react";
import type { Project, Tech } from "../data/projects";

/** Disclosure caret. Lives here because both project grids use it. */
export function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={`h-4 w-4 shrink-0 transition-transform duration-300 motion-reduce:transition-none ${
        open ? "rotate-180" : ""
      }`}
    >
      <path
        d="M6 9l6 6 6-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Tech as small labelled chips. Renders a logo only where one exists. */
export function TechChips({ tech }: { tech: Tech[] }) {
  if (tech.length === 0) return null;
  return (
    <ul className="flex flex-wrap gap-1.5">
      {tech.map((t) => (
        <li
          key={t.label}
          className="inline-flex items-center gap-1.5 rounded-md border border-edge px-2 py-1 text-[11px] leading-none text-chalk/90"
        >
          {t.src && (
            <Image
              src={t.src}
              alt=""
              width={14}
              height={14}
              className="h-3.5 w-3.5 shrink-0 object-contain"
            />
          )}
          {t.label}
        </li>
      ))}
    </ul>
  );
}

/** Tech as bare logos for a card face. Entries without a logo are skipped. */
export function TechLogos({ tech }: { tech: Tech[] }) {
  const withLogo = tech.filter((t) => t.src);
  if (withLogo.length === 0) return null;
  return (
    <>
      {withLogo.slice(0, 5).map((t) => (
        <Image
          key={t.label}
          src={t.src as string}
          alt={t.label}
          width={26}
          height={26}
          className="h-6 w-6 object-contain"
        />
      ))}
    </>
  );
}

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <h4 className="font-display text-[10px] uppercase tracking-[0.18em] text-ash">
        {label}
      </h4>
      <p className="mt-1.5 text-sm leading-relaxed text-chalk/90">{value}</p>
    </div>
  );
}

/**
 * `primary` is the deployed-site link. It gets a solid Carolina fill and black
 * text rather than the outline every other link wears, because a recruiter
 * skimming the panel should find the thing they can click and *use* without
 * reading the row — the outline buttons all look alike at a glance.
 */
function LinkButton({
  href,
  label,
  variant = "default",
}: {
  href: string;
  label: string;
  variant?: "default" | "primary";
}) {
  const base =
    "inline-flex items-center gap-2 rounded-md px-3 py-2 text-xs transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina focus-visible:ring-offset-2 focus-visible:ring-offset-tile-hi";
  const skin =
    variant === "primary"
      ? "border border-carolina bg-carolina font-semibold text-ink hover:bg-[#69b0e0] hover:border-[#69b0e0]"
      : "border border-edge text-chalk hover:border-carolina hover:text-carolina";

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={`${base} ${skin}`}>
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink/70 motion-safe:animate-pulse"
        />
      )}
      {label} <span aria-hidden="true">&rarr;</span>
    </a>
  );
}

/**
 * The body of an expanded project — shared by the prominent rows and the
 * All Projects grid, so the two never drift apart.
 */
export default function ProjectDetail({ project }: { project: Project }) {
  const hasWriteUp =
    project.problem || project.role || project.challenge || project.outcome;

  return (
    <div className="flex flex-col gap-5">
      {project.image && (
        <div className="overflow-hidden rounded-lg border border-edge">
          <Image
            src={project.image}
            alt={`${project.title} screenshot`}
            width={project.imageWidth ?? 1600}
            height={project.imageHeight ?? 900}
            sizes="(max-width: 768px) 100vw, 800px"
            className="h-auto w-full object-cover"
          />
        </div>
      )}

      {hasWriteUp && (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label="The problem" value={project.problem} />
          <Field label="My role" value={project.role} />
          <Field label="Hardest part" value={project.challenge} />
          <Field label="Outcome" value={project.outcome} />
        </div>
      )}

      {project.bullets.length > 0 && (
        <ul className="flex flex-col gap-2">
          {project.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm leading-relaxed text-chalk/90">
              <span
                aria-hidden="true"
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-carolina"
              />
              {b}
            </li>
          ))}
        </ul>
      )}

      <TechChips tech={project.tech} />

      {/* Live site leads the row: it is the one link that shows the work
          running, so it should be the first thing the eye lands on. */}
      {(project.repo || project.site || project.links?.length) && (
        <div className="flex flex-wrap items-center gap-2">
          {project.site && (
            <LinkButton href={project.site} label="View live site" variant="primary" />
          )}
          {project.repo && <LinkButton href={project.repo} label="GitHub repo" />}
          {project.links?.map((l) => (
            <LinkButton key={l.href} href={l.href} label={l.label} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * The expanded panel both sections splice into their grid as a full-width
 * child. Shared so the prominent tiles and the All Projects cards can never
 * drift into looking like two different disclosures.
 */
export function ProjectPanel({
  project,
  panelId,
  labelledBy,
  onClose,
  panelRef,
}: {
  project: Project;
  panelId: string;
  labelledBy: string;
  onClose: () => void;
  panelRef?: Ref<HTMLDivElement>;
}) {
  return (
    <div
      id={panelId}
      ref={panelRef}
      role="region"
      aria-labelledby={labelledBy}
      className="animate-rise-in col-span-full rounded-xl border border-carolina/40 bg-tile-hi p-6"
    >
      <div className="mb-5 flex items-baseline justify-between gap-4">
        <h4 className="font-display text-xl text-chalk">{project.title}</h4>
        {project.year && (
          <span className="shrink-0 text-xs text-ash">{project.year}</span>
        )}
      </div>

      <ProjectDetail project={project} />

      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-md border border-edge px-3 py-2 text-xs text-ash transition-colors hover:border-carolina hover:text-carolina focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina"
      >
        Collapse
      </button>
    </div>
  );
}
