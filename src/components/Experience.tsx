import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

type ExperienceItem = {
  id: string;
  title: string;
  company: string;
  duration: string;
  description: string;
  highlights: string[];
  side: "left" | "right";
  top: number;
  accent: "red" | "blue" | "purple";
  metrics: string[];
  tags: string[];
};

type AccentTheme = {
  line: string;
  nodeBorder: string;
  nodeCore: string;
  activeRing: string;
  panelAccent: string;
  panelEdge: string;
  segmentTint: string;
  tagClasses: string;
  metricClasses: string;
};

const getAccentTheme = (accent: ExperienceItem["accent"]): AccentTheme => {
  if (accent === "purple") {
    return {
      line: "from-[#a855f7]/75 via-[#a855f7]/45 to-transparent",
      nodeBorder: "border-[#c084fc]/70",
      nodeCore: "bg-[#c084fc]/85",
      activeRing: "border-[#d8b4fe]/80",
      panelAccent: "text-[#d8b4fe]",
      panelEdge: "border-[#a855f7]/40 shadow-[0_0_0_1px_rgba(168,85,247,0.14)]",
      segmentTint: "bg-[#a855f7]/80",
      tagClasses:
        "border-[#a855f7]/30 bg-[rgba(168,85,247,0.08)] text-[#e9d5ff] shadow-[0_0_0_1px_rgba(168,85,247,0.1)]",
      metricClasses: "text-[#e9d5ff]",
    };
  }

  if (accent === "red") {
    return {
      line: "from-spider-red/75 via-spider-red/45 to-transparent",
      nodeBorder: "border-spider-red/70",
      nodeCore: "bg-spider-red/85",
      activeRing: "border-spider-red/80",
      panelAccent: "text-spider-red",
      panelEdge: "border-spider-red/40 shadow-[0_0_0_1px_rgba(225,29,72,0.14)]",
      segmentTint: "bg-spider-red/80",
      tagClasses:
        "border-spider-red/30 bg-[rgba(225,29,72,0.08)] text-red-100 shadow-[0_0_0_1px_rgba(225,29,72,0.1)]",
      metricClasses: "text-red-100",
    };
  }

  return {
    line: "from-spider-blue/75 via-spider-blue/45 to-transparent",
    nodeBorder: "border-spider-blue/70",
    nodeCore: "bg-spider-blue/85",
    activeRing: "border-spider-blue/80",
    panelAccent: "text-spider-blue",
    panelEdge: "border-spider-blue/40 shadow-[0_0_0_1px_rgba(29,78,216,0.14)]",
    segmentTint: "bg-spider-blue/80",
    tagClasses:
      "border-spider-blue/30 bg-[rgba(29,78,216,0.08)] text-blue-100 shadow-[0_0_0_1px_rgba(29,78,216,0.1)]",
    metricClasses: "text-blue-100",
  };
};

const toneStyles: Record<ExperienceItem["accent"], AccentTheme> = {
  red: getAccentTheme("red"),
  blue: getAccentTheme("blue"),
  purple: getAccentTheme("purple"),
};

const experiences: ExperienceItem[] = [
  {
    id: "exp-saanjh",
    title: "Co-Founder & CTO",
    company: "Saanjh Treatz",
    duration: "March 2024 – Present",
    description:
      "Led product strategy and technical execution from inception. Drove customer engagement, implemented revenue-focused strategies, and managed systems for scalability and profitability.",
    highlights: ["Product strategy", "Revenue optimization", "System scalability"],
    side: "left",
    top: 90,
    accent: "purple",
    metrics: ["Built 3 core operating workflows", "Managed product, revenue, and inventory systems"],
    tags: ["Founder Ops", "Strategy", "Revenue", "Inventory"],
  },
  {
    id: "exp-hacc",
    title: "Tech Head",
    company: "HACC Club, REVA University",
    duration: "Jan 2025 – Present",
    description:
      "Led end-to-end execution of national-level hackathons. Architected official platforms, managed backend workflows, and coordinated technical teams at scale.",
    highlights: ["Hackathon platforms", "Backend workflows", "Team coordination"],
    side: "left",
    top: 26,
    accent: "blue",
    metrics: ["Led 2 major hackathon operations", "Coordinated multi-team event delivery"],
    tags: ["Hackathons", "Platforms", "Backend", "Leadership"],
  },
  {
    id: "exp-devtrack",
    title: "Tech Head",
    company: "Dev Track Club, REVA University",
    duration: "Jan 2025 – Present",
    description:
      "Leading technical initiatives and event execution. Overseeing development workflows, system infrastructure, and driving collaboration across developer teams.",
    highlights: ["Event infrastructure", "System design", "Team collaboration"],
    side: "right",
    top: 42,
    accent: "red",
    metrics: ["Streamlined club workflow execution", "Kept technical systems aligned across teams"],
    tags: ["Workflows", "Infra", "Collaboration", "Systems"],
  },
  {
    id: "exp-face",
    title: "Tech Head",
    company: "FACE Club, REVA University",
    duration: "Jan 2025 – Present",
    description:
      "Managing technical operations and development initiatives. Leading system design, event tech execution, and building scalable workflows for student-led events.",
    highlights: ["Tech operations", "System architecture", "Event execution"],
    side: "left",
    top: 58,
    accent: "blue",
    metrics: ["Standardized event-tech delivery", "Improved execution flow across student projects"],
    tags: ["Systems", "Event Tech", "Ops", "Architecture"],
  },
  {
    id: "exp-agentsclan",
    title: "Full Stack Developer",
    company: "AgentsClan (Freelance)",
    duration: "Feb 2026 – Mar 2026",
    description:
      "Led redevelopment of a production-ready community platform using Next.js, FastAPI, and Supabase. Implemented secure JWT-based authentication and optimized database architecture.",
    highlights: ["Next.js + FastAPI", "JWT authentication", "Database optimization"],
    side: "right",
    top: 74,
    accent: "red",
    metrics: ["Shipped a full platform rebuild", "Implemented role-based auth and scalable data layers"],
    tags: ["Next.js", "FastAPI", "Supabase", "JWT"],
  },
  {
    id: "exp-aghron",
    title: "AI Engineer & Backend Developer",
    company: "Aghron Forum",
    duration: "Apr 2026 – May 2026",
    description:
      "Developed and deployed AI-driven automation tools for finance workflows. Built scalable backend systems, APIs, and data processing pipelines with secure financial data handling.",
    highlights: ["Finance automation", "Scalable APIs", "Secure data systems"],
    side: "right",
    top: 10,
    accent: "red",
    metrics: ["Automated finance workflows end to end", "Built reliable backend pipelines for sensitive data"],
    tags: ["Automation", "Finance APIs", "AI Bots", "Security"],
  },
];

type TimelineNodeProps = {
  item: ExperienceItem;
};

function TimelineNode({ item }: TimelineNodeProps) {
  const isRight = item.side === "right";
  const theme = getAccentTheme(item.accent);
  const lineDirection = isRight ? "bg-gradient-to-r" : "bg-gradient-to-l";

  return (
    <motion.div
      className="group absolute left-1/2 w-0 -translate-x-1/2"
      initial={{ opacity: 0, y: 40, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      style={{ top: `${item.top}%` }}
    >
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-20 flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
      >
        <motion.div
          className="absolute h-6 w-6 rounded-full border border-dashed border-white/22"
          animate={{ rotate: 360 }}
          transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className={`absolute h-4 w-4 rounded-full border ${theme.nodeBorder}`}
          animate={{ scale: [1, 1.06, 1], opacity: [0.8, 1, 0.8] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className={`h-1.5 w-1.5 rounded-full ${theme.nodeCore}`}
          animate={{ scale: [1, 1.14, 1], opacity: [0.75, 1, 0.75] }}
          transition={{ duration: 1.9, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.div
        className={`absolute top-1/2 h-[1.8px] w-40 -translate-y-1/2 ${lineDirection} ${theme.line} ${
          isRight ? "left-2 origin-left rotate-[18deg]" : "right-2 origin-right -rotate-[18deg]"
        }`}
        animate={{ opacity: 0.72, x: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 22 }}
      >
        <motion.div
          className="absolute inset-y-0 left-0 w-8 bg-white/20"
          animate={{ x: 0, opacity: 0 }}
          transition={{ duration: 1.25, repeat: 0, ease: "easeInOut" }}
        />
      </motion.div>

      <motion.article
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: false, amount: 0.28 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.15 }}
        className={`absolute top-1/2 z-30 w-[320px] -translate-y-1/2 border bg-gradient-to-br from-[#0c101a]/98 via-[#0a0c14]/98 to-[#0b0d12]/98 p-4 ${theme.panelEdge} ${
          isRight ? "left-[170px]" : "right-[170px]"
        }`}
        style={{ clipPath: "polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)" }}
      >
        <div className="pointer-events-none absolute inset-0">
          <div className={`absolute left-3 top-2 h-[1.5px] w-24 ${theme.segmentTint}`} />
          <div className={`absolute right-2 bottom-3 h-10 w-[1.5px] ${theme.segmentTint}`} />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:22px_22px] opacity-20" />
        </div>

        <div className="relative">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.28 }}
            transition={{ duration: 0.42, ease: "easeInOut", delay: 0.15 }}
            className="text-[10px] font-semibold uppercase tracking-[0.34em] text-white/45"
          >
            {item.duration}
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.28 }}
            transition={{ duration: 0.44, ease: "easeInOut", delay: 0.24 }}
            className="mt-2 text-base font-black uppercase tracking-[0.16em] text-white"
          >
            {item.title}
          </motion.h3>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.28 }}
            transition={{ duration: 0.44, ease: "easeInOut", delay: 0.32 }}
            className={`mt-1 text-xs font-semibold uppercase tracking-[0.25em] ${theme.panelAccent}`}
          >
            {item.company}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.28 }}
            transition={{ duration: 0.46, ease: "easeInOut", delay: 0.4 }}
            className="mt-3 line-clamp-3 text-sm leading-6 text-white/74"
          >
            {item.description}
          </motion.p>

          <div className="mt-3 flex flex-wrap gap-2">
            {item.tags.map((tag, tagIndex) => (
              <motion.span
                key={tag}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.28 }}
                transition={{ duration: 0.42, ease: "easeInOut", delay: 0.52 + tagIndex * 0.06 }}
                className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] ${theme.tagClasses}`}
              >
                {tag}
              </motion.span>
            ))}
          </div>

          <div className="mt-3 space-y-2 border-l border-white/10 pl-3">
            {item.metrics.map((metric, pointIndex) => (
              <motion.div
                key={metric}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.28 }}
                transition={{ duration: 0.44, ease: "easeInOut", delay: 0.46 + pointIndex * 0.07 }}
                className={`text-[11px] font-medium leading-5 ${theme.metricClasses}`}
              >
                • {metric}
              </motion.div>
            ))}
          </div>

          <div className="mt-3 space-y-1 text-[10px] uppercase tracking-[0.22em] text-white/50">
            {item.highlights.map((point, pointIndex) => (
              <motion.div
                key={point}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.28 }}
                transition={{ duration: 0.42, ease: "easeInOut", delay: 0.58 + pointIndex * 0.08 }}
              >
                - {point}
              </motion.div>
            ))}
          </div>

        </div>
      </motion.article>
    </motion.div>
  );
}

export default function Experience() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 90%", "end 10%"],
  });
  const strandScaleY = useSpring(useTransform(scrollYProgress, [0, 0.12, 1], [0.18, 0.76, 1]), {
    stiffness: 90,
    damping: 22,
    mass: 0.45,
  });
  const strandOpacity = useTransform(scrollYProgress, [0, 0.08, 1], [0.08, 0.72, 1]);

  return (
    <section id="experience" ref={sectionRef} className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-120px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <span className="inline-flex border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.35em] text-spider-blue">
            02 EXPERIENCE THREAD
          </span>
          <h2 className="mt-4 font-display text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
            Experience <span className="text-spider-red">Timeline</span>
          </h2>
          <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/38">
            From building systems to engineering intelligence and securing them at scale.
          </p>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Scroll through the strand to inspect the mission-critical work behind my AI, cybersecurity, and software engineering journey.
          </p>
        </motion.div>

        <div className="relative hidden min-h-[260vh] md:block">
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {[
              { left: "20%", top: "16%", size: 2, delay: 0, duration: 8 },
              { left: "34%", top: "31%", size: 1.5, delay: 1.5, duration: 10 },
              { left: "68%", top: "24%", size: 2, delay: 0.6, duration: 9 },
              { left: "77%", top: "52%", size: 1.5, delay: 2.2, duration: 11 },
              { left: "24%", top: "66%", size: 1.5, delay: 1.1, duration: 9.5 },
              { left: "71%", top: "78%", size: 2, delay: 1.8, duration: 10.5 },
            ].map((particle, index) => (
              <motion.span
                key={index}
                className="absolute rounded-full bg-white/35 blur-[0.5px]"
                style={{ left: particle.left, top: particle.top, width: particle.size, height: particle.size }}
                animate={{ y: [0, -10, 0], opacity: [0.18, 0.48, 0.18] }}
                transition={{ duration: particle.duration, delay: particle.delay, repeat: Infinity, ease: "easeInOut" }}
              />
            ))}
          </div>

          <motion.svg
            aria-hidden="true"
            viewBox="0 0 64 860"
            preserveAspectRatio="none"
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 h-full w-16 -translate-x-1/2"
            animate={{ rotate: [-0.8, 0.8, -0.8] }}
            transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "50% 0%", scaleY: strandScaleY, opacity: strandOpacity }}
          >
            <defs>
              <linearGradient id="strandBase" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                <stop offset="45%" stopColor="rgba(255,255,255,0.56)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.28)" />
              </linearGradient>
              <linearGradient id="strandHighlight" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(225,29,72,0.0)" />
                <stop offset="32%" stopColor="rgba(225,29,72,0.16)" />
                <stop offset="58%" stopColor="rgba(29,78,216,0.15)" />
                <stop offset="100%" stopColor="rgba(29,78,216,0.0)" />
              </linearGradient>
            </defs>

            <path
              d="M32.4 0 C29.8 72, 34.8 150, 31.9 230 C29.6 320, 34.9 402, 32.1 492 C29.9 580, 34.3 662, 32 748 C31.6 788, 32.2 824, 31.8 860"
              fill="none"
              stroke="url(#strandBase)"
              strokeWidth="1.55"
              strokeLinecap="round"
              opacity="0.72"
            />
            <path
              d="M31.9 0 C29.5 76, 34.3 152, 31.4 232 C29.2 320, 34.4 402, 31.5 492 C29.5 580, 33.8 664, 31.4 750 C31.1 790, 31.7 826, 31.3 860"
              fill="none"
              stroke="rgba(255,255,255,0.18)"
              strokeWidth="0.75"
              strokeLinecap="round"
              opacity="0.5"
            />
            <path
              d="M32.5 0 C30 74, 34.9 150, 32 232 C30.8 322, 35 404, 32.2 494 C30.1 584, 34.5 666, 32.3 752 C31.9 792, 32.5 828, 32.2 860"
              fill="none"
              stroke="url(#strandHighlight)"
              strokeWidth="0.9"
              strokeLinecap="round"
              opacity="0.6"
            />

            <g opacity="0.36">
              <path d="M32 78 C27 84, 24 92, 22 104" fill="none" stroke="rgba(255,255,255,0.22)" strokeWidth="0.52" strokeLinecap="round" />
              <path d="M32.2 126 C37 132, 40 140, 42 152" fill="none" stroke="rgba(255,255,255,0.21)" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M31.8 186 C26 194, 22 206, 20 220" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M32.1 242 C39 250, 44 262, 46 278" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.48" strokeLinecap="round" />
              <path d="M31.9 302 C24 312, 20 326, 18 342" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M32.2 358 C40 366, 46 380, 48 398" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.48" strokeLinecap="round" />
              <path d="M31.7 430 C26 438, 22 448, 19 462" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M32.3 488 C38 495, 42 506, 45 520" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.48" strokeLinecap="round" />
              <path d="M31.8 560 C25 568, 21 580, 18 595" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M32.2 618 C39 626, 44 640, 47 656" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.48" strokeLinecap="round" />
              <path d="M31.9 700 C27 706, 23 716, 21 728" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
              <path d="M32.1 754 C36 760, 40 770, 43 784" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.48" strokeLinecap="round" />
            </g>

            <g opacity="0.28">
              <path d="M20 90 C27 84, 36 84, 44 92" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.45" />
              <path d="M18 286 C25 278, 36 280, 46 292" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.42" />
              <path d="M19 504 C26 496, 37 498, 45 510" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.42" />
              <path d="M20 726 C27 718, 36 720, 44 732" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.42" />
            </g>

            <g opacity="0.2">
              <path d="M32 160 C30 170, 30 182, 32 194" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="0.4" />
              <path d="M32 378 C30 388, 30 401, 32 414" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
              <path d="M32 648 C30 658, 30 670, 32 682" fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="0.4" />
            </g>

            <path d="M32 146 L27.6 156" stroke="rgba(255,255,255,0.24)" strokeWidth="0.55" strokeLinecap="round" />
            <path d="M32.1 298 L36.8 308" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M31.9 444 L27.2 454" stroke="rgba(255,255,255,0.22)" strokeWidth="0.55" strokeLinecap="round" />
            <path d="M32.2 612 L37 622" stroke="rgba(255,255,255,0.19)" strokeWidth="0.5" strokeLinecap="round" />
            <path d="M31.8 760 L27.4 770" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" strokeLinecap="round" />
          </motion.svg>

          <motion.div className="absolute inset-0">
            {experiences.map((item) => (
              <TimelineNode
                key={item.id}
                item={item}
              />
            ))}
          </motion.div>
        </div>

        <div className="space-y-4 md:hidden">
          {experiences.map((item, index) => (
            <motion.article
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.06 * index, ease: "easeInOut" }}
              className={`border bg-gradient-to-br from-[#0c101a]/98 via-[#0a0c14]/98 to-[#0b0d12]/98 p-4 ${toneStyles[item.accent].panelEdge.split(" ")[0]}`}
              style={{ clipPath: "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)" }}
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="relative flex h-4 w-4 items-center justify-center">
                  <div className={`absolute h-4 w-4 rounded-full border ${toneStyles[item.accent].node} ${toneStyles[item.accent].glow}`} />
                  <div className={`h-1.5 w-1.5 rounded-full ${toneStyles[item.accent].core}`} />
                </div>
                <div className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/48">
                  {item.duration}
                </div>
              </div>
              <h3 className="text-base font-bold uppercase tracking-[0.12em] text-white">{item.title}</h3>
              <div className={`mt-1 text-xs font-semibold uppercase tracking-[0.25em] ${toneStyles[item.accent].panelAccent}`}>
                {item.company}
              </div>
              <p className="mt-3 text-sm leading-6 text-white/72">{item.description}</p>
              <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/52">
                {item.extraLine}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <motion.span
                    key={tag}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 0.42, ease: "easeInOut", delay: 0.5 }}
                    className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/72 ${toneStyles[item.accent].tagBorder} ${toneStyles[item.accent].tagGlow} bg-white/[0.03] transition-all duration-200`}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
              <ul className="mt-3 space-y-1 text-[11px] uppercase tracking-[0.2em] text-white/56">
                {item.metrics.map((point, pointIndex) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 0.44, ease: "easeInOut", delay: 0.42 + pointIndex * 0.07 }}
                  >
                    • {point}
                  </motion.li>
                ))}
              </ul>
              <ul className="mt-3 space-y-1 text-[11px] uppercase tracking-[0.2em] text-white/46">
                {item.highlights.map((point, pointIndex) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.7 }}
                    transition={{ duration: 0.42, ease: "easeInOut", delay: 0.5 + pointIndex * 0.08 }}
                  >
                    - {point}
                  </motion.li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>

      </div>
    </section>
  );
}
