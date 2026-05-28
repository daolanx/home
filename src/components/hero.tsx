import { ScrollReveal } from "@/components/scroll-reveal";

export function Hero() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-20 md:py-32 lg:py-48 flex flex-col justify-center min-h-[90vh] relative overflow-hidden">
      <div className="relative z-10 max-w-4xl">
        <ScrollReveal className="mb-8 md:mb-12">
          <span className="inline-flex items-center font-label-caps text-xs text-primary tracking-widest uppercase">
            <span className="inline-block w-1 h-1 bg-primary mr-3" />
            sys.status: ready
          </span>
        </ScrollReveal>

        <div className="relative">
          <div className="hidden md:block absolute -top-16 -left-16 lg:-top-24 lg:-left-24 text-[12rem] lg:text-[20rem] font-mono-custom text-surface-variant opacity-20 select-none pointer-events-none z-0 leading-none">
            {"{}"}
          </div>
          <h1 className="relative z-10 font-headline-lg-mobile md:font-display-lg text-4xl md:text-6xl lg:text-[80px] font-bold text-on-surface leading-[1.15] md:leading-[1.1] tracking-tight text-balance animate-float mb-8 md:mb-12">
            你好，我是一名<br className="hidden sm:block" />
            <span className="italic font-normal">前端独立开发者</span>，
            <br className="hidden md:block" />
            专注于构建优雅、高性能的Web体验。
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-10 md:col-start-2 lg:col-span-8 lg:col-start-3 border-l-2 border-primary pl-6 md:pl-8 py-2">
            <ScrollReveal>
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant leading-relaxed">
                擅长运用现代技术栈转化复杂业务逻辑，注重代码架构的清晰性与界面的极致交互。崇尚技术极简主义，用最精简的代码实现最核心的价值。
              </p>
            </ScrollReveal>
          </div>
        </div>

        <ScrollReveal className="flex flex-wrap items-center gap-6 mt-12 md:mt-16">
          <a className="group relative inline-flex items-center justify-center px-6 md:px-8 py-3 md:py-4 bg-primary text-on-primary font-label-caps text-[10px] md:text-xs hover:bg-surface-tint transition-all duration-300 overflow-hidden w-full sm:w-auto" href="#work">
            <span className="relative z-10 flex items-center">
              查看作品
              <span className="material-symbols-outlined ml-3 text-[16px] group-hover:translate-x-1 transition-transform">east</span>
            </span>
            <div className="absolute inset-0 h-full w-0 bg-white/20 transition-all duration-300 ease-out group-hover:w-full z-0" />
          </a>
        </ScrollReveal>
      </div>

      <div className="hidden md:flex absolute bottom-16 left-12 lg:left-24 flex-col items-center gap-6">
        <div className="w-[1px] h-24 bg-surface-variant relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[float_2s_ease-in-out_infinite]" />
        </div>
        <span className="font-label-caps text-xs text-on-surface-variant tracking-widest uppercase -rotate-90 origin-center mt-6">滚动</span>
      </div>
    </section>
  );
}
