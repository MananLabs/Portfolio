import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

interface Props {
  visible: boolean;
}

export default function Navbar({ visible }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.header
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
            scrolled ? "glass-nav py-3" : "py-5"
          }`}
        >
          <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
            <a href="#home" className="group flex items-center gap-2">
              <span className="relative inline-flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full bg-gradient-spider opacity-80 blur-md transition-opacity group-hover:opacity-100" />
                <span className="relative h-2.5 w-2.5 rounded-full bg-gradient-spider" />
              </span>
              <span className="text-sm font-semibold tracking-[0.2em] text-foreground">
                MM<span className="text-spider-red">.</span>
              </span>
            </a>

            <ul className="hidden items-center gap-1 md:flex">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="group relative px-4 py-2 text-sm tracking-wide text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                    <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-spider transition-all duration-300 group-hover:w-[60%]" />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href="#contact"
              className="hidden rounded-full border border-glow-red px-4 py-2 text-xs font-medium tracking-widest text-foreground transition-all hover:shadow-[0_0_24px_oklch(0.62_0.24_25/0.5)] md:inline-block"
              style={{
                borderColor: "oklch(0.62 0.24 25 / 0.5)",
              }}
            >
              LET&apos;S TALK
            </a>

            <button
              onClick={() => setOpen((v) => !v)}
              className="md:hidden"
              aria-label="menu"
            >
              <div className="space-y-1.5">
                <span className="block h-px w-6 bg-foreground" />
                <span className="block h-px w-6 bg-foreground" />
                <span className="block h-px w-4 bg-foreground" />
              </div>
            </button>
          </nav>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden md:hidden"
              >
                <ul className="glass-nav flex flex-col gap-1 px-6 py-4">
                  {links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        onClick={() => setOpen(false)}
                        className="block py-2 text-sm tracking-wide text-muted-foreground hover:text-foreground"
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
