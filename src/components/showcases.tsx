import { ScrollReveal } from "@/components/scroll-reveal";

export function Showcases() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 relative border-t border-surface-variant" id="work">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-24 gap-6 relative z-10">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <p className="font-label-caps text-[10px] md:text-xs text-primary uppercase tracking-widest mb-3 md:mb-4">精选档案 // 2023-2024</p>
          <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight">精选作品</h2>
        </div>
        <a className="font-label-caps text-[10px] md:text-xs text-primary hover:text-surface-tint inline-flex items-center transition-colors pb-2 border-b border-primary/30 hover:border-primary uppercase tracking-widest self-start md:self-auto" href="#">
          查看全部作品 <span className="material-symbols-outlined ml-2 text-[14px]">arrow_forward</span>
        </a>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-y-16 md:gap-y-32 md:gap-x-8 relative z-10">
        {/* Project 1 */}
        <ScrollReveal className="md:col-span-12 group relative z-20">
          <div className="relative flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
            <div className="w-full lg:w-7/12 relative z-10 transition-transform duration-700 ease-out lg:group-hover:-translate-y-2">
              <div className="relative aspect-4/3 overflow-hidden bg-surface-container">
                <div className="absolute inset-0 bg-primary/5 lg:group-hover:bg-transparent transition-colors duration-700 z-10 mix-blend-multiply" />
                <img alt="E-commerce Dashboard" className="w-full h-full object-cover object-top filter grayscale-[0.8] lg:group-hover:grayscale-0 lg:group-hover:scale-105 transition-all duration-1000 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAddUguyxXigspPMxkK5qPeuL1-XySTIr6kiamBwrrv6Rwr9GWv--J2ywvkj8YXmhRv9ZLKt9gkFFptur4Hr8HpbW2kq5WhdkTJ-PCu9OWzYSkIxxAOAk8hKPJ1BnCFMf1aMQzclQHH_VxIipmF3edRU_UYZwDkWtsRGXQOjKmQCXQCcd3Y9jyIZlcK5eP4dDdjchwWJK8O353cTXLhlepHJkcXEslFmPp6fG_3LUS8R8vDxv4YCdTQjszbABfbJeIUsfXyWc44LEtH" />
              </div>
            </div>
            <div className="w-full lg:w-5/12 z-20 flex flex-col justify-center">
              <div className="flex flex-wrap gap-4 mb-6 md:mb-8">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-surface-variant pb-1">React</span>
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant border-b border-surface-variant pb-1">TypeScript</span>
              </div>
              <h3 className="font-headline-lg text-3xl md:text-4xl text-on-surface mb-4 md:mb-6 glitch-hover cursor-pointer">企业级 B2B 电商中台</h3>
              <p className="font-body-lg text-base md:text-lg text-on-surface-variant mb-8 md:mb-10 leading-relaxed max-w-md">
                从零构建的高性能管理后台，处理百万级 SKU 数据。采用微前端架构设计，优化了复杂的表单渲染与状态流转体验。
              </p>
              <a className="inline-flex items-center font-label-caps text-[10px] md:text-xs text-primary hover:text-surface-tint transition-colors group/link pb-2 border-b border-primary/30 hover:border-primary self-start" href="#">
                查看案例 <span className="material-symbols-outlined ml-3 text-[14px] group-hover/link:translate-x-2 transition-transform">east</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Project 2 */}
        <ScrollReveal className="md:col-span-6 lg:col-span-5 group relative z-10">
          <div className="relative flex flex-col gap-6">
            <div className="relative aspect-4/3 md:aspect-square w-full overflow-hidden bg-surface-container">
              <div className="absolute inset-0 bg-primary/10 lg:group-hover:bg-transparent transition-colors duration-700 z-10" />
              <img alt="Data Viz App" className="w-full h-full object-cover object-top filter sepia-[.2] lg:group-hover:sepia-0 lg:group-hover:scale-105 transition-all duration-1000 ease-out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDHOhzw6HLcFZxoZJeoqifLRvtEKq2Sqr8fiqJJEBUEgXTsAS_baWEOS4K8uuuV7t5i1uLo-wrqzE8VVKBINwnuhNerJGAR54F9lpW0G9czzGOGnYed2nvGF-SD_-oybSwMywzfBW9XOA4my255MFA_45iy-o3cbMLrBuBS8riHHueIiQOr3oxFZ22NRhVqK2vpl4fWmgdXL8yLKExFAHBGM8fBQKN7kQTzJqJ4cSqvuQoQcUFMvnAdrkPJnifW7dVQCuofKw8lTd5f" />
            </div>
            <div>
              <div className="flex flex-wrap gap-3 mb-4">
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">Vue 3</span>
                <span className="text-surface-variant">/</span>
                <span className="font-label-caps text-[10px] uppercase tracking-widest text-on-surface-variant">D3.js</span>
              </div>
              <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-3 md:mb-4">金融数据可视化大屏</h3>
              <p className="font-body-md text-sm md:text-base text-on-surface-variant mb-6 line-clamp-3 md:line-clamp-2">
                基于 Canvas 与 WebGL 开发的实时监控面板，保障 60fps 丝滑渲染。
              </p>
              <a className="inline-flex items-center font-label-caps text-[10px] md:text-xs text-primary hover:text-surface-tint transition-colors" href="#">
                探索 <span className="material-symbols-outlined ml-2 text-[14px]">north_east</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Projects 3 & 4 */}
        <div className="md:col-span-6 lg:col-span-6 lg:col-start-7 flex flex-col gap-12 lg:gap-16 md:mt-12 lg:mt-24">
          <ScrollReveal>
            <article className="group relative flex flex-col gap-6">
              <div className="border-t border-primary pt-6">
                <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-3 md:mb-4">DevFlow API 平台</h3>
                <p className="font-body-lg text-sm md:text-base text-on-surface-variant mb-6 md:mb-8 leading-relaxed">
                  为开发者打造的 API 文档与调试工具，采用极简的左右分栏布局，提供流畅的类 IDE 编辑体验。
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[10px] md:text-xs text-outline tracking-widest uppercase">Next.js / Tailwind</span>
                  <a className="w-10 h-10 border border-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </article>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <article className="group relative flex flex-col gap-6">
              <div className="border-t border-surface-variant pt-6">
                <h3 className="font-headline-lg text-2xl md:text-3xl text-on-surface mb-3 md:mb-4">UI Component Library</h3>
                <p className="font-body-lg text-sm md:text-base text-on-surface-variant mb-6 md:mb-8 leading-relaxed">
                  开源的无头组件库方案，关注可访问性 (a11y) 与键盘交互，被超过 50 个内部项目采用。
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-label-caps text-[10px] md:text-xs text-outline tracking-widest uppercase">React / Radix UI</span>
                  <a className="w-10 h-10 border border-surface-variant flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors" href="#">
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </a>
                </div>
              </div>
            </article>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
