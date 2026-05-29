import { getTranslations, getLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";

type Post = {
  title: string;
  date: string;
  tags: string[];
  url: string;
};

function formatDate(dateStr: string, locale: string): string {
  const date = new Date(dateStr);
  if (locale === "zh") {
    return new Intl.DateTimeFormat("zh-CN", { year: "numeric", month: "long", day: "numeric" }).format(date);
  }
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "numeric" }).format(date);
}

export async function Articles() {
  const t = await getTranslations("Articles");
  const locale = await getLocale();

  const res = await fetch(`https://daolanx.me/api/posts/${locale}.json`);
  const data = await res.json() as Post[];
  const posts = data.slice(0, 5);

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-surface-variant" id="blog">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">{t("sectionTitle")}</h2>
        </div>
        <a className="font-label-caps text-[10px] md:text-xs text-on-surface-variant hover:text-primary inline-flex items-center transition-colors pb-2 border-b border-on-surface-variant/30 hover:border-primary uppercase tracking-widest self-start md:self-auto" href={`https://www.daolanx.me/${locale}/`} target="_blank" rel="noopener noreferrer">
          {t("viewAll")} <span className="material-symbols-outlined ml-2 text-[14px]">arrow_forward</span>
        </a>
      </ScrollReveal>

      <div className="flex flex-col border-t border-surface-variant">
        {posts.map((post, i) => (
          <ScrollReveal key={post.url} delay={i * 100}>
            <a className="group py-8 md:py-10 border-b border-surface-variant flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 hover:bg-surface-container-low transition-colors duration-300 relative px-4 -mx-4" href={post.url} target="_blank" rel="noopener noreferrer">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2 md:mb-3">
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-outline">{post.tags.join(" / ")}</span>
                </div>
                <h3 className="font-headline-lg text-xl md:text-2xl lg:text-3xl text-on-surface group-hover:text-primary transition-colors max-w-4xl">
                  {post.title}
                </h3>
              </div>
              <div className="shrink-0 flex items-center justify-between lg:justify-end gap-4 mt-2 lg:mt-0">
                <time className="font-label-caps text-[10px] md:text-xs text-outline tracking-widest" dateTime={post.date}>{formatDate(post.date, locale)}</time>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px] lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-4 lg:group-hover:translate-x-0 duration-300">arrow_forward</span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

export function ArticlesSkeleton() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-surface-variant" id="blog">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <div className="h-10 md:h-12 lg:h-14 w-48 bg-surface-container-high rounded animate-pulse" />
        </div>
        <div className="h-4 w-20 bg-surface-container-high rounded animate-pulse self-start md:self-auto" />
      </div>

      <div className="flex flex-col border-t border-surface-variant">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="py-8 md:py-10 border-b border-surface-variant flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 px-4 -mx-4">
            <div className="flex-1 space-y-3">
              <div className="h-3 w-16 bg-surface-container-high rounded animate-pulse" />
              <div className="h-6 w-3/4 bg-surface-container-high rounded animate-pulse" />
            </div>
            <div className="h-3 w-24 bg-surface-container-high rounded animate-pulse shrink-0" />
          </div>
        ))}
      </div>
    </section>
  );
}
