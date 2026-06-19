"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Server, Cloud, Brain, Wrench } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

export function Skills() {
  const { data } = usePortfolio();
  const { skills } = data;
  const skillCategories = [
    { title: "Languages", icon: Code2, items: skills.languages },
    { title: "Frontend", icon: Code2, items: skills.frontend },
    { title: "Backend", icon: Server, items: skills.backend },
    { title: "Cloud & DevOps", icon: Cloud, items: skills.cloud },
    { title: "AI & ML", icon: Brain, items: skills.ai },
    { title: "Tools", icon: Wrench, items: skills.tools },
  ];
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="skills"
      ref={ref}
      style={{ padding: "6rem 1.5rem" }}
    >
      <div style={{ maxWidth: "72rem", margin: "0 auto" }}>
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
            04.
          </span>
          Technical Skills
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
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: "1rem",
          }}
        >
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1 }}
                className="card"
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.75rem",
                    marginBottom: "1rem",
                  }}
                >
                  <Icon color="#64ffda" size={20} />
                  <h3
                    style={{
                      fontFamily: "monospace",
                      color: "#e6e6e6",
                      fontWeight: 600,
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
                        padding: "0.25rem 0.75rem",
                        fontSize: "0.75rem",
                        fontFamily: "monospace",
                        color: "#64ffda",
                        backgroundColor: "rgba(100,255,218,0.1)",
                        borderRadius: "4px",
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
