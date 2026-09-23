"use client";

import * as React from "react";

export type DropdownMenuAlign =
  | "bottom-left"
  | "bottom-right"
  | "top-left"
  | "top-right";

export interface DropdownMenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  align: DropdownMenuAlign;
  triggerRef: React.RefObject<HTMLElement | null>;
  contentRef: React.RefObject<HTMLDivElement | null>;
  menuId: string;
  closeOnSelect: boolean;
}

export const DropdownMenuContext =
  React.createContext<DropdownMenuContextValue | null>(null);

export function useDropdownMenuContext() {
  const context = React.useContext(DropdownMenuContext);
  if (!context) {
    throw new Error("DropdownMenu components must be used within DropdownMenu.");
  }
  return context;
}
