import Link from "next/link";

export default function NotFound() {
  return (
    <div className="error-container">
      <div className="container">
        <span className="error-code">404</span>
        <h1>Page Not Found</h1>
        <p>
          The page you are looking for might have been moved, deleted, 
          or perhaps never existed. Let's get you back on track.
        </p>
        <div className="error-actions">
          <Link href="/" className="btn btn-primary">
            Return Home
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}