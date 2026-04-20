import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, BadgeCheck, Brain, Code2, Globe2, Layers3 } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const stackSections = [
  {
    title: "Cybersecurity",
    accent: "red" as const,
    skills: [
      { name: "Web Security", level: 88, accent: "blue" as const },
      { name: "Network Security", level: 82, accent: "red" as const },
      { name: "Ethical Hacking", level: 80, accent: "blue" as const },
      { name: "OWASP", level: 85, accent: "red" as const },
      { name: "Cryptography", level: 78, accent: "blue" as const },
    ],
  },
  {
    title: "Frontend",
    accent: "blue" as const,
    skills: [
      { name: "React", level: 98, accent: "red" as const },
      { name: "JavaScript", level: 92, accent: "blue" as const },
      { name: "HTML", level: 89, accent: "red" as const },
      { name: "CSS", level: 85, accent: "blue" as const },
    ],
  },
  {
    title: "Backend & DB",
    accent: "red" as const,
    skills: [
      { name: "MongoDB", level: 88, accent: "blue" as const },
      { name: "Appwrite", level: 82, accent: "red" as const },
      { name: "Firebase", level: 80, accent: "blue" as const },
    ],
  },
  {
    title: "AI / LLM",
    accent: "blue" as const,
    skills: [
      { name: "OpenAI", level: 99, accent: "red" as const },
      { name: "Python", level: 97, accent: "blue" as const },
      { name: "Groq", level: 85, accent: "red" as const },
    ],
  },
  {
    title: "DevOps",
    accent: "red" as const,
    skills: [
      { name: "Vercel", level: 92, accent: "blue" as const },
      { name: "Git", level: 96, accent: "red" as const },
    ],
  },
  {
    title: "Tools",
    accent: "blue" as const,
    skills: [
      { name: "GitHub", level: 95, accent: "red" as const },
      { name: "Postman", level: 88, accent: "blue" as const },
    ],
  },
];

const levelTone = (level: number) => {
  if (level >= 95) return "text-white";
  if (level >= 85) return "text-spider-red";
  return "text-spider-blue";
};

const highlights = [
  { icon: Brain, label: "AI / ML", value: "Modeling & inference" },
  { icon: Code2, label: "Full Stack", value: "Frontend to backend" },
  { icon: Globe2, label: "Cybersecurity", value: "Security, threat detection & system protection" },
];

const interactiveCards = {
  "AI / ML": {
    accent: "red" as const,
    slideText: "Intelligent pipelines optimized for secure, scalable deployment.",
    slidePoints: ["Model training and evaluation", "LLM integrations", "Reliable inference flow"],
    popupText:
      "I build AI/ML systems that move from experimentation to production with clear model governance, robust evaluation, and performance-aware deployment patterns.",
    tools: "Python, PyTorch, TensorFlow, OpenAI APIs, vector databases",
    summary: "Focused on production-ready intelligence with measurable outcomes.",
  },
  "Full Stack": {
    accent: "blue" as const,
    slideText: "Secure end-to-end products engineered for speed and resilience.",
    slidePoints: ["Backend architecture", "Scalable APIs", "Responsive frontend systems"],
    popupText:
      "I architect and ship full-stack platforms with secure backend services, efficient data handling, and modern interfaces that stay reliable under growth and real usage.",
    tools: "React, TypeScript, Node.js, databases, cloud deployment",
    summary: "Designed to balance user experience, system integrity, and scale.",
  },
};

type InteractiveCardKey = keyof typeof interactiveCards;

const patchCardVariants = {
  hidden: { opacity: 0, x: -80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.06,
    },
  },
};

const patchCardChildVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: "easeInOut" },
  },
};

export default function About() {
  const [activePopup, setActivePopup] = useState<InteractiveCardKey | null>(null);
  const [hoveredCard, setHoveredCard] = useState<InteractiveCardKey | null>(null);
  const [canHover, setCanHover] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover)");
    const update = () => setCanHover(media.matches);
    update();

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", update);
      return () => media.removeEventListener("change", update);
    }

    media.addListener(update);
    return () => media.removeListener(update);
  }, []);

  return (
    <section id="about" className="relative px-6 py-24 md:py-32">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.95fr] lg:gap-8">
          <motion.article
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden border border-white/10 bg-[#0f1016]/95 p-5 md:p-7"
          >
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-spider-red/70 to-transparent" />
            <div className="absolute -right-24 top-10 h-48 w-48 rounded-full bg-spider-blue/10 blur-3xl" />
            <div className="absolute -left-24 bottom-0 h-48 w-48 rounded-full bg-spider-red/10 blur-3xl" />

            <div className="relative space-y-7">
              <motion.div
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
              >
                <span className="inline-flex border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.35em] text-spider-red">
                  21 ABOUT ME
                </span>
                <div className="mt-4 flex items-end gap-3">
                  <div className="h-12 w-1 bg-spider-red" />
                  <div>
                    <h2 className="font-display text-4xl font-black uppercase tracking-tight text-white md:text-5xl">
                      About <span className="text-spider-red">Me</span>
                    </h2>
                    <p className="mt-1 text-xs font-medium uppercase tracking-[0.35em] text-spider-blue">
                      AI/ML Engineer | Full Stack Developer
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="grid gap-4 sm:grid-cols-3">
                {highlights.map((item, index) => {
                  const isInteractive = item.label === "AI / ML" || item.label === "Full Stack";
                  const cardKey = item.label as InteractiveCardKey;
                  const cardInfo = isInteractive ? interactiveCards[cardKey] : null;
                  const glowShadow =
                    cardInfo?.accent === "red"
                      ? "0 0 0 1px rgba(225,29,72,0.18)"
                      : "0 0 0 1px rgba(29,78,216,0.18)";

                  return (
                    <motion.div
                      key={item.label}
                      variants={patchCardVariants}
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.3 }}
                      whileHover={
                        isInteractive
                          ? {
                              scale: 1.03,
                              boxShadow: glowShadow,
                              transition: { duration: 0.3, ease: "easeOut" },
                            }
                          : undefined
                      }
                      transition={{ duration: 0.5, delay: 0.08 + index * 0.12, ease: "easeInOut" }}
                      onHoverStart={() => {
                        if (isInteractive && canHover) setHoveredCard(cardKey);
                      }}
                      onHoverEnd={() => {
                        if (isInteractive && canHover) setHoveredCard(null);
                      }}
                      onClick={() => {
                        if (isInteractive) setActivePopup(cardKey);
                      }}
                      onKeyDown={(event) => {
                        if (!isInteractive) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setActivePopup(cardKey);
                        }
                      }}
                      role={isInteractive ? "button" : undefined}
                      tabIndex={isInteractive ? 0 : undefined}
                      aria-label={isInteractive ? `Open ${item.label} details` : undefined}
                      className="relative overflow-hidden border border-white/10 bg-black/40 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/20"
                    >
                      <motion.div variants={patchCardChildVariants}>
                        <item.icon
                          className={`h-5 w-5 ${index % 2 === 0 ? "text-spider-red" : "text-spider-blue"}`}
                        />
                      </motion.div>
                      <motion.div
                        variants={patchCardChildVariants}
                        className="mt-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55"
                      >
                        {item.label}
                      </motion.div>
                      <motion.div variants={patchCardChildVariants} className="mt-1 text-sm text-white/82">
                        {item.value}
                      </motion.div>

                      <AnimatePresence>
                        {isInteractive && canHover && hoveredCard === cardKey && cardInfo && (
                          <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 16, opacity: 0 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="pointer-events-none absolute inset-x-0 bottom-0 border-t border-white/10 bg-[#080a10] p-3"
                          >
                            <p className="text-xs leading-5 text-white/75">{cardInfo.slideText}</p>
                            <ul className="mt-2 space-y-1 text-[10px] uppercase tracking-[0.2em] text-white/45">
                              {cardInfo.slidePoints.slice(0, 2).map((point) => (
                                <li key={point}>• {point}</li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.12, ease: "easeOut" }}
                className="space-y-4 text-sm leading-7 text-white/72 md:text-base"
              >
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.05, ease: "easeOut" }}
                >
                  I am an AI/ML-focused software engineer with a strong inclination toward cybersecurity, dedicated to building intelligent, secure, and scalable systems at the intersection of machine learning, modern web technologies, and system security. My work centers on designing and engineering production-grade solutions, ranging from AI-powered applications and data-driven platforms to secure, resilient software architectures.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.12, ease: "easeOut" }}
                >
                  I specialize in transforming complex, abstract ideas into structured, real-world systems by combining strong product thinking with deep technical execution. Whether it&apos;s developing intelligent models, architecting secure backend systems, or building seamless full-stack experiences, I focus on creating solutions that are not only efficient and scalable, but also robust and trustworthy.
                </motion.p>
                <motion.p
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: 0.18, ease: "easeOut" }}
                >
                  Through continuous experimentation, hackathons, and hands-on projects, I actively explore domains such as AI-driven automation, cybersecurity practices, system design, and scalable web infrastructure. My approach emphasizes clarity in design, rapid iteration, and building systems that deliver measurable, real-world impact.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -70 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ duration: 0.65, delay: 0.16, ease: "easeOut" }}
                className="border border-spider-red/30 bg-[#090a0f] p-5"
              >
                <div className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.35em] text-spider-blue">
                  <BadgeCheck className="h-4 w-4" />
                  Mission
                </div>
                <p className="mt-3 max-w-xl text-sm leading-7 text-white/78 md:text-base">
                    Engineering intelligence, scaling impact, and building what the future runs on.
                </p>
                <div className="mt-4 h-px w-full bg-gradient-to-r from-spider-red/70 via-white/10 to-spider-blue/70" />
              </motion.div>
            </div>
          </motion.article>

          <motion.aside
            initial={{ opacity: 0, x: 70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-120px" }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="border border-white/10 bg-[#0c0d12]/95 p-5 md:p-7"
          >
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ duration: 0.65, delay: 0.05, ease: "easeOut" }}
              className="mb-6 flex items-center justify-between gap-4"
            >
              <div>
                <span className="inline-flex border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-semibold tracking-[0.35em] text-spider-blue">
                  01 SYSTEM STACK
                </span>
                <h3 className="mt-4 font-display text-3xl font-black uppercase tracking-tight text-white">
                  System Stack
                </h3>
              </div>
              <Layers3 className="h-6 w-6 text-spider-red" />
            </motion.div>

            <Accordion type="multiple" className="space-y-3">
              {stackSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: 80 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: 0.04 * sectionIndex, ease: "easeOut" }}
                  className={`border border-white/10 bg-black/55 ${section.accent === "red" ? "hover:border-spider-red/35" : "hover:border-spider-blue/35"}`}
                >
                  <AccordionItem value={section.title} className="border-b-0">
                    <AccordionTrigger className="px-4 py-4 no-underline hover:no-underline [&>svg]:hidden">
                      <div className="flex w-full items-center justify-between gap-4 text-left">
                        <div>
                          <div className={`text-sm font-black uppercase tracking-[0.28em] ${section.accent === "red" ? "text-spider-red" : "text-spider-blue"}`}>
                            &gt; {section.title}
                          </div>
                          <div className="mt-1 text-[10px] uppercase tracking-[0.35em] text-white/40">
                            {section.skills.length} skills
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="rounded border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-green-400">
                            Loaded
                          </div>
                          <div className={`h-2 w-2 rounded-full ${section.accent === "red" ? "bg-spider-red" : "bg-spider-blue"}`} />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="px-4 pb-4 pt-0">
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        {section.skills.map((skill, skillIndex) => {
                          const accentClass =
                            skill.accent === "red"
                              ? "hover:border-spider-red/45 hover:shadow-[0_0_0_1px_rgba(225,29,72,0.18)]"
                              : "hover:border-spider-blue/45 hover:shadow-[0_0_0_1px_rgba(29,78,216,0.18)]";

                          return (
                            <motion.div
                              key={skill.name}
                              initial={{ opacity: 0, x: 50 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: false, margin: "-80px" }}
                              transition={{ duration: 0.4, delay: 0.03 * skillIndex, ease: "easeOut" }}
                              className={`group border border-white/10 bg-black/60 p-4 transition duration-300 hover:-translate-y-1 hover:scale-[1.03] ${accentClass}`}
                            >
                              <div className="flex items-start justify-between gap-3">
                                <div className="flex items-center gap-2">
                                  <div
                                    className={`h-2.5 w-2.5 rounded-full ${skill.accent === "red" ? "bg-spider-red" : "bg-spider-blue"}`}
                                  />
                                  <div className="text-sm font-semibold uppercase tracking-[0.18em] text-white">
                                    {skill.name}
                                  </div>
                                </div>
                                <div className={`text-[10px] font-semibold uppercase tracking-[0.3em] ${levelTone(skill.level)}`}>
                                  Lvl {skill.level}
                                </div>
                              </div>

                              <div className="mt-4 h-px overflow-hidden bg-white/10">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.level}%` }}
                                  viewport={{ once: false }}
                                  transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                                  className={`h-full ${skill.accent === "red" ? "bg-spider-red" : "bg-spider-blue"}`}
                                />
                              </div>

                              <div className="mt-2 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-white/40">
                                <span>Level</span>
                                <ArrowUpRight className={`h-3.5 w-3.5 ${skill.accent === "red" ? "text-spider-red" : "text-spider-blue"}`} />
                              </div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </motion.aside>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="border border-white/10 bg-black/55 px-4 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-spider-red"
          >
            Current Goal: Grad 2028
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08, ease: "easeOut" }}
            className="border border-white/10 bg-black/55 px-4 py-3 text-xs font-semibold uppercase tracking-[0.32em] text-spider-blue md:text-right"
          >
            Base Station: Bengaluru
          </motion.div>
        </div>
      </div>

      <AnimatePresence>
        {activePopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
            onClick={() => setActivePopup(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              transition={{ duration: 0.32, ease: "easeInOut" }}
              onClick={(event) => event.stopPropagation()}
              className="w-full max-w-xl border border-white/10 bg-[#090a0f] p-5 md:p-6"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-[11px] font-semibold uppercase tracking-[0.35em] text-white/45">Domain Focus</div>
                  <h4 className={`mt-2 font-display text-3xl font-black uppercase ${interactiveCards[activePopup].accent === "red" ? "text-spider-red" : "text-spider-blue"}`}>
                    {activePopup}
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => setActivePopup(null)}
                  className="border border-white/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.28em] text-white/70 transition hover:border-white/20 hover:text-white"
                >
                  Close
                </button>
              </div>

              <p className="mt-5 text-sm leading-7 text-white/78 md:text-base">{interactiveCards[activePopup].popupText}</p>

              <div className="mt-5 border border-white/10 bg-black/45 p-4">
                <div className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/55">Key Highlights</div>
                <ul className="mt-3 space-y-2 text-sm text-white/75">
                  {interactiveCards[activePopup].slidePoints.map((point) => (
                    <li key={point}>• {point}</li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 space-y-2 text-sm text-white/72">
                <p>
                  <span className="font-semibold text-white/88">Tools:</span> {interactiveCards[activePopup].tools}
                </p>
                <p>
                  <span className="font-semibold text-white/88">Summary:</span> {interactiveCards[activePopup].summary}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
