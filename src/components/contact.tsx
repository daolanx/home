export function Contact() {
  return (
    <footer className="w-full border-t border-surface-variant bg-surface-container-lowest" id="contact">
      <div className="max-w-[1280px] mx-auto px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-16 md:mb-24">
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="font-display-lg text-4xl md:text-5xl lg:text-6xl text-on-surface tracking-tight mb-2 md:mb-4">Contact Me</h2>
            <p className="font-body-lg text-sm md:text-base text-on-surface-variant max-w-md leading-relaxed">
              Interested in collaborating or have a question? Feel free to reach out. I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of your visions.
            </p>
          </div>
          <nav aria-label="Social links" className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 md:gap-y-6">
              <a className="group flex items-center justify-between p-4 border border-surface-variant hover:border-primary transition-colors duration-300" href="https://github.com/daolanx" target="_blank" rel="noopener noreferrer" aria-label="Visit GitHub profile">
                <span className="font-label-caps text-[10px] md:text-xs text-on-surface-variant group-hover:text-primary tracking-widest uppercase flex items-center gap-3">
                  <span className="material-symbols-outlined text-[16px] md:text-[18px]" aria-hidden="true">code</span>
                  GitHub
                </span>
                <span className="material-symbols-outlined text-[16px] text-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">arrow_outward</span>
              </a>
              <a className="group flex items-center justify-between p-4 border border-surface-variant hover:border-primary transition-colors duration-300" href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="Visit LinkedIn profile">
                <span className="font-label-caps text-[10px] md:text-xs text-on-surface-variant group-hover:text-primary tracking-widest uppercase flex items-center gap-3">
                  <span className="material-symbols-outlined text-[16px] md:text-[18px]" aria-hidden="true">work</span>
                  LinkedIn
                </span>
                <span className="material-symbols-outlined text-[16px] text-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">arrow_outward</span>
              </a>
              <a className="group flex items-center justify-between p-4 border border-surface-variant hover:border-primary transition-colors duration-300" href="https://twitter.com/daolanx" target="_blank" rel="noopener noreferrer" aria-label="Visit Twitter profile">
                <span className="font-label-caps text-[10px] md:text-xs text-on-surface-variant group-hover:text-primary tracking-widest uppercase flex items-center gap-3">
                  <span className="material-symbols-outlined text-[16px] md:text-[18px]" aria-hidden="true">tag</span>
                  Twitter
                </span>
                <span className="material-symbols-outlined text-[16px] text-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">arrow_outward</span>
              </a>
              <a className="group flex items-center justify-between p-4 border border-surface-variant hover:border-primary transition-colors duration-300" href="mailto:daolanx.dev@gmail.com" aria-label="Send email">
                <span className="font-label-caps text-[10px] md:text-xs text-on-surface-variant group-hover:text-primary tracking-widest uppercase flex items-center gap-3">
                  <span className="material-symbols-outlined text-[16px] md:text-[18px]" aria-hidden="true">mail</span>
                  Email
                </span>
                <span className="material-symbols-outlined text-[16px] text-surface-variant group-hover:text-primary transition-colors" aria-hidden="true">arrow_outward</span>
              </a>
            </div>
          </nav>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-12 pt-8 md:pt-12 border-t border-surface-variant">
          <div className="flex flex-col gap-3 md:gap-4">
            <span className="font-display-lg text-xl md:text-2xl font-bold text-on-surface flex items-center gap-2">
              <span className="w-2 h-2 bg-primary" />DevPortfolio
            </span>
            <span className="font-label-caps text-[8px] md:text-[10px] text-on-surface-variant tracking-widest uppercase">
              &copy; {new Date().getFullYear()} Expert Generalist. Built with technical rigor.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
