"use client";

import * as React from "react";

export function useAsyncResource<T>(loader: () => Promise<T>) {
  const [data, setData] = React.useState<T | null>(null);
  const [error, setError] = React.useState<Error | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const requestIdRef = React.useRef(0);

  const load = React.useCallback(async () => {
    const requestId = requestIdRef.current + 1;
    requestIdRef.current = requestId;
    setIsLoading(true);
    setError(null);

    try {
      const result = await loader();
      if (requestIdRef.current === requestId) {
        setData(result);
      }
    } catch (caught) {
      if (requestIdRef.current === requestId) {
        setError(caught instanceof Error ? caught : new Error(String(caught)));
        setData(null);
      }
    } finally {
      if (requestIdRef.current === requestId) {
        setIsLoading(false);
      }
    }
  }, [loader]);

  React.useEffect(() => {
    void load();
  }, [load]);

  return { data, error, isLoading, refetch: load };
}
