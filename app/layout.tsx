import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import NavBar from "../components/NavBar";
import React from "react";
import Link from "next/link";
import { MotionConfig } from "framer-motion";

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

const footerLinkStyle = {
  color: "#64748b",
  textDecoration: "none",
  fontSize: "0.95rem",
  transition: "color 0.2s ease, transform 0.2s ease",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" className={`${inter.variable} ${montserrat.variable} scroll-smooth`}>
      <head>
        {/* Add this if you want to respect user's motion preferences */}
        <script dangerouslySetInnerHTML={{
          __html: `
            try {
              const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
              document.documentElement.classList.toggle('reduce-motion', motionQuery.matches);
              motionQuery.addEventListener('change', () => {
                document.documentElement.classList.toggle('reduce-motion', motionQuery.matches);
              });
            } catch (e) {}
          `
        }} />
      </head>
      <body className="site-wrapper" style={{ 
        display: "flex", 
        flexDirection: "column", 
        minHeight: "100vh",
        background: "radial-gradient(circle at 10% 20%, rgba(10, 42, 102, 0.03) 0%, rgba(255, 255, 255, 0) 30%)"
      }}>
        <MotionConfig reducedMotion="user">
          <a href="#main-content" className="skip-link">
            Skip to main content
          </a>

          <NavBar />

          <main 
            id="main-content" 
            className="main-content" 
            style={{ 
              flex: 1,
              background: "radial-gradient(circle at 90% 80%, rgba(10, 42, 102, 0.03) 0%, rgba(255, 255, 255, 0) 30%)"
            }}
          >
            {children}
          </main>

          <footer 
            className="footer" 
            style={{ 
              borderTop: "1px solid #e2e8f0", 
              backgroundColor: "#fff", 
              padding: "4rem 0 2rem",
              position: "relative",
              overflow: "hidden"
            }}
          >
            {/* Subtle animated background element */}
            <div 
              aria-hidden="true"
              style={{
                position: "absolute",
                top: "-100px",
                right: "-50px",
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(10, 42, 102, 0.08) 0%, rgba(10, 42, 102, 0) 70%)",
                animation: "subtlePulse 8s ease-in-out infinite alternate",
              }}
            />
            
            <div className="container">
              {/* Top Grid */}
              <div style={{ 
                display: "grid", 
                gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", 
                gap: "3rem",
                marginBottom: "3rem",
                position: "relative",
                zIndex: 1
              }}>
                
                <div className="footer-brand">
                  <h3 style={{ 
                    marginBottom: "1rem", 
                    fontWeight: "800",
                    position: "relative",
                    display: "inline-block"
                  }}>
                    Jenora Tech Ltd
                    <span style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "40px",
                      height: "3px",
                      background: "linear-gradient(90deg, #0A2A66, rgba(10, 42, 102, 0.2))",
                      borderRadius: "3px",
                      transition: "width 0.3s ease"
                    }} />
                  </h3>
                  <p style={{ 
                    color: "#64748b", 
                    lineHeight: "1.6", 
                    fontSize: "0.95rem",
                    transition: "transform 0.3s ease",
                  }}>
                    Optimizing business systems for the next generation of African enterprises.
                  </p>
                </div>

                <div>
                  <h4 style={{ 
                    fontSize: "0.85rem", 
                    textTransform: "uppercase", 
                    letterSpacing: "1px", 
                    marginBottom: "1.25rem", 
                    color: "#1e293b",
                    position: "relative",
                    display: "inline-block"
                  }}>
                    Quick Links
                    <span style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "1px",
                      background: "linear-gradient(90deg, rgba(10, 42, 102, 0.3), transparent)",
                    }} />
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <Link 
                      href="/solutions" 
                      style={footerLinkStyle}
                      className="hover:scale-[1.02] hover:text-[#0A2A66]"
                    >
                      Solutions
                    </Link>
                    <Link 
                      href="/products" 
                      style={footerLinkStyle}
                      className="hover:scale-[1.02] hover:text-[#0A2A66]"
                    >
                      Products
                    </Link>
                    <Link 
                      href="/insights" 
                      style={footerLinkStyle}
                      className="hover:scale-[1.02] hover:text-[#0A2A66]"
                    >
                      Insights
                    </Link>
                  </div>
                </div>
                
                <div className="footer-contact">
                  <h4 style={{ 
                    fontSize: "0.85rem", 
                    textTransform: "uppercase", 
                    letterSpacing: "1px", 
                    marginBottom: "1.25rem", 
                    color: "#1e293b",
                    position: "relative",
                    display: "inline-block"
                  }}>
                    Connect
                    <span style={{
                      position: "absolute",
                      bottom: "-5px",
                      left: 0,
                      width: "100%",
                      height: "1px",
                      background: "linear-gradient(90deg, rgba(10, 42, 102, 0.3), transparent)",
                    }} />
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <a 
                      href="mailto:info@jenoratech.com.ng" 
                      style={footerLinkStyle}
                      className="hover:scale-[1.02] hover:text-[#0A2A66]"
                    >
                      info@jenoratech.com.ng
                    </a>
                    <a 
                      href="tel:+2348037706206" 
                      style={footerLinkStyle}
                      className="hover:scale-[1.02] hover:text-[#0A2A66]"
                    >
                      +234 803 770 6206
                    </a>
                    <p style={{ 
                      color: "#64748b", 
                      fontSize: "0.9rem", 
                      marginTop: "0.5rem",
                      transition: "transform 0.3s ease",
                    }}>
                      Minna, Niger State
                    </p>
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
                gap: "1rem",
                position: "relative",
                zIndex: 1
              }}>
                <p style={{ 
                  color: "#94a3b8", 
                  fontSize: "0.85rem", 
                  margin: 0,
                  transition: "transform 0.3s ease",
                }}>
                  © {new Date().getFullYear()} Jenora Tech Ltd. All rights reserved.
                </p>
                
                <Link 
                  href="/admin" 
                  className="staff-portal-link hover:text-[#0A2A66]"
                  style={{ 
                    color: "#cbd5e1",
                    textDecoration: "none", 
                    fontSize: "0.8rem",
                    transition: "color 0.2s, transform 0.2s"
                  }}
                >
                  Staff Portal
                </Link>
              </div>
            </div>
          </footer>
        </MotionConfig>
      </body>
    </html>
  );
}