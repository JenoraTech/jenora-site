export const revalidate = 0;

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTA from "@/components/CTA";
import { createClient } from '@/utils/supabase/server';
import ReactMarkdown from "react-markdown";
import { AnimatedSection } from "@/components/AnimatedSection";

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  read_time: string;
}

// Define animation variants at the component level
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: "easeInOut" }
  }
};

export default async function PostPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  // 1. Await params for Next.js 15/16 compatibility
  const { id } = await params;

  /**
   * 2. Initialize Supabase. 
   * We removed manual 'cookies()' call here because our updated
   * 'createClient' in utils/supabase/server.ts handles it internally.
   */
  const supabase = await createClient();

  if (!supabase) {
    notFound();
  }

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, title, content, category, created_at, read_time')
    .eq('id', id)
    .single();

  if (error || !post) {
    notFound();
  }

  const baseUrl = "https://jenoratech.com.ng";
  const shareUrl = `${baseUrl}/insights/${post.id}`;
  const shareText = encodeURIComponent(`Check out this insight from Jenora Tech: ${post.title}`);

  const shareButtonStyle: React.CSSProperties = {
    padding: "10px 20px",
    fontSize: "0.85rem",
    textDecoration: "none",
    borderRadius: "6px",
    border: "1px solid #e2e8f0",
    color: "#1a202c",
    backgroundColor: "#ffffff",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "100px",
    transition: "all 0.3s ease",
  };

  return (
    <AnimatedSection variants={containerVariants}>
      {/* Article Header */}
      <AnimatedSection variants={fadeIn}>
        <header className="section-padding" style={{ background: "var(--accent, #f8fafc)", borderBottom: "1px solid #e2e8f0" }}>
          <div className="container" style={{ maxWidth: "800px" }}>
            <Link 
              href="/insights" 
              style={{ 
                color: "var(--secondary, #2563eb)", 
                textDecoration: "none", 
                fontSize: "0.9rem", 
                fontWeight: "600",
                display: "inline-block",
                marginBottom: "1rem"
              }}
            >
              ← Back to Insights
            </Link>
            
            <div style={{ marginTop: "2rem" }}>
              <span style={{ 
                color: "var(--secondary, #2563eb)", 
                fontWeight: "bold", 
                textTransform: "uppercase", 
                fontSize: "0.8rem", 
                letterSpacing: "0.05em",
                display: "inline-block"
              }}>
                {post.category || "General"}
              </span>
              
              <h1 style={{ 
                fontSize: "clamp(2rem, 5vw, 3rem)", 
                margin: "0.5rem 0 1.5rem", 
                lineHeight: "1.2" 
              }}>
                {post.title}
              </h1>
              
              <div style={{ 
                display: "flex", 
                gap: "1.5rem", 
                color: "var(--text-muted, #64748b)", 
                fontSize: "0.9rem",
                flexWrap: "wrap"
              }}>
                <span>By Jenora Insights Team</span>
                <span>•</span>
                <span>
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </span>
                <span>•</span>
                <span>{post.read_time || "5 min read"}</span>
              </div>
            </div>
          </div>
        </header>
      </AnimatedSection>

      {/* Article Content */}
      <AnimatedSection variants={containerVariants}>
        <section className="section-padding">
          <div className="container" style={{ maxWidth: "800px" }}>
            <article className="prose-content">
              <ReactMarkdown>{post.content}</ReactMarkdown>
            </article>
            
            {/* Share Section */}
            <div style={{ 
              marginTop: "4rem", 
              paddingTop: "2rem", 
              borderTop: "1px solid #e2e8f0" 
            }}>
              <h4 style={{ 
                marginBottom: "1.5rem", 
                fontSize: "1.1rem", 
                fontWeight: "700" 
              }}>
                Share this insight
              </h4>
              
              <div style={{ 
                display: "flex", 
                gap: "0.75rem", 
                flexWrap: "wrap" 
              }}>
                {[
                  { 
                    name: "LinkedIn", 
                    url: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}` 
                  },
                  { 
                    name: "X (Twitter)", 
                    url: `https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareText}` 
                  },
                  { 
                    name: "Facebook", 
                    url: `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` 
                  },
                  { 
                    name: "WhatsApp", 
                    url: `https://wa.me/?text=${shareText}%20${shareUrl}` 
                  }
                ].map((platform) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={shareButtonStyle}
                  >
                    {platform.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection variants={fadeIn}>
        <CTA 
          variant="brand"
          title="Ready to automate your operations?"
          description="Our experts can help you implement the strategies discussed in this article."
          buttons={[
            { text: "Book a Strategy Session", link: "/contact", variant: "primary" },
            { text: "Explore JenoraFlow", link: "/products", variant: "outline" }
          ]}
        />
      </AnimatedSection>
    </AnimatedSection>
  );
}