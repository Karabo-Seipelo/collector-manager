import type { FeatherIconName } from "../../atoms/icon/icon";

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

export type CollectionFilter = {
  id: string;
  label: string;
};

export type CollectionSummary = {
  itemCount: number;
  estimatedValue: string;
  lastAdded: string;
};

export type CollectionHomeResponse = {
  summary: CollectionSummary;
  filters: CollectionFilter[];
  items: CollectionItem[];
};

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

export type SearchFilterOption = {
  id: string;
  label: string;
  defaultChecked: boolean;
};

export type CollectionSearchResponse = {
  query: string;
  matchCount: number;
  collectionCount: number;
  pageSize: number;
  totalPages: number;
  categoryFilters: SearchFilterOption[];
  conditionFilters: SearchFilterOption[];
  rows: SearchResultRow[];
};

export type InsightsStatTile = {
  id: string;
  label: string;
  value: string;
  detail?: string;
};

export type InsightsCategoryValue = {
  id: string;
  label: string;
  value: string;
  amount: number;
};

export type InsightsRecentItem = {
  id: string;
  title: string;
  meta: string;
  imageSrc: string;
  imageAlt: string;
};

export type CollectionInsightsResponse = {
  summary: {
    itemCount: number;
    collectionCount: number;
    estimatedValue: string;
    totalPaid: string;
  };
  statTiles: InsightsStatTile[];
  categoryValues: InsightsCategoryValue[];
  recentItems: InsightsRecentItem[];
};
