"use client";

import { useState } from "react";
import { contacts } from "../data/contacts";

export default function ContactEnquiry() {
  const [draft, setDraft] = useState("");
  return (
    <section className="contact-enquiry" aria-labelledby="enquiry-heading">
      <h2 id="enquiry-heading">Get In Touch</h2>
      <p>
        Tell us what you need. Prepare an email draft, then send it from your
        email application.
      </p>
      <form
        className="contact-enquiry-form"
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
          Full name
          <input
            id="contact-name"
            name="name"
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
            type="tel"
            autoComplete="tel"
            maxLength={50}
          />
        </label>
        <label htmlFor="contact-email">
          Email address
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={254}
          />
        </label>
        <label htmlFor="contact-message">
          Message
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            maxLength={3000}
          />
        </label>
        <button className="button" type="submit">
          Prepare email
        </button>
      </form>
      <noscript>
        <style>{`.contact-enquiry-form{display:none}`}</style>
        <p>
          Email us at <a href={"mailto:" + contacts.sales}>{contacts.sales}</a>{" "}
          with your name, contact details and message.
        </p>
      </noscript>
      <div aria-live="polite">
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
