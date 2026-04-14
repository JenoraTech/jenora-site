import React from "react";
import Image from "next/image"; // Use Next.js optimized images

interface FeatureItem {
  heading: string;
  text: string;
  icon?: string;
  alt?: string;
}

interface FeatureGridProps {
  title: string;
  items: FeatureItem[];
  // Professional addition: Allow passing a custom ID to avoid conflicts
  id?: string; 
}

export default function FeatureGrid({ title, items, id = "features" }: FeatureGridProps) {
  return (
    <section className="feature-grid" aria-labelledby={`${id}-title`}>
      <div className="container">
        <h2 id={`${id}-title`} className="section-title">
          {title}
        </h2>
        
        <div className="grid">
          {items.map((item, index) => {
            // Professional Tip: Avoid 'index' as a key if possible. 
            // Using heading as a slug is safer for static lists.
            const itemKey = item.heading.toLowerCase().replace(/\s+/g, '-');
            
            return (
              <article key={itemKey} className="feature-card">
                {item.icon && (
                  <div className="feature-icon-wrapper">
                    <Image
                      src={item.icon}
                      alt={item.alt || ""}
                      width={48} // Define standard sizes
                      height={48}
                      className="feature-icon"
                    />
                  </div>
                )}
                <div className="feature-content">
                  <h3>{item.heading}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}