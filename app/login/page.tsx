"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer } from "@/utils/motion";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  const supabase = createClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        alert(error.message);
        setLoading(false);
        return;
      }

      if (data?.session) {
        // 🔥 CRITICAL FIX: force session persistence before middleware check
        await supabase.auth.setSession({
          access_token: data.session.access_token,
          refresh_token: data.session.refresh_token,
        });

        // ensure Supabase internal state sync
        await supabase.auth.getSession();

        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          alert("Session not established. Try again.");
          setLoading(false);
          return;
        }

        // allow cookie propagation for middleware
        await new Promise((resolve) => setTimeout(resolve, 500));

        router.refresh();

        const forwardedFrom = searchParams.get("forwardedFrom");

        router.push(forwardedFrom || "/admin");
      } else {
        setLoading(false);
      }
    } catch (err) {
      console.error("Unexpected login error:", err);
      setLoading(false);
    }
  };

  const containerVariants = staggerContainer(0.1, 0.1);

  if (!mounted) return null;

  return (
    <main
      className="container section-padding"
      style={{
        maxWidth: "420px",
        width: "90%",
        margin: "0 auto",
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        style={{
          background: "#ffffff",
          padding: "2.5rem 2rem",
          borderRadius: "16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
          border: "1px solid #e2e8f0",
        }}
      >
        <motion.div
          style={{ textAlign: "center", marginBottom: "2rem" }}
          variants={fadeIn("down", "tween", 0.2, 1)}
        >
          <h1
            className="text-primary"
            style={{
              marginBottom: "0.5rem",
              fontSize: "2rem",
              fontWeight: 700,
              color: "var(--primary)",
            }}
          >
            Admin Login
          </h1>
          <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
            Sign in to access your dashboard
          </p>
        </motion.div>

        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}
        >
          <motion.div variants={fadeIn("up", "tween", 0.3, 1)}>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.3s ease",
                background: "#f8fafc",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
          </motion.div>

          <motion.div variants={fadeIn("up", "tween", 0.4, 1)}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "8px",
                border: "1px solid #cbd5e1",
                fontSize: "1rem",
                outline: "none",
                transition: "border-color 0.3s ease",
                background: "#f8fafc",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
              onBlur={(e) => (e.target.style.borderColor = "#cbd5e1")}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("up", "tween", 0.5, 1)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{
                width: "100%",
                padding: "14px",
                fontSize: "1rem",
                fontWeight: "600",
                marginTop: "0.5rem",
                background: "var(--primary)",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: loading ? "not-allowed" : "pointer",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 12px rgba(10, 42, 102, 0.2)",
              }}
            >
              {loading ? "Verifying..." : "Login"}
            </button>
          </motion.div>
        </form>
      </motion.div>
    </main>
  );
}