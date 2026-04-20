import { useState } from "react";
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
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <AnimatePresence>
      {visible && (
        <div
          className="fixed left-0 right-0 top-0 z-50 h-24"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => {
            setHovered(false);
            setOpen(false);
          }}
        >
          <div className="absolute inset-x-0 top-0 h-20" />

          <motion.header
            initial={{ y: "-100%", opacity: 0 }}
            animate={{
              y: hovered || open ? 0 : "-100%",
              opacity: hovered || open ? 1 : 0,
            }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="absolute left-0 right-0 top-0 bg-transparent py-5"
          >
            <nav className="pointer-events-auto mx-auto flex max-w-7xl items-center justify-center px-6">
              <ul className="hidden items-center gap-2 md:flex">
                {links.map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="group relative px-4 py-2 text-sm font-medium tracking-wide text-white/85 transition-colors hover:text-white"
                    >
                      {l.label}
                      <span className="absolute bottom-1 left-1/2 h-px w-0 -translate-x-1/2 bg-gradient-spider transition-all duration-300 group-hover:w-[60%]" />
                      <span className="absolute inset-0 rounded-full opacity-0 shadow-[0_0_16px_oklch(0.62_0.24_25/0.25)] transition-opacity duration-300 group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setOpen((v) => !v)}
                className="absolute right-6 md:hidden"
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
                  <ul className="bg-transparent flex flex-col gap-1 px-6 py-4">
                    {links.map((l) => (
                      <li key={l.href}>
                        <a
                          href={l.href}
                          onClick={() => setOpen(false)}
                          className="block py-2 text-sm tracking-wide text-white/80 hover:text-white"
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
        </div>
      )}
    </AnimatePresence>
  );
}
