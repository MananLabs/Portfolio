import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
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
  const [heroProgress, setHeroProgress] = useState(0);
  const [showIntro, setShowIntro] = useState(true);

  // Navbar appears once user starts zooming in
  const navVisible = heroProgress > 0.25;

  return (
    <>
      {showIntro && <IntroScreen onComplete={() => setShowIntro(false)} />}
      
      <main className="relative min-h-screen bg-background text-foreground">
        <WebBackground />
        <Navbar visible={navVisible} />

        <Hero onProgress={setHeroProgress} />

        <About />
        <Experience />
        <Projects />
        <Contact />
      </main>
    </>
  );
}
