import { ScrollReveal } from "@/components/scroll-reveal";

const DELAY = { PARAGRAPH: 100, BUTTON: 200 } as const;

export function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] flex-col justify-center overflow-hidden
                 px-6 md:px-12 lg:px-24 py-20 md:py-26 lg:py-30"
    >
      <div className="relative z-10 mx-auto max-w-4xl">
        {/* ── 标题区域 ── */}
        <div className="relative">
          {/* 装饰性代码符号 */}
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
            你好，我是 Dax,
            <br className="hidden sm:block" />
            <span className="italic font-normal">前端独立开发者</span>，
            <br className="hidden md:block" />
            专注于构建优雅、高性能的 Web 体验。
          </h1>
        </div>

        {/* ── 简介段落 ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div
            className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3
                       border-l-2 border-primary pl-6 md:pl-8 py-2"
          >
            <ScrollReveal delay={DELAY.PARAGRAPH}>
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                运用现代技术栈转化复杂业务逻辑，注重代码架构的清晰性与界面的极致交互。
                崇尚技术极简主义，用最精简的代码实现最核心的价值。
              </p>
            </ScrollReveal>
          </div>
        </div>

        {/* ── 联系方式 ── */}
        <ScrollReveal delay={DELAY.BUTTON}>
          <div className="mt-14 md:mt-20">
        

            <div className="flex flex-wrap items-stretch gap-3 md:gap-4">
              <a
                href="https://github.com/daolanx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="group relative flex items-center gap-3 px-5 py-3.5 md:px-6 md:py-4
                           border border-surface-variant rounded-lg
                           text-on-surface-variant hover:text-primary hover:border-primary
                           transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[22px] md:text-[24px]" aria-hidden="true">
                  code
                </span>
                <span className="font-label-caps text-sm md:text-base tracking-widest uppercase">
                  GitHub
                </span>
              </a>

              <a
                href="https://twitter.com/daolanx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="group relative flex items-center gap-3 px-5 py-3.5 md:px-6 md:py-4
                           border border-surface-variant rounded-lg
                           text-on-surface-variant hover:text-primary hover:border-primary
                           transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[22px] md:text-[24px]" aria-hidden="true">
                  tag
                </span>
                <span className="font-label-caps text-sm md:text-base tracking-widest uppercase">
                  Twitter
                </span>
              </a>

              <a
                href="mailto:daolanx.dev@gmail.com"
                aria-label="Email"
                className="group relative flex items-center gap-3 px-5 py-3.5 md:px-6 md:py-4
                           border border-surface-variant rounded-lg
                           text-on-surface-variant hover:text-primary hover:border-primary
                           transition-all duration-300"
              >
                <span className="material-symbols-outlined text-[22px] md:text-[24px]" aria-hidden="true">
                  mail
                </span>
                <span className="font-label-caps text-sm md:text-base tracking-widest uppercase">
                  Email
                </span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
