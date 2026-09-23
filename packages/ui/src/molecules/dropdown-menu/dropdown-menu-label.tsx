"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export type DropdownMenuLabelProps = React.HTMLAttributes<HTMLDivElement>;

export function DropdownMenuLabel({
  className,
  children,
  ...rest
}: DropdownMenuLabelProps) {
  return (
    <div
      role="presentation"
      className={cn(
        "px-4 pb-1 pt-4 text-tiny font-semibold leading-5 text-fg-weak",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
