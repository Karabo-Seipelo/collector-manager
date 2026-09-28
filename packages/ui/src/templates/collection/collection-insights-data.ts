import blueTrainSrc from "./assets/blue-train.png";
import charizardSrc from "./assets/charizard.png";
import neuromancerSrc from "./assets/neuromancer.png";
import omegaSeamasterSrc from "./assets/omega-seamaster.png";
import polaroidSx70Src from "./assets/polaroid-sx70.png";

export const insightsSummary = {
  itemCount: 248,
  collectionCount: 6,
  estimatedValue: "R 41 200",
  totalPaid: "R 24 600",
};

export const insightsStatTiles = [
  {
    id: "items",
    label: "Items",
    value: "248",
    detail: "+18 this year",
  },
  {
    id: "estimated-value",
    label: "Estimated value",
    value: "R 41 200",
    detail: "+22%",
  },
  {
    id: "total-paid",
    label: "Total paid",
    value: "R 24 600",
    detail: undefined,
  },
  {
    id: "collections",
    label: "Collections",
    value: "6",
    detail: "2 need valuing",
  },
] as const;

export const insightsCategoryValues = [
  { id: "cards", label: "Trading cards", value: "R 16 400", amount: 16400 },
  { id: "watches", label: "Watches", value: "R 9 800", amount: 9800 },
  { id: "cameras", label: "Cameras", value: "R 7 300", amount: 7300 },
  { id: "vinyl", label: "Vinyl records", value: "R 5 100", amount: 5100 },
  { id: "books", label: "Books", value: "R 2 600", amount: 2600 },
] as const;

const maxCategoryAmount = Math.max(
  ...insightsCategoryValues.map((row) => row.amount),
);

export function getCategoryBarPercent(amount: number) {
  return Math.round((amount / maxCategoryAmount) * 100);
}

export const insightsRecentItems = [
  {
    id: "omega-seamaster",
    title: "Omega Seamaster",
    meta: "Watches · R26k",
    imageSrc: omegaSeamasterSrc,
    imageAlt: "Omega Seamaster watch",
  },
  {
    id: "polaroid-sx70",
    title: "Polaroid SX-70",
    meta: "Cameras · R3.1k",
    imageSrc: polaroidSx70Src,
    imageAlt: "Polaroid SX-70 camera",
  },
  {
    id: "neuromancer",
    title: "Neuromancer",
    meta: "Books · R1.8k",
    imageSrc: neuromancerSrc,
    imageAlt: "Neuromancer book",
  },
  {
    id: "blue-train",
    title: "Blue Train",
    meta: "Vinyl · R5.1k",
    imageSrc: blueTrainSrc,
    imageAlt: "Blue Train vinyl",
  },
  {
    id: "charizard",
    title: "Charizard 1st",
    meta: "Cards · R22.4k",
    imageSrc: charizardSrc,
    imageAlt: "Charizard card",
  },
] as const;
