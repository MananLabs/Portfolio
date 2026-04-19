import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface IntroScreenProps {
  onComplete: () => void;
}

export default function IntroScreen({ onComplete }: IntroScreenProps) {
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    // Prevent background scroll while intro is active
    if (!entered) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [entered]);

  useEffect(() => {
    const handleScroll = () => {
      if (!entered) {
        setEntered(true);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      if (!entered) {
        setEntered(true);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!entered) {
        setEntered(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
    };
  }, [entered]);

  useEffect(() => {
    // Trigger completion animation after zoom finishes (~1.5s)
    if (entered) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [entered, onComplete]);

  return (
    <AnimatePresence mode="wait">
      {!entered ? (
        <motion.div
          key="intro-initial"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-black"
        >
          {/* Fullscreen image */}
          <motion.img
            src="/images/spiderman-intro.jpg"
            alt="Spider-Man Intro"
            className="h-full w-full object-cover"
          />

          {/* Optional: Subtle dark overlay for cinematic feel */}
          <div className="absolute inset-0 bg-black/10" />

          {/* Scroll hint text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-[10px] tracking-[0.3em] text-white/60"
          >
            SCROLL TO ENTER
          </motion.div>
        </motion.div>
      ) : (
        <motion.div
          key="intro-zoom"
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 7 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
          className="fixed inset-0 z-50 overflow-hidden bg-black"
          onAnimationComplete={() => {
            // Animation complete callback is handled by useEffect timer
          }}
        >
          <img
            src="/images/spiderman-intro.jpg"
            alt="Spider-Man Intro"
            className="h-full w-full object-cover"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
