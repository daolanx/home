import { FadeIn } from "../ui/fade-in";
import Link from "next/link";
import { SOCIAL_LINKS } from "@/constants";
export function Footer() {
  return (<FadeIn delay={300}>
    <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 ">
      <footer
        className="flex flex-col md:flex-row justify-between items-start md:items-center
                         gap-8 md:gap-12  border-t border-surface-variant"
      >
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-6 md:py-8 lg:py-10">
          <span className="font-body-lg text-sm md:text-base text-on-surface-variant pr-4">Dax © 2026</span>
          <nav aria-label="Footer Links" className="flex gap-x-4">
            {[
              SOCIAL_LINKS.twitter,
              SOCIAL_LINKS.github,
              SOCIAL_LINKS.blog,
              SOCIAL_LINKS.work,
              SOCIAL_LINKS.email,
            
            ].map((item) => (
              <Link
                className="transition-colors hover:text-primary"
                href={item.href}
                key={item.label}
                {...(item.href.startsWith("http")
                  ? { rel: "noopener noreferrer", target: "_blank" }
                  : {})}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </footer>
    </div>
  </FadeIn>);
}