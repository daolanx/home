import { ScrollReveal } from "@/components/scroll-reveal";

export function Skills() {
  return (
    <section className="bg-surface-container-low border-t border-surface-variant" id="skills">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        <ScrollReveal className="mb-12 md:mb-20 lg:w-2/3">
          <p className="font-label-caps text-[10px] md:text-xs text-primary uppercase tracking-widest mb-3 md:mb-4">核心能力与技术栈</p>
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">技术实验室</h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          <ScrollReveal className="flex flex-col">
            <div className="flex justify-between items-end border-b-2 border-primary pb-4 mb-6 md:mb-8">
              <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface">核心框架</h3>
              <span className="font-label-caps text-xs text-outline">01</span>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">React / Next.js</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">组件化架构与服务端渲染</p>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">Vue 3 / Nuxt</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">响应式系统与渐进式开发</p>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">SvelteKit & Node.js</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">编译时优化与后端集成</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="flex flex-col" delay={100}>
            <div className="flex justify-between items-end border-b border-surface-variant pb-4 mb-6 md:mb-8">
              <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface">样式与设计</h3>
              <span className="font-label-caps text-xs text-outline">02</span>
            </div>
            <div className="space-y-6 md:space-y-8">
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">Tailwind CSS</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">原子化样式与快速迭代</p>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">Figma 交付</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">高保真还原与设计协作</p>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">Framer Motion</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">流畅动画与交互实现</p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal className="flex flex-col md:col-span-2 lg:col-span-1" delay={200}>
            <div className="flex justify-between items-end border-b border-surface-variant pb-4 mb-6 md:mb-8">
              <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface">工程化</h3>
              <span className="font-label-caps text-xs text-outline">03</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-6 md:gap-8">
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">TypeScript Strict</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">类型安全与重构保障</p>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">Vite / Webpack</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">现代构建工具与性能优化</p>
              </div>
              <div>
                <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">Testing & CI/CD</h4>
                <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed">Jest, Cypress 自动化部署</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
