"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { usePortfolio } from "@/contexts/PortfolioContext";
import { PortfolioData } from "@/lib/portfolioStore";
import {
  Save, RotateCcw, Plus, Trash2, ChevronDown, ChevronUp,
  CheckCircle, Home, X as XIcon, LogOut, Upload, FileText,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Tab = "personal" | "about" | "experience" | "projects" | "skills";
type PersonalInfoExt = PortfolioData["personalInfo"] & { whatsapp?: string };

const SESSION_KEY = "portfolio_admin_session";
const RESUME_KEY = "portfolio_resume"; // stores { name, size, data: base64 }

interface ConfirmOptions {
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
}

function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDanger = false,
  onConfirm,
  onClose,
}: {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  isDanger?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(10, 25, 47, 0.85)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 9999,
        padding: "1.5rem",
        animation: "modalFadeIn 0.2s ease-out",
      }}
      onClick={onClose}
    >
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes modalFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes modalScaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}} />
      <div
        style={{
          backgroundColor: "#112240",
          border: `1px solid ${isDanger ? "rgba(255, 80, 80, 0.4)" : "#1e3a5f"}`,
          borderRadius: "12px",
          padding: "2rem",
          maxWidth: "450px",
          width: "100%",
          boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)",
          animation: "modalScaleIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          style={{
            fontSize: "1.2rem",
            fontWeight: 700,
            color: isDanger ? "#ff6b6b" : "#64ffda",
            marginTop: 0,
            marginBottom: "0.75rem",
            fontFamily: "monospace",
          }}
        >
          {isDanger ? "⚠" : "⚙"} {title}
        </h3>
        <p
          style={{
            color: "#8892b0",
            fontSize: "0.9rem",
            lineHeight: 1.5,
            margin: "0 0 1.5rem",
          }}
        >
          {message}
        </p>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "0.75rem" }}>
          <button
            onClick={onClose}
            style={{
              padding: "0.5rem 1rem",
              backgroundColor: "transparent",
              color: "#8892b0",
              border: "1px solid #233554",
              borderRadius: "6px",
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            style={{
              padding: "0.5rem 1.2rem",
              backgroundColor: isDanger ? "rgba(255, 80, 80, 0.2)" : "rgba(100, 255, 218, 0.1)",
              color: isDanger ? "#ff6b6b" : "#64ffda",
              border: `1px solid ${isDanger ? "rgba(255, 80, 80, 0.4)" : "rgba(100, 255, 218, 0.3)"}`,
              borderRadius: "6px",
              fontWeight: 700,
              fontSize: "0.8rem",
              cursor: "pointer",
              fontFamily: "monospace",
            }}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Tag Input ────────────────────────────────────────────────────────────────
function TagInput({ tags, onChange, requestConfirm, placeholder = "Type and press Enter or comma…" }: {
  tags: string[]; onChange: (tags: string[]) => void; requestConfirm: (options: ConfirmOptions) => void; placeholder?: string;
}) {
  const [input, setInput] = useState("");
  const uid = placeholder.replace(/\s/g, "_");

  const addTag = (val: string) => {
    const t = val.trim();
    if (t && !tags.includes(t)) onChange([...tags, t]);
    setInput("");
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(input);
    } else if (e.key === "Backspace" && input === "" && tags.length > 0) {
      const tagToRemove = tags[tags.length - 1];
      requestConfirm({
        title: "Remove Tag",
        message: `Are you sure you want to remove the tag "${tagToRemove}"?`,
        confirmText: "Remove",
        isDanger: true,
        onConfirm: () => onChange(tags.slice(0, -1)),
      });
    }
  };

  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", backgroundColor: "#0d1b2e", border: "1px solid #233554", borderRadius: "6px", padding: "0.5rem 0.75rem", minHeight: "2.8rem", alignItems: "center", cursor: "text", marginBottom: "1rem" }}
      onClick={() => document.getElementById(uid)?.focus()}
    >
      {tags.map((tag) => (
        <span key={tag} style={{ display: "inline-flex", alignItems: "center", gap: "0.3rem", padding: "0.18rem 0.6rem", backgroundColor: "rgba(100,255,218,0.12)", border: "1px solid rgba(100,255,218,0.3)", borderRadius: "4px", color: "#64ffda", fontSize: "0.8rem", fontFamily: "monospace" }}>
          {tag}
          <button onClick={(e) => {
            e.stopPropagation();
            requestConfirm({
              title: "Remove Tag",
              message: `Are you sure you want to remove the tag "${tag}"?`,
              confirmText: "Remove",
              isDanger: true,
              onConfirm: () => onChange(tags.filter((t) => t !== tag)),
            });
          }} style={{ background: "none", border: "none", cursor: "pointer", color: "#64ffda", padding: 0, lineHeight: 1, opacity: 0.7, display: "flex", alignItems: "center" }}>
            <XIcon size={11} />
          </button>
        </span>
      ))}
      <input id={uid} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={handleKey} onBlur={() => { if (input.trim()) addTag(input); }} placeholder={tags.length === 0 ? placeholder : ""} style={{ border: "none", outline: "none", background: "transparent", color: "#e6e6e6", fontSize: "0.875rem", flex: 1, minWidth: "120px", fontFamily: "inherit" }} />
    </div>
  );
}

// ─── Resume Uploader ──────────────────────────────────────────────────────────
interface ResumeFile { name: string; size: number; data: string; } // data = base64

function ResumeUploader({
  requestConfirm,
  onResumeChange,
}: {
  requestConfirm: (options: ConfirmOptions) => void;
  onResumeChange: (url: string | null) => void;
}) {
  const [resumeFile, setResumeFile] = useState<ResumeFile | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RESUME_KEY);
      if (stored) setResumeFile(JSON.parse(stored));
    } catch { /* ignore */ }
  }, []);

  const processFile = (file: File) => {
    if (file.type !== "application/pdf") { alert("Please upload a PDF file."); return; }
    if (file.size > 10 * 1024 * 1024) { alert("File must be under 10 MB."); return; }
    
    const performUpload = async () => {
      try {
        const formData = new FormData();
        formData.append("file", file);
        const res = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });
        const result = await res.json();
        if (result.success) {
          const obj: ResumeFile = { name: result.name, size: result.size, data: "server" };
          localStorage.setItem(RESUME_KEY, JSON.stringify(obj));
          setResumeFile(obj);
          onResumeChange(result.url);
        } else {
          alert("Failed to upload: " + (result.error || "Unknown error"));
        }
      } catch (err) {
        console.error(err);
        alert("An error occurred during upload.");
      }
    };

    requestConfirm({
      title: resumeFile ? "Replace Resume" : "Upload Resume",
      message: resumeFile 
        ? `Are you sure you want to replace the current resume with "${file.name}"?`
        : `Are you sure you want to upload "${file.name}" as your resume?`,
      confirmText: "Upload",
      onConfirm: performUpload,
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  }, [resumeFile]);

  const handleRemove = () => {
    requestConfirm({
      title: "Remove Resume",
      message: "Are you sure you want to delete the uploaded resume? This cannot be undone.",
      confirmText: "Delete",
      isDanger: true,
      onConfirm: async () => {
        try {
          await fetch("/api/upload", { method: "DELETE" });
          localStorage.removeItem(RESUME_KEY);
          setResumeFile(null);
          onResumeChange(null);
        } catch (err) {
          console.error("Failed to delete resume:", err);
        }
      }
    });
  };

  const handleDownload = () => {
    if (!resumeFile) return;
    const link = document.createElement("a");
    link.href = resumeFile.data === "server" ? "/resume.pdf" : resumeFile.data;
    link.download = resumeFile.name;
    link.click();
  };

  const formatSize = (bytes: number) => bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(1)} KB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

  if (resumeFile) {
    return (
      <div style={{ border: "1px solid rgba(100,255,218,0.3)", borderRadius: "8px", padding: "1rem", backgroundColor: "rgba(100,255,218,0.05)", marginBottom: "1rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "6px", backgroundColor: "rgba(100,255,218,0.1)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <FileText size={18} color="#64ffda" />
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <p style={{ color: "#e6e6e6", fontSize: "0.9rem", fontWeight: 600, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{resumeFile.name}</p>
            <p style={{ color: "#8892b0", fontSize: "0.78rem", margin: 0, fontFamily: "monospace" }}>{formatSize(resumeFile.size)} · PDF</p>
          </div>
          <div style={{ display: "flex", gap: "0.5rem", flexShrink: 0 }}>
            <button onClick={handleDownload} style={{ padding: "0.35rem 0.8rem", backgroundColor: "rgba(100,255,218,0.1)", color: "#64ffda", border: "1px solid rgba(100,255,218,0.3)", borderRadius: "5px", fontSize: "0.78rem", cursor: "pointer", fontFamily: "monospace" }}>
              Preview
            </button>
            <button onClick={() => inputRef.current?.click()} style={{ padding: "0.35rem 0.8rem", backgroundColor: "transparent", color: "#8892b0", border: "1px solid #233554", borderRadius: "5px", fontSize: "0.78rem", cursor: "pointer" }}>
              Replace
            </button>
            <button onClick={handleRemove} style={{ padding: "0.35rem 0.6rem", backgroundColor: "rgba(255,80,80,0.1)", color: "#ff6b6b", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "5px", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center" }}>
              <Trash2 size={13} />
            </button>
          </div>
        </div>
        <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }} />
      </div>
    );
  }

  return (
    <div
      onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
      style={{
        border: `2px dashed ${dragging ? "#64ffda" : "#233554"}`,
        borderRadius: "8px",
        padding: "2rem 1rem",
        textAlign: "center",
        cursor: "pointer",
        backgroundColor: dragging ? "rgba(100,255,218,0.05)" : "transparent",
        transition: "all 0.2s",
        marginBottom: "1rem",
      }}
    >
      <Upload size={28} color={dragging ? "#64ffda" : "#8892b0"} style={{ margin: "0 auto 0.75rem" }} />
      <p style={{ color: "#e6e6e6", fontSize: "0.9rem", marginBottom: "0.25rem" }}>
        {dragging ? "Drop your PDF here" : "Drag & drop your resume PDF"}
      </p>
      <p style={{ color: "#8892b0", fontSize: "0.8rem", fontFamily: "monospace" }}>or click to browse · max 10 MB</p>
      <input ref={inputRef} type="file" accept=".pdf" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }} />
    </div>
  );
}

// ─── Project Image Uploader ───────────────────────────────────────────────────
function ProjectImageUploader({
  image,
  onChange,
  requestConfirm,
}: {
  image: string;
  onChange: (img: string) => void;
  requestConfirm: (options: ConfirmOptions) => void;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const processFile = (file: File) => {
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be under 2 MB.");
      return;
    }

    const performUpload = () => {
      const reader = new FileReader();
      reader.onload = (e) => {
        onChange(e.target!.result as string);
      };
      reader.readAsDataURL(file);
    };

    requestConfirm({
      title: "Upload Project Image",
      message: `Are you sure you want to set "${file.name}" as the project snap?`,
      confirmText: "Upload",
      onConfirm: performUpload,
    });
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) processFile(file);
  };

  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    requestConfirm({
      title: "Remove Project Image",
      message: "Are you sure you want to remove this project's snap?",
      confirmText: "Remove",
      isDanger: true,
      onConfirm: () => onChange(""),
    });
  };

  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontSize: "0.78rem", fontFamily: "monospace", color: "#64ffda", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" }}>Project Snap (Image)</label>
      {image ? (
        <div style={{ position: "relative", width: "100%", height: "140px", borderRadius: "6px", overflow: "hidden", border: "1px solid rgba(100,255,218,0.3)" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt="Project Snap" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", top: "0.5rem", right: "0.5rem", display: "flex", gap: "0.5rem" }}>
            <button
              onClick={() => inputRef.current?.click()}
              style={{ padding: "0.3rem 0.6rem", backgroundColor: "rgba(10, 25, 47, 0.85)", color: "#64ffda", border: "1px solid rgba(100,255,218,0.3)", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer", fontFamily: "monospace" }}
            >
              Replace
            </button>
            <button
              onClick={handleRemove}
              style={{ padding: "0.3rem 0.5rem", backgroundColor: "rgba(255,80,80,0.2)", color: "#ff6b6b", border: "1px solid rgba(255,80,80,0.4)", borderRadius: "4px", fontSize: "0.75rem", cursor: "pointer" }}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#64ffda" : "#233554"}`,
            borderRadius: "6px",
            padding: "1.5rem",
            textAlign: "center",
            cursor: "pointer",
            backgroundColor: dragging ? "rgba(100,255,218,0.05)" : "#0d1b2e",
            transition: "all 0.2s",
          }}
        >
          <Upload size={20} color={dragging ? "#64ffda" : "#8892b0"} style={{ margin: "0 auto 0.5rem" }} />
          <p style={{ color: "#e6e6e6", fontSize: "0.85rem", margin: "0 0 0.2rem" }}>
            {dragging ? "Drop snap here" : "Drag & drop project snap"}
          </p>
          <p style={{ color: "#8892b0", fontSize: "0.75rem", fontFamily: "monospace", margin: 0 }}>or click to browse · max 2 MB</p>
        </div>
      )}
      <input ref={inputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) processFile(f); e.target.value = ""; }} />
    </div>
  );
}

// ─── Main Admin Page ──────────────────────────────────────────────────────────
export default function AdminPage() {
  const router = useRouter();
  const { data, updateData, resetData } = usePortfolio();
  const [draft, setDraft] = useState<PortfolioData>(data);
  const [activeTab, setActiveTab] = useState<Tab>("personal");
  const [saved, setSaved] = useState(false);
  const [expandedExp, setExpandedExp] = useState<number | null>(0);
  const [expandedProj, setExpandedProj] = useState<number | null>(0);

  const [confirmConfig, setConfirmConfig] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    isDanger?: boolean;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: "",
    message: "",
    onConfirm: () => {},
  });

  const requestConfirm = (options: ConfirmOptions) => {
    setConfirmConfig({
      isOpen: true,
      title: options.title,
      message: options.message,
      confirmText: options.confirmText,
      cancelText: options.cancelText,
      isDanger: options.isDanger,
      onConfirm: options.onConfirm,
    });
  };

  useEffect(() => { setDraft(data); }, [data]);

  const handleSave = () => {
    requestConfirm({
      title: "Save Changes",
      message: "Are you sure you want to save all changes? This will update your live portfolio data.",
      confirmText: "Save",
      onConfirm: () => {
        updateData(draft);
        setSaved(true);
        setTimeout(() => setSaved(false), 2500);
      },
    });
  };

  const handleReset = () => {
    requestConfirm({
      title: "Reset Portfolio",
      message: "Are you sure you want to reset all portfolio data to default settings? This cannot be undone.",
      confirmText: "Reset",
      isDanger: true,
      onConfirm: resetData,
    });
  };

  const handleLogout = () => {
    document.cookie = "portfolio_admin_session=; path=/; max-age=0; SameSite=Lax";
    localStorage.removeItem(SESSION_KEY);
    router.push("/admin/login");
  };

  const setPersonal = (key: string, value: string) =>
    setDraft((d) => ({ ...d, personalInfo: { ...d.personalInfo, [key]: value } }));

  const setExp = (i: number, key: string, value: string | string[]) =>
    setDraft((d) => { const exps = [...d.experiences]; exps[i] = { ...exps[i], [key]: value }; return { ...d, experiences: exps }; });

  const addExp = () => {
    requestConfirm({
      title: "Add Experience",
      message: "Are you sure you want to add a new work experience entry?",
      confirmText: "Add",
      onConfirm: () => {
        setDraft((d) => ({ ...d, experiences: [...d.experiences, { company: "New Company", role: "Role Title", period: "2024 — Present", description: "Describe your responsibilities.", technologies: [] }] }));
      },
    });
  };

  const removeExp = (i: number) => {
    requestConfirm({
      title: "Remove Experience",
      message: `Are you sure you want to remove the work experience entry for "${draft.experiences[i]?.company || "New Company"}"?`,
      confirmText: "Remove",
      isDanger: true,
      onConfirm: () => {
        setDraft((d) => ({ ...d, experiences: d.experiences.filter((_, idx) => idx !== i) }));
      },
    });
  };

  const setProj = (i: number, key: string, value: string | string[]) =>
    setDraft((d) => { const projs = [...d.projects]; projs[i] = { ...projs[i], [key]: value }; return { ...d, projects: projs }; });

  const addProj = () => {
    requestConfirm({
      title: "Add Project",
      message: "Are you sure you want to add a new project entry?",
      confirmText: "Add",
      onConfirm: () => {
        setDraft((d) => ({ ...d, projects: [...d.projects, { title: "New Project", description: "Project description.", image: "/images/profile.png", github: "https://github.com/", live: "https://example.com", technologies: [] }] }));
      },
    });
  };

  const removeProj = (i: number) => {
    requestConfirm({
      title: "Remove Project",
      message: `Are you sure you want to remove the project entry for "${draft.projects[i]?.title || "New Project"}"?`,
      confirmText: "Remove",
      isDanger: true,
      onConfirm: () => {
        setDraft((d) => ({ ...d, projects: d.projects.filter((_, idx) => idx !== i) }));
      },
    });
  };

  const setSkillTags = (category: keyof PortfolioData["skills"], tags: string[]) =>
    setDraft((d) => ({ ...d, skills: { ...d.skills, [category]: tags } }));

  const S: Record<string, React.CSSProperties> = {
    page: { minHeight: "100vh", backgroundColor: "#0a0a0a", color: "#e6e6e6", fontFamily: "'Inter','Segoe UI',sans-serif" },
    topbar: { position: "fixed", top: 0, left: 0, right: 0, backgroundColor: "rgba(10,10,10,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid #1e3a5f", padding: "0.85rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 100 },
    container: { maxWidth: "900px", margin: "0 auto", padding: "6rem 1.5rem 3rem" },
    tabBar: { display: "flex", gap: "0.25rem", marginBottom: "2rem", borderBottom: "1px solid #1e3a5f", overflowX: "auto" },
    card: { backgroundColor: "#112240", border: "1px solid #1e3a5f", borderRadius: "10px", padding: "1.5rem", marginBottom: "1rem" },
    label: { display: "block", fontSize: "0.78rem", fontFamily: "monospace", color: "#64ffda", marginBottom: "0.4rem", textTransform: "uppercase", letterSpacing: "0.06em" },
    input: { width: "100%", backgroundColor: "#0d1b2e", border: "1px solid #233554", borderRadius: "6px", color: "#e6e6e6", padding: "0.6rem 0.9rem", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", marginBottom: "1rem" },
    textarea: { width: "100%", backgroundColor: "#0d1b2e", border: "1px solid #233554", borderRadius: "6px", color: "#e6e6e6", padding: "0.6rem 0.9rem", fontSize: "0.9rem", outline: "none", boxSizing: "border-box", marginBottom: "1rem", resize: "vertical", minHeight: "90px", fontFamily: "inherit" },
    btnPrimary: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.4rem", backgroundColor: "#64ffda", color: "#0a0a0a", border: "none", borderRadius: "6px", fontWeight: 700, fontSize: "0.9rem", cursor: "pointer", fontFamily: "monospace" },
    btnSecondary: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", backgroundColor: "transparent", color: "#8892b0", border: "1px solid #233554", borderRadius: "6px", fontSize: "0.875rem", cursor: "pointer" },
    btnDanger: { display: "inline-flex", alignItems: "center", gap: "0.4rem", padding: "0.5rem 1rem", backgroundColor: "rgba(255,80,80,0.1)", color: "#ff6b6b", border: "1px solid rgba(255,80,80,0.3)", borderRadius: "6px", fontSize: "0.8rem", cursor: "pointer" },
    btnAdd: { display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.6rem 1.2rem", backgroundColor: "rgba(100,255,218,0.1)", color: "#64ffda", border: "1px dashed #64ffda", borderRadius: "6px", fontSize: "0.875rem", cursor: "pointer", width: "100%", justifyContent: "center", marginTop: "0.5rem" },
    sectionTitle: { fontSize: "1.1rem", fontWeight: 700, color: "#e6e6e6", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" },
    grid2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" },
    expHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" },
    badge: { fontSize: "0.7rem", fontFamily: "monospace", color: "#64ffda", backgroundColor: "rgba(100,255,218,0.1)", padding: "0.2rem 0.6rem", borderRadius: "4px" },
  };

  const tabs = [
    { key: "personal" as Tab, label: "Personal Info", emoji: "👤" },
    { key: "about" as Tab, label: "About Me", emoji: "ℹ️" },
    { key: "experience" as Tab, label: "Experience", emoji: "💼" },
    { key: "projects" as Tab, label: "Projects", emoji: "🚀" },
    { key: "skills" as Tab, label: "Skills", emoji: "⚡" },
  ];

  const personalExt = draft.personalInfo as PersonalInfoExt;

  return (
    <div style={S.page}>
      {/* Topbar */}
      <div style={S.topbar}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <Link href="/" style={{ color: "#64ffda", fontFamily: "monospace", fontSize: "1rem", fontWeight: 700, textDecoration: "none" }}>
            &lt;Prabod/&gt;
          </Link>
          <span style={{ color: "#233554" }}>|</span>
          <span style={{ color: "#8892b0", fontSize: "0.875rem", fontFamily: "monospace" }}>Admin Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
          {saved && (
            <span style={{ color: "#64ffda", fontSize: "0.85rem", fontFamily: "monospace", display: "flex", alignItems: "center", gap: "0.4rem" }}>
              <CheckCircle size={14} /> Saved!
            </span>
          )}
          <Link href="/" target="_blank" style={{ ...S.btnSecondary, textDecoration: "none", fontSize: "0.8rem" }}>
            <Home size={14} /> View Site
          </Link>
          <button style={S.btnSecondary} onClick={handleReset}><RotateCcw size={14} /> Reset</button>
          <button style={S.btnPrimary} onClick={handleSave}><Save size={16} /> Save Changes</button>
          <button style={{ ...S.btnSecondary, color: "#ff6b6b", borderColor: "rgba(255,80,80,0.3)" }} onClick={handleLogout}>
            <LogOut size={14} /> Logout
          </button>
        </div>
      </div>

      <div style={S.container}>
        <div style={{ marginBottom: "2rem" }}>
          <h1 style={{ fontSize: "1.8rem", fontWeight: 800, color: "#e6e6e6", marginBottom: "0.25rem" }}>Portfolio Manager</h1>
          <p style={{ color: "#8892b0", fontSize: "0.9rem", fontFamily: "monospace" }}>
            Edit your portfolio content. Click <strong style={{ color: "#64ffda" }}>Save Changes</strong> to apply.
          </p>
        </div>

        {/* Tab Bar */}
        <div style={S.tabBar}>
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActiveTab(t.key)}
              style={{ padding: "0.65rem 1.25rem", background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: "0.9rem", color: activeTab === t.key ? "#64ffda" : "#8892b0", borderBottom: `2px solid ${activeTab === t.key ? "#64ffda" : "transparent"}`, whiteSpace: "nowrap", transition: "all 0.2s" }}
            >
              {t.emoji} {t.label}
            </button>
          ))}
        </div>

        {/* ── PERSONAL INFO ── */}
        {activeTab === "personal" && (
          <div>
            <p style={S.sectionTitle}>👤 Personal Information</p>
            <div style={S.card}>
              <div style={S.grid2}>
                <div><label style={S.label}>Full Name</label><input style={S.input} value={personalExt.name} onChange={(e) => setPersonal("name", e.target.value)} /></div>
                <div><label style={S.label}>Title / Role</label><input style={S.input} value={personalExt.title} onChange={(e) => setPersonal("title", e.target.value)} /></div>
              </div>
              <label style={S.label}>Tagline (Hero subtitle)</label>
              <input style={S.input} value={personalExt.tagline} onChange={(e) => setPersonal("tagline", e.target.value)} />
              <label style={S.label}>Description (Hero paragraph)</label>
              <textarea style={S.textarea} value={personalExt.description} onChange={(e) => setPersonal("description", e.target.value)} />
              <div style={S.grid2}>
                <div><label style={S.label}>Location</label><input style={S.input} value={personalExt.location} onChange={(e) => setPersonal("location", e.target.value)} /></div>
                <div><label style={S.label}>Email</label><input style={S.input} type="email" value={personalExt.email} onChange={(e) => setPersonal("email", e.target.value)} /></div>
              </div>
              <div style={S.grid2}>
                <div>
                  <label style={S.label}>WhatsApp Number</label>
                  <input style={S.input} value={personalExt.whatsapp ?? ""} onChange={(e) => setPersonal("whatsapp", e.target.value)} placeholder="+94XXXXXXXXX" />
                  <p style={{ fontSize: "0.75rem", color: "#8892b0", fontFamily: "monospace", marginTop: "-0.8rem", marginBottom: "1rem" }}>Include country code, e.g. +94723169847</p>
                </div>
                <div>
                  <label style={S.label}>GitHub URL</label>
                  <input style={S.input} value={personalExt.github} onChange={(e) => setPersonal("github", e.target.value)} />
                </div>
              </div>
              <div style={S.grid2}>
                <div><label style={S.label}>LinkedIn URL</label><input style={S.input} value={personalExt.linkedin} onChange={(e) => setPersonal("linkedin", e.target.value)} /></div>
                <div><label style={S.label}>Twitter / X URL</label><input style={S.input} value={personalExt.twitter} onChange={(e) => setPersonal("twitter", e.target.value)} /></div>
              </div>

              {/* Resume Upload */}
              <label style={{ ...S.label, marginTop: "0.5rem" }}>Resume / CV (PDF)</label>
              <ResumeUploader requestConfirm={requestConfirm} onResumeChange={(url) => setPersonal("resume", url || "")} />
              <p style={{ fontSize: "0.75rem", color: "#8892b0", fontFamily: "monospace", marginTop: "-0.5rem" }}>
                Upload your resume PDF. It will be served as a download from the portfolio.
              </p>
            </div>
          </div>
        )}

        {/* ── ABOUT ME ── */}
        {activeTab === "about" && (
          <div>
            <p style={S.sectionTitle}>ℹ️ About Me Information</p>
            <div style={S.card}>
              <label style={S.label}>Paragraph 1</label>
              <textarea style={S.textarea} value={draft.aboutMe?.paragraphs?.[0] ?? ""} onChange={(e) => {
                const paras = [...(draft.aboutMe?.paragraphs ?? ["", "", ""])];
                paras[0] = e.target.value;
                setDraft((d) => ({ ...d, aboutMe: { ...d.aboutMe, paragraphs: paras } }));
              }} />
              
              <label style={S.label}>Paragraph 2</label>
              <textarea style={S.textarea} value={draft.aboutMe?.paragraphs?.[1] ?? ""} onChange={(e) => {
                const paras = [...(draft.aboutMe?.paragraphs ?? ["", "", ""])];
                paras[1] = e.target.value;
                setDraft((d) => ({ ...d, aboutMe: { ...d.aboutMe, paragraphs: paras } }));
              }} />

              <label style={S.label}>Paragraph 3</label>
              <textarea style={S.textarea} value={draft.aboutMe?.paragraphs?.[2] ?? ""} onChange={(e) => {
                const paras = [...(draft.aboutMe?.paragraphs ?? ["", "", ""])];
                paras[2] = e.target.value;
                setDraft((d) => ({ ...d, aboutMe: { ...d.aboutMe, paragraphs: paras } }));
              }} />

              <label style={S.label}>Recent Technologies / Skills (Shown in About section)</label>
              <TagInput
                tags={draft.aboutMe?.skills ?? []}
                onChange={(tags) => setDraft((d) => ({ ...d, aboutMe: { ...d.aboutMe, skills: tags } }))}
                requestConfirm={requestConfirm}
                placeholder="Add tech tag..."
              />
            </div>
          </div>
        )}

        {/* ── EXPERIENCE ── */}
        {activeTab === "experience" && (
          <div>
            <p style={S.sectionTitle}>💼 Work Experience <span style={S.badge}>{draft.experiences.length} entries</span></p>
            {draft.experiences.map((exp, i) => (
              <div key={i} style={S.card}>
                <div style={S.expHeader} onClick={() => setExpandedExp(expandedExp === i ? null : i)}>
                  <div>
                    <span style={{ fontWeight: 700, color: "#e6e6e6" }}>{exp.company}</span>
                    <span style={{ color: "#8892b0", marginLeft: "0.75rem", fontSize: "0.85rem" }}>{exp.role}</span>
                  </div>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <button style={S.btnDanger} onClick={(e) => { e.stopPropagation(); removeExp(i); }}><Trash2 size={12} /> Remove</button>
                    {expandedExp === i ? <ChevronUp size={18} color="#8892b0" /> : <ChevronDown size={18} color="#8892b0" />}
                  </div>
                </div>
                {expandedExp === i && (
                  <div style={{ marginTop: "1.25rem" }}>
                    <div style={S.grid2}>
                      <div><label style={S.label}>Company Name</label><input style={S.input} value={exp.company} onChange={(e) => setExp(i, "company", e.target.value)} /></div>
                      <div><label style={S.label}>Role / Position</label><input style={S.input} value={exp.role} onChange={(e) => setExp(i, "role", e.target.value)} /></div>
                    </div>
                    <label style={S.label}>Period</label>
                    <input style={S.input} value={exp.period} onChange={(e) => setExp(i, "period", e.target.value)} placeholder="2022 — Present" />
                    <label style={S.label}>Description</label>
                    <textarea style={S.textarea} value={exp.description} onChange={(e) => setExp(i, "description", e.target.value)} />
                    <label style={S.label}>Technologies</label>
                    <TagInput tags={exp.technologies} onChange={(tags) => setExp(i, "technologies", tags)} requestConfirm={requestConfirm} placeholder="Type a tech and press Enter…" />
                  </div>
                )}
              </div>
            ))}
            <button style={S.btnAdd} onClick={addExp}><Plus size={16} /> Add Experience</button>
          </div>
        )}

        {/* ── PROJECTS ── */}
        {activeTab === "projects" && (
          <div>
            <p style={S.sectionTitle}>🚀 Projects <span style={S.badge}>{draft.projects.length} projects</span></p>
            {draft.projects.map((proj, i) => (
              <div key={i} style={S.card}>
                <div style={S.expHeader} onClick={() => setExpandedProj(expandedProj === i ? null : i)}>
                  <span style={{ fontWeight: 700, color: "#e6e6e6" }}>{proj.title}</span>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <button style={S.btnDanger} onClick={(e) => { e.stopPropagation(); removeProj(i); }}><Trash2 size={12} /> Remove</button>
                    {expandedProj === i ? <ChevronUp size={18} color="#8892b0" /> : <ChevronDown size={18} color="#8892b0" />}
                  </div>
                </div>
                {expandedProj === i && (
                  <div style={{ marginTop: "1.25rem" }}>
                    <label style={S.label}>Project Title</label>
                    <input style={S.input} value={proj.title} onChange={(e) => setProj(i, "title", e.target.value)} />
                    <label style={S.label}>Description</label>
                    <textarea style={S.textarea} value={proj.description} onChange={(e) => setProj(i, "description", e.target.value)} />
                    <div style={S.grid2}>
                      <div><label style={S.label}>GitHub URL</label><input style={S.input} value={proj.github} onChange={(e) => setProj(i, "github", e.target.value)} /></div>
                      <div><label style={S.label}>Live Demo URL</label><input style={S.input} value={proj.live} onChange={(e) => setProj(i, "live", e.target.value)} /></div>
                    </div>
                    <ProjectImageUploader image={proj.image} onChange={(img) => setProj(i, "image", img)} requestConfirm={requestConfirm} />
                    <label style={S.label}>Technologies</label>
                    <TagInput tags={proj.technologies} onChange={(tags) => setProj(i, "technologies", tags)} requestConfirm={requestConfirm} placeholder="Type a tech and press Enter…" />
                  </div>
                )}
              </div>
            ))}
            <button style={S.btnAdd} onClick={addProj}><Plus size={16} /> Add Project</button>
          </div>
        )}

        {/* ── SKILLS ── */}
        {activeTab === "skills" && (
          <div>
            <p style={S.sectionTitle}>⚡ Technical Skills</p>
            <p style={{ color: "#8892b0", fontSize: "0.85rem", marginBottom: "1.5rem", fontFamily: "monospace" }}>
              Type a skill and press{" "}
              <kbd style={{ backgroundColor: "#1e3a5f", padding: "0.1rem 0.4rem", borderRadius: "3px", fontSize: "0.8rem" }}>Enter</kbd> or{" "}
              <kbd style={{ backgroundColor: "#1e3a5f", padding: "0.1rem 0.4rem", borderRadius: "3px", fontSize: "0.8rem" }}>,</kbd> to add. Click <strong style={{ color: "#ff6b6b" }}>✕</strong> to remove.
            </p>
            {(Object.keys(draft.skills) as (keyof PortfolioData["skills"])[]).map((category) => (
              <div key={category} style={S.card}>
                <label style={S.label}>
                  {category === "ai" ? "AI & ML" : category === "cloud" ? "Cloud & DevOps" : category.charAt(0).toUpperCase() + category.slice(1)}
                  <span style={{ ...S.badge, marginLeft: "0.5rem" }}>{draft.skills[category].length} skills</span>
                </label>
                <TagInput tags={draft.skills[category]} onChange={(tags) => setSkillTags(category, tags)} requestConfirm={requestConfirm} placeholder={`Add ${category} skills…`} />
              </div>
            ))}
          </div>
        )}

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid #1e3a5f", paddingTop: "2rem", marginTop: "2rem", display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
          <button style={S.btnSecondary} onClick={handleReset}><RotateCcw size={14} /> Reset to Defaults</button>
          <button style={S.btnPrimary} onClick={handleSave}><Save size={16} /> {saved ? "Saved ✓" : "Save Changes"}</button>
        </div>
      </div>

      <ConfirmationModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        cancelText={confirmConfig.cancelText}
        isDanger={confirmConfig.isDanger}
        onConfirm={confirmConfig.onConfirm}
        onClose={() => setConfirmConfig((prev) => ({ ...prev, isOpen: false }))}
      />
    </div>
  );
}
