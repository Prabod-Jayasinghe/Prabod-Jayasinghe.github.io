"use client";
import { usePortfolio } from "@/contexts/PortfolioContext";

export function Footer() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  return (
    <footer
      style={{
        padding: "3rem 1.5rem",
        textAlign: "center",
        borderTop: "1px solid rgba(255,255,255,0.06)",
        position: "relative",
        zIndex: 2,
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.8rem",
          color: "#94a3b8",
        }}
      >
        Designed &amp; Built by{" "}
        <span className="gradient-text" style={{ fontWeight: 600 }}>
          {personalInfo.name}
        </span>{" "}
        &copy; 2025
      </p>
    </footer>
  );
}
