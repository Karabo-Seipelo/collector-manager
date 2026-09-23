"use client";

import * as React from "react";

export function useControllableBoolean(
  value: boolean | undefined,
  defaultValue = false,
) {
  const isControlled = value !== undefined;
  const [innerValue, setInnerValue] = React.useState(defaultValue);
  const currentValue = isControlled ? value : innerValue;

  const setCurrentValue = React.useCallback(
    (next: boolean) => {
      if (!isControlled) {
        setInnerValue(next);
      }
    },
    [isControlled],
  );

  return { isControlled, currentValue, setCurrentValue };
}
