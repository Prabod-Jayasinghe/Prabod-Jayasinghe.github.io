"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
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
      }}
    >
      <div style={{ maxWidth: "56rem", width: "100%" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          style={{
            color: "#64ffda",
            fontFamily: "monospace",
            fontSize: "1.125rem",
            marginBottom: "1rem",
          }}
        >
          Hi, my name is
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          style={{
            fontSize: "clamp(2.5rem, 8vw, 5rem)",
            fontWeight: 700,
            color: "#e6e6e6",
            marginBottom: "0.5rem",
            lineHeight: 1.1,
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
            color: "#8892b0",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          {personalInfo.tagline}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            color: "#8892b0",
            fontSize: "1.125rem",
            maxWidth: "36rem",
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
            style={{
              padding: "1rem 2rem",
              border: "1px solid #64ffda",
              color: "#64ffda",
              borderRadius: "4px",
              textDecoration: "none",
              fontFamily: "monospace",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(100,255,218,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
          >
            Check out my work
          </a>
          <a
            href="#contact"
            id="hero-cta-contact"
            style={{
              padding: "1rem 2rem",
              backgroundColor: "#64ffda",
              color: "#0a0a0a",
              borderRadius: "4px",
              textDecoration: "none",
              fontFamily: "monospace",
              fontWeight: 600,
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(100,255,218,0.8)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "#64ffda")
            }
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
        }}
      >
        <ArrowDown size={24} />
      </motion.a>
    </section>
  );
}
