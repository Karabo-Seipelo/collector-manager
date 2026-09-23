"use client";

import * as React from "react";

import type { TooltipPlacement, TooltipSize } from "./tooltip-styles";

export interface TooltipContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  placement: TooltipPlacement;
  size: TooltipSize;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  tooltipId: string;
}

export const TooltipContext = React.createContext<TooltipContextValue | null>(
  null,
);

export function useTooltipContext() {
  const context = React.useContext(TooltipContext);
  if (!context) {
    throw new Error("Tooltip components must be used within Tooltip");
  }
  return context;
}
