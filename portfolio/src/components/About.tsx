"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { MapPin, Code2 } from "lucide-react";

export function About() {
  const { data } = usePortfolio();
  const { personalInfo, aboutMe } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const paragraphs = aboutMe?.paragraphs ?? [
    `Hello! I'm ${personalInfo.name}, a passionate software engineer based in ${personalInfo.location}. I enjoy creating things that live on the internet and crafting experiences that delight users.`,
    "My interest in web development started back in 2020 when I decided to try building custom web experiences — turns out hacking together HTML, CSS & JavaScript was incredibly fun!",
    "Fast-forward to today, and I've had the privilege of working on diverse projects spanning startups, agencies, and enterprise clients. My main focus is building accessible, inclusive products and digital experiences."
  ];

  const techSkills = aboutMe?.skills ?? [
    "JavaScript (ES6+)",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "Python",
  ];

  return (
    <section id="about" ref={ref} style={{ padding: "8rem 0", position: "relative", zIndex: 2 }}>
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="section-heading"
        >
          <span className="number-badge">01.</span>
          About Me
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, rgba(100,255,218,0.3), transparent)",
              marginLeft: "1rem",
            }}
          />
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              color: "#94a3b8",
              lineHeight: 1.8,
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {paragraphs.map((para, idx) => (
              <p key={idx} style={{ fontSize: "1.05rem" }}>{para}</p>
            ))}
            <p style={{ fontSize: "1.05rem", color: "#f0f0f0", fontWeight: 500, marginTop: "0.5rem" }}>
              Here are a few technologies I&apos;ve been working with recently:
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.75rem",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                listStyle: "none",
                padding: 0,
                marginTop: "0.5rem",
              }}
            >
              {techSkills.map((tech) => (
                <div
                  key={tech}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <Code2 size={14} color="#64ffda" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Photo Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            style={{ position: "relative" }}
            className="about-photo-wrapper"
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "22rem",
                margin: "0 auto",
              }}
              className="img-glow"
            >
              {/* Offset border frame */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid rgba(100,255,218,0.3)",
                  borderRadius: "18px",
                  transform: "translate(20px, 20px)",
                  transition: "transform 0.4s ease, border-color 0.4s ease",
                  zIndex: 0,
                }}
                className="offset-border"
              />
              {/* Photo container */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "18px",
                  overflow: "hidden",
                  zIndex: 1,
                  background: "linear-gradient(135deg, rgba(100,255,218,0.1), rgba(0,212,255,0.1))",
                  aspectRatio: "1 / 1",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/profile.png"
                  alt={personalInfo.name}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
                {/* Gradient overlay */}
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(180deg, transparent 60%, rgba(10,10,10,0.6) 100%)",
                    pointerEvents: "none",
                  }}
                />
              </div>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.5rem",
                marginTop: "1.5rem",
                color: "#94a3b8",
                fontSize: "0.875rem",
              }}
            >
              <MapPin size={14} />
              {personalInfo.location}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1.2fr 1fr !important;
          }
        }
        .img-glow:hover .offset-border {
          transform: translate(12px, 12px) !important;
          border-color: rgba(100,255,218,0.6) !important;
        }
      `}</style>
    </section>
  );
}
