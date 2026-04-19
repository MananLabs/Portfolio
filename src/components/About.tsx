import { motion } from "framer-motion";
import { Brain, Code2, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative px-6 py-32">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
        {/* Left: Text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs font-medium tracking-[0.3em] text-spider-red">
            ◆ ABOUT
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Engineering at the
            <br />
            <span className="text-gradient-spider">intersection of AI</span>
            <br />
            and the web.
          </h2>

          <p className="mt-8 max-w-md text-base leading-relaxed text-muted-foreground">
            I&apos;m <span className="text-foreground">Manan Mittal</span> — an
            AI/ML Engineer and Full-Stack Developer building intelligent,
            production-grade systems. From{" "}
            <span className="text-spider-red">deep learning pipelines</span> to{" "}
            <span style={{ color: "oklch(0.6 0.22 260)" }}>scalable web platforms</span>,
            I focus on shipping work that feels both rigorous and refined.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { icon: Brain, label: "AI / ML", value: "Models & Pipelines" },
              { icon: Code2, label: "Full Stack", value: "End-to-End Apps" },
              { icon: Sparkles, label: "Product", value: "Design + Engineering" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass-panel rounded-xl p-4 transition-all hover:border-spider-red/40"
              >
                <s.icon className="h-5 w-5 text-spider-red" />
                <div className="mt-3 text-xs uppercase tracking-widest text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-1 text-sm font-medium text-foreground">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: Floating glowing panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          <div className="relative aspect-square w-full max-w-md">
            {/* Glow halos */}
            <div className="absolute -inset-8 animate-ambient rounded-full bg-gradient-spider opacity-20 blur-3xl" />

            {/* Concentric web rings */}
            <div className="absolute inset-0 rounded-full border border-spider-red/20" />
            <div className="absolute inset-8 rounded-full border border-white/5" />
            <div className="absolute inset-16 rounded-full border border-spider-blue/20" />
            <div className="absolute inset-24 rounded-full border border-white/5" />

            {/* Web spokes */}
            {[0, 30, 60, 90, 120, 150].map((deg) => (
              <div
                key={deg}
                className="absolute top-1/2 left-1/2 h-px w-full origin-left bg-gradient-to-r from-spider-red/30 via-white/5 to-spider-blue/30"
                style={{ transform: `translateY(-50%) rotate(${deg}deg)` }}
              />
            ))}

            {/* Center emblem */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="glass-panel animate-float-slow flex h-32 w-32 items-center justify-center rounded-2xl border-glow-red">
                <span className="font-display text-3xl font-bold text-gradient-spider">
                  MM
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
