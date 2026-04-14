"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const supabase = createClient();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    content: "",
    is_published: false,
  });

  // 1. Load the existing post data
  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error || !data) {
        alert("Post not found!");
        router.push("/admin");
        return;
      }

      setFormData({
        title: data.title,
        category: data.category || "",
        content: data.content || "",
        is_published: data.is_published,
      });
      setLoading(false);
    };

    fetchPost();
  }, [id, supabase, router]);

  // 2. Handle the update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Updating post with ID:", id); // CHECK THIS IN YOUR BROWSER CONSOLE
    setSaving(true);
    
    const { data, error, status } = await supabase
      .from("posts")
      .update({
        title: formData.title,
        category: formData.category,
        content: formData.content,
        is_published: formData.is_published,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select(); // Add .select() here so we can see if it actually returns the updated row

    console.log("Update response:", { data, error, status });
    // ...
    if (error) {
      alert("Error updating post: " + error.message);
    } else {
      router.push("/admin");
      router.refresh(); 
    }
    setSaving(false);
  };

  if (loading) return <div className="container section-padding">Loading post data...</div>;

  return (
    <main className="container section-padding">
      <div style={{ marginBottom: "2rem" }}>
        <Link href="/admin" style={{ color: "var(--text-muted)", textDecoration: "none", fontSize: "0.9rem" }}>
          ← Back to Dashboard
        </Link>
        <h1 className="text-primary" style={{ marginTop: "1rem" }}>Edit Insight</h1>
      </div>

      <form onSubmit={handleSubmit} className="feature-card" style={{ padding: "2rem", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={labelStyle}>Article Title</label>
          <input
            type="text"
            required
            className="form-input"
            style={inputStyle}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          />
        </div>

        <div>
          <label style={labelStyle}>Category</label>
          <select 
            style={inputStyle}
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          >
            <option value="Strategy">Strategy</option>
            <option value="Automation">Automation</option>
            <option value="Software">Software</option>
            <option value="Optimization">Optimization</option>
          </select>
        </div>

        <div>
          <label style={labelStyle}>Content (Markdown Supported)</label>
          <p style={{ fontSize: "0.8rem", color: "#64748b", marginBottom: "0.5rem" }}>
            Tip: Press Enter twice for a new paragraph. Use **bold** for highlights.
          </p>
          <textarea
            required
            rows={12}
            style={{ ...inputStyle, fontFamily: "monospace", lineHeight: "1.5" }}
            value={formData.content}
            placeholder="Type your insight here..."
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <input
            type="checkbox"
            id="publish"
            style={{ width: "18px", height: "18px", cursor: "pointer" }}
            checked={formData.is_published}
            onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
          />
          <label htmlFor="publish" style={{ fontWeight: "600", cursor: "pointer", color: "#1e293b" }}>
            Make this post live
          </label>
        </div>

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={saving}
            style={{ minWidth: "150px" }}
          >
            {saving ? "Saving Changes..." : "Update Insight"}
          </button>
          <button 
            type="button" 
            onClick={() => router.push("/admin")} 
            className="btn-outline"
            style={{ padding: "0.75rem 1.5rem", cursor: "pointer" }}
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}

// Inline Styles
const labelStyle = {
  display: "block",
  marginBottom: "0.5rem",
  fontWeight: "700",
  fontSize: "0.9rem",
  color: "#1e293b"
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  borderRadius: "6px",
  border: "1px solid #e2e8f0",
  fontSize: "1rem",
  outline: "none",
};