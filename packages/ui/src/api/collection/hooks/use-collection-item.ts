"use client";

import * as React from "react";

import { getCollectionItem } from "../client";
import { useAsyncResource } from "./use-async-resource";

export function useCollectionItem(itemId: string) {
  const loader = React.useCallback(() => getCollectionItem(itemId), [itemId]);
  return useAsyncResource(loader);
}
