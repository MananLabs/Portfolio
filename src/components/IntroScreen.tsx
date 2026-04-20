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

  // Block scroll propagation to underlying 3D scene
  const handleWheel = (e: React.WheelEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!entered) {
      setEntered(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (!entered) {
      setEntered(true);
    }
  };

  const handleScroll = (e: React.UIEvent) => {
    e.stopPropagation();
    if (!entered) {
      setEntered(true);
    }
  };

  // Global event listeners for wheel events (non-passive to allow preventDefault)
  useEffect(() => {
    const globalHandleWheel = (e: WheelEvent) => {
      if (!entered) {
        e.preventDefault();
        e.stopPropagation();
        setEntered(true);
      }
    };

    const globalHandleTouchStart = (e: TouchEvent) => {
      if (!entered) {
        e.preventDefault();
        e.stopPropagation();
        setEntered(true);
      }
    };

    // Use non-passive listeners so preventDefault works
    window.addEventListener("wheel", globalHandleWheel, { passive: false });
    window.addEventListener("touchstart", globalHandleTouchStart, { passive: false });

    return () => {
      window.removeEventListener("wheel", globalHandleWheel);
      window.removeEventListener("touchstart", globalHandleTouchStart);
    };
  }, [entered]);

  // Trigger completion animation after zoom finishes (~1.5s)
  useEffect(() => {
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
          style={{ pointerEvents: "auto" }}
          onWheel={handleWheel}
          onTouchMove={handleTouchMove}
          onScroll={handleScroll}
        >
          {/* Fullscreen image */}
          <motion.img
            src="/images/spiderman-intro.jpg"
            alt="Spider-Man Intro"
            className="pointer-events-none h-full w-full object-cover"
            draggable={false}
          />

          {/* Optional: Subtle dark overlay for cinematic feel */}
          <div className="pointer-events-none absolute inset-0 bg-black/10" />

          {/* Scroll hint text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2 text-center text-[10px] tracking-[0.3em] text-white/60"
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
          style={{ pointerEvents: "none" }}
          onAnimationComplete={() => {
            // Animation complete callback is handled by useEffect timer
          }}
        >
          <img
            src="/images/spiderman-intro.jpg"
            alt="Spider-Man Intro"
            className="h-full w-full object-cover"
            draggable={false}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
