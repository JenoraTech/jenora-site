"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [category, setCategory] = useState("Automation");
  const [content, setContent] = useState("");
  const supabase = createClient();
  const router = useRouter();

  const savePost = async () => {
    const { error } = await supabase.from("posts").insert([
      { 
        title, 
        excerpt, 
        category, 
        content, 
        is_published: true, // Making it live immediately
        read_time: "5 min read" 
      },
    ]);

    if (error) {
      alert(error.message);
    } else {
      alert("Insight Published Successfully!");
      router.push("/insights");
    }
  };

  return (
    <main className="container section-padding">
      <h1 className="text-primary">New Business Insight</h1>
      <div className="grid" style={{ gap: "1.5rem", marginTop: "2rem" }}>
        <input 
          className="feature-card" 
          placeholder="Article Title" 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          className="feature-card" 
          placeholder="Brief Excerpt (Summary)" 
          onChange={(e) => setExcerpt(e.target.value)} 
        />
        <select className="feature-card" onChange={(e) => setCategory(e.target.value)}>
          <option>Automation</option>
          <option>Efficiency</option>
          <option>Strategy</option>
        </select>
        <textarea 
          className="feature-card" 
          placeholder="Write your article here..." 
          style={{ minHeight: "300px" }}
          onChange={(e) => setContent(e.target.value)} 
        />
        <button onClick={savePost} className="btn btn-primary">Publish to Jenora Tech</button>
      </div>
    </main>
  );
}