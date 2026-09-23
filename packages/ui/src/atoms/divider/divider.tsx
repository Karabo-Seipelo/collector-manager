import * as React from "react";

import { cn } from "../../lib/cn";

export type DividerType = "weak" | "strong";

const fills: Record<DividerType, string> = {
  weak: "bg-stroke-weak",
  strong: "bg-stroke-strong",
};

export interface DividerProps extends React.HTMLAttributes<HTMLHRElement> {
  type?: DividerType;
}

export function Divider({
  type = "weak",
  className,
  ...rest
}: DividerProps) {
  return (
    <hr
      className={cn("m-0 h-px w-full border-0", fills[type], className)}
      {...rest}
    />
  );
}
