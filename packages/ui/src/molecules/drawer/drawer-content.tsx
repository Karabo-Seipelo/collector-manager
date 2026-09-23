"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export interface DrawerContentProps {
  className?: string;
  children: React.ReactNode;
}

export function DrawerContent({
  className,
  children,
}: DrawerContentProps) {
  return (
    <div
      className={cn(
        "flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto px-8 py-12",
        className,
      )}
    >
      {children}
    </div>
  );
}
