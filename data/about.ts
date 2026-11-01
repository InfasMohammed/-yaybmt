export type AboutImage = {
  src: string;
  originalSrc: string;
  width: number;
  height: number;
};
export const aboutImages: { banner: AboutImage; gallery: AboutImage[] } = {
  banner: {
    src: "/images/about/image-3.webp",
    originalSrc: "/images/about/source-3.jpg",
    width: 1400,
    height: 401,
  },
  gallery: [
    {
      src: "/images/about/image-4.webp",
      originalSrc: "/images/about/source-4.webp",
      width: 1400,
      height: 926,
    },
    {
      src: "/images/about/image-5.webp",
      originalSrc: "/images/about/source-5.jpg",
      width: 1045,
      height: 1280,
    },
    {
      src: "/images/about/image-6.webp",
      originalSrc: "/images/about/source-6.jpg",
      width: 1050,
      height: 1400,
    },
    {
      src: "/images/about/image-7.webp",
      originalSrc: "/images/about/source-7.jpg",
      width: 1050,
      height: 1400,
    },
    {
      src: "/images/about/image-8.webp",
      originalSrc: "/images/about/source-8.jpg",
      width: 800,
      height: 1103,
    },
    {
      src: "/images/about/image-9.webp",
      originalSrc: "/images/about/source-9.jpg",
      width: 1050,
      height: 1400,
    },
  ],
};
export const team: { name: string; role: string; image: AboutImage }[] = [
  {
    name: "Yusuf Ebrahim",
    role: "Managing Director",
    image: {
      src: "/images/about/image-0.webp",
      originalSrc: "/images/about/source-0.png",
      width: 180,
      height: 180,
    },
  },
  {
    name: "Nazmi Yusuf",
    role: "Director - Operations",
    image: {
      src: "/images/about/image-1.webp",
      originalSrc: "/images/about/source-1.jpg",
      width: 190,
      height: 190,
    },
  },
  {
    name: "Mohammed Yusuf",
    role: "Director - Marketing",
    image: {
      src: "/images/about/image-2.webp",
      originalSrc: "/images/about/source-2.jpg",
      width: 180,
      height: 180,
    },
  },
];
// Figures reproduced from the original About Us page, not independently verified.
export const companyFigures: { value: string; label: string }[] = [
  {
    value: "500+",
    label: "Happy customers",
  },
  {
    value: "20+",
    label: "Years of experience",
  },
  {
    value: "100+",
    label: "Projects completed",
  },
  {
    value: "7",
    label: "Employees",
  },
];
