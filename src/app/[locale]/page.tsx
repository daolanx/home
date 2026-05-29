import { Suspense } from "react";
import { Header } from "@/components/layouts/header";
import { Hero } from "@/components/hero";
import { Portfolios, PortfoliosSkeleton } from "@/components/portfolios";
import { Articles, ArticlesSkeleton } from "@/components/articles";
import { Contact } from "@/components/contacts";
import { ParticleCanvas } from "@/components/ui/particle-canvas";
import { Footer } from "@/components/layouts/footer";

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
        <Contact />
      </main>
      <Footer />
    </>
  );
}
