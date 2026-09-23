"use client";

import * as React from "react";

export type DrawerSide = "left" | "right";
export type DrawerSize = "small" | "large";

export interface DrawerContextValue {
  titleId: string;
  onClose: () => void;
  side: DrawerSide;
  size: DrawerSize;
}

export const DrawerContext = React.createContext<DrawerContextValue | null>(
  null,
);

export function useDrawerContext() {
  const context = React.useContext(DrawerContext);
  if (!context) {
    throw new Error("Drawer subcomponents must be used within Drawer");
  }
  return context;
}
