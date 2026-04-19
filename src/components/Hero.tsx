import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load 3D scene for perf — avoids shipping three.js on first paint
const SpiderCinematicScene = lazy(() => import("./3d/Scene"));

interface Props {
  /** 0..1 — how far the user has zoomed into the hero */
  zoom: number;
}

export default function Hero({ zoom }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Mount 3D after first paint so the dark fade-in feels cinematic
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Hero content fades + slides in as user zooms in
  const contentOpacity = Math.min(1, Math.max(0, (zoom - 0.15) * 1.6));
  const contentY = (1 - Math.min(1, zoom * 1.5)) * 30;

  return (
    <section
      id="home"
      ref={ref}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Ambient glow halos */}
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial-red)" }}
      />
      <div
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "var(--gradient-radial-blue)" }}
      />

      {/* Web pattern fades in as zoom progresses */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 web-pattern transition-opacity duration-700"
        style={{ opacity: zoom * 0.6 }}
      />

      {/* 3D canvas */}
      <div className="absolute inset-0">
        <AnimatePresence>
          {mounted && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, ease: "easeOut" }}
              className="h-full w-full"
            >
              <Suspense fallback={null}>
                <SpiderCinematicScene zoom={zoom} isMobile={isMobile} />
              </Suspense>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Entry blackout fade for cinematic reveal */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 1.3, ease: "easeOut", delay: 0.1 }}
        className="pointer-events-none absolute inset-0 z-20 bg-black"
      />

      {/* Foreground vignette as zoom increases */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.01 260 / 0.85) 100%)",
          opacity: 0.6 + zoom * 0.4,
        }}
      />

      {/* Hero text — appears as user zooms in */}
      <motion.div
        style={{
          opacity: contentOpacity,
          transform: `translateY(${contentY}px)`,
        }}
        className="relative z-10 mx-auto max-w-3xl px-6 text-center"
      >
        <span className="inline-block rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-medium uppercase tracking-[0.3em] text-muted-foreground backdrop-blur">
          <span className="mr-2 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-spider-red" />
          AVAILABLE FOR WORK
        </span>

        <h1 className="mt-8 font-display text-5xl font-bold leading-[0.95] tracking-tight md:text-7xl lg:text-8xl">
          Manan
          <br />
          <span className="text-gradient-spider">Mittal</span>
        </h1>

        <p className="mx-auto mt-6 max-w-xl text-sm tracking-[0.25em] text-muted-foreground md:text-base">
          AI / ML ENGINEER &nbsp;·&nbsp; FULL STACK DEVELOPER
        </p>

        <div className="mt-10 flex items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-spider px-7 py-3 text-xs font-semibold tracking-[0.2em] text-white shadow-[0_0_30px_oklch(0.62_0.24_25/0.4)] transition-transform hover:scale-[1.03]"
          >
            VIEW WORK
            <span className="h-px w-6 bg-white transition-all group-hover:w-10" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3 text-xs font-semibold tracking-[0.2em] text-foreground transition-colors hover:border-spider-blue/60"
          >
            CONTACT
          </a>
        </div>
      </motion.div>

      {/* Scroll hint — fades out as user zooms */}
      <motion.div
        animate={{ opacity: 1 - zoom * 2 }}
        className="absolute bottom-10 left-1/2 z-10 -translate-x-1/2 text-center"
      >
        <div className="mx-auto h-10 w-6 rounded-full border border-white/20">
          <div className="mx-auto mt-2 h-2 w-px animate-bounce bg-white/60" />
        </div>
        <span className="mt-3 block text-[10px] tracking-[0.3em] text-muted-foreground">
          SCROLL TO ENTER
        </span>
      </motion.div>
    </section>
  );
}
