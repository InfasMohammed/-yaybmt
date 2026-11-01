import { contacts } from "../data/contacts";
import { contactPage } from "../data/contact-page";
import { whatsapp } from "../lib/site";
import ContactEnquiry from "./ContactEnquiry";

export default function ContactSections() {
  return (
    <>
      <div className="contact-details-grid">
        <section>
          <h2>Our Location</h2>
          <address>{contactPage.address}</address>
          <a className="text-link" href={contacts.maps}>
            View on Google Maps
          </a>
        </section>
        <section>
          <h2>Opening Hours</h2>
          {contactPage.hours.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </section>
        <section>
          <h2>Email Us</h2>
          <a href={"mailto:" + contacts.sales}>{contacts.sales}</a>
          <a href={"mailto:" + contacts.info}>{contacts.info}</a>
        </section>
        <section>
          <h2>Call Us</h2>
          <a href={contacts.telephoneHref}>{contacts.telephone}</a>
          <a href={whatsapp()}>WhatsApp {contacts.whatsapp}</a>
        </section>
      </div>
      <div className="contact-enquiry-row">
        <section
          className="contact-map"
          aria-label="Our location on Google Maps"
        >
          <iframe
            src={contactPage.mapEmbed}
            title="Yusuf Al Yousfi Building Materials Trading LLC location in Deira, Dubai"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
          <p>
            <a className="text-link" href={contacts.maps}>
              Open directions in Google Maps
            </a>
          </p>
        </section>
        <ContactEnquiry />
      </div>
    </>
  );
}
