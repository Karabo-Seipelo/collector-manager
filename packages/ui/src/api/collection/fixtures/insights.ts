import type { CollectionInsightsResponse } from "../types";

import blueTrainSrc from "../../../templates/collection/assets/blue-train.png";
import charizardSrc from "../../../templates/collection/assets/charizard.png";
import neuromancerSrc from "../../../templates/collection/assets/neuromancer.png";
import omegaSeamasterSrc from "../../../templates/collection/assets/omega-seamaster.png";
import polaroidSx70Src from "../../../templates/collection/assets/polaroid-sx70.png";

export const collectionInsightsFixture: CollectionInsightsResponse = {
  summary: {
    itemCount: 248,
    collectionCount: 6,
    estimatedValue: "R 41 200",
    totalPaid: "R 24 600",
  },
  statTiles: [
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
    },
    {
      id: "collections",
      label: "Collections",
      value: "6",
      detail: "2 need valuing",
    },
  ],
  categoryValues: [
    { id: "cards", label: "Trading cards", value: "R 16 400", amount: 16400 },
    { id: "watches", label: "Watches", value: "R 9 800", amount: 9800 },
    { id: "cameras", label: "Cameras", value: "R 7 300", amount: 7300 },
    { id: "vinyl", label: "Vinyl records", value: "R 5 100", amount: 5100 },
    { id: "books", label: "Books", value: "R 2 600", amount: 2600 },
  ],
  recentItems: [
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
  ],
};

export function getCategoryBarPercent(amount: number, categoryValues: { amount: number }[]) {
  const max = Math.max(...categoryValues.map((row) => row.amount));
  if (max <= 0) return 0;
  return Math.round((amount / max) * 100);
}
