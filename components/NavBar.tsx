"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

interface NavLink {
  name: string;
  href: string;
}

export default function NavBar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  // 1. Check if user is logged in
  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAdmin(!!session);
    };

    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAdmin(!!session);
    });

    return () => subscription.unsubscribe();
  }, [supabase.auth]);

  // 2. Logout Function
  const handleLogout = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsOpen(false);
    router.push("/");
    router.refresh();
  };

  // Scroll logic
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  }, [pathname]);

  const toggleMenu = () => {
    const nextState = !isOpen;
    setIsOpen(nextState);
    document.body.style.overflow = nextState ? "hidden" : "unset";
  };

  const navLinks: NavLink[] = [
    { name: "About", href: "/about" },
    { name: "Solutions", href: "/solutions" },
    { name: "Products", href: "/products" },
    { name: "Industries", href: "/industries" },
    { name: "Insights", href: "/insights" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        
        {/* BRANDING SECTION 
            Note: We changed 'logo' to 'brand-logo' to escape global CSS constraints
        */}
        <Link 
  href="/" 
  className="brand-logo" 
  style={{ 
    display: "flex !important", 
    alignItems: "center !important", 
    textDecoration: "none",
    width: "auto !important",
    padding: "0 !important"
  }}
>
  <Image 
    src="/logo.png" 
    alt="Jenora Tech Logo" 
    width={38} 
    height={38} 
    priority
    style={{ 
      objectFit: "contain",
      flexShrink: 0,
      display: "block"
    }}
  />
  <span style={{ 
    color: "#ffffff", 
    fontSize: "1.25rem",
    fontWeight: "700",
    letterSpacing: "-0.2px",
    whiteSpace: "nowrap",
    // NEGATIVE MARGIN: This pulls the text left, closer to the logo
    marginLeft: "-4px", 
    paddingLeft: "0",
    display: "inline-block"
  }}>
    enora Tech LTD<span style={{ color: "var(--primary)" }}>.</span>
  </span>
</Link>
        <nav className={`nav-menu ${isOpen ? "open" : ""}`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
            >
              {link.name}
            </Link>
          ))}

          {isAdmin && (
            <Link 
              href="/admin" 
              className={pathname.startsWith("/admin") ? "active" : ""}
              style={{ color: "var(--secondary)", fontWeight: "bold" }}
            >
              Admin
            </Link>
          )}

          {isAdmin ? (
            <button 
              onClick={handleLogout}
              className="nav-link-btn" 
              style={{ 
                background: "transparent", 
                border: "none", 
                color: "#ef4444", 
                cursor: "pointer", 
                textAlign: "left",
                fontWeight: "600",
                fontSize: "inherit"
              }}
            >
              Logout
            </button>
          ) : (
            <Link href="/login" className={pathname === "/login" ? "active" : ""}>
              Login
            </Link>
          )}

          <Link href="/demo" className="btn btn-primary">
            Request Consultation
          </Link>
        </nav>

        <button 
          className="menu-toggle" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <div className={`hamburger ${isOpen ? "is-active" : ""}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </button>
      </div>
    </header>
  );
}