import avatar1Src from "./assets/avatar-1.png";
import avatar2Src from "./assets/avatar-2.png";
import avatar3Src from "./assets/avatar-3.png";
import avatar4Src from "./assets/avatar-4.png";
import avatar5Src from "./assets/avatar-5.png";
import avatar6Src from "./assets/avatar-6.png";
import avatar7Src from "./assets/avatar-7.png";
import avatar8Src from "./assets/avatar-8.png";
import chinaSrc from "./assets/destination-china.jpg";
import greeceSrc from "./assets/destination-greece.jpg";
import italySrc from "./assets/destination-italy.jpg";
import japanSrc from "./assets/destination-japan.jpg";
import sanFranSrc from "./assets/destination-san-fran.jpg";
import utahSrc from "./assets/destination-utah.jpg";

export interface Destination {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  author: { name: string; src: string };
  readTime: string;
}

export const destinations: Destination[] = [
  {
    id: "san-fran",
    title: "Sightseeing in San Fran",
    description: "Top sightseeing spots in the jewel of Northern California.",
    imageSrc: sanFranSrc,
    author: { name: "Theresa Webb", src: avatar6Src },
    readTime: "5 min read",
  },
  {
    id: "japan",
    title: "Beautiful Japan",
    description:
      "Our curated list of must-see locations that will take your breath away.",
    imageSrc: japanSrc,
    author: { name: "Tina Wong", src: avatar5Src },
    readTime: "4 min read",
  },
  {
    id: "china",
    title: "Marvels of China",
    description: "Discover fascinating, unusual, and adventurous things to do.",
    imageSrc: chinaSrc,
    author: { name: "Tony Jones", src: avatar3Src },
    readTime: "6 min read",
  },
  {
    id: "greece",
    title: "Wonders of Greece",
    description:
      "Discover Greece, from its ancient ruins to its stunning islands.",
    imageSrc: greeceSrc,
    author: { name: "Marvin McKinney", src: avatar7Src },
    readTime: "3 min read",
  },
  {
    id: "italy",
    title: "Italy's Hidden Gems",
    description:
      "Delve into the heart of Italy and explore its lesser-known treasures.",
    imageSrc: italySrc,
    author: { name: "Arlene McCoy", src: avatar8Src },
    readTime: "5 min read",
  },
  {
    id: "utah",
    title: "Adventure Awaits in Utah",
    description:
      "Embark on an unforgettable journey through Utah's diverse landscapes.",
    imageSrc: utahSrc,
    author: { name: "Jane Smith", src: avatar4Src },
    readTime: "4 min read",
  },
];

export const travellers = [
  { name: "Cody Fisher", src: avatar1Src },
  { name: "Esther Howard", src: avatar2Src },
  { name: "Tony Jones", src: avatar3Src },
  { name: "Jane Smith", src: avatar4Src },
  { name: "Tina Wong", src: avatar5Src },
];
