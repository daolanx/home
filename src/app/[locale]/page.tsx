import { Suspense } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Showcases } from "@/components/showcases";
import { Skills } from "@/components/skills";
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
        <Showcases />
        {/* <Skills /> */}
        <Suspense fallback={<ArticlesSkeleton />}>
          <Articles />
        </Suspense>
      </main>
      <Contact />
    </>
  );
}
