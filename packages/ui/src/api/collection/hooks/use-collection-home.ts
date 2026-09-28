"use client";

import * as React from "react";

import { getCollectionHome } from "../client";
import { useAsyncResource } from "./use-async-resource";

export function useCollectionHome() {
  const loader = React.useCallback(() => getCollectionHome(), []);
  return useAsyncResource(loader);
}
