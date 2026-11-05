import type { Metadata } from "next";
import { contacts } from "../data/contacts";
export const production = process.env.YAYBMT_PRODUCTION === "true";
export const origin = "https://yaybmt.com";
export function metadata(
  title: string,
  description: string,
  path: string,
  indexable = true,
): Metadata {
  const fullTitle = /yaybmt/i.test(title) ? title : `${title} | YAYBMT`;
  return {
    title: fullTitle,
    description,
    alternates: { canonical: origin + path },
    robots: { index: production && indexable, follow: production },
    openGraph: {
      title: fullTitle,
      description,
      url: origin + path,
      type: "website",
      siteName: "YAYBMT",
    },
  };
}
export const whatsapp = (name = "the catalogue") =>
  "https://wa.me/" +
  contacts.whatsappNumber +
  "?text=" +
  encodeURIComponent(
    "Hello YAYBMT, I would like to enquire about " + name + ".",
  );
export function contactWhatsApp(fields: {
  name: string;
  phone?: string;
  message: string;
}) {
  const message = [
    "Hello YAYBMT team,",
    "",
    "I would like to enquire about your products/services.",
    "",
    "Name: " + fields.name.trim(),
    ...(fields.phone?.trim() ? ["Phone: " + fields.phone.trim()] : []),
    "",
    "Requirements:",
    fields.message.trim(),
    "",
    "Please assist me with product details and a quotation. Thank you.",
  ].join("\n");
  return (
    "https://wa.me/" +
    contacts.whatsappNumber +
    "?text=" +
    encodeURIComponent(message)
  );
}
