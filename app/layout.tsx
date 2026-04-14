import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import NavBar from "../components/NavBar";
import React from "react";
import Link from "next/link";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: "swap" 
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0A2A66",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: "Jenora Tech Ltd | Enterprise Software Solutions",
    template: "%s | Jenora Tech Ltd",
  },
  description:
    "Empowering African organizations with world-class Business Systems Optimization and Enterprise Software solutions.",
  metadataBase: new URL("https://jenoratech.com.ng"),
  // Added Icons Configuration
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Jenora Tech Ltd",
    description: "Enterprise Software & Business Systems Optimization for Africa",
    url: "https://jenoratech.com.ng",
    siteName: "Jenora Tech Ltd",
    locale: "en_NG",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <body className="site-wrapper" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <NavBar />

        <main id="main-content" className="main-content" style={{ flex: 1 }}>
          {children}
        </main>

        <footer className="footer" style={{ borderTop: "1px solid #e2e8f0", backgroundColor: "#fff", padding: "4rem 0 2rem" }}>
          <div className="container">
            {/* Top Grid */}
            <div style={{ 
              display: "grid", 
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
              gap: "3rem",
              marginBottom: "3rem"
            }}>
              
              <div className="footer-brand">
                <h3 style={{ marginBottom: "1rem", fontWeight: "800" }}>Jenora Tech Ltd</h3>
                <p style={{ color: "#64748b", lineHeight: "1.6", fontSize: "0.95rem" }}>
                  Optimizing business systems for the next generation of African enterprises.
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.25rem", color: "#1e293b" }}>Quick Links</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <Link href="/solutions" style={footerLinkStyle}>Solutions</Link>
                  <Link href="/products" style={footerLinkStyle}>Products</Link>
                  <Link href="/insights" style={footerLinkStyle}>Insights</Link>
                </div>
              </div>
              
              <div className="footer-contact">
                <h4 style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1.25rem", color: "#1e293b" }}>Connect</h4>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  <a href="mailto:info@jenoratech.com.ng" style={footerLinkStyle}>info@jenoratech.com.ng</a>
                  <a href="tel:+2348037706206" style={footerLinkStyle}>+234 803 770 6206</a>
                  <p style={{ color: "#64748b", fontSize: "0.9rem", marginTop: "0.5rem" }}>Minna, Niger State</p>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ 
              borderTop: "1px solid #f1f5f9", 
              paddingTop: "2rem", 
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem"
            }}>
              <p style={{ color: "#94a3b8", fontSize: "0.85rem", margin: 0 }}>
                © {new Date().getFullYear()} Jenora Tech Ltd. All rights reserved.
              </p>
              
              <Link 
                href="/admin" 
                className="staff-portal-link"
                style={{ 
                  color: "#cbd5e1",
                  textDecoration: "none", 
                  fontSize: "0.8rem",
                  transition: "color 0.2s"
                }}
              >
                Staff Portal
              </Link>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

const footerLinkStyle = {
  color: "#64748b",
  textDecoration: "none",
  fontSize: "0.95rem",
};