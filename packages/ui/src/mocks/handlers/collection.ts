import { http, HttpResponse } from "msw";

import { collectionHomeFixture } from "../../api/collection/fixtures/home";
import { collectionInsightsFixture } from "../../api/collection/fixtures/insights";
import { itemDetailFixtures } from "../../api/collection/fixtures/item-detail";
import { collectionSearchFixture } from "../../api/collection/fixtures/search";

export const collectionHandlers = [
  http.get("/api/collection/summary", () => {
    return HttpResponse.json(collectionHomeFixture.summary);
  }),

  http.get("/api/collection/home", () => {
    return HttpResponse.json(collectionHomeFixture);
  }),

  http.get("/api/collection/items", () => {
    return HttpResponse.json({ items: collectionHomeFixture.items });
  }),

  http.get("/api/collection/items/:id", ({ params }) => {
    const id = String(params.id);
    const item = itemDetailFixtures[id];
    if (!item) {
      return HttpResponse.json({ message: "Item not found" }, { status: 404 });
    }
    return HttpResponse.json(item);
  }),

  http.get("/api/collection/search", ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") ?? collectionSearchFixture.query;
    return HttpResponse.json({
      ...collectionSearchFixture,
      query,
    });
  }),

  http.get("/api/collection/insights", () => {
    return HttpResponse.json(collectionInsightsFixture);
  }),
];
