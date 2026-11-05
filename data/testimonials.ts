export type Testimonial = {
  id: string;
  name: string;
  context: string;
  quote: string;
  status: "sample" | "approved";
};

// Design placeholders only. Replace with client-approved customer feedback.
export const testimonials: Testimonial[] = [
  {
    id: "sample-marine",
    name: "Sample customer 01",
    context: "Marine · example feedback",
    quote:
      "Helpful guidance made it easier to select the right materials for our project.",
    status: "sample",
  },
  {
    id: "sample-engineering",
    name: "Sample customer 02",
    context: "Engineering · example feedback",
    quote:
      "The product information was clear, and the team answered our questions promptly.",
    status: "sample",
  },
  {
    id: "sample-construction",
    name: "Sample customer 03",
    context: "Construction · example feedback",
    quote:
      "A straightforward enquiry process helped us discuss the items our project needed.",
    status: "sample",
  },
];

export function visibleTestimonials(production: boolean) {
  return testimonials.filter(
    (item) => !production || item.status === "approved",
  );
}
