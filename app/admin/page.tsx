"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Link from "next/link";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";
import { motion, Variants } from "framer-motion";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);
  const [posts, setPosts] = useState<any[]>([]);
  const [messagesCount, setMessagesCount] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  // ✅ NEW (non-breaking additions)
  const [authRetries, setAuthRetries] = useState(0);
  const [authReady, setAuthReady] = useState(false);
  const isFetching = useRef(false); // Prevents "Lock stolen" errors

  const supabase = createClient();
  const router = useRouter();

  const fetchData = useCallback(async () => {
    // If we're already fetching, don't start again
    if (isFetching.current) return;

    try {
      isFetching.current = true;
      
      // 1. ALWAYS Verify Auth First
      const { data: { user: activeUser }, error: authError } = await supabase.auth.getUser();

      // ✅ FIX: Retry instead of instant redirect
      if (!activeUser || authError) {
        if (authRetries < 3) {
          console.warn("Session not ready, retrying...", authRetries);
          setTimeout(() => {
            isFetching.current = false;
            setAuthRetries((prev) => prev + 1);
          }, 400); 
          return;
        }

        console.warn("No active session after retries. Redirecting...");
        router.push("/login");
        return;
      }

      setUser(activeUser);
      setAuthReady(true);
      // 🔥 CRITICAL: Once we have a user, stop the global "Loading" spinner
      setLoading(false); 

      // 2. Fetch Messages from API
      try {
        const msgResponse = await fetch("/api/admin/messages", {
          method: "GET",
          headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
          },
          credentials: "include", 
          cache: "no-store",
        });

        if (msgResponse.ok) {
          const msgData = await msgResponse.json();
          setMessagesCount(msgData?.messages?.length || 0);
        } else if (msgResponse.status === 401 && authRetries < 3) {
          // Silent retry for the message API if 401 occurs
          isFetching.current = false;
          setAuthRetries(prev => prev + 1);
          return;
        }
      } catch (msgErr) {
        console.error("Message fetch failed, but continuing to posts:", msgErr);
      }

      // 3. Fetch Posts from Database
      const { data: postsData, error: fetchError } = await supabase
        .from("posts")
        .select("id, title, is_published, created_at, category")
        .order("created_at", { ascending: false });

      if (fetchError) {
        console.error("Database fetch error:", fetchError.message);
      } else {
        setPosts(postsData || []);
      }

    } catch (err) {
      console.error("Dashboard Load Error:", err);
    } finally {
      isFetching.current = false;
      // Ensure loading is false if we got through the try block
      if (authReady) setLoading(false);
    }
  }, [router, supabase, authRetries, authReady]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // ✅ Auth state listener
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user);
        setAuthReady(true);
        setLoading(false); // Open the page if auth is detected via listener
      } else if (event === 'SIGNED_OUT') {
        router.push('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase, router]);

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVars: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      } 
    }
  };

  // Only block the whole page if we have NO user and we aren't done retrying
  if (loading && !user) return (
    <div style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <motion.div 
        animate={{ rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ 
          width: 40, 
          height: 40, 
          border: "4px solid #e2e8f0", 
          borderTopColor: "#0a2a66", 
          borderRadius: "50%" 
        }}
      />
    </div>
  );

  return (
    <motion.main 
      variants={containerVars}
      initial="hidden"
      animate="show"
      className="container section-padding"
    >
      {/* Header Area */}
      <motion.div 
        variants={itemVars}
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center", 
          marginBottom: "2.5rem", 
          flexWrap: "wrap", 
          gap: "1.5rem" 
        }}
      >
        <div style={{ flex: "1", minWidth: "280px" }}>
          <h1 className="text-primary" style={{ margin: 0, fontSize: "clamp(1.5rem, 5vw, 2.25rem)" }}>Admin Dashboard</h1>
          <p style={{ color: "var(--text-muted)", margin: "0.5rem 0 0", wordBreak: "break-all", fontSize: "0.9rem" }}>
            Signed in as: <span style={{ fontWeight: "600", color: "var(--primary)" }}>{user?.email}</span>
          </p>
        </div>

        <div 
          style={{ 
            display: "flex", 
            gap: "0.75rem", 
            alignItems: "center",
            flexWrap: "wrap",
            width: "auto",
            justifyContent: "flex-end"
          }}
        >
          <Link 
            href="/admin/messages" 
            className="btn"
            style={{ 
              backgroundColor: "#f8fafc", 
              border: "1px solid #e2e8f0",
              color: "#475569",
              padding: "10px 20px",
              fontWeight: "600",
              textDecoration: "none",
              borderRadius: "8px",
              display: "flex",
              alignItems: "center",
              gap: "8px"
            }}
          >
            📩 Messages
          </Link>

          <LogoutButton />
          
          <Link 
            href="/admin/new" 
            className="btn btn-primary"
            style={{ 
              whiteSpace: "nowrap", 
              boxShadow: "0 4px 12px rgba(10, 42, 102, 0.15)",
              padding: "10px 20px"
            }}
          >
            + New Insight
          </Link>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "1.25rem", 
        marginBottom: "2.5rem" 
      }}>
        <motion.div 
          variants={itemVars}
          whileHover={{ y: -5 }}
          className="feature-card" 
          style={{ padding: "1.5rem", borderLeft: "5px solid var(--primary)", background: "white" }}
        >
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Total Insights</p>
          <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 0", fontWeight: "800" }}>{posts?.length || 0}</h3>
        </motion.div>

        <motion.div 
          variants={itemVars}
          whileHover={{ y: -5 }}
          className="feature-card" 
          style={{ padding: "1.5rem", borderLeft: "5px solid #10b981", background: "white" }}
        >
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Live on Site</p>
          <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 0", color: "#10b981", fontWeight: "800" }}>
            {posts?.filter(p => p.is_published).length || 0}
          </h3>
        </motion.div>

        <motion.div 
          variants={itemVars}
          whileHover={{ y: -5 }}
          onClick={() => router.push('/admin/messages')}
          className="feature-card" 
          style={{ padding: "1.5rem", borderLeft: "5px solid #6366f1", background: "white", cursor: "pointer" }}
        >
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.75rem", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.5px" }}>Client Messages</p>
          <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 0", color: "#6366f1", fontWeight: "800" }}>{messagesCount}</h3>
        </motion.div>
      </div>

      {/* Posts Table Section */}
      <motion.section 
        variants={itemVars}
        className="feature-card" 
        style={{ 
          overflow: "hidden", 
          padding: "0",
          background: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.03)"
        }}
      >
        <div style={{ 
          display: "flex", 
          justifyContent: "flex-end", 
          padding: "8px 16px", 
          fontSize: "0.7rem", 
          color: "#94a3b8",
          borderBottom: "1px solid #f1f5f9"
        }} className="mobile-only">
          <span>Swipe horizontally to view more →</span>
        </div>

        <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
          <table 
            style={{ 
              width: "100%", 
              borderCollapse: "collapse", 
              minWidth: "800px" 
            }}
          >
            <thead>
              <tr style={{ textAlign: "left", background: "#f8fafc", borderBottom: "2px solid #e2e8f0" }}>
                <th style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>ARTICLE TITLE</th>
                <th style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>CATEGORY</th>
                <th style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>STATUS</th>
                <th style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: "700" }}>DATE CREATED</th>
                <th style={{ padding: "1.25rem 1rem", fontSize: "0.85rem", color: "#64748b", fontWeight: "700", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {posts?.map((post) => (
                <motion.tr 
                  key={post.id} 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ background: "#fdfdfd" }}
                  style={{ borderBottom: "1px solid #f1f5f9", transition: "0.2s" }}
                >
                  <td style={{ padding: "1.25rem 1rem", fontWeight: "600", color: "#1e293b", maxWidth: "300px" }}>
                    <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {post.title}
                    </div>
                  </td>

                  <td style={{ padding: "1.25rem 1rem" }}>
                    <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "6px 10px", borderRadius: "6px", color: "#475569", fontWeight: "600" }}>
                      {post.category || "General"}
                    </span>
                  </td>

                  <td style={{ padding: "1.25rem 1rem" }}>
                    {post.is_published ? (
                      <span style={{ color: "#065f46", background: "#d1fae5", padding: "5px 12px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "800" }}>
                        LIVE
                      </span>
                    ) : (
                      <span style={{ color: "#92400e", background: "#fef3c7", padding: "5px 12px", borderRadius: "20px", fontSize: "0.7rem", fontWeight: "800" }}>
                        DRAFT
                      </span>
                    )}
                  </td>

                  <td style={{ padding: "1.25rem 1rem", color: "#64748b", fontSize: "0.85rem" }}>
                    {new Date(post.created_at).toLocaleDateString('en-NG', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </td>

                  <td style={{ padding: "1.25rem 1rem", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                      <Link 
                        href={`/insights/${post.id}`} 
                        target="_blank"
                        style={{ fontSize: "0.85rem", color: "var(--secondary)", fontWeight: "700", textDecoration: "none" }}
                      >
                        View
                      </Link>

                      <Link 
                        href={`/admin/edit/${post.id}`} 
                        style={{ fontSize: "0.85rem", color: "var(--primary)", fontWeight: "700", textDecoration: "none" }}
                      >
                        Edit
                      </Link>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {(!posts || posts.length === 0) && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            style={{ padding: "5rem 2rem", textAlign: "center" }}
          >
            <p style={{ color: "#64748b", marginBottom: "1.5rem", fontSize: "1.1rem" }}>
              Your insights library is currently empty.
            </p>
            <Link href="/admin/new" className="btn btn-outline" style={{ borderRadius: "8px" }}>
              Create your first post
            </Link>
          </motion.div>
        )}
      </motion.section>
    </motion.main>
  );
}