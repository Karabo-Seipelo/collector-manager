"use client";

import * as React from "react";

export type ModalSize = "small" | "large";
export type ModalTone = "default" | "destructive";

export interface ModalContextValue {
  titleId: string;
  descriptionId: string;
  setHasDescription: (value: boolean) => void;
  onClose: () => void;
  size: ModalSize;
  tone: ModalTone;
  dismissible: boolean;
}

export const ModalContext = React.createContext<ModalContextValue | null>(null);

export function useModalContext() {
  const context = React.useContext(ModalContext);
  if (!context) {
    throw new Error("Modal subcomponents must be used within Modal");
  }
  return context;
}
