import * as React from "react";

import { cn } from "../../lib/cn";

export type BadgeCountEmphasis = "strong" | "moderate" | "weak";

const emphasisStyles: Record<BadgeCountEmphasis, string> = {
  strong: "bg-fill-error-strong text-white",
  moderate:
    "border border-stroke-error-weak bg-fill-error-weak text-text-error",
  weak: "border border-stroke-weak bg-fill-weak text-fg-weak",
};

export interface BadgeCountProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  emphasis?: BadgeCountEmphasis;
  children: React.ReactNode;
}

export function BadgeCount({
  emphasis = "strong",
  className,
  children,
  ...rest
}: BadgeCountProps) {
  return (
    <span
      data-testid="badge-count"
      className={cn(
        "inline-flex h-6 min-w-6 items-center justify-center rounded-2xl px-2 font-normal whitespace-nowrap",
        emphasisStyles[emphasis],
        className,
      )}
      {...rest}
    >
      <span className="text-tiny">{children}</span>
    </span>
  );
}
