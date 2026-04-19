import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  {
    name: "FitKaro",
    desc: "AI-powered fitness platform delivering personalized workouts and nutrition plans through ML-driven recommendations.",
    tech: ["Next.js", "PyTorch", "FastAPI", "PostgreSQL"],
    accent: "red" as const,
  },
  {
    name: "CarbonIQ",
    desc: "Carbon footprint intelligence platform that ingests usage data and forecasts emissions with time-series models.",
    tech: ["React", "TensorFlow", "Node.js", "GCP"],
    accent: "blue" as const,
  },
  {
    name: "TokenVerse",
    desc: "Web3 marketplace with on-chain token analytics, smart-contract integrations and a real-time trading interface.",
    tech: ["Solidity", "Ethers.js", "Next.js", "Redis"],
    accent: "red" as const,
  },
  {
    name: "Project Marketplace",
    desc: "End-to-end marketplace for engineering projects — built with secure auth, payments and an admin dashboard.",
    tech: ["React", "Express", "Stripe", "MongoDB"],
    accent: "blue" as const,
  },
];

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  // Subtle 3D tilt on mouse move
  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(1000px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg) translateY(-4px)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) translateY(0)";
  };

  const accentClass =
    project.accent === "red" ? "border-glow-red" : "border-glow-blue";
  const accentText =
    project.accent === "red" ? "text-spider-red" : "text-spider-blue";

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        className={`group glass-panel relative h-full overflow-hidden rounded-2xl p-7 transition-[transform,box-shadow] duration-300 ease-out ${accentClass}`}
        style={{ willChange: "transform" }}
      >
        {/* Hover gradient sheen */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-white/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-start justify-between">
          <span className={`text-xs font-medium tracking-[0.25em] ${accentText}`}>
            0{index + 1}
          </span>
          <ArrowUpRight
            className={`h-5 w-5 ${accentText} transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1`}
          />
        </div>

        <h3 className="relative mt-6 font-display text-2xl font-bold text-foreground">
          {project.name}
        </h3>
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">
          {project.desc}
        </p>

        <div className="relative mt-6 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-medium uppercase tracking-widest text-muted-foreground"
            >
              {t}
            </span>
          ))}
        </div>

        <button
          className={`relative mt-7 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] ${accentText} transition-opacity hover:opacity-80`}
        >
          View Project
          <span className="h-px w-8 bg-current" />
        </button>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-spider-red">
            ◆ SELECTED WORK
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            Projects that <span className="text-gradient-spider">ship</span>.
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            A handful of things I&apos;ve built — from AI platforms to Web3
            marketplaces.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <ProjectCard key={p.name} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
