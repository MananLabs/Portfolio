import { motion } from "framer-motion";

const groups = [
  {
    name: "AI / ML",
    accent: "red" as const,
    skills: [
      { label: "PyTorch", level: 92 },
      { label: "TensorFlow", level: 88 },
      { label: "LangChain", level: 85 },
      { label: "Transformers", level: 90 },
    ],
  },
  {
    name: "Backend",
    accent: "blue" as const,
    skills: [
      { label: "Node.js", level: 93 },
      { label: "FastAPI", level: 90 },
      { label: "PostgreSQL", level: 88 },
      { label: "Redis", level: 80 },
    ],
  },
  {
    name: "Frontend",
    accent: "red" as const,
    skills: [
      { label: "React", level: 95 },
      { label: "Next.js", level: 92 },
      { label: "TypeScript", level: 90 },
      { label: "Tailwind", level: 94 },
    ],
  },
  {
    name: "Tools",
    accent: "blue" as const,
    skills: [
      { label: "Docker", level: 85 },
      { label: "AWS", level: 82 },
      { label: "Git", level: 95 },
      { label: "Vercel", level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 max-w-2xl"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-spider-red">
            ◆ TOOLKIT
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-5xl">
            The <span className="text-gradient-spider">stack</span> I move with.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {groups.map((g, gi) => (
            <motion.div
              key={g.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: gi * 0.1 }}
              className={`glass-panel rounded-2xl p-6 ${g.accent === "red" ? "border-glow-red" : "border-glow-blue"}`}
            >
              <h3
                className={`mb-6 text-xs font-semibold uppercase tracking-[0.25em] ${g.accent === "red" ? "text-spider-red" : "text-spider-blue"}`}
              >
                {g.name}
              </h3>
              <ul className="space-y-5">
                {g.skills.map((s, si) => (
                  <li key={s.label}>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">
                        {s.label}
                      </span>
                      <span className="text-[10px] tracking-widest text-muted-foreground">
                        {s.level}%
                      </span>
                    </div>
                    <div className="h-1 overflow-hidden rounded-full bg-white/5">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${s.level}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1.1,
                          delay: gi * 0.1 + si * 0.08,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            g.accent === "red"
                              ? "linear-gradient(90deg, oklch(0.62 0.24 25), oklch(0.7 0.2 30))"
                              : "linear-gradient(90deg, oklch(0.5 0.22 260), oklch(0.6 0.2 260))",
                          boxShadow:
                            g.accent === "red"
                              ? "0 0 12px oklch(0.62 0.24 25 / 0.5)"
                              : "0 0 12px oklch(0.5 0.22 260 / 0.5)",
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
