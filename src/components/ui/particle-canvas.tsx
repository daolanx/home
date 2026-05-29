"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

const options = {
  fullScreen: false,
  detectRetina: true,
  fpsLimit: 60,
  particles: {
    number: {
      value: 80,
      density: { enable: true, width: 1920, height: 1080 },
    },
    color: { value: "#000000" },
    opacity: {
      value: { min: 0.1, max: 0.4 },
    },
    size: {
      value: { min: 0.5, max: 2 },
    },
    move: {
      enable: true,
      speed: 0.5,
      direction: "none" as const,
    },
  },
  links: {
    enable: true,
    distance: 100,
    color: "#000000",
    opacity: 0.1,
    width: 0.5,
  },
  interactivity: {
    events: {
      onHover: {
        enable: true,
        mode: "repulse" as const,
      },
    },
    modes: {
      repulse: {
        distance: 150,
        strength: 0.01,
      },
    },
  },
};

export function ParticleCanvas() {
  return (
    <ParticlesProvider init={(engine) => loadSlim(engine)}>
      <div
        aria-hidden="true"
        className="fixed inset-0 z-[-1] pointer-events-none
                   opacity-50 mix-blend-multiply
                   hidden md:block"
      >
        <Particles id="tsparticles" options={options} className="w-full h-full" />
      </div>
    </ParticlesProvider>
  );
}
