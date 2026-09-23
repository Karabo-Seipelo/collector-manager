import * as React from "react";

import { BadgeDot, type BadgeDotType } from "../badge-dot/badge-dot";
import { cn } from "../../lib/cn";

export type BadgeTone =
  | "error"
  | "warning"
  | "success"
  | "information"
  | "neutral"
  | "brand";

export type BadgeSize = "small" | "medium";

const sizes: Record<BadgeSize, { root: string; icon: string; text: string }> = {
  small: {
    root: "h-6",
    icon: "size-4",
    text: "text-tiny",
  },
  medium: {
    root: "h-8",
    icon: "size-5",
    text: "text-small",
  },
};

const tones: Record<BadgeTone, { root: string; dot: BadgeDotType }> = {
  error: {
    root: "border-stroke-error-weak bg-fill-error-weak text-text-error",
    dot: "notification",
  },
  warning: {
    root: "border-stroke-warning-weak bg-fill-warning-weak text-text-warning",
    dot: "away",
  },
  success: {
    root: "border-stroke-success-weak bg-fill-success-weak text-text-success",
    dot: "online",
  },
  information: {
    root: "border-stroke-information-weak bg-fill-information-weak text-text-information",
    dot: "notification",
  },
  neutral: {
    root: "border-stroke-weak bg-fill-weak text-fg-weak",
    dot: "offline",
  },
  brand: {
    root: "border-stroke-brand-weak bg-fill-brand-weak text-primary",
    dot: "notification",
  },
};

export interface BadgeProps {
  tone?: BadgeTone;
  size?: BadgeSize;
  icon?: React.ReactNode;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Badge({
  tone = "neutral",
  size = "medium",
  icon,
  dot = false,
  className,
  children,
}: BadgeProps) {
  const s = sizes[size];
  const t = tones[tone];

  return (
    <span
      className={cn(
        "inline-flex w-fit items-center justify-center rounded-2xl border border-solid px-2 font-normal whitespace-nowrap",
        s.root,
        t.root,
        className,
      )}
    >
      {dot ? (
        <span className="grid shrink-0 place-items-center px-1">
          <BadgeDot type={t.dot} size="medium" />
        </span>
      ) : icon ? (
        <span
          aria-hidden="true"
          className={cn(
            "grid shrink-0 place-items-center [&>svg]:size-full",
            s.icon,
          )}
        >
          {icon}
        </span>
      ) : null}
      <span className={cn("px-1", s.text)}>{children}</span>
    </span>
  );
}
