"use client";

import * as React from "react";

import { getNavigationSideHeaderClassName } from "./navigation-side-styles";

export interface NavigationSideHeaderProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function NavigationSideHeader({
  className,
  children,
  ...rest
}: NavigationSideHeaderProps) {
  return (
    <div
      role="presentation"
      className={getNavigationSideHeaderClassName(className)}
      {...rest}
    >
      {children}
    </div>
  );
}
