"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";

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

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
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

  const menuVariants: Variants = {
    open: {
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
    closed: {
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  };

  const linkVariants: Variants = {
    open: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.1,
        y: { stiffness: 1000, velocity: -100 },
      },
    }),
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <header className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="container">
        {/* Branding Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="brand-logo"
            style={{
              display: "flex !important",
              alignItems: "center !important",
              textDecoration: "none",
              width: "auto !important",
              padding: "0 !important",
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
                display: "block",
              }}
            />
            <motion.span
              style={{
                color: "#ffffff",
                fontSize: "1.25rem",
                fontWeight: "700",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
                marginLeft: "-1px",
                paddingLeft: "0",
                display: "inline-block",
              }}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Jenora Tech LTD<span style={{ color: "var(--secondary)" }}>.</span>
            </motion.span>
          </Link>
        </motion.div>

        {/* Desktop Navigation - Added this new section */}
        <div className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              style={{
                position: "relative",
                display: "inline-block",
                padding: "0.5rem 0",
              }}
            >
              {link.name}
              {pathname === link.href && (
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "var(--secondary)",
                  }}
                  layoutId="desktop-underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          ))}

          {isAdmin && (
            <Link
              href="/admin"
              className={pathname.startsWith("/admin") ? "active" : ""}
              style={{
                color: "var(--secondary)",
                fontWeight: "bold",
                position: "relative",
                display: "inline-block",
                padding: "0.5rem 0",
              }}
            >
              Admin
              {pathname.startsWith("/admin") && (
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "var(--secondary)",
                  }}
                  layoutId="desktop-underline"
                  transition={{ duration: 0.3 }}
                />
              )}
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
                fontSize: "inherit",
                padding: "0.5rem 0",
              }}
            >
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className={pathname === "/login" ? "active" : ""}
              style={{
                position: "relative",
                display: "inline-block",
                padding: "0.5rem 0",
              }}
            >
              Login
              {pathname === "/login" && (
                <motion.span
                  style={{
                    position: "absolute",
                    bottom: "0",
                    left: 0,
                    width: "100%",
                    height: "2px",
                    background: "var(--secondary)",
                  }}
                  layoutId="desktop-underline"
                  transition={{ duration: 0.3 }}
                />
              )}
            </Link>
          )}

          <Link
            href="/demo"
            className="btn btn-primary"
            style={{
              position: "relative",
              overflow: "hidden",
              marginLeft: "1rem",
            }}
          >
            Request Consultation
            <motion.span
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "300%",
                height: "300%",
                background: "radial-gradient(circle, rgba(255,255,255,0.3), rgba(255,255,255,0))",
                transform: "translate(-50%, -50%) scale(0)",
              }}
              whileHover={{
                transform: "translate(-50%, -50%) scale(1)",
                transition: { duration: 0.6 },
              }}
            />
          </Link>
        </div>

        {/* Mobile Navigation - Completely unchanged from original */}
        <AnimatePresence>
          <motion.nav
            className={`nav-menu ${isOpen ? "open" : ""}`}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
            variants={menuVariants}
          >
            {navLinks.map((link, i) => (
              <motion.div
                key={link.href}
                custom={i}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href={link.href}
                  className={pathname === link.href ? "active" : ""}
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  {link.name}
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      width: pathname === link.href ? "100%" : "0%",
                      height: "2px",
                      background: "var(--secondary)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}

            {isAdmin && (
              <motion.div
                custom={navLinks.length}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/admin"
                  className={pathname.startsWith("/admin") ? "active" : ""}
                  style={{
                    color: "var(--secondary)",
                    fontWeight: "bold",
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  Admin
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      width: pathname.startsWith("/admin") ? "100%" : "0%",
                      height: "2px",
                      background: "var(--secondary)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            )}

            {isAdmin ? (
              <motion.button
                onClick={handleLogout}
                className="nav-link-btn"
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#ef4444",
                  cursor: "pointer",
                  textAlign: "left",
                  fontWeight: "600",
                  fontSize: "inherit",
                  padding: 0,
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Logout
              </motion.button>
            ) : (
              <motion.div
                custom={navLinks.length + 1}
                variants={linkVariants}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  href="/login"
                  className={pathname === "/login" ? "active" : ""}
                  style={{
                    position: "relative",
                    display: "inline-block",
                  }}
                >
                  Login
                  <motion.span
                    style={{
                      position: "absolute",
                      bottom: "-2px",
                      left: 0,
                      width: pathname === "/login" ? "100%" : "0%",
                      height: "2px",
                      background: "var(--secondary)",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            )}

            <motion.div
              custom={navLinks.length + 2}
              variants={linkVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href="/demo"
                className="btn btn-primary"
                style={{
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                Request Consultation
                <motion.span
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    width: "300%",
                    height: "300%",
                    background: "radial-gradient(circle, rgba(255,255,255,0.3), rgba(255,255,255,0))",
                    transform: "translate(-50%, -50%) scale(0)",
                  }}
                  whileHover={{
                    transform: "translate(-50%, -50%) scale(1)",
                    transition: { duration: 0.6 },
                  }}
                />
              </Link>
            </motion.div>
          </motion.nav>
        </AnimatePresence>

        {/* Hamburger Menu Button - Unchanged */}
        <motion.button
          className="menu-toggle"
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          whileTap={{ scale: 0.9 }}
        >
          <div className={`hamburger ${isOpen ? "is-active" : ""}`}>
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>
      </div>
    </header>
  );
}