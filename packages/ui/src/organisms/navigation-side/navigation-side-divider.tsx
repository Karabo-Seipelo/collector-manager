"use client";

import * as React from "react";

import { Divider } from "../../atoms/divider/divider";
import { cn } from "../../lib/cn";
import { getNavigationSideDividerClassName } from "./navigation-side-styles";

export interface NavigationSideDividerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  full?: boolean;
}

export function NavigationSideDivider({
  full = false,
  className,
  ...rest
}: NavigationSideDividerProps) {
  return (
    <div
      role="separator"
      className={cn(getNavigationSideDividerClassName(full), className)}
      {...rest}
    >
      <Divider />
    </div>
  );
}
