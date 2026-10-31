import type { Metadata } from "next";
export const production = process.env.YAYBMT_PRODUCTION === "true";
export const origin = "https://yaybmt.com";
export function metadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title: `${title} | YAYBMT`,
    description,
    alternates: { canonical: origin + path },
    robots: { index: production, follow: production },
  };
}
export const whatsapp = (name = "the catalogue") =>
  "https://wa.me/971567369803?text=" +
  encodeURIComponent(
    "Hello YAYBMT, I would like to enquire about " + name + ".",
  );
export const email = (name: string) =>
  "mailto:sales@yaybmt.com?subject=" +
  encodeURIComponent("Product enquiry: " + name);
