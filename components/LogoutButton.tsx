"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Refresh and redirect to home to clear the admin session from the UI
    router.push("/");
    router.refresh();
  };

  return (
    <button 
      onClick={handleLogout} 
      className="btn-outline" 
      style={{ padding: "8px 16px", cursor: "pointer" }}
    >
      Sign Out
    </button>
  );
}