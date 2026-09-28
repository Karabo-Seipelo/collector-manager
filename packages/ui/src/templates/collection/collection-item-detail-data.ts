import kindOfBlueSrc from "./assets/kind-of-blue.png";

export type CollectionItemDetailSpec = {
  label: string;
  value: string;
};

export type CollectionItemDetail = {
  id: string;
  title: string;
  subtitle: string;
  categoryLabel: string;
  breadcrumbs: { label: string; href?: string }[];
  paid: string;
  estimatedValue: string;
  change: string;
  notes: string;
  specs: CollectionItemDetailSpec[];
  gallery: { id: string; src?: string; alt: string }[];
};

export const kindOfBlueItemDetail: CollectionItemDetail = {
  id: "kind-of-blue",
  title: "Kind of Blue",
  subtitle: "Miles Davis · Columbia CL 1355 · six-eye pressing",
  categoryLabel: "Vinyl",
  breadcrumbs: [
    { label: "Collection", href: "#collection" },
    { label: "Vinyl records", href: "#vinyl-records" },
    { label: "Kind of Blue" },
  ],
  paid: "R 1 200",
  estimatedValue: "R 3 400",
  change: "+183%",
  notes:
    "Original six-eye pressing. Sleeve has light ring wear on the back; vinyl plays clean with no surface noise.",
  specs: [
    { label: "Condition", value: "Near mint (NM)" },
    { label: "Year", value: "1959" },
    { label: "Acquired", value: "12 March 2024" },
    { label: "Source", value: "Bree Street record fair" },
    { label: "Location", value: "Shelf A · Row 2" },
    { label: "Catalogue no.", value: "CL 1355" },
  ],
  gallery: [
    {
      id: "cover",
      src: kindOfBlueSrc,
      alt: "Kind of Blue album cover",
    },
    { id: "sleeve-front", alt: "Sleeve front" },
    { id: "sleeve-back", alt: "Sleeve back" },
    { id: "label", alt: "Record label" },
  ],
};
