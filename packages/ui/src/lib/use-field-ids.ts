"use client";

import * as React from "react";

export function useFieldIds(
  id: string | undefined,
  options: { hint?: string; error?: string },
) {
  const autoId = React.useId();
  const fieldId = id ?? autoId;
  const hintId = options.hint ? `${fieldId}-hint` : undefined;
  const errorId = options.error ? `${fieldId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return { fieldId, hintId, errorId, describedBy };
}
