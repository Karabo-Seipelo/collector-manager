"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import type { DrawerSide } from "./drawer-context";

export interface DrawerOverlayProps {
  side: DrawerSide;
  visible: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function DrawerOverlay({
  side,
  visible,
  className,
  onClose,
  children,
}: DrawerOverlayProps) {
  return (
    <div
      data-testid="drawer-overlay"
      className={cn(
        "fixed inset-0 z-50 flex bg-fill-overlay backdrop-blur-sm",
        "pl-16 justify-end max-md:items-end md:items-stretch md:justify-center md:pl-0",
        side === "right" ? "md:justify-end" : "md:justify-start",
        "transition-opacity duration-300 ease-out motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
        className,
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}
