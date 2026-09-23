"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import type { DrawerSide, DrawerSize } from "./drawer-context";

export interface DrawerPanelProps {
  panelRef: React.RefObject<HTMLDivElement | null>;
  titleId: string;
  side: DrawerSide;
  size: DrawerSize;
  visible: boolean;
  className?: string;
  onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

export function DrawerPanel({
  panelRef,
  titleId,
  side,
  size,
  visible,
  className,
  onTransitionEnd,
  children,
}: DrawerPanelProps) {
  return (
    <div
      ref={panelRef}
      data-testid="drawer-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onTransitionEnd={onTransitionEnd}
      className={cn(
        "flex flex-col border border-stroke-weak bg-fill-inverse shadow-overlay",
        "w-full max-md:max-h-[90vh]",
        "md:fixed md:inset-y-0 md:h-full",
        size === "small" ? "md:w-[400px]" : "md:w-[600px]",
        side === "right" ? "md:right-0" : "md:left-0",
        "transform transition-transform duration-300 ease-out motion-reduce:transition-none",
        visible ? "max-md:translate-y-0" : "max-md:translate-y-full",
        side === "right" &&
          (visible ? "md:translate-x-0" : "md:translate-x-full"),
        side === "left" &&
          (visible ? "md:translate-x-0" : "md:-translate-x-full"),
        className,
      )}
    >
      {children}
    </div>
  );
}
