import type {
  CollectionHomeResponse,
  CollectionInsightsResponse,
  CollectionItemDetail,
  CollectionSearchResponse,
  CollectionSummary,
} from "./types";

const defaultBaseUrl = "";

export class CollectionApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "CollectionApiError";
  }
}

async function fetchJson<T>(path: string, baseUrl = defaultBaseUrl): Promise<T> {
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { Accept: "application/json" },
  });

  if (!response.ok) {
    throw new CollectionApiError(
      `Request failed: ${response.status} ${response.statusText}`,
      response.status,
    );
  }

  return response.json() as Promise<T>;
}

export const collectionPaths = {
  summary: "/api/collection/summary",
  items: "/api/collection/items",
  item: (id: string) => `/api/collection/items/${encodeURIComponent(id)}`,
  search: (query: string) =>
    `/api/collection/search?q=${encodeURIComponent(query)}`,
  insights: (period = "12m") =>
    `/api/collection/insights?period=${encodeURIComponent(period)}`,
  home: "/api/collection/home",
} as const;

export function getCollectionSummary(baseUrl?: string) {
  return fetchJson<CollectionSummary>(collectionPaths.summary, baseUrl);
}

export function getCollectionHome(baseUrl?: string) {
  return fetchJson<CollectionHomeResponse>(collectionPaths.home, baseUrl);
}

export function getCollectionItem(id: string, baseUrl?: string) {
  return fetchJson<CollectionItemDetail>(collectionPaths.item(id), baseUrl);
}

export function getCollectionSearch(query: string, baseUrl?: string) {
  return fetchJson<CollectionSearchResponse>(
    collectionPaths.search(query),
    baseUrl,
  );
}

export function getCollectionInsights(period = "12m", baseUrl?: string) {
  return fetchJson<CollectionInsightsResponse>(
    collectionPaths.insights(period),
    baseUrl,
  );
}
