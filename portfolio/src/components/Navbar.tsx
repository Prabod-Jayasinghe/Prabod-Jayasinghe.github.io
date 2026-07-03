"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePortfolio } from "@/contexts/PortfolioContext";

const navLinks = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

const RESUME_KEY = "portfolio_resume";

export function Navbar() {
  const { data } = usePortfolio();
  const { personalInfo } = data;
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeHref, setResumeHref] = useState("/resume.pdf");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Build resume href: prefer uploaded file, fall back to personalInfo URL
  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESUME_KEY);
      if (stored) {
        const { data: b64 } = JSON.parse(stored);
        if (b64 && b64.startsWith("data:")) {
          fetch(b64)
            .then((r) => r.blob())
            .then((blob) => {
              const url = URL.createObjectURL(blob);
              setResumeHref(url);
            });
          return;
        }
      }
    } catch {
      /* ignore */
    }
    setResumeHref(personalInfo.resume ?? "/resume.pdf");
  }, [personalInfo.resume]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "all 0.3s",
        backgroundColor: scrolled ? "rgba(10,10,10,0.8)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.3)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.05)" : "none",
      }}
    >
      <div
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "1rem 1.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <a
          href="#"
          style={{
            fontFamily: "monospace",
            fontSize: "1.25rem",
            fontWeight: 700,
            textDecoration: "none",
            background: "linear-gradient(135deg, #64ffda, #00d4ff)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          &lt;{personalInfo.name.split(" ")[0]} /&gt;
        </a>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "2.5rem" }}
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="nav-link">
              {link.name}
            </a>
          ))}
          <a
            href={resumeHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            id="nav-resume"
            className="glow-btn glow-btn-outline"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.8rem" }}
          >
            Resume
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          id="mobile-menu-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          style={{ color: "#64ffda", background: "none", border: "none", cursor: "pointer" }}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden"
            style={{
              background: "rgba(10,10,10,0.95)",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              borderTop: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                gap: "1.25rem",
              }}
            >
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#94a3b8",
                    textDecoration: "none",
                    fontSize: "1rem",
                    fontWeight: 500,
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#f0f0f0")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  {link.name}
                </a>
              ))}
              <a
                href={resumeHref}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="glow-btn glow-btn-outline"
                style={{ marginTop: "0.5rem", justifyContent: "center" }}
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
