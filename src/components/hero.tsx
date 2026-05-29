import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants";

export async function Hero() {
  const t = await getTranslations("Hero");
  return (
    <section
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden
                 px-6 md:px-12 lg:px-24 py-20 md:py-26 lg:py-30"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none select-none absolute -top-16 -left-16 lg:-top-24 lg:-left-24
                       font-mono-custom text-surface-variant opacity-20 leading-none
                       text-[12rem] lg:text-[20rem]"
          >
            {"{}"}
          </span>

          <h1
            className="relative z-10 font-headline-lg-mobile md:font-display-lg
                       text-4xl md:text-6xl lg:text-[80px]
                       font-bold text-on-surface leading-[1.15] md:leading-[1.1]
                       tracking-tight text-balance animate-float
                       mb-8 md:mb-12"
          >
            {t("greeting")}
            <br className="hidden sm:block" />
            <span className="italic font-normal">{t("role")}</span>,
            <br className="hidden md:block" />
            {t("tagline")}
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div
            className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3
                       border-l-2 border-primary pl-6 md:pl-8 py-2"
          >
            <FadeIn delay={100}>
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                {t("description")}
              </p>
            </FadeIn>
          </div>
        </div>

        <FadeIn delay={200}>
          <div className="mt-14 md:mt-20">
            <div className="flex flex-wrap items-stretch gap-3 md:gap-4">
              {[SOCIAL_LINKS.github, SOCIAL_LINKS.twitter, SOCIAL_LINKS.email].map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  aria-label={link.label}
                  className="group relative flex items-center gap-3 px-5 py-3.5 md:px-6 md:py-4
                             border border-surface-variant rounded-lg
                             text-on-surface-variant hover:text-primary hover:border-primary
                             transition-all duration-300"
                >
                  <span className="material-symbols-outlined text-[22px] md:text-[24px]" aria-hidden="true">
                    {link.icon}
                  </span>
                  <span className="font-label-caps text-sm md:text-base tracking-widest uppercase">
                    {link.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
