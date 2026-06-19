"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";

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
    <section
      id="about"
      ref={ref}
      style={{ padding: "6rem 1.5rem" }}
    >
      <div style={{ maxWidth: "56rem", margin: "0 auto" }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="section-heading"
        >
          <span
            style={{
              color: "#64ffda",
              fontFamily: "monospace",
              fontSize: "1.5rem",
            }}
          >
            01.
          </span>
          About Me
          <span
            style={{
              flex: 1,
              height: "1px",
              backgroundColor: "#233554",
              marginLeft: "1rem",
            }}
          />
        </motion.h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "3rem",
            alignItems: "start",
          }}
          className="about-grid"
        >
          {/* Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            style={{
              color: "#8892b0",
              lineHeight: 1.8,
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {paragraphs.map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
            <p>Here are a few technologies I&apos;ve been working with recently:</p>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "0.5rem",
                fontFamily: "monospace",
                fontSize: "0.875rem",
                listStyle: "none",
                padding: 0,
              }}
            >
              {techSkills.map((tech) => (
                <li
                  key={tech}
                  style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}
                >
                  <span style={{ color: "#64ffda" }}>▹</span>
                  {tech}
                </li>
              ))}
            </ul>
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
                maxWidth: "20rem",
                margin: "0 auto",
              }}
              className="photo-frame-group"
            >
              {/* Offset border frame */}
              <div
                className="offset-border"
                style={{
                  position: "absolute",
                  inset: 0,
                  border: "2px solid #64ffda",
                  borderRadius: "6px",
                  transform: "translate(16px, 16px)",
                  transition: "transform 0.3s ease",
                  zIndex: 0,
                }}
              />
              {/* Photo container */}
              <div
                style={{
                  position: "relative",
                  borderRadius: "6px",
                  overflow: "hidden",
                  zIndex: 1,
                  backgroundColor: "#112240",
                  aspectRatio: "1 / 1",
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
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        .photo-frame-group:hover .offset-border {
          transform: translate(8px, 8px) !important;
        }
      `}</style>
    </section>
  );
}
