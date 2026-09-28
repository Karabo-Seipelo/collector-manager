"use client";

import * as React from "react";

import { getCollectionInsights } from "../client";
import { useAsyncResource } from "./use-async-resource";

export function useCollectionInsights(period = "12m") {
  const loader = React.useCallback(() => getCollectionInsights(period), [period]);
  return useAsyncResource(loader);
}
