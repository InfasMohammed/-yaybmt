import type { ContentPage } from "./types";
import { sourcePages } from "./source-pages";
const source = (path: string) => sourcePages.find((p) => p.path === path)!;
export const pages: ContentPage[] = [
  {
    path: "/about-us/",
    title: "About YAYBMT",
    description:
      source("/about-us/").seo.description ||
      "Yusuf Al Yousfi Building Materials Trading LLC in Deira, Dubai.",
    paragraphs: [
      "Yusuf Al Yousfi Building Materials Trading LLC supplies building materials, sanitary fittings and marine hardware in Deira, Dubai.",
      "Share your product names, model references and project requirements with our team. Contact us to confirm technical specifications, pricing and availability.",
    ],
    source: "legacy/preview/index.html; client-confirmed contacts",
    kind: "company",
    seo: source("/about-us/").seo,
  },
  {
    path: "/contact-us/",
    title: "Contact YAYBMT",
    description:
      source("/contact-us/").seo.description ||
      "Contact YAYBMT in Deira, Dubai.",
    paragraphs: [
      "Share the products, model numbers, quantities and specifications you need. Our team can discuss your enquiry directly.",
    ],
    source: "client-confirmed contacts",
    kind: "contact",
    seo: source("/contact-us/").seo,
  },
  ...sourcePages
    .filter((p) => p.retired)
    .map((p) => ({
      path: p.path,
      title: p.title,
      description:
        p.title +
        " has been retired. YAYBMT is a catalogue and enquiry website. Contact our team about product requirements.",
      paragraphs: [
        "YAYBMT now handles product enquiries directly. Online checkout, shopping carts and customer accounts are no longer used.",
        "Browse the catalogue, then contact our team by email or WhatsApp.",
      ],
      source: p.source,
      kind: "retired" as const,
    })),
];
