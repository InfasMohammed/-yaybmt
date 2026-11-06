import ExpandableGallery from "./ui/gallery-animation";
import { aboutImages } from "../data/about";

export default function ShowroomGallery() {
  return <ExpandableGallery images={aboutImages.gallery} />;
}
