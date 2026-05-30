import { getTranslations, getLocale } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/time";
import { getArticles } from "@/adapter/articles";
import { ARTICLES_SERVICE } from "@/adapter/constants";

export async function Articles() {
  const t = await getTranslations("Articles");
  const locale = await getLocale();
  const { data: posts } = await getArticles();

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-surface-variant" id="blog">
      <FadeIn className="mb-10 md:mb-16">
        <div className="border-l-2 border-primary pl-4 md:pl-6">
          <h2 className="font-display-lg text-2xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">{t("sectionTitle")}</h2>
        </div>
      </FadeIn>

      <div className="flex flex-col border-t border-surface-variant">
        {posts.map((post, i) => (
          <FadeIn key={post.url} delay={i * 100}>
            <Link className="group py-8 md:py-10 border-b border-surface-variant flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 hover:bg-surface-container-low transition-colors duration-300 relative px-4 -mx-4" href={post.url} target="_blank" rel="noopener noreferrer">
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
                <ArrowRight size={20} className="text-outline group-hover:text-primary transition-colors lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-4 lg:group-hover:translate-x-0 duration-300" />
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>

      <FadeIn className="mt-12 md:mt-16 text-center">
        <Link className="font-label-caps text-xs md:text-sm text-on-surface-variant hover:text-primary inline-flex items-center transition-colors pb-2 border-b border-on-surface-variant/30 hover:border-primary uppercase tracking-widest" href={`${ARTICLES_SERVICE.origin}/${locale}/`} target="_blank" rel="noopener noreferrer">
          {t("viewAll")} <ArrowRight size={14} className="ml-2" />
        </Link>
      </FadeIn>
    </section>
  );
}

export function ArticlesSkeleton() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-surface-variant" id="blog">
      <div className="mb-10 md:mb-16">
        <div className="border-l-2 border-primary pl-4 md:pl-6">
          <div className="h-8 md:h-10 lg:h-12 w-48 bg-surface-container-high rounded animate-pulse" />
        </div>
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
