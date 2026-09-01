import Image from "next/image";
import type { Project, Tech } from "../data/projects";

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
          width={20}
          height={20}
          className="h-5 w-5 object-contain"
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

function LinkButton({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 rounded-md border border-edge px-3 py-2 text-xs text-chalk transition-colors duration-200 hover:border-carolina hover:text-carolina focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-carolina"
    >
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

      {(project.repo || project.site || project.links?.length) && (
        <div className="flex flex-wrap gap-2">
          {project.repo && <LinkButton href={project.repo} label="GitHub repo" />}
          {project.site && <LinkButton href={project.site} label="Live site" />}
          {project.links?.map((l) => (
            <LinkButton key={l.href} href={l.href} label={l.label} />
          ))}
        </div>
      )}
    </div>
  );
}
