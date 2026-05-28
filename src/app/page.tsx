import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { Showcases } from "@/components/showcases";
import { Skills } from "@/components/skills";
import { Articles } from "@/components/articles";
import { Contact } from "@/components/contact";
import { ParticleCanvas } from "@/components/particle-canvas";

export default function Home() {
  return (
    <>
      <ParticleCanvas />
      <Header />
      <main className="pt-20">
        <Hero />
        <Showcases />
        <Skills />
        <Articles />
      </main>
      <Contact />
    </>
  );
}
