"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Cloud, Brain, Wrench } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

export function Skills() {
  const { data } = usePortfolio();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  if (data.visibleSections?.skills === false) return null;
  const { skills } = data;
  const skillCategories = [
    { title: "Languages", icon: Code2, items: skills.languages },
    { title: "Frontend", icon: Code2, items: skills.frontend },
    { title: "Backend", icon: Server, items: skills.backend },
    { title: "Cloud & DevOps", icon: Cloud, items: skills.cloud },
    { title: "AI & ML", icon: Brain, items: skills.ai },
    { title: "Tools", icon: Wrench, items: skills.tools },
  ];

  return (
    <section id="skills" ref={ref} style={{ padding: "8rem 0", position: "relative", zIndex: 2 }}>
      <div className="section-container">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          className="section-heading"
        >
          Technical Skills
          <span
            style={{
              flex: 1,
              height: "1px",
              background: "linear-gradient(90deg, rgba(100,255,218,0.3), transparent)",
              marginLeft: "1rem",
            }}
          />
        </motion.h2>

        <div className="bento-grid">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            const isLarge = i === 0 || i === 3;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className={`card ${isLarge ? "bento-large" : ""}`}
                style={{ padding: "1.75rem" }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1.25rem",
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
                    <Icon color="#64ffda" size={18} />
                  </div>
                  <h3
                    style={{
                      color: "#f0f0f0",
                      fontWeight: 600,
                      fontSize: "1.1rem",
                    }}
                  >
                    {category.title}
                  </h3>
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {category.items.map((item) => (
                    <span
                      key={item}
                      style={{
                        padding: "0.4rem 1rem",
                        fontSize: "0.8rem",
                        fontFamily: "monospace",
                        color: "#64ffda",
                        background: "rgba(100,255,218,0.06)",
                        borderRadius: "9999px",
                        border: "1px solid rgba(100,255,218,0.1)",
                        transition: "all 0.3s ease",
                        cursor: "default",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = "rgba(100,255,218,0.12)";
                        e.currentTarget.style.borderColor = "rgba(100,255,218,0.3)";
                        e.currentTarget.style.transform = "translateY(-2px)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "rgba(100,255,218,0.06)";
                        e.currentTarget.style.borderColor = "rgba(100,255,218,0.1)";
                        e.currentTarget.style.transform = "translateY(0)";
                      }}
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
