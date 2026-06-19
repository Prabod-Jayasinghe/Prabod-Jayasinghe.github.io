"use client";
import { usePortfolio } from "@/contexts/PortfolioContext";

export function Footer() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  return (
    <footer
      style={{
        padding: "2rem 1.5rem",
        textAlign: "center",
        borderTop: "1px solid #233554",
      }}
    >
      <p
        style={{
          fontFamily: "monospace",
          fontSize: "0.75rem",
          color: "#8892b0",
        }}
      >
        Designed &amp; Built by{" "}
        <span style={{ color: "#64ffda" }}>{personalInfo.name}</span>{" "}
        &copy; 2025
      </p>
    </footer>
  );
}
