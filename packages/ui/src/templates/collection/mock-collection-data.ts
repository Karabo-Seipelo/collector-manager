import type { FeatherIconName } from "../../atoms/icon/icon";

import airJordanSrc from "./assets/air-jordan.png";
import aLoveSupremeSrc from "./assets/a-love-supreme.png";
import blueTrainSrc from "./assets/blue-train.png";
import charizardSrc from "./assets/charizard.png";
import duneSrc from "./assets/dune.png";
import kindOfBlueSrc from "./assets/kind-of-blue.png";
import leicaM3Src from "./assets/leica-m3.png";
import neuromancerSrc from "./assets/neuromancer.png";
import omegaSeamasterSrc from "./assets/omega-seamaster.png";
import polaroidSx70Src from "./assets/polaroid-sx70.png";

export type CollectionItem = {
  id: string;
  title: string;
  category: string;
  detail: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
  icon: FeatherIconName;
};

export const collectionFilters = [
  { id: "all", label: "All" },
  { id: "vinyl", label: "Vinyl" },
  { id: "books", label: "Books" },
  { id: "cards", label: "Trading cards" },
  { id: "watches", label: "Watches" },
  { id: "cameras", label: "Cameras" },
  { id: "needs-valuation", label: "Needs valuation" },
] as const;

export const collectionItems: CollectionItem[] = [
  {
    id: "kind-of-blue",
    title: "Kind of Blue",
    category: "Vinyl",
    detail: "1959 · NM",
    price: "R 3 400",
    imageSrc: kindOfBlueSrc,
    imageAlt: "Kind of Blue vinyl record cover",
    icon: "disc",
  },
  {
    id: "blue-train",
    title: "Blue Train",
    category: "Vinyl",
    detail: "1957 · VG+",
    price: "R 5 100",
    imageSrc: blueTrainSrc,
    imageAlt: "Blue Train vinyl record cover",
    icon: "disc",
  },
  {
    id: "a-love-supreme",
    title: "A Love Supreme",
    category: "Vinyl",
    detail: "1965 · NM-",
    price: "R 2 900",
    imageSrc: aLoveSupremeSrc,
    imageAlt: "A Love Supreme vinyl record cover",
    icon: "disc",
  },
  {
    id: "dune",
    title: "Dune, 1st ed.",
    category: "Books",
    detail: "1965 · VG",
    price: "R 12 000",
    imageSrc: duneSrc,
    imageAlt: "Dune first edition book",
    icon: "book",
  },
  {
    id: "neuromancer",
    title: "Neuromancer",
    category: "Books",
    detail: "1984 · Mint",
    price: "R 1 800",
    imageSrc: neuromancerSrc,
    imageAlt: "Neuromancer book cover",
    icon: "book",
  },
  {
    id: "air-jordan",
    title: "Air Jordan 1 '85",
    category: "Sneakers",
    detail: "Size 9 · DS",
    price: "R 8 200",
    imageSrc: airJordanSrc,
    imageAlt: "Air Jordan 1 sneaker",
    icon: "box",
  },
  {
    id: "charizard",
    title: "Charizard 1st",
    category: "Cards",
    detail: "PSA 8 · Holo",
    price: "R 22 400",
    imageSrc: charizardSrc,
    imageAlt: "Charizard trading card",
    icon: "layers",
  },
  {
    id: "leica-m3",
    title: "Leica M3",
    category: "Cameras",
    detail: "1957",
    price: "R 18 900",
    imageSrc: leicaM3Src,
    imageAlt: "Leica M3 camera",
    icon: "camera",
  },
  {
    id: "omega-seamaster",
    title: "Omega Seamaster",
    category: "Watches",
    detail: "1968",
    price: "R 26 000",
    imageSrc: omegaSeamasterSrc,
    imageAlt: "Omega Seamaster watch",
    icon: "watch",
  },
  {
    id: "polaroid-sx70",
    title: "Polaroid SX-70",
    category: "Cameras",
    detail: "1972",
    price: "R 3 100",
    imageSrc: polaroidSx70Src,
    imageAlt: "Polaroid SX-70 camera",
    icon: "camera",
  },
];

export const collectionSummary = {
  itemCount: 248,
  estimatedValue: "R 41 200",
  lastAdded: "2 days ago",
};

export const avatarPhotoSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#c9a07a"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );
