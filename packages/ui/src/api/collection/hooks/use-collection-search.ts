"use client";

import * as React from "react";

import { getCollectionSearch } from "../client";
import { useAsyncResource } from "./use-async-resource";

export function useCollectionSearch(query: string) {
  const loader = React.useCallback(() => getCollectionSearch(query), [query]);
  return useAsyncResource(loader);
}
