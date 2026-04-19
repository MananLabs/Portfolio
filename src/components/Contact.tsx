import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Hook this up to your backend / email service later.
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <section id="contact" className="relative px-6 py-32">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-spider-red">
            ◆ CONTACT
          </span>
          <h2 className="mt-4 font-display text-4xl font-bold leading-tight md:text-6xl">
            Let&apos;s build something
            <br />
            <span className="text-gradient-spider">amazing</span>.
          </h2>
          <p className="mx-auto mt-5 max-w-lg text-base text-muted-foreground">
            Have a project in mind, or just want to talk AI and engineering?
            Drop a message — I reply quickly.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-panel relative mt-14 rounded-2xl p-8 md:p-10"
        >
          {/* Glow halo */}
          <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-spider opacity-20 blur-2xl" />

          <div className="relative grid grid-cols-1 gap-5 md:grid-cols-2">
            <div className="md:col-span-1">
              <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Name
              </label>
              <input
                required
                type="text"
                className="mt-2 w-full border-b border-white/10 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-spider-red"
                placeholder="Your name"
              />
            </div>
            <div className="md:col-span-1">
              <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Email
              </label>
              <input
                required
                type="email"
                className="mt-2 w-full border-b border-white/10 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-spider-blue"
                placeholder="you@domain.com"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-[10px] font-medium uppercase tracking-[0.25em] text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                className="mt-2 w-full resize-none border-b border-white/10 bg-transparent py-3 text-foreground outline-none transition-colors focus:border-spider-red"
                placeholder="Tell me about your project…"
              />
            </div>
          </div>

          <div className="relative mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-center gap-4 text-muted-foreground">
              <a href="#" className="transition-colors hover:text-spider-red" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
              <a href="#" className="transition-colors hover:text-spider-red" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="transition-colors hover:text-spider-blue" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="transition-colors hover:text-spider-blue" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
            </div>

            <button
              type="submit"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-spider px-7 py-3 text-sm font-semibold tracking-widest text-white shadow-[0_0_30px_oklch(0.62_0.24_25/0.4)] transition-transform hover:scale-[1.02]"
            >
              <span className="relative z-10">
                {sent ? "MESSAGE SENT ✓" : "SEND MESSAGE"}
              </span>
              <span className="relative z-10 h-px w-6 bg-white transition-all group-hover:w-10" />
            </button>
          </div>
        </motion.form>

        <p className="mt-16 text-center text-xs tracking-[0.25em] text-muted-foreground">
          © {new Date().getFullYear()} MANAN MITTAL · CRAFTED WITH PRECISION
        </p>
      </div>
    </section>
  );
}
