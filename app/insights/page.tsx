import React from "react";
import Link from "next/link";
import CTA from "@/components/CTA";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

// 1. Define the Post interface to fix the TypeScript 'any' error
interface Post {
  id: string;
  title: string;
  excerpt: string;
  category: string | null;
  read_time: string | null;
  created_at: string;
}

export default async function InsightsPage() {
  // 2. Connect to Supabase
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 3. Fetch live data
  const { data, error } = await supabase
    .from('posts')
    .select('id, title, excerpt, category, read_time, created_at')
    .eq('is_published', true)
    .order('created_at', { ascending: false });

  // Cast the data to our interface
  const posts = data as Post[] | null;

  if (error) {
    console.error("Supabase error:", error.message);
  }

  return (
    <main>
      {/* Header */}
      <section className="section-padding" style={{ background: "var(--accent)", borderBottom: "1px solid #e2e8f0" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}>Insights</h1>
          <p style={{ maxWidth: "700px", fontSize: "1.2rem", color: "var(--text-muted)", marginTop: "1rem" }}>
            Thought leadership and expert perspectives on enterprise systems, 
            digital transformation, and business optimization in Africa.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding">
        <div className="container">
          <div className="grid">
            {posts && posts.length > 0 ? (
              posts.map((post: Post) => ( // TypeScript now knows what 'post' is
                <article key={post.id} className="feature-card" style={{ display: "flex", flexDirection: "column" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                    <span style={{ 
                      fontSize: "0.75rem", 
                      fontWeight: "bold", 
                      textTransform: "uppercase", 
                      color: "var(--secondary)",
                      letterSpacing: "1px" 
                    }}>
                      {post.category || "General"}
                    </span>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      {post.read_time || "5 min read"}
                    </span>
                  </div>

                  <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
                    <Link href={`/insights/${post.id}`} style={{ textDecoration: "none", color: "var(--primary)" }}>
                      {post.title}
                    </Link>
                  </h2>

                  <p style={{ color: "var(--text-muted)", marginBottom: "1.5rem", flexGrow: 1 }}>
                    {post.excerpt}
                  </p>

                  <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </span>
                    <Link href={`/insights/${post.id}`} style={{ 
                      fontSize: "0.9rem", 
                      fontWeight: "600", 
                      color: "var(--secondary)", 
                      textDecoration: "none" 
                    }}>
                      Read Article →
                    </Link>
                  </div>
                </article>
              ))
            ) : (
              <div style={{ textAlign: "center", padding: "3rem", gridColumn: "1 / -1" }}>
                <p>No insights found. Check your Supabase database connection.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter/CTA Section */}
      <CTA 
        variant="brand"
        title="Stay Ahead of the Curve"
        description="Subscribe to our monthly newsletter for the latest insights on African enterprise technology."
        buttons={[
          { text: "Subscribe Now", link: "#", variant: "primary" },
          { text: "Contact Us", link: "/contact", variant: "outline" }
        ]}
      />
    </main>
  );
}