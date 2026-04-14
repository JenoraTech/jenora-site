import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LogoutButton from "@/components/LogoutButton";

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // 1. Verify Authentication (The Bouncer)
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // If there's an error or no user, redirect to login
  if (authError || !user) {
    redirect("/login");
  }

  // 2. Fetch all posts with error handling
  const { data: posts, error: fetchError } = await supabase
    .from("posts")
    .select("id, title, is_published, created_at, category")
    .order("created_at", { ascending: false });

  if (fetchError) {
    console.error("Database fetch error:", fetchError.message);
  }

  return (
    <main className="container section-padding">
      {/* Header Area */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 className="text-primary" style={{ margin: 0 }}>Admin Dashboard</h1>
          <p style={{ color: "var(--text-muted)", margin: "0.5rem 0 0" }}>
            Signed in as: <strong>{user.email}</strong>
          </p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <LogoutButton />
          <Link href="/admin/new" className="btn btn-primary">
            + New Insight
          </Link>
        </div>
      </div>

      {/* Summary Cards */}
      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", 
        gap: "1.5rem", 
        marginBottom: "3rem" 
      }}>
        <div className="feature-card" style={{ padding: "1.5rem", borderLeft: "4px solid var(--primary)" }}>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Total Insights</p>
          <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 0" }}>{posts?.length || 0}</h3>
        </div>
        <div className="feature-card" style={{ padding: "1.5rem", borderLeft: "4px solid #059669" }}>
          <p style={{ margin: 0, color: "var(--text-muted)", fontSize: "0.9rem", textTransform: "uppercase" }}>Live on Site</p>
          <h3 style={{ fontSize: "2.5rem", margin: "0.5rem 0 0", color: "#059669" }}>
            {posts?.filter(p => p.is_published).length || 0}
          </h3>
        </div>
      </div>

      {/* Posts Table */}
      <section className="feature-card" style={{ overflowX: "auto", padding: "0" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: "700px" }}>
          <thead>
            <tr style={{ textAlign: "left", background: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
              <th style={{ padding: "1.25rem 1rem" }}>Article Title</th>
              <th style={{ padding: "1.25rem 1rem" }}>Category</th>
              <th style={{ padding: "1.25rem 1rem" }}>Status</th>
              <th style={{ padding: "1.25rem 1rem" }}>Date Created</th>
              <th style={{ padding: "1.25rem 1rem", textAlign: "right" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts?.map((post) => (
              <tr key={post.id} style={{ borderBottom: "1px solid #f1f5f9" }} className="table-row-hover">
                <td style={{ padding: "1rem", fontWeight: "600", color: "#1e293b" }}>{post.title}</td>
                <td style={{ padding: "1rem" }}>
                   <span style={{ fontSize: "0.75rem", background: "#f1f5f9", padding: "4px 10px", borderRadius: "4px", color: "#475569", fontWeight: "600" }}>
                    {post.category || "General"}
                   </span>
                </td>
                <td style={{ padding: "1rem" }}>
                  {post.is_published ? (
                    <span style={{ color: "#059669", background: "#d1fae5", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" }}>Live</span>
                  ) : (
                    <span style={{ color: "#d97706", background: "#fef3c7", padding: "4px 12px", borderRadius: "20px", fontSize: "0.75rem", fontWeight: "bold" }}>Draft</span>
                  )}
                </td>
                <td style={{ padding: "1rem", color: "#64748b", fontSize: "0.9rem" }}>
                  {new Date(post.created_at).toLocaleDateString('en-NG', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  })}
                </td>
                <td style={{ padding: "1rem", textAlign: "right" }}>
                  <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                    <Link 
                        href={`/insights/${post.id}`} 
                        target="_blank"
                        style={{ fontSize: "0.85rem", color: "var(--secondary)", textDecoration: "none", fontWeight: "600" }}
                    >
                      View
                    </Link>
                    <Link 
                        href={`/admin/edit/${post.id}`} 
                        style={{ fontSize: "0.85rem", color: "var(--primary)", textDecoration: "none", fontWeight: "600" }}
                    >
                      Edit
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        {(!posts || posts.length === 0) && (
          <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
            <p style={{ color: "#64748b", marginBottom: "1rem" }}>Your insights library is currently empty.</p>
            <Link href="/admin/new" className="btn btn-outline">Create your first post</Link>
          </div>
        )}
      </section>
    </main>
  );
}