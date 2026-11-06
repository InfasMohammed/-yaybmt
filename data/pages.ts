import { contactPage } from "./contact-page";
import type { ContentPage } from "./types";
import { sourcePages } from "./source-pages";
const source = (path: string) => sourcePages.find((p) => p.path === path)!;
export const pages: ContentPage[] = [
  {
    path: "/about-us/",
    title: "About Us",
    description:
      source("/about-us/").seo.description ||
      "Yusuf Al Yousfi Building Materials Trading LLC in Deira, Dubai.",
    paragraphs: [
      "Most trusted marine equipment suppliers in UAE and building materials providers. We specialize in delivering a comprehensive range of high-quality products, including marine locks, sanitary ware, ship chandlery and deck hardware, oilfield equipment, building materials, general hardware, plumbing and sanitary accessories, tools, and fasteners to meet the diverse needs of our clients.",
      "Renowned for our competitive pricing, premium quality, and reliable service, we are known for offering top-quality marine supply services that have earned the confidence of businesses across the marine, engineering, and oilfield sectors. Whether you need bulk orders or urgent single-item supplies, our experienced team ensures accurate, timely, and hassle-free delivery every time.",
      "As one of the top-rated building materials trading companies in UAE, YAYBMT is committed to delivering excellence and building long-term partnerships through outstanding customer support and consistent product availability.",
      "Looking for dependable marine & building materials suppliers in UAE? Contact YAYBMT today to request a quick quote and experience the difference of working with a trusted industry leader.",
    ],
    source:
      "Original public WordPress About Us page: https://yaybmt.com/about-us/",
    kind: "company",
    seo: source("/about-us/").seo,
  },
  {
    path: "/contact-us/",
    title: "Contact YAYBMT",
    description:
      source("/contact-us/").seo.description ||
      "Contact YAYBMT in Deira, Dubai.",
    paragraphs: [contactPage.introHeading, ...contactPage.paragraphs],
    source:
      "Original public WordPress Contact Us page; client-confirmed phone, WhatsApp and emails",
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
