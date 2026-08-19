"use client";

import * as React from "react";

export function useControllableString(
  value: string | undefined,
  defaultValue = "",
) {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const currentValue = isControlled ? value : innerValue;

  const setCurrentValue = React.useCallback(
    (next: string) => {
      if (!isControlled) {
        setInnerValue(next);
      }
    },
    [isControlled],
  );

  return { isControlled, currentValue, setCurrentValue };
}
