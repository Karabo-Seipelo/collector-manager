"use client";

import * as React from "react";

export function useScrollLock(active: boolean) {
  React.useEffect(() => {
    if (!active || typeof document === "undefined") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);
}
