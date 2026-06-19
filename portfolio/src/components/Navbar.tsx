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
        backgroundColor: scrolled ? "rgba(10,10,10,0.9)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 4px 30px rgba(0,0,0,0.5)" : "none",
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
            color: "#64ffda",
            fontFamily: "monospace",
            fontSize: "1.2rem",
            fontWeight: 700,
            textDecoration: "none",
          }}
        >
          &lt;{personalInfo.name.split(" ")[0]} /&gt;
        </a>

        {/* Desktop Nav */}
        <div
          className="hidden md:flex"
          style={{ alignItems: "center", gap: "2rem" }}
        >
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              style={{
                fontSize: "0.875rem",
                fontFamily: "monospace",
                color: "#8892b0",
                textDecoration: "none",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "#64ffda")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "#8892b0")
              }
            >
              <span style={{ color: "#64ffda", marginRight: "0.25rem" }}>
                0{i + 1}.
              </span>
              {link.name}
            </a>
          ))}
          <a
            href={resumeHref}
            download
            target="_blank"
            rel="noopener noreferrer"
            id="nav-resume"
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #64ffda",
              color: "#64ffda",
              borderRadius: "4px",
              textDecoration: "none",
              fontSize: "0.875rem",
              fontFamily: "monospace",
              transition: "background 0.2s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = "rgba(100,255,218,0.1)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = "transparent")
            }
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
              backgroundColor: "#112240",
              borderTop: "1px solid #233554",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "1.5rem",
                gap: "1rem",
              }}
            >
              {navLinks.map((link, i) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    color: "#8892b0",
                    textDecoration: "none",
                    fontFamily: "monospace",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#64ffda")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#8892b0")
                  }
                >
                  <span style={{ color: "#64ffda", marginRight: "0.5rem" }}>
                    0{i + 1}.
                  </span>
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
