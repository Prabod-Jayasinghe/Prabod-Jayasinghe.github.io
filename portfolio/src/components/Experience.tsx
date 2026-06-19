"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";

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
    <section
      id="experience"
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
            02.
          </span>
          Where I&apos;ve Worked
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
            display: "flex",
            flexDirection: "column",
            gap: "2rem",
          }}
          className="exp-layout"
        >
          {/* Tab Buttons */}
          <div
            style={{
              display: "flex",
              overflowX: "auto",
              borderBottom: "1px solid #233554",
            }}
            className="exp-tabs"
          >
            {experiences.map((exp, i) => (
              <button
                key={i}
                id={`exp-tab-${i}`}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "0.75rem 1.5rem",
                  textAlign: "left",
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                  whiteSpace: "nowrap",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  color: activeTab === i ? "#64ffda" : "#8892b0",
                  backgroundColor:
                    activeTab === i ? "#112240" : "transparent",
                  borderBottom:
                    activeTab === i ? "2px solid #64ffda" : "2px solid transparent",
                }}
                onMouseEnter={(e) => {
                  if (activeTab !== i)
                    e.currentTarget.style.color = "#64ffda";
                }}
                onMouseLeave={(e) => {
                  if (activeTab !== i)
                    e.currentTarget.style.color = "#8892b0";
                }}
              >
                {exp.company}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ flex: 1 }}
          >
            <h3
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                color: "#e6e6e6",
                marginBottom: "0.25rem",
              }}
            >
              {currentExp.role}{" "}
              <span style={{ color: "#64ffda" }}>
                @ {currentExp.company}
              </span>
            </h3>
            <p
              style={{
                fontFamily: "monospace",
                fontSize: "0.875rem",
                color: "#8892b0",
                marginBottom: "1rem",
              }}
            >
              {currentExp.period}
            </p>
            <p
              style={{
                color: "#8892b0",
                marginBottom: "1rem",
                lineHeight: 1.7,
              }}
            >
              {currentExp.description}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {currentExp.technologies.map((tech) => (
                <span
                  key={tech}
                  style={{
                    padding: "0.25rem 0.75rem",
                    fontSize: "0.75rem",
                    fontFamily: "monospace",
                    color: "#64ffda",
                    backgroundColor: "rgba(100,255,218,0.1)",
                    borderRadius: "4px",
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          .exp-layout {
            flex-direction: row !important;
          }
          .exp-tabs {
            flex-direction: column !important;
            overflow-x: visible !important;
            border-bottom: none !important;
            border-left: 1px solid #233554 !important;
            min-width: 160px;
          }
          .exp-tabs button {
            border-bottom: none !important;
            border-left: 2px solid transparent !important;
            border-right: none !important;
          }
        }
      `}</style>
    </section>
  );
}
