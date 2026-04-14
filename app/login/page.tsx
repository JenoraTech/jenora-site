"use client";
import { useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      setLoading(false);
    } else {
      router.push("/admin"); // Redirect to the dashboard
    }
  };

  return (
    <main className="container section-padding" style={{ maxWidth: "400px" }}>
      <h1 className="text-primary">Admin Login</h1>
      <form onSubmit={handleLogin} className="grid" style={{ gap: "1rem", marginTop: "2rem" }}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="feature-card" 
          required 
        />
        <input 
          type="password" 
          placeholder="Password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          className="feature-card" 
          required 
        />
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Verifying..." : "Login"}
        </button>
      </form>
    </main>
  );
}