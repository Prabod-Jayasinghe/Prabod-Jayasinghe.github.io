"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // If already logged in, skip to admin
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.replace("/admin");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin");
    } catch (err) {
      console.error("Login error:", err);
      const firebaseError = err as { code?: string; message?: string };
      if (firebaseError.code === "auth/invalid-credential" || firebaseError.code === "auth/user-not-found" || firebaseError.code === "auth/wrong-password") {
        setError("Invalid email or password. Please try again.");
      } else if (firebaseError.code === "auth/too-many-requests") {
        setError("Too many login attempts. Please try again later.");
      } else {
        setError(firebaseError.message || "An authentication error occurred.");
      }
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#0a0a0a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1.5rem",
        fontFamily: "'Inter', 'Segoe UI', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid decoration */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(100,255,218,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(100,255,218,0.03) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
          pointerEvents: "none",
        }}
      />
      {/* Glow */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          background: "radial-gradient(circle, rgba(100,255,218,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          width: "100%",
          maxWidth: "400px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: "56px",
              height: "56px",
              borderRadius: "12px",
              backgroundColor: "rgba(100,255,218,0.1)",
              border: "1px solid rgba(100,255,218,0.3)",
              marginBottom: "1.25rem",
            }}
          >
            <Lock size={24} color="#64ffda" />
          </div>
          <h1
            style={{
              fontSize: "1.6rem",
              fontWeight: 800,
              color: "#e6e6e6",
              marginBottom: "0.35rem",
            }}
          >
            Admin Access
          </h1>
          <p style={{ color: "#8892b0", fontSize: "0.9rem", fontFamily: "monospace" }}>
            &lt;Prabod/&gt; Portfolio Manager
          </p>
        </div>

        {/* Card */}
        <div
          style={{
            backgroundColor: "#112240",
            border: "1px solid #1e3a5f",
            borderRadius: "14px",
            padding: "2rem",
          }}
        >
          <form onSubmit={handleLogin}>
            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontFamily: "monospace",
                color: "#64ffda",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
              autoFocus
              required
              placeholder="Enter admin email"
              style={{
                width: "100%",
                backgroundColor: "#0d1b2e",
                border: `1px solid ${error ? "#ff6b6b" : "#233554"}`,
                borderRadius: "8px",
                color: "#e6e6e6",
                padding: "0.75rem 1rem",
                fontSize: "1rem",
                outline: "none",
                boxSizing: "border-box",
                transition: "border-color 0.2s",
                fontFamily: "inherit",
                marginBottom: "1.25rem",
              }}
              onFocus={(e) => {
                if (!error) e.currentTarget.style.borderColor = "#64ffda";
              }}
              onBlur={(e) => {
                if (!error) e.currentTarget.style.borderColor = "#233554";
              }}
            />

            <label
              style={{
                display: "block",
                fontSize: "0.78rem",
                fontFamily: "monospace",
                color: "#64ffda",
                marginBottom: "0.5rem",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
              }}
            >
              Password
            </label>
            <div style={{ position: "relative", marginBottom: "1.25rem" }}>
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                required
                placeholder="Enter admin password"
                style={{
                  width: "100%",
                  backgroundColor: "#0d1b2e",
                  border: `1px solid ${error ? "#ff6b6b" : "#233554"}`,
                  borderRadius: "8px",
                  color: "#e6e6e6",
                  padding: "0.75rem 2.8rem 0.75rem 1rem",
                  fontSize: "1rem",
                  outline: "none",
                  boxSizing: "border-box",
                  transition: "border-color 0.2s",
                  fontFamily: "inherit",
                }}
                onFocus={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "#64ffda";
                }}
                onBlur={(e) => {
                  if (!error) e.currentTarget.style.borderColor = "#233554";
                }}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                style={{
                  position: "absolute",
                  right: "0.75rem",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#8892b0",
                  display: "flex",
                  alignItems: "center",
                  padding: 0,
                }}
              >
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>

            {error && (
              <p
                style={{
                  color: "#ff6b6b",
                  fontSize: "0.85rem",
                  marginBottom: "1rem",
                  fontFamily: "monospace",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.4rem",
                }}
              >
                ⚠ {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading || !email || !password}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: "0.6rem",
                padding: "0.85rem",
                backgroundColor: loading || !email || !password ? "rgba(100,255,218,0.4)" : "#64ffda",
                color: "#0a0a0a",
                border: "none",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "1rem",
                cursor: loading || !email || !password ? "not-allowed" : "pointer",
                fontFamily: "monospace",
                transition: "all 0.2s",
              }}
            >
              {loading ? (
                <>
                  <span
                    style={{
                      width: "16px",
                      height: "16px",
                      border: "2px solid #0a0a0a",
                      borderTopColor: "transparent",
                      borderRadius: "50%",
                      display: "inline-block",
                      animation: "spin 0.7s linear infinite",
                    }}
                  />
                  Verifying...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Sign In
                </>
              )}
            </button>
          </form>
        </div>

        <p style={{ textAlign: "center", color: "#8892b0", fontSize: "0.8rem", marginTop: "1.5rem", fontFamily: "monospace" }}>
          <Link href="/" style={{ color: "#64ffda", textDecoration: "none" }}>
            ← Back to portfolio
          </Link>
        </p>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
}
