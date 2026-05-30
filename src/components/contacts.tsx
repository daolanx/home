// components/contact.tsx
import { getTranslations } from "next-intl/server";
import { FadeIn } from "@/components/ui/fade-in";
import Link from 'next/link';
import { Mail, ExternalLink } from "lucide-react";

export async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <footer
      id="contact"
      className="w-full border-t border-surface-variant "
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-4 md:mb-8">
          <div className="flex flex-col gap-4 md:gap-6">
            <FadeIn delay={0}>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight mb-2 md:mb-4">
                {t("heading")}
              </h2>
            </FadeIn>

            <FadeIn delay={100}>
              <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed md:mb-6">
                {t("description")}
              </p>
            </FadeIn>
            <SocialLink {...{ icon: "mail", label: t("emailCta"), href: "mailto:daolanx.dev@gmail.com", isExternal: false }} />
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({
  label,
  href,
  isExternal,
}: {
  label: string;
  href: string;
  isExternal: boolean;
}) {
  return (
    <Link
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`Visit ${label}${isExternal ? " profile" : ""}`}
      className="group inline-flex items-center gap-3 px-5 py-3 w-fit
                 border border-on-surface text-on-surface
                 font-label-caps text-xs tracking-widest uppercase
                 transition-colors duration-300
                 hover:bg-primary hover:text-on-primary hover:border-primary"
    >
      <Mail size={18} aria-hidden="true" />
      {label}
     
    </Link>
  );
}
