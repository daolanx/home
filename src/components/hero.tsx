import { getTranslations } from "next-intl/server";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants";
import { Mail } from "lucide-react";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function TwitterIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export async function Hero() {
  const t = await getTranslations("Hero");
  return (
    <section
      className="relative flex min-h-[70vh] md:min-h-[90vh] flex-col justify-center overflow-hidden
                 px-6 md:px-12 lg:px-24 py-12 md:py-20 lg:py-30"
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
            <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="mt-10 md:mt-20">
          <div className="flex items-stretch gap-3 md:gap-4">
            {[SOCIAL_LINKS.github, SOCIAL_LINKS.twitter, SOCIAL_LINKS.email].map((link) => {
              const Icon = link.icon === "github" ? GithubIcon : link.icon === "twitter" ? TwitterIcon : Mail;
              return (
              <Link
                key={link.label}
                href={link.href}
                {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                aria-label={link.label}
                className="group relative flex items-center justify-center p-3.5 md:px-6 md:py-4 md:gap-3
                           border border-on-surface
                           text-on-surface hover:bg-primary hover:text-on-primary hover:border-primary
                           transition-all duration-300"
              >
                <Icon className="w-[22px] h-[22px] md:w-6 md:h-6" />
                <span className="hidden md:inline font-label-caps text-sm md:text-base tracking-widest uppercase">
                  {link.label}
                </span>
              </Link>
            )})}
          </div>
        </div>
      </div>
    </section>
  );
}
