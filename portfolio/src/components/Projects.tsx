"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, GitFork, Folder } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

// Inline GitHub SVG (lucide-react removed it)
const GitHubIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
  </svg>
);

export function Projects() {
  const { data } = usePortfolio();
  const { projects, personalInfo } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" ref={ref} style={{ padding: "8rem 0", position: "relative", zIndex: 2 }}>
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="section-heading"
        >
          <span className="number-badge">03.</span>
          Some Things I&apos;ve Built
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
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1 }}
              className="card project-card"
              style={{ cursor: "pointer", display: "flex", flexDirection: "column", overflow: "hidden" }}
            >
              {project.image && (
                <div
                  style={{
                    width: "100%",
                    height: "180px",
                    borderRadius: "12px",
                    overflow: "hidden",
                    marginBottom: "1.25rem",
                    position: "relative",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.image}
                    alt={project.title}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    className="project-snap-img"
                  />
                  <div className="project-img-overlay" />
                </div>
              )}
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "1rem",
                }}
              >
                <div
                  style={{
                    width: "2.5rem",
                    height: "2.5rem",
                    borderRadius: "10px",
                    background: "linear-gradient(135deg, rgba(100,255,218,0.15), rgba(0,212,255,0.15))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(100,255,218,0.1)",
                  }}
                >
                  <Folder size={18} color="#64ffda" />
                </div>
                <div style={{ display: "flex", gap: "0.75rem" }}>
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`project-github-${i}`}
                    style={{
                      color: "#94a3b8",
                      transition: "all 0.3s ease",
                      padding: "0.5rem",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#64ffda";
                      e.currentTarget.style.background = "rgba(100,255,218,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <GitHubIcon size={18} />
                  </a>
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    id={`project-live-${i}`}
                    style={{
                      color: "#94a3b8",
                      transition: "all 0.3s ease",
                      padding: "0.5rem",
                      borderRadius: "8px",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#64ffda";
                      e.currentTarget.style.background = "rgba(100,255,218,0.08)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#94a3b8";
                      e.currentTarget.style.background = "transparent";
                    }}
                  >
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>

              {/* Title */}
              <h3
                className="project-title"
                style={{
                  fontSize: "1.15rem",
                  fontWeight: 700,
                  color: "#f0f0f0",
                  marginBottom: "0.5rem",
                  transition: "color 0.3s ease",
                }}
              >
                {project.title}
              </h3>

              {/* Description */}
              <p
                style={{
                  color: "#94a3b8",
                  fontSize: "0.9rem",
                  lineHeight: 1.7,
                  flex: 1,
                  marginBottom: "1.25rem",
                }}
              >
                {project.description}
              </p>

              {/* Tech Tags */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      color: "#64ffda",
                      padding: "0.25rem 0.75rem",
                      background: "rgba(100,255,218,0.06)",
                      borderRadius: "9999px",
                      border: "1px solid rgba(100,255,218,0.1)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          style={{ textAlign: "center", marginTop: "3.5rem" }}
        >
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            id="view-all-projects"
            className="glow-btn glow-btn-outline"
          >
            View Full Project Archive
            <ExternalLink size={16} />
          </a>
        </motion.div>
      </div>

      <style jsx>{`
        .project-card:hover .project-title {
          color: #64ffda !important;
        }
        .project-snap-img {
          transition: transform 0.5s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
        }
        .project-card:hover .project-snap-img {
          transform: scale(1.08) !important;
        }
      `}</style>
    </section>
  );
}
