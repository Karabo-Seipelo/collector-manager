"use client";

import * as React from "react";

export function useControllableNumber(
  value: number | undefined,
  defaultValue = 0,
) {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const currentValue = isControlled ? value : innerValue;

  const setCurrentValue = React.useCallback(
    (next: number) => {
      if (!isControlled) {
        setInnerValue(next);
      }
    },
    [isControlled],
  );

  return { isControlled, currentValue, setCurrentValue };
}
