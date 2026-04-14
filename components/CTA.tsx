import Link from "next/link";

interface CTAButton {
  text: string;
  link: string;
  variant?: "primary" | "outline"; 
}

interface CTAProps {
  title: string;
  description: string;
  buttons: CTAButton[];
  variant?: "light" | "dark" | "brand"; 
}

/**
 * Call-to-Action Component
 * Designed to be used at the bottom of pages to drive conversions.
 */
export default function CTA({ title, description, buttons, variant = "brand" }: CTAProps) {
  // Map the internal variant name to the CSS class suffix
  const sectionClass = variant === "dark" || variant === "brand" ? "cta-brand" : "cta-light";

  return (
    <section className={`cta-section ${sectionClass}`} aria-labelledby="cta-title">
      <div className="container">
        <div className="cta-content">
          <h2 id="cta-title" className="section-title">
            {title}
          </h2>
          <p className="cta-description">
            {description}
          </p>
          
          <div className="cta-buttons">
            {buttons.map((btn, index) => (
              <Link
                key={`${btn.link}-${index}`}
                href={btn.link}
                className={`btn ${
                  btn.variant === "outline" ? "btn-outline" : "btn-primary"
                }`}
              >
                {btn.text}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}