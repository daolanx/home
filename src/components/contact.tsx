// components/contact.tsx
import { ScrollReveal } from "@/components/scroll-reveal";

const DELAY = { HEADING: 0, BODY: 100, LINKS: 200, FOOTER: 300 } as const;



export function Contact() {
  return (
    <footer
      id="contact"
      className="w-full border-t border-surface-variant bg-surface-container-lowest"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        {/* ── 主内容区 ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-24">
          {/* 左列：标题 + 描述 */}
          <div className="flex flex-col gap-4 md:gap-6">
            <ScrollReveal delay={DELAY.HEADING}>
              <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight mb-2 md:mb-4">
                联系我
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={DELAY.BODY}>
              <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed md:mb-6">
                如果您有合作意向或任何问题，欢迎随时联系。我始终乐于探讨新项目、创意想法，或是参与您愿景的机会。
              </p>
            </ScrollReveal>
             <SocialLink {...{ icon: "mail", label: "Email", href: "mailto:daolanx.dev@gmail.com", isExternal: false }} />
          </div>

        
        </div>

        {/* ── 底部信息 ── */}
        <ScrollReveal delay={DELAY.FOOTER}>
          <div
            className="flex flex-col md:flex-row justify-between items-start md:items-center
                       gap-8 md:gap-12 pt-8 md:pt-12 border-t border-surface-variant"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
              <span className="font-body-lg text-sm md:text-base text-on-surface-variant pr-4">Dax © 2026</span>
              <nav aria-label="Footer Links" className="flex gap-x-4">
                {[
                 
                  { href: "https://x.com/daolanx", label: "Twitter" },
                   { href: "https://github.com/daolanx", label: "GitHub" },
                    { href: "https://daolanx.me", label: "Blog" },
                     { href: "https://demo.daolanx.com", label: "Work" },
                  { href: "mailto:daolanx.dev@gmail.com", label: "Email" },
                ].map((item) => (
                  <a
                    className="transition-colors"
                    href={item.href}
                    key={item.label}
                    {...(item.href.startsWith("http")
                      ? { rel: "noopener noreferrer", target: "_blank" }
                      : {})}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}

/* ── 内部：社交链接项 ── */
function SocialLink({
  icon,
  label,
  href,
  isExternal,
}: {
  icon: string;
  label: string;
  href: string;
  isExternal: boolean;
}) {
  return (
    <a
      href={href}
      {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      aria-label={`Visit ${label}${isExternal ? " profile" : ""}`}
      className="group inline-flex items-center gap-3 px-5 py-3 w-fit
                 border border-on-surface text-on-surface
                 font-label-caps text-xs tracking-widest uppercase
                 transition-colors duration-300
                 hover:bg-on-surface hover:text-surface "
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {icon}
      </span>
      {label}
      <span
        className="material-symbols-outlined text-[16px] opacity-50
                   group-hover:opacity-100 group-hover:translate-x-0.5
                   transition-all duration-300"
        aria-hidden="true"
      >
        arrow_outward
      </span>
    </a>
  );
}
