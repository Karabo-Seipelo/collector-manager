"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface DrawerFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function DrawerFooter({ className, children }: DrawerFooterProps) {
  return (
    <footer
      className={cn(
        "shrink-0 border-t border-stroke-weak px-8 py-6",
        className,
      )}
    >
      {children}
    </footer>
  );
}
