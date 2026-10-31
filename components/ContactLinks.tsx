import { contacts } from "../data/contacts";
import { whatsapp } from "../lib/site";
export default function ContactLinks() {
  return (
    <div className="contact-links">
      <a href={"mailto:" + contacts.sales}>{contacts.sales}</a>
      <a href={"mailto:" + contacts.info}>{contacts.info}</a>
      <a href={contacts.telephoneHref}>{contacts.telephone}</a>
      <a href={whatsapp()}>WhatsApp {contacts.whatsapp}</a>
      <a href={contacts.maps}>{contacts.location} · View location</a>
    </div>
  );
}
