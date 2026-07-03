"use client";

import { motion } from "framer-motion";
import { ArrowDown, Sparkles } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

export function Hero() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "0 1.5rem",
        position: "relative",
        zIndex: 2,
      }}
    >
      <div style={{ maxWidth: "56rem", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            fontFamily: "monospace",
            fontSize: "1rem",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem",
            color: "#64ffda",
          }}
        >
          <Sparkles size={16} />
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5.5rem)",
            fontWeight: 800,
            marginBottom: "0.5rem",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            color: "#f0f0f0",
          }}
        >
          {personalInfo.name}.
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          style={{
            fontSize: "clamp(1.8rem, 6vw, 3.5rem)",
            fontWeight: 700,
            marginBottom: "1.5rem",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            background: "linear-gradient(135deg, #8892b0 0%, #64ffda 50%, #00d4ff 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {personalInfo.tagline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            color: "#94a3b8",
            fontSize: "1.125rem",
            maxWidth: "32rem",
            marginBottom: "2.5rem",
            lineHeight: 1.7,
          }}
        >
          {personalInfo.description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}
        >
          <a
            href="#projects"
            id="hero-cta-projects"
            className="glow-btn glow-btn-outline"
          >
            Check out my work
          </a>
          <a
            href="#contact"
            id="hero-cta-contact"
            className="glow-btn glow-btn-primary"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          color: "#64ffda",
          opacity: 0.6,
        }}
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
