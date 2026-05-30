"use client";

import { useEffect, useRef } from "react";
import { isDesktop } from "@/lib/breakpoint";

/* ── Config ── */
const CONFIG = {
  DENSITY: 10000,
  MAX: 100,
  SIZE_MIN: 0.5,
  SIZE_RANGE: 1.5,
  SPEED: 0.5,
  OPACITY_MIN: 0.1,
  OPACITY_RANGE: 0.3,
  MOUSE_RADIUS: 150,
  MOUSE_STRENGTH: 0.01,
  LINK_DIST: 100,
  LINK_OPACITY: 0.1,
  LINK_WIDTH: 0.5,
} as const;

const MOUSE_RADIUS_SQ = CONFIG.MOUSE_RADIUS ** 2;
const LINK_DIST_SQ = CONFIG.LINK_DIST ** 2;

interface Particle {
  x: number;
  y: number;
  size: number;
  vx: number;
  vy: number;
  opacity: number;
}

function createParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    size: CONFIG.SIZE_MIN + Math.random() * CONFIG.SIZE_RANGE,
    vx: (Math.random() - 0.5) * CONFIG.SPEED,
    vy: (Math.random() - 0.5) * CONFIG.SPEED,
    opacity: CONFIG.OPACITY_MIN + Math.random() * CONFIG.OPACITY_RANGE,
  };
}

function initParticles(w: number, h: number): Particle[] {
  const count = Math.min(Math.floor((w * h) / CONFIG.DENSITY), CONFIG.MAX);
  return Array.from({ length: count }, () => createParticle(w, h));
}

/* ── Component ── */
export function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Respect reduced-motion preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    // Skip entirely on mobile
    if (!isDesktop()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    let particles: Particle[] = [];
    let mouseX = -Infinity;
    let mouseY = -Infinity;
    let animationId: number;
    let resizeTimer: ReturnType<typeof setTimeout>;

    /* ── Canvas size + high DPI ── */
    function resizeCanvas() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas!.width = w * dpr;
      canvas!.height = h * dpr;
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = initParticles(w, h);
    }

    function debouncedResize() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(resizeCanvas, 150);
    }

    /* ── Animation loop ── */
    function animate() {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const len = particles.length;

      ctx!.clearRect(0, 0, w, h);

      // Draw connection lines
      ctx!.lineWidth = CONFIG.LINK_WIDTH;
      for (let i = 0; i < len; i++) {
        const a = particles[i];
        for (let j = i + 1; j < len; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distSq = dx * dx + dy * dy;
          if (distSq < LINK_DIST_SQ) {
            ctx!.strokeStyle = `rgba(0,0,0,${CONFIG.LINK_OPACITY * (1 - distSq / LINK_DIST_SQ)})`;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.stroke();
          }
        }
      }

      // Update and draw particles
      for (let i = 0; i < len; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x += w; else if (p.x > w) p.x -= w;
        if (p.y < 0) p.y += h; else if (p.y > h) p.y -= h;

        // Mouse repulsion (squared distance, no sqrt)
        const mdx = mouseX - p.x;
        const mdy = mouseY - p.y;
        if (mdx * mdx + mdy * mdy < MOUSE_RADIUS_SQ) {
          p.x -= mdx * CONFIG.MOUSE_STRENGTH;
          p.y -= mdy * CONFIG.MOUSE_STRENGTH;
        }

        ctx!.fillStyle = `rgba(0,0,0,${p.opacity})`;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fill();
      }

      animationId = requestAnimationFrame(animate);
    }

    /* ── Events ── */
    function handleMouseMove(e: MouseEvent) {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }

    function handleMouseLeave() {
      mouseX = -Infinity;
      mouseY = -Infinity;
    }

    resizeCanvas();
    animate();

    window.addEventListener("resize", debouncedResize);
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationId);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", debouncedResize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 z-[-1] pointer-events-none
                 opacity-50 mix-blend-multiply
                 hidden md:block"
    />
  );
}
