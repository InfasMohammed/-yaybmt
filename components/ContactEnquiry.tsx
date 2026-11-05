"use client";

import { useState } from "react";
import { contactWhatsApp } from "../lib/site";

export default function ContactEnquiry() {
  const [draft, setDraft] = useState("");
  return (
    <section className="contact-enquiry" aria-labelledby="enquiry-heading">
      <p className="eyebrow">CONTACT OUR TEAM</p>
      <h2 id="enquiry-heading">Send an enquiry</h2>
      <p>Share your product or project requirements with our team.</p>
      <form
        className="contact-enquiry-form"
        aria-describedby="enquiry-help"
        onChange={() => setDraft("")}
        onSubmit={(event) => {
          event.preventDefault();
          const fields = new FormData(event.currentTarget);
          const url = contactWhatsApp({
            name: String(fields.get("name") || ""),
            phone: String(fields.get("phone") || ""),
            message: String(fields.get("message") || ""),
          });
          setDraft(url);
          window.open(url, "_blank", "noopener,noreferrer");
        }}
      >
        <label htmlFor="contact-name">
          <span>
            Full name{" "}
            <span className="required-mark" aria-hidden="true">
              *
            </span>
          </span>
          <input
            id="contact-name"
            name="name"
            placeholder="Your full name"
            autoComplete="name"
            required
            maxLength={150}
          />
        </label>
        <label htmlFor="contact-phone">
          Phone number
          <input
            id="contact-phone"
            name="phone"
            placeholder="Phone number (optional)"
            type="tel"
            autoComplete="tel"
            maxLength={50}
          />
        </label>
        <label htmlFor="contact-message">
          <span>
            Message{" "}
            <span className="required-mark" aria-hidden="true">
              *
            </span>
          </span>
          <textarea
            id="contact-message"
            name="message"
            placeholder="Tell us the products, quantities or specifications you need…"
            rows={4}
            required
            maxLength={3000}
          />
        </label>
        <button className="button" type="submit">
          Continue on WhatsApp
        </button>
      </form>
      <p id="enquiry-help" className="enquiry-help">
        * Required fields. WhatsApp opens with your enquiry filled in. Review
        the message and press Send in WhatsApp.
      </p>
      <noscript>
        <style>{`.contact-enquiry-form{display:none}`}</style>
        <p>
          <a
            className="button"
            href={contactWhatsApp({
              name: "Your name",
              message:
                "Please enter your product or project requirements here.",
            })}
          >
            Enquire on WhatsApp
          </a>
        </p>
      </noscript>
      <div className={draft ? "enquiry-draft" : undefined} aria-live="polite">
        {draft && (
          <p>
            <a className="button" href={draft}>
              Open WhatsApp enquiry
            </a>
            <br />
            <small>
              If WhatsApp did not open, use this link.
            </small>
          </p>
        )}
      </div>
    </section>
  );
}
