// components/portfolios.tsx
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { getPortfolios } from "@/adapter/portfolios";
import type { Portfolio } from "@/adapter/types";
import { PORTFOLIOS_SERVICE } from "@/adapter/constants";


/* ── Config ── */
const DELAY = { HEADER: 0, FIRST: 100, SECOND: 200, BOTTOM_BASE: 300, BOTTOM_STEP: 100 } as const;

/* ── Page component ── */
export async function Portfolios() {
  const t = await getTranslations("Showcases");
  const locale = await getLocale();
  const { data: portfolios } = await getPortfolios(locale);

  // Only take the first 4 projects
  const projects = portfolios.slice(0, 4);
  const [first, second, ...rest] = projects;

  return (
    <section
      id="work"
      className="relative border-t border-surface-variant
                 max-w-[1280px] mx-auto
                 px-6 md:px-12 lg:px-24
                 py-16 md:py-24 lg:py-32"
    >
      <FadeIn
        delay={DELAY.HEADER}
        className="mb-10 md:mb-16"
      >
        <div className="border-l-2 border-primary pl-4 md:pl-6">
          <h2 className="font-display-lg text-2xl md:text-5xl lg:text-6xl text-on-surface tracking-tight">
            {t("sectionTitle")}
          </h2>
        </div>
      </FadeIn>

      <div className="space-y-16 md:space-y-24 lg:space-y-32">
        {first && (
          <FadeIn delay={DELAY.FIRST}>
            <ProjectRow project={first} reverse={false} t={t} />
          </FadeIn>
        )}

        {second && (
          <FadeIn delay={DELAY.SECOND}>
            <ProjectRow project={second} reverse={true} t={t} />
          </FadeIn>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {rest.map((project, i) => (
            <FadeIn key={project.id} delay={DELAY.BOTTOM_BASE + i * DELAY.BOTTOM_STEP}>
              <ProjectCard project={project} t={t} />
            </FadeIn>
          ))}
        </div>
      </div>

      <FadeIn delay={DELAY.BOTTOM_BASE + 100} className="mt-12 md:mt-16 text-center">
        <Link
          target="_blank"
          href={PORTFOLIOS_SERVICE.origin}
          className="font-label-caps text-xs md:text-sm
                     text-on-surface-variant hover:text-primary
                     inline-flex items-center transition-colors
                     pb-2
                     border-b border-on-surface-variant/30 hover:border-primary
                     uppercase tracking-widest"
        >
          {t("viewAll")}
          <ArrowRight size={14} className="ml-2" />
        </Link>
      </FadeIn>
    </section>
  );
}

/* ── Project row (large projects) ── */
function ProjectRow({
  project,
  reverse,
  t,
}: {
  project: Portfolio;
  reverse: boolean;
  t: (key: string) => string;
}) {
  return (
    <article className="group">
      <div
        className={`flex flex-col gap-8 lg:gap-16 ${
          reverse ? "lg:flex-row-reverse" : "lg:flex-row"
        }`}
      >
        <div className="lg:w-7/12 transition-transform duration-700 ease-out lg:group-hover:-translate-y-2">
          <div className="relative aspect-[4/3] overflow-hidden bg-surface-container">
            <div className="absolute inset-0 bg-primary/5 lg:group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply" />
            <Image
              alt={project.title}
              src={project.previewUrl}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-top
                         filter
                          lg:group-hover:scale-105
                         transition-all duration-1000 ease-out"
            />
          </div>
        </div>

        <div className="lg:w-5/12 flex flex-col justify-center">
          <h3 className="font-headline-lg text-3xl md:text-4xl text-on-surface mt-6 mb-4 md:mb-6">
            {project.title}
          </h3>
          <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed max-w-md">
            {project.description}
          </p>
          <TagsRow tags={project.keywords} variant="separator" />
          <CaseLink webUrl={project.webUrl} sourceUrl={project.sourceUrl} title={project.title} liveDemoLabel={t("liveDemo")} viewSourceLabel={t("viewSource")} />
        </div>
      </div>
    </article>
  );
}

/* ── Project card (small projects) ── */
function ProjectCard({ project, t }: { project: Portfolio; t: (key: string) => string }) {
  return (
    <article className="group">
      <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface mt-4 mb-3 md:mb-4">
        {project.title}
      </h3>

      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container mb-6">
        <div className="absolute inset-0 bg-primary/10 lg:group-hover:bg-transparent transition-colors duration-700 z-10" />
        <Image
          alt={project.title}
          src={project.previewUrl}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-top
                     filter sepia-[.2]
                     lg:group-hover:sepia-0 lg:group-hover:scale-105
                     transition-all duration-1000 ease-out"
        />
      </div>
      <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-2">
        {project.description}
      </p>
      <TagsRow tags={project.keywords} variant="separator" />
      <CaseLink webUrl={project.webUrl} sourceUrl={project.sourceUrl} title={project.title} liveDemoLabel={t("liveDemo")} viewSourceLabel={t("viewSource")} />
    </article>
  );
}

/* ── Atomic components ── */

function TagsRow({
  tags,
  variant = "plain",
}: {
  tags: string[];
  variant?: "plain" | "underline" | "separator";
}) {
  if (!tags.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-3 md:gap-4 my-4 md:my-6">
      {tags.map((tag, i) => (
        <span key={tag} className="flex items-center gap-2">
          {variant === "separator" && i > 0 && (
            <span className="text-surface-variant text-sm">/</span>
          )}
          <span
            className={`font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant ${
              variant === "underline" ? "border-b border-surface-variant pb-1" : ""
            }`}
          >
            {tag}
          </span>
        </span>
      ))}
    </div>
  );
}

function CaseLink({ webUrl, sourceUrl, title, liveDemoLabel, viewSourceLabel }: { webUrl: string; sourceUrl: string; title: string; liveDemoLabel: string; viewSourceLabel: string }) {
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3 md:gap-6 mt-4 md:mt-0">
      <Link
        href={webUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${liveDemoLabel} - ${title}`}
        className="group/link inline-flex items-center justify-center gap-2
                   font-label-caps text-[10px] md:text-xs tracking-widest uppercase
                   border border-on-surface
                   text-on-surface
                   px-6 py-3
                   hover:bg-primary hover:text-on-primary hover:border-primary
                   transition-all duration-300"
      >
        {liveDemoLabel}
      </Link>
      <Link
        href={sourceUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${viewSourceLabel} - ${title}`}
        className="group/link inline-flex items-center justify-center gap-2
                   font-label-caps text-[10px] md:text-xs tracking-widest uppercase
                   border border-on-surface
                   text-on-surface
                   px-6 py-3
                   hover:bg-primary hover:text-on-primary hover:border-primary
                   transition-all duration-300"
      >
        {viewSourceLabel}
      </Link>
    </div>
  );
}

/* ── Loading skeleton ── */
export function PortfoliosSkeleton() {
  return (
    <section
      id="work"
      className="relative border-t border-surface-variant
                 max-w-[1280px] mx-auto
                 px-6 md:px-12 lg:px-24
                 py-16 md:py-24 lg:py-32"
    >
      {/* Header skeleton */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <div className="h-10 md:h-12 lg:h-14 w-48 bg-surface-container-high rounded animate-pulse" />
        </div>
        <div className="h-4 w-20 bg-surface-container-high rounded animate-pulse self-start md:self-auto" />
      </div>

      <div className="space-y-16 md:space-y-24 lg:space-y-32">
        {/* First project row skeleton */}
        <div className="flex flex-col gap-8 lg:gap-16 lg:flex-row">
          <div className="lg:w-7/12">
            <div className="aspect-[4/3] bg-surface-container-high rounded animate-pulse" />
          </div>
          <div className="lg:w-5/12 flex flex-col justify-center space-y-4">
            <div className="h-8 md:h-10 w-3/4 bg-surface-container-high rounded animate-pulse" />
            <div className="h-4 w-full bg-surface-container-high rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-surface-container-high rounded animate-pulse" />
            <div className="flex gap-4 mt-4">
              <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
              <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Second project row skeleton (reversed) */}
        <div className="flex flex-col gap-8 lg:gap-16 lg:flex-row-reverse">
          <div className="lg:w-7/12">
            <div className="aspect-[4/3] bg-surface-container-high rounded animate-pulse" />
          </div>
          <div className="lg:w-5/12 flex flex-col justify-center space-y-4">
            <div className="h-8 md:h-10 w-3/4 bg-surface-container-high rounded animate-pulse" />
            <div className="h-4 w-full bg-surface-container-high rounded animate-pulse" />
            <div className="h-4 w-2/3 bg-surface-container-high rounded animate-pulse" />
            <div className="flex gap-4 mt-4">
              <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
              <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Bottom cards skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {[1, 2].map((i) => (
            <div key={i} className="space-y-4">
              <div className="h-6 md:h-8 w-3/4 bg-surface-container-high rounded animate-pulse" />
              <div className="aspect-[4/3] bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-full bg-surface-container-high rounded animate-pulse" />
              <div className="h-4 w-2/3 bg-surface-container-high rounded animate-pulse" />
              <div className="flex gap-4 mt-4">
                <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
                <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
