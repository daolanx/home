// components/skills.tsx
import { ScrollReveal } from "@/components/scroll-reveal";

/* ── 数据 ── */
const SKILL_GROUPS = [
  {
    id: "01",
    title: "核心框架",
    accent: true,
    skills: [
      { name: "React / Next.js", desc: "组件化架构与服务端渲染" },
      { name: "Vue 3 / Nuxt", desc: "响应式系统与渐进式开发" },
      { name: "SvelteKit & Node.js", desc: "编译时优化与后端集成" },
    ],
  },
  {
    id: "02",
    title: "样式与设计",
    accent: false,
    skills: [
      { name: "Tailwind CSS", desc: "原子化样式与快速迭代" },
      { name: "Figma 交付", desc: "高保真还原与设计协作" },
      { name: "Framer Motion", desc: "流畅动画与交互实现" },
    ],
  },
  {
    id: "03",
    title: "工程化",
    accent: false,
    skills: [
      { name: "TypeScript Strict", desc: "类型安全与重构保障" },
      { name: "Vite / Webpack", desc: "现代构建工具与性能优化" },
      { name: "Testing & CI/CD", desc: "Jest, Cypress 自动化部署" },
    ],
  },
] as const;

const DELAY = { HEADER: 0, GROUP_BASE: 100, GROUP_STEP: 100 } as const;

/* ── 页面组件 ── */
export function Skills() {
  return (
    <section
      id="skills"
      className="bg-surface-container-low border-t border-surface-variant"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        {/* 标题 */}
        <ScrollReveal delay={DELAY.HEADER} className="mb-12 md:mb-20 lg:w-2/3">
         
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">
            技术栈
          </h2>
        </ScrollReveal>

        {/* 技能分组 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 md:gap-y-16">
          {SKILL_GROUPS.map((group, i) => (
            <ScrollReveal
              key={group.id}
              delay={DELAY.GROUP_BASE + i * DELAY.GROUP_STEP}
              className={i === 2 ? "flex flex-col md:col-span-2 lg:col-span-1" : "flex flex-col"}
            >
              <SkillGroup group={group} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 子组件 ── */

function SkillGroup({
  group,
}: {
  group: (typeof SKILL_GROUPS)[number];
}) {
  return (
    <>
      <div
        className={`flex justify-between items-end pb-4 mb-6 md:mb-8 ${
          group.accent ? "border-b-2 border-primary" : "border-b border-surface-variant"
        }`}
      >
        <h3 className="font-headline-lg text-xl md:text-2xl text-on-surface">
          {group.title}
        </h3>
        <span className="font-label-caps text-xs text-outline">{group.id}</span>
      </div>

      <div className="space-y-6 md:space-y-8">
        {group.skills.map((skill) => (
          <div
            key={skill.name}
            className="group/skill relative pl-4 -ml-4 pr-4 py-3 -mx-4
                       border-l-2 border-transparent
                       hover:border-primary hover:bg-surface-container-high/50
                       transition-all duration-300 cursor-default"
          >
            {/* 序号角标 */}
            <span
              className="absolute top-3 right-0
                         font-label-caps text-[10px] text-surface-variant
                         opacity-0 translate-x-2
                         group-hover/skill:opacity-100 group-hover/skill:translate-x-0
                         transition-all duration-300"
            >
              →
            </span>

            <h4 className="font-label-md text-on-surface text-base md:text-lg mb-1 md:mb-2 font-semibold">
              <span
                className="bg-left-bottom bg-no-repeat
                           bg-[length:0%_1px] bg-gradient-to-r from-primary to-primary
                           group-hover/skill:bg-[length:100%_1px]
                           transition-[background-size] duration-500 ease-out"
              >
                {skill.name}
              </span>
            </h4>
            <p className="font-body-md text-sm md:text-base text-on-surface-variant leading-relaxed
                          group-hover/skill:text-on-surface
                          transition-colors duration-300">
              {skill.desc}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
