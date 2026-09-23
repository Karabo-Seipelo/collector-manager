"use client";

import * as React from "react";

export interface NavigationHeaderContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  closeOnNavigate: boolean;
  mobileDrawerContent: React.ReactNode;
  setMobileDrawerContent: (content: React.ReactNode) => void;
}

export const NavigationHeaderContext =
  React.createContext<NavigationHeaderContextValue | null>(null);

export function useNavigationHeaderContext() {
  const context = React.useContext(NavigationHeaderContext);
  if (!context) {
    throw new Error(
      "NavigationHeader components must be used within NavigationHeader",
    );
  }
  return context;
}
