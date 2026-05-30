// components/portfolios.tsx
import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { FadeIn } from "@/components/ui/fade-in";
import { ArrowRight } from "lucide-react";
import { getPortfolios } from "@/adapter/portfolios";
import type { Portfolio } from "@/adapter/types";
import { PORTFOLIOS_SERVICE } from "@/adapter/constants";

/* ── Constants ── */
const STAGGER = { header: 0, first: 100, second: 200, gridBase: 300, gridStep: 100 } as const;
const MAX_PROJECTS = 4;

/* ── Types ── */
interface Labels {
  liveDemo: string;
  viewSource: string;
}

/* ── Page Component ── */
export async function Portfolios() {
  const t = await getTranslations("Showcases");
  const locale = await getLocale();
  const { data } = await getPortfolios(locale);

  const projects = data.slice(0, MAX_PROJECTS);
  const [hero1, hero2, ...gridItems] = projects;
  const viewAllDelay = STAGGER.gridBase + gridItems.length * STAGGER.gridStep;

  const labels: Labels = {
    liveDemo: t("liveDemo"),
    viewSource: t("viewSource"),
  };

  return (
    <section
      id="work"
      className="relative border-t border-surface-variant
                 max-w-[1280px] mx-auto
                 px-6 md:px-12 lg:px-24
                 py-16 md:py-24 lg:py-32"
    >
      <FadeIn delay={STAGGER.header} className="mb-10 md:mb-16">
        <div className="border-l-2 border-primary pl-4 md:pl-6">
          <h2 className="font-display-lg text-2xl md:text-5xl lg:text-6xl text-on-surface tracking-tight">
            {t("sectionTitle")}
          </h2>
        </div>
      </FadeIn>

      <div className="space-y-16 md:space-y-24 lg:space-y-32">
        {hero1 && (
          <FadeIn delay={STAGGER.first}>
            <HeroProject project={hero1} reverse={false} labels={labels} priority />
          </FadeIn>
        )}

        {hero2 && (
          <FadeIn delay={STAGGER.second}>
            <HeroProject project={hero2} reverse={true} labels={labels} />
          </FadeIn>
        )}

        {gridItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {gridItems.map((project, i) => (
              <FadeIn key={project.id} delay={STAGGER.gridBase + i * STAGGER.gridStep}>
                <GridProject project={project} labels={labels} />
              </FadeIn>
            ))}
          </div>
        )}
      </div>

      <FadeIn delay={viewAllDelay} className="mt-12 md:mt-16 text-center">
        <Link
          target="_blank"
          href={PORTFOLIOS_SERVICE.origin}
          className="font-label-caps text-xs md:text-sm
                     text-on-surface-variant hover:text-primary
                     inline-flex items-center transition-colors pb-2
                     border-b border-on-surface-variant/30 hover:border-primary
                     uppercase tracking-widest "
        >
          {t("viewAll")}
          <ArrowRight size={14} className="ml-2" />
        </Link>
      </FadeIn>
    </section>
  );
}

/* ── Hero Project (large alternating layout) ── */
function HeroProject({
  project,
  reverse,
  labels,
  priority = false,
}: {
  project: Portfolio;
  reverse: boolean;
  labels: Labels;
  priority?: boolean;
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
              priority={priority}
              sizes="(max-width: 768px) 100vw, 58vw"
              className="object-cover object-top
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
          <KeywordTags tags={project.keywords} />
          <ProjectLinks project={project} labels={labels} />
        </div>
      </div>
    </article>
  );
}

/* ── Grid Project (compact card) ── */
function GridProject({ project, labels }: { project: Portfolio; labels: Labels }) {
  return (
    <article className="group flex flex-col h-full">
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
                     sepia-[.2]
                     lg:group-hover:sepia-0 lg:group-hover:scale-105
                     transition-all duration-1000 ease-out"
        />
      </div>

      <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed  line-clamp-3 md:line-clamp-2 flex-grow">
        {project.description}
      </p>
      <KeywordTags tags={project.keywords} />
      <ProjectLinks project={project} labels={labels} />
    </article>
  );
}

/* ── Shared Components ── */

function KeywordTags({ tags }: { tags: string[] }) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 my-4 md:my-6">
      {tags.map((tag, i) => (
        <span key={tag} className="flex items-center gap-3">
          {i > 0 && (
            <span className="text-surface-variant text-sm select-none" aria-hidden="true">
              /
            </span>
          )}
          <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">
            {tag}
          </span>
        </span>
      ))}
    </div>
  );
}

function ProjectLinks({ project, labels }: { project: Portfolio; labels: Labels }) {
  const links = [
    { href: project.webUrl, label: labels.liveDemo },
    { href: project.sourceUrl, label: labels.viewSource },
  ].filter((link) => link.href);

  if (!links.length) return null;

  return (
    <div className="flex flex-row items-center justify-center sm:justify-normal gap-6 sm:gap-4 md:gap-6 mt-4 md:mt-0">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} - ${project.title}`}
          className="inline-flex items-center justify-center
  font-label-caps text-[10px] md:text-xs tracking-widest uppercase
  border border-on-surface text-on-surface
  px-6 py-3 min-w-[140px]
  hover:bg-primary hover:text-on-primary hover:border-primary
  transition-all duration-300"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

/* ── Skeleton ── */

function SkeletonBar({ className = "h-4 w-full" }: { className?: string }) {
  return <div className={`bg-surface-container-high rounded animate-pulse ${className}`} />;
}

function HeroSkeletonRow({ reverse }: { reverse: boolean }) {
  return (
    <div className={`flex flex-col gap-8 lg:gap-16 ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
      <div className="lg:w-7/12">
        <div className="aspect-[4/3] bg-surface-container-high rounded animate-pulse" />
      </div>
      <div className="lg:w-5/12 flex flex-col justify-center space-y-4">
        <SkeletonBar className="h-8 md:h-10 w-3/4" />
        <SkeletonBar />
        <SkeletonBar className="w-2/3" />
        <div className="flex gap-4 mt-4">
          <SkeletonBar className="h-3 w-16" />
          <SkeletonBar className="h-3 w-16" />
        </div>
      </div>
    </div>
  );
}

function GridCardSkeleton() {
  return (
    <div className="space-y-4">
      <SkeletonBar className="h-6 md:h-8 w-3/4" />
      <div className="aspect-[4/3] bg-surface-container-high rounded animate-pulse" />
      <SkeletonBar />
      <SkeletonBar className="w-2/3" />
      <div className="flex gap-4 mt-4">
        <SkeletonBar className="h-3 w-16" />
        <SkeletonBar className="h-3 w-16" />
      </div>
    </div>
  );
}

export function PortfoliosSkeleton() {
  return (
    <section
      id="work"
      className="relative border-t border-surface-variant
                 max-w-[1280px] mx-auto
                 px-6 md:px-12 lg:px-24
                 py-16 md:py-24 lg:py-32"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <SkeletonBar className="h-10 md:h-12 lg:h-14 w-48" />
        </div>
        <SkeletonBar className="h-4 w-20 self-start md:self-auto" />
      </div>

      <div className="space-y-16 md:space-y-24 lg:space-y-32">
        <HeroSkeletonRow reverse={false} />
        <HeroSkeletonRow reverse={true} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <GridCardSkeleton />
          <GridCardSkeleton />
        </div>
      </div>
    </section>
  );
}
