import type { FeatherIconName } from "../../atoms/icon/icon";

import blueTrainSrc from "./assets/blue-train.png";
import charizardSrc from "./assets/charizard.png";
import duneSrc from "./assets/dune.png";
import kindOfBlueSrc from "./assets/kind-of-blue.png";
import omegaSeamasterSrc from "./assets/omega-seamaster.png";

export const searchFilterMeta = {
  query: "blue",
  matchCount: 36,
  collectionCount: 4,
  pageSize: 6,
  totalPages: 3,
};

export type SearchResultRow = {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  condition: string;
  year: string;
  value: string;
  imageSrc?: string;
  imageAlt?: string;
  icon: FeatherIconName;
};

export const searchResultRows: SearchResultRow[] = [
  {
    id: "kind-of-blue",
    title: "Kind of Blue",
    subtitle: "Miles Davis",
    category: "Vinyl records",
    condition: "Near mint",
    year: "1959",
    value: "R 3 400",
    imageSrc: kindOfBlueSrc,
    imageAlt: "Kind of Blue album cover",
    icon: "disc",
  },
  {
    id: "blue-train",
    title: "Blue Train",
    subtitle: "John Coltrane",
    category: "Vinyl records",
    condition: "Mint",
    year: "1957",
    value: "R 5 100",
    imageSrc: blueTrainSrc,
    imageAlt: "Blue Train album cover",
    icon: "disc",
  },
  {
    id: "blue-note-1568",
    title: "Blue Note 1568",
    subtitle: "Hank Mobley",
    category: "Vinyl records",
    condition: "Very good",
    year: "1957",
    value: "R 28 000",
    icon: "disc",
  },
  {
    id: "bluets",
    title: "Bluets",
    subtitle: "Maggie Nelson",
    category: "Books",
    condition: "Near mint",
    year: "2009",
    value: "R 900",
    imageSrc: duneSrc,
    imageAlt: "Bluets book cover",
    icon: "book",
  },
  {
    id: "blue-eyes-white-dragon",
    title: "Blue-Eyes White Dragon",
    subtitle: "LOB-001",
    category: "Trading cards",
    condition: "PSA 9",
    year: "2002",
    value: "R 14 500",
    imageSrc: charizardSrc,
    imageAlt: "Trading card",
    icon: "layers",
  },
  {
    id: "blue-marlin-seiko",
    title: "Blue Marlin Seiko",
    subtitle: "6159-7010",
    category: "Watches",
    condition: "Good",
    year: "1970",
    value: "R 9 800",
    imageSrc: omegaSeamasterSrc,
    imageAlt: "Seiko watch",
    icon: "watch",
  },
];

export const searchCategoryFilters = [
  { id: "vinyl", label: "Vinyl records", defaultChecked: true },
  { id: "books", label: "Books", defaultChecked: false },
  { id: "cards", label: "Trading cards", defaultChecked: false },
  { id: "watches", label: "Watches", defaultChecked: false },
] as const;

export const searchConditionFilters = [
  { id: "mint", label: "Mint", defaultChecked: true },
  { id: "near-mint", label: "Near mint", defaultChecked: true },
  { id: "very-good", label: "Very good", defaultChecked: false },
  { id: "good-below", label: "Good or below", defaultChecked: false },
] as const;
