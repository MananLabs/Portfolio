import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import WebBackground from "@/components/WebBackground";
import IntroScreen from "@/components/IntroScreen";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Manan Mittal — AI/ML Engineer & Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio of Manan Mittal — AI/ML Engineer and Full Stack Developer building intelligent, production-grade systems.",
      },
      { property: "og:title", content: "Manan Mittal — AI/ML Engineer" },
      {
        property: "og:description",
        content:
          "Premium portfolio showcasing AI, ML and full-stack engineering work.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  // zoom: 0 = hero only / idle, 1 = fully zoomed in
  const [zoom, setZoom] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      // Map first viewport-height of scroll to zoom 0→1
      const vh = window.innerHeight;
      const z = Math.min(1, Math.max(0, window.scrollY / (vh * 0.8)));
      setZoom(z);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Navbar appears once user starts zooming in
  const navVisible = zoom > 0.25;

  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      
      <main className="relative min-h-screen bg-background text-foreground">
        <WebBackground />
        <Navbar visible={navVisible} />

        <Hero zoom={zoom} />

        {/* Smooth transitional spacer so zoom maps to scroll naturally */}
        <div className="h-[20vh]" />

        <About />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
