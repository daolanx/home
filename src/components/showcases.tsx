// components/showcases.tsx
import { getTranslations } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";

/* ── 配置 ── */
const DELAY = { HEADER: 0, FIRST: 100, SECOND: 200, BOTTOM_BASE: 300, BOTTOM_STEP: 100 } as const;

const PROJECT_KEYS = ["ecommerce", "dataviz", "devflow", "uilib"] as const;

/* ── 页面组件 ── */
export async function Showcases() {
  const t = await getTranslations("Showcases");

  const projects = PROJECT_KEYS.map((key) => ({
    key,
    title: t(`projects.${key}.title`),
    description: t(`projects.${key}.description`),
    tags: getTags(key),
    href: "#",
    sourceHref: "#",
    liveDemoLabel: t("liveDemo"),
    viewSourceLabel: t("viewSource"),
  }));

  const [first, second, ...rest] = projects;

  return (
    <section
      id="work"
      className="relative border-t border-surface-variant
                 max-w-[1280px] mx-auto
                 px-6 md:px-12 lg:px-24
                 py-16 md:py-24 lg:py-32"
    >
      <ScrollReveal
        delay={DELAY.HEADER}
        className="flex flex-col md:flex-row md:items-end justify-between
                   mb-16 md:mb-24 gap-6"
      >
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight">
            {t("sectionTitle")}
          </h2>
        </div>
        <a
          href="#"
          className="font-label-caps text-[10px] md:text-xs
                     text-on-surface-variant hover:text-primary
                     inline-flex items-center transition-colors
                     pb-2 self-start md:self-auto
                     border-b border-on-surface-variant/30 hover:border-primary
                     uppercase tracking-widest"
        >
          {t("viewAll")}
          <span className="material-symbols-outlined ml-2 text-[14px]">arrow_forward</span>
        </a>
      </ScrollReveal>

      <div className="space-y-16 md:space-y-24 lg:space-y-32">
        <ScrollReveal delay={DELAY.FIRST}>
          <ProjectRow project={first} reverse={false} />
        </ScrollReveal>

        <ScrollReveal delay={DELAY.SECOND}>
          <ProjectRow project={second} reverse={true} />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {rest.map((project, i) => (
            <ScrollReveal key={project.key} delay={DELAY.BOTTOM_BASE + i * DELAY.BOTTOM_STEP}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function getTags(key: string): string[] {
  const tagMap: Record<string, string[]> = {
    ecommerce: ["React", "TypeScript"],
    dataviz: ["Vue 3", "D3.js"],
    devflow: ["Next.js", "Tailwind"],
    uilib: ["React", "Radix UI"],
  };
  return tagMap[key] ?? [];
}

/* ── 横向图文行（大项目） ── */
function ProjectRow({
  project,
  reverse,
}: {
  project: { key: string; title: string; description: string; tags: string[]; href: string; sourceHref: string; liveDemoLabel: string; viewSourceLabel: string };
  reverse: boolean;
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
            <img
              alt={project.title}
              src={getProjectImage(project.key)}
              className="w-full h-full object-cover object-top
                         filter grayscale-[0.8]
                         lg:group-hover:grayscale-0 lg:group-hover:scale-105
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
          <TagsRow tags={project.tags} variant="separator" />
          <CaseLink href={project.href} sourceHref={project.sourceHref} liveDemoLabel={project.liveDemoLabel} viewSourceLabel={project.viewSourceLabel} />
        </div>
      </div>
    </article>
  );
}

/* ── 图文卡片（小项目） ── */
function ProjectCard({ project }: { project: { key: string; title: string; description: string; tags: string[]; href: string; sourceHref: string; liveDemoLabel: string; viewSourceLabel: string } }) {
  return (
    <article className="group">
      <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface mt-4 mb-3 md:mb-4">
        {project.title}
      </h3>

      <div className="relative aspect-[4/3] overflow-hidden bg-surface-container mb-6">
        <div className="absolute inset-0 bg-primary/10 lg:group-hover:bg-transparent transition-colors duration-700 z-10" />
        <img
          alt={project.title}
          src={getProjectImage(project.key)}
          className="w-full h-full object-cover object-top
                     filter sepia-[.2]
                     lg:group-hover:sepia-0 lg:group-hover:scale-105
                     transition-all duration-1000 ease-out"
        />
      </div>
      <p className="font-body-lg text-sm md:text-base text-on-surface-variant leading-relaxed mb-6 md:mb-8 line-clamp-3 md:line-clamp-2">
        {project.description}
      </p>
      <TagsRow tags={project.tags} variant="separator" />
      <CaseLink href={project.href} sourceHref={project.sourceHref} liveDemoLabel={project.liveDemoLabel} viewSourceLabel={project.viewSourceLabel} />
    </article>
  );
}

function getProjectImage(key: string): string {
  const images: Record<string, string> = {
    ecommerce: "https://lh3.googleusercontent.com/aida-public/AB6AXuAddUguyxXigspPMxkK5qPeuL1-XySTIr6kiamBwrrv6Rwr9GWv--J2ywvkj8YXmhRv9ZLKt9gkFFptur4Hr8HpbW2kq5WhdkTJ-PCu9OWzYSkIxxAOAk8hKPJ1BnCFMf1aMQzclQHH_VxIipmF3edRU_UYZwDkWtsRGXQOjKmQCXQCcd3Y9jyIZlcK5eP4dDdjchwWJK8O353cTXLhlepHJkcXEslFmPp6fG_3LUS8R8vDxv4YCdTQjszbABfbJeIUsfXyWc44LEtH",
    dataviz: "https://lh3.googleusercontent.com/aida-public/AB6AXuDHOhzw6HLcFZxoZJeoqifLRvtEKq2Sqr8fiqJJEBUEgXTsAS_baWEOS4K8uuuV7t5i1uLo-wrqzE8VVKBINwnuhNerJGAR54F9lpW0G9czzGOGnYed2nvGF-SD_-oybSwMywzfBW9XOA4my255MFA_45iy-o3cbMLrBuBS8riHHueIiQOr3oxFZ22NRhVqK2vpl4fWmgdXL8yLKExFAHBGM8fBQKN7kQTzJqJ4cSqvuQoQcUFMvnAdrkPJnifW7dVQCuofKw8lTd5f",
    devflow: "https://lh3.googleusercontent.com/aida-public/AB6AXuDYXHqOzTE-oEOjNvOhGeRFLhnMoH0LmTzgopFHe4vJ9ThLPW4XWdfU37XgmOVJkKg62PV3VvAO3blOlB6_RRIwm9F8qObCJn6dhYRJH22vYOl3WuXvl4vAqFIhSODMHwRNH8hMv6--g-h_ZMo",
    uilib: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbJbEKJLiMk2-ZD7ZKBS7NRVi9pqxj2R4o-60wqIFdGk1oVz6t3nxfA9JVd5Rarxh2HE2X-oSWZdO7m7IJgHGCmxRqS3qv1zCXnW5VjmABoGEK-F8bJSWmGpN_A5jPn0aGGNhAv8w-XMza_JI",
  };
  return images[key] ?? "";
}

/* ── 原子组件 ── */

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

function CaseLink({ href, sourceHref, liveDemoLabel, viewSourceLabel }: { href: string; sourceHref: string; liveDemoLabel: string; viewSourceLabel: string }) {
  return (
    <div className="flex items-center gap-6">
      <a
        href={href}
        className="group/link inline-flex items-center gap-2 self-start
                   font-label-caps text-[10px] md:text-xs tracking-widest uppercase
                   border border-on-surface
                   text-on-surface
                   px-5 py-2.5
                   hover:bg-primary hover:text-on-primary hover:border-primary
                   transition-all duration-300"
      >
        {liveDemoLabel}
       
      </a>
      <a
        href={sourceHref}
        className="group/link inline-flex items-center gap-2 self-start
                   font-label-caps text-[10px] md:text-xs tracking-widest uppercase
                   border border-on-surface
                   text-on-surface
                   px-5 py-2.5
                   hover:bg-primary hover:text-on-primary hover:border-primary
                   transition-all duration-300"
      >
        {viewSourceLabel}
       
      </a>
    </div>
  );
}
