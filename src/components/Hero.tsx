import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useMotionValueEvent, useScroll } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// Lazy load 3D scene for perf — avoids shipping three.js on first paint
const SpiderCinematicScene = lazy(() => import("./3d/Scene"));

interface Props {
  /** Receives hero timeline progress 0..1 for parent UI sync */
  onProgress?: (progress: number) => void;
}

const phaseProgress = (value: number, start: number, end: number) => {
  if (value <= start) {
    return 0;
  }
  if (value >= end) {
    return 1;
  }
  return (value - start) / (end - start);
};

export default function Hero({ onProgress }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [progress, setProgress] = useState(0);
  const isMobile = useIsMobile();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const clamped = Math.min(1, Math.max(0, value));
    setProgress(clamped);
    onProgress?.(clamped);
  });

  useEffect(() => {
    // Mount 3D after first paint so the dark fade-in feels cinematic
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const modelZoom = 0;
  const namePhase = phaseProgress(progress, 0.3, 0.5);
  const nameQuotePhase = phaseProgress(progress, 0.34, 0.56);
  const aiPhase = phaseProgress(progress, 0.5, 0.7);
  const aiQuotePhase = phaseProgress(progress, 0.54, 0.74);
  const fullStackPhase = phaseProgress(progress, 0.58, 0.78);
  const fullStackQuotePhase = phaseProgress(progress, 0.62, 0.82);

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <section
        id="home"
        className="sticky top-0 relative flex h-screen items-center justify-center overflow-hidden"
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

        {/* Web pattern fades in as timeline progresses */}
        <div
          className="pointer-events-none absolute inset-0 -z-10 web-pattern transition-opacity duration-700"
          style={{ opacity: progress * 0.6 }}
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
                  <SpiderCinematicScene zoom={modelZoom} isMobile={isMobile} />
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

        {/* Foreground vignette as timeline advances */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, oklch(0.08 0.01 260 / 0.85) 100%)",
            opacity: 0.6 + progress * 0.4,
          }}
        />

        {/* Stage 2: Name */}
        <motion.div
          style={{
            opacity: namePhase,
            transform: `translateX(${-120 * (1 - namePhase)}px)`,
          }}
          className="pointer-events-none absolute left-4 top-1/2 z-10 hidden -translate-y-1/2 md:left-10 lg:left-16 md:block"
        >
          <h1 className="font-sans text-5xl font-bold leading-[0.95] tracking-wide text-white md:text-6xl lg:text-7xl">
            Manan Mittal
          </h1>
          <motion.p
            style={{
              opacity: nameQuotePhase * 0.8,
              transform: `translateY(${20 * (1 - nameQuotePhase)}px)`,
            }}
            className="mt-3 max-w-md text-sm italic leading-relaxed text-white/75 md:text-base lg:text-lg"
          >
            "Engineering the future through code, creativity, and intelligence."
          </motion.p>
        </motion.div>

        {/* Stage 3: Roles on right */}
        <div className="pointer-events-none absolute right-4 top-1/2 z-10 hidden -translate-y-1/2 md:right-10 lg:right-16 md:block">
          <div className="space-y-10 text-right">
            <motion.div
              style={{
                opacity: aiPhase,
                transform: `translateX(${100 * (1 - aiPhase)}px)`,
              }}
            >
              <p className="font-sans text-4xl font-bold leading-tight tracking-wide text-white md:text-5xl">
                <span className="block">AI/ML</span>
                <span className="block">Engineer</span>
              </p>
              <motion.p
                style={{
                  opacity: aiQuotePhase * 0.8,
                  transform: `translateY(${20 * (1 - aiQuotePhase)}px)`,
                }}
                className="mt-2 max-w-md text-sm italic leading-relaxed text-white/75 md:ml-auto md:text-base"
              >
                "Building intelligent systems that learn, adapt, and evolve."
              </motion.p>
            </motion.div>

            <motion.div
              style={{
                opacity: fullStackPhase,
                transform: `translateX(${100 * (1 - fullStackPhase)}px)`,
              }}
            >
              <p className="font-sans text-4xl font-bold leading-tight tracking-wide text-white md:text-5xl">
                <span className="block">Full Stack</span>
                <span className="block">Developer</span>
              </p>
              <motion.p
                style={{
                  opacity: fullStackQuotePhase * 0.8,
                  transform: `translateY(${20 * (1 - fullStackQuotePhase)}px)`,
                }}
                className="mt-2 max-w-md text-sm italic leading-relaxed text-white/75 md:ml-auto md:text-base"
              >
                "Turning ideas into scalable, seamless digital experiences."
              </motion.p>
            </motion.div>
          </div>
        </div>

        {/* Mobile fallback text block */}
        <motion.div
          style={{
            opacity: Math.max(namePhase, aiPhase),
            transform: `translateY(${20 * (1 - Math.max(namePhase, aiPhase))}px)`,
          }}
          className="pointer-events-none absolute bottom-20 left-1/2 z-10 w-[90%] -translate-x-1/2 text-center md:hidden"
        >
          <h1 className="font-sans text-4xl font-bold tracking-wide text-white">Manan Mittal</h1>
          <p className="mt-2 text-sm italic text-white/75">
            "Engineering the future through code, creativity, and intelligence."
          </p>
          <p className="mt-5 font-sans text-2xl font-bold leading-tight tracking-wide text-white">
            AI/ML
            <br />
            Engineer
          </p>
          <p className="mt-1 text-sm italic text-white/75">
            "Building intelligent systems that learn, adapt, and evolve."
          </p>
          <p className="mt-5 font-sans text-2xl font-bold leading-tight tracking-wide text-white">
            Full Stack
            <br />
            Developer
          </p>
          <p className="mt-1 text-sm italic text-white/75">
            "Turning ideas into scalable, seamless digital experiences."
          </p>
        </motion.div>

        {/* Scroll hint — visible before timeline completes */}
        <motion.div
          animate={{ opacity: 1 - progress * 1.5 }}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2 text-center"
        >
          <div className="mx-auto h-10 w-6 rounded-full border border-white/20">
            <div className="mx-auto mt-2 h-2 w-px animate-bounce bg-white/60" />
          </div>
          <span className="mt-3 block text-[10px] tracking-[0.3em] text-muted-foreground">
            SCROLL TO ENTER
          </span>
        </motion.div>
      </section>
    </div>
  );
}
