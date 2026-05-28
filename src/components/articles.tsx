import { getTranslations, getLocale } from "next-intl/server";
import { ScrollReveal } from "@/components/scroll-reveal";

const POST_KEYS = ["ddd", "rendering", "tailwind"] as const;

const RAW_DATES: Record<string, string> = {
  ddd: "2023-11-24",
  rendering: "2023-10-12",
  tailwind: "2023-09-05",
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

  const posts = POST_KEYS.map((key) => ({
    key,
    category: t(`posts.${key}.category`),
    title: t(`posts.${key}.title`),
    date: RAW_DATES[key],
    formattedDate: formatDate(RAW_DATES[key], locale),
  }));

  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-surface-variant" id="blog">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">{t("sectionTitle")}</h2>
        </div>
        <a className="font-label-caps text-[10px] md:text-xs text-on-surface-variant hover:text-primary inline-flex items-center transition-colors pb-2 border-b border-on-surface-variant/30 hover:border-primary uppercase tracking-widest self-start md:self-auto" href="#">
          {t("viewAll")} <span className="material-symbols-outlined ml-2 text-[14px]">arrow_forward</span>
        </a>
      </ScrollReveal>

      <div className="flex flex-col border-t border-surface-variant">
        {posts.map((post, i) => (
          <ScrollReveal key={post.key} delay={i * 100}>
            <a className="group py-8 md:py-10 border-b border-surface-variant flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 hover:bg-surface-container-low transition-colors duration-300 relative px-4 -mx-4" href="#">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2 md:mb-3">
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-outline">{post.category}</span>
                </div>
                <h3 className="font-headline-lg text-xl md:text-2xl lg:text-3xl text-on-surface group-hover:text-primary transition-colors max-w-4xl">
                  {post.title}
                </h3>
              </div>
              <div className="shrink-0 flex items-center justify-between lg:justify-end gap-4 mt-2 lg:mt-0">
                <time className="font-label-caps text-[10px] md:text-xs text-outline tracking-widest" dateTime={post.date}>{post.formattedDate}</time>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px] lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-4 lg:group-hover:translate-x-0 duration-300">arrow_forward</span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
