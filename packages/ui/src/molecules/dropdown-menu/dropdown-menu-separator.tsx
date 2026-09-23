"use client";

import * as React from "react";

import { Divider } from "../../atoms/divider/divider";
import { cn } from "../../lib/cn";

export type DropdownMenuSeparatorProps = React.HTMLAttributes<HTMLDivElement>;

export function DropdownMenuSeparator({
  className,
  ...rest
}: DropdownMenuSeparatorProps) {
  return (
    <div role="presentation" className={cn("w-full py-2", className)} {...rest}>
      <Divider aria-hidden="true" />
    </div>
  );
}
