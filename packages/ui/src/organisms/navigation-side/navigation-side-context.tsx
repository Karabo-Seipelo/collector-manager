"use client";

import * as React from "react";

export interface NavigationSideContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  closeOnNavigate: boolean;
}

export const NavigationSideContext =
  React.createContext<NavigationSideContextValue | null>(null);

export function useNavigationSideContext() {
  const context = React.useContext(NavigationSideContext);
  if (!context) {
    throw new Error(
      "NavigationSide components must be used within NavigationSide",
    );
  }
  return context;
}
