import { Suspense } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Portfolios, PortfoliosSkeleton } from "@/components/portfolios";

import { Articles, ArticlesSkeleton } from "@/components/articles";
import { Contact } from "@/components/contact";
import { ParticleCanvas } from "@/components/particle-canvas";

export default async function Home() {
  return (
    <>
      <ParticleCanvas />
      <Header />
      <main className="pt-20">
        <Hero />
        <Suspense fallback={<PortfoliosSkeleton />}>
          <Portfolios />
        </Suspense>
        <Suspense fallback={<ArticlesSkeleton />}>
          <Articles />
        </Suspense>
      </main>
      <Contact />
    </>
  );
}
