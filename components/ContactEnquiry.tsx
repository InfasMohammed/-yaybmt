"use client";

import { useState } from "react";
import { contacts } from "../data/contacts";

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
          const body = `Name: ${fields.get("name")}\nPhone: ${fields.get("phone")}\nEmail: ${fields.get("email")}\n\n${fields.get("message")}`;
          setDraft(
            `mailto:${contacts.sales}?subject=${encodeURIComponent("Website enquiry")}&body=${encodeURIComponent(body)}`,
          );
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
        <label htmlFor="contact-email">
          <span>
            Email address{" "}
            <span className="required-mark" aria-hidden="true">
              *
            </span>
          </span>
          <input
            id="contact-email"
            name="email"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
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
          Prepare enquiry email
        </button>
      </form>
      <p id="enquiry-help" className="enquiry-help">
        * Required fields. This form prepares an email draft for you to send
        from your email application.
      </p>
      <noscript>
        <style>{`.contact-enquiry-form{display:none}`}</style>
        <p>
          Email us at <a href={"mailto:" + contacts.sales}>{contacts.sales}</a>{" "}
          with your name, contact details and message.
        </p>
      </noscript>
      <div className={draft ? "enquiry-draft" : undefined} aria-live="polite">
        {draft && (
          <p>
            <a className="button" href={draft}>
              Open email draft
            </a>
            <br />
            <small>
              Your message is not sent until you send it from your email
              application.
            </small>
          </p>
        )}
      </div>
    </section>
  );
}
