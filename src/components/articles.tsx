import { ScrollReveal } from "@/components/scroll-reveal";

const posts = [
  {
    category: "Architecture",
    title: "在大型 React 应用中实施领域驱动设计 (DDD) 的实践经验",
    date: "2023-11-24",
  },
  {
    category: "Performance",
    title: "彻底理解现代浏览器渲染流水线：从 CSSOM 到 Paint",
    date: "2023-10-12",
  },
  {
    category: "Design System",
    title: "基于 Tailwind CSS 构建高可维护的内部组件库指南",
    date: "2023-09-05",
  },
];

export function Articles() {
  return (
    <section className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 border-t border-surface-variant" id="blog">
      <ScrollReveal className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
        <div className="max-w-2xl border-l-2 border-primary pl-6">
          <p className="font-label-caps text-[10px] md:text-xs text-primary uppercase tracking-widest mb-3 md:mb-4">Thoughts & Articles</p>
          <h2 className="font-display-lg text-3xl md:text-4xl lg:text-5xl text-on-surface tracking-tight">技术思考</h2>
        </div>
        <a className="font-label-caps text-[10px] md:text-xs text-primary hover:text-surface-tint inline-flex items-center transition-colors pb-2 border-b border-primary/30 hover:border-primary uppercase tracking-widest self-start md:self-auto" href="#">
          进入博客 <span className="material-symbols-outlined ml-2 text-[14px]">arrow_forward</span>
        </a>
      </ScrollReveal>

      <div className="flex flex-col border-t border-surface-variant">
        {posts.map((post, i) => (
          <ScrollReveal key={post.date} delay={i * 100}>
            <a className="group py-8 md:py-10 border-b border-surface-variant flex flex-col lg:flex-row lg:items-center justify-between gap-4 md:gap-6 hover:bg-surface-container-low transition-colors duration-300 relative px-4 -mx-4" href="#">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-2 md:mb-3">
                  <span className="font-label-caps text-[10px] uppercase tracking-widest text-outline">{post.category}</span>
                </div>
                <h3 className="font-headline-lg text-xl md:text-2xl lg:text-3xl text-on-surface group-hover:text-primary transition-colors max-w-4xl">
                  {post.title}
                </h3>
              </div>
              <div className="shrink-0 flex items-center justify-between lg:justify-end gap-4 mt-2 lg:mt-0">
                <time className="font-label-caps text-[10px] md:text-xs text-outline tracking-widest" dateTime={post.date}>{post.date}</time>
                <span className="material-symbols-outlined text-outline group-hover:text-primary transition-colors text-[20px] lg:opacity-0 lg:group-hover:opacity-100 lg:-translate-x-4 lg:group-hover:translate-x-0 duration-300">arrow_forward</span>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}
