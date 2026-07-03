"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { Briefcase, Calendar, ChevronRight } from "lucide-react";

export function Experience() {
  const { data } = usePortfolio();
  const { experiences } = data;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState(0);

  if (!experiences || experiences.length === 0) {
    return null;
  }

  const currentExp = experiences[activeTab] ?? experiences[0];

  return (
    <section id="experience" ref={ref} style={{ padding: "8rem 0", position: "relative", zIndex: 2 }}>
      <div className="section-container" style={{ maxWidth: "56rem" }}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="section-heading"
        >
          <span className="number-badge">02.</span>
          Where I&apos;ve Worked
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
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
          className="exp-layout"
        >
          {/* Tab Buttons */}
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              gap: "0.5rem",
              padding: "0.25rem",
              background: "rgba(255,255,255,0.03)",
              borderRadius: "16px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
            className="exp-tabs"
          >
            {experiences.map((exp, i) => (
              <button
                key={i}
                id={`exp-tab-${i}`}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "0.75rem 1.25rem",
                  textAlign: "left",
                  fontFamily: "Inter, sans-serif",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                  background: activeTab === i ? "rgba(100,255,218,0.1)" : "transparent",
                  border: activeTab === i ? "1px solid rgba(100,255,218,0.2)" : "1px solid transparent",
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  color: activeTab === i ? "#64ffda" : "#94a3b8",
                  borderRadius: "12px",
                  flex: 1,
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== i)
                    e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== i)
                    e.currentTarget.style.background = "transparent";
                }}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            style={{ flex: 1 }}
          >
            <div className="card" style={{ padding: "2rem" }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1rem" }}>
                <div
                  style={{
                    width: "3rem",
                    height: "3rem",
                    borderRadius: "12px",
                    background: "linear-gradient(135deg, rgba(100,255,218,0.15), rgba(0,212,255,0.15))",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid rgba(100,255,218,0.1)",
                  }}
                >
                  <Briefcase size={18} color="#64ffda" />
                </div>
                <div>
                  <h3
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 700,
                      color: "#f0f0f0",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {currentExp.role}{" "}
                    <span className="gradient-text">@ {currentExp.company}</span>
                  </h3>
                  <p
                    style={{
                      fontSize: "0.875rem",
                      color: "#94a3b8",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <Calendar size={14} />
                    {currentExp.period}
                  </p>
                </div>
              </div>
              <p
                style={{
                  color: "#94a3b8",
                  marginBottom: "1.5rem",
                  lineHeight: 1.7,
                  fontSize: "1.05rem",
                }}
              >
                {currentExp.description}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                {currentExp.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      padding: "0.35rem 0.875rem",
                      fontSize: "0.8rem",
                      fontFamily: "monospace",
                      color: "#64ffda",
                      background: "rgba(100,255,218,0.08)",
                      borderRadius: "9999px",
                      border: "1px solid rgba(100,255,218,0.15)",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .exp-layout {
            flex-direction: row !important;
            align-items: flex-start;
          }
          .exp-tabs {
            flex-direction: column !important;
            overflow-x: visible !important;
            min-width: 180px;
            flex: none;
          }
          .exp-tabs button {
            flex: none !important;
          }
        }
      `}</style>
    </section>
  );
}
