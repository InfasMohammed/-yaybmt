"use client";

import { useState } from "react";
import "../app/contact-form.css";
import { contactWhatsApp } from "../lib/site";

export default function ContactEnquiry() {
  const [draft, setDraft] = useState("");
  return (
    <section
      className="contact-enquiry contact-panel contact-form-modern"
      data-page-reveal
      aria-labelledby="enquiry-heading"
    >
      <div className="contact-panel-heading">
        <p className="eyebrow">CONTACT OUR TEAM</p>
        <h2 id="enquiry-heading">Send a message</h2>
        <p>Share your product or project requirements with our team.</p>
      </div>
      <div className="contact-form-dots" aria-hidden="true" />
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
          <img src="/images/icons/whatsapp.svg" width="19" height="19" alt="" />
          Continue on WhatsApp
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            aria-hidden="true"
          >
            <path d="M5 19 19 5M5 5h14v14" />
          </svg>
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
            <small>If WhatsApp did not open, use this link.</small>
          </p>
        )}
      </div>
    </section>
  );
}
