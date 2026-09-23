export type CollectionItem = {
  id: string;
  title: string;
  category: string;
  detail: string;
  price?: string;
};

export const collectionFilters = [
  { id: "all", label: "All" },
  { id: "vinyl", label: "Vinyl" },
  { id: "books", label: "Books" },
  { id: "cards", label: "Cards" },
  { id: "sneakers", label: "Sneakers" },
  { id: "cameras", label: "Cameras" },
  { id: "watches", label: "Watches" },
] as const;

export const collectionItems: CollectionItem[] = [
  {
    id: "kind-of-blue",
    title: "Kind of Blue",
    category: "Vinyl",
    detail: "1959 · NM",
    price: "R 3 400",
  },
  {
    id: "blue-train",
    title: "Blue Train",
    category: "Vinyl",
    detail: "1957 · VG+",
    price: "R 5 100",
  },
  {
    id: "a-love-supreme",
    title: "A Love Supreme",
    category: "Vinyl",
    detail: "1965 · NM",
    price: "R 2 900",
  },
  {
    id: "dune",
    title: "Dune, 1st ed.",
    category: "Books",
    detail: "1965 · VG",
    price: "R 12 000",
  },
  {
    id: "neuromancer",
    title: "Neuromancer",
    category: "Books",
    detail: "1984 · Good",
    price: "R 1 800",
  },
  {
    id: "air-jordan",
    title: "Air Jordan 1 '85",
    category: "Sneakers",
    detail: "Size 9",
    price: "R 8 200",
  },
  {
    id: "charizard",
    title: "Charizard 1st",
    category: "Cards",
    detail: "PSA 8",
    price: "R 22 400",
  },
  {
    id: "leica-m3",
    title: "Leica M3",
    category: "Cameras",
    detail: "1957",
    price: "R 18 900",
  },
  {
    id: "omega-seamaster",
    title: "Omega Seamaster",
    category: "Watches",
    detail: "1968",
    price: "R 26 000",
  },
  {
    id: "polaroid-sx70",
    title: "Polaroid SX-70",
    category: "Cameras",
    detail: "1972",
    price: "R 3 100",
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
