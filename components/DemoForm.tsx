"use client";
import { useState } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

export default function DemoForm() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      const res = await fetch("/api/demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error();

      const result = await res.json();
      setStatus("success");
      setMessage(result.message || "Request received! Our solution expert will reach out to schedule your walk-through.");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setMessage("We couldn't process your request. Please try again or call our support line.");
    }
  }

  return (
    <form className="demo-form" onSubmit={handleSubmit}>
      <div className="form-header">
        <h3>Schedule a Personalized Walk-through</h3>
        <p>See how JenoraFlow can transform your organizational workflows.</p>
      </div>

      <div className="form-grid">
        <div className="form-group">
          <label htmlFor="demo-name">Full Name</label>
          <input type="text" id="demo-name" name="name" required placeholder="e.g. Chidi Okechukwu" />
        </div>

        <div className="form-group">
          <label htmlFor="demo-email">Work Email</label>
          <input type="email" id="demo-email" name="email" required placeholder="name@company.com" />
        </div>

        <div className="form-group">
          <label htmlFor="demo-org">Organization</label>
          <input type="text" id="demo-org" name="organization" required />
        </div>

        <div className="form-group">
          <label htmlFor="demo-pos">Job Title / Position</label>
          <input type="text" id="demo-pos" name="position" placeholder="e.g. Operations Director" />
        </div>

        <div className="form-group">
          <label htmlFor="demo-phone">Phone Number</label>
          <input type="tel" id="demo-phone" name="phone" required placeholder="+234..." />
        </div>

        <div className="form-group">
          <label htmlFor="demo-size">Organization Size</label>
          <select id="demo-size" name="employees" className="form-select">
            <option value="">Select size...</option>
            <option value="1-10">1-10 employees</option>
            <option value="11-50">11-50 employees</option>
            <option value="51-200">51-200 employees</option>
            <option value="201-500">201-500 employees</option>
            <option value="500+">500+ employees</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="demo-msg">Specific Challenges or Requirements</label>
        <textarea 
          id="demo-msg" 
          name="message" 
          rows={4} 
          placeholder="Tell us about the processes you'd like to automate..."
        ></textarea>
      </div>

      <button 
        type="submit" 
        className="btn btn-primary btn-block" 
        disabled={status === "submitting"}
      >
        {status === "submitting" ? "Processing..." : "Confirm Demo Request"}
      </button>

      {message && (
        <div className={`form-feedback ${status}`} role="alert">
          {message}
        </div>
      )}
    </form>
  );
}