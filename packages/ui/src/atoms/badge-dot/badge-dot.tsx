import * as React from "react";

import { cn } from "../../lib/cn";

export type BadgeDotType =
  | "online"
  | "busy"
  | "away"
  | "offline"
  | "notification";

export type BadgeDotSize = "small" | "medium" | "large";

const sizes: Record<BadgeDotSize, string> = {
  small: "size-2",
  medium: "size-3",
  large: "size-4",
};

const fills: Record<BadgeDotType, string> = {
  online: "bg-fill-success-strong text-white",
  busy: "bg-fill-error-strong text-white",
  away: "bg-fill-warning-strong text-fg-strong",
  offline: "bg-fill-weak text-icon-neutral",
  notification: "bg-fill-error-strong",
};

type GlyphName = "check" | "minus" | "clock" | "x";

const glyphs: Partial<Record<BadgeDotType, GlyphName>> = {
  online: "check",
  busy: "minus",
  away: "clock",
  offline: "x",
};

function Glyph({ name }: { name: GlyphName }) {
  return (
    <svg
      data-testid="badge-dot-glyph"
      data-glyph={name}
      viewBox="0 0 12 12"
      fill="none"
      className="size-[70%]"
      aria-hidden="true"
    >
      {name === "check" ? (
        <path
          d="M2.5 6.2 4.8 8.5 9.5 3.5"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
      {name === "minus" ? (
        <path
          d="M3 6h6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : null}
      {name === "clock" ? (
        <>
          <circle
            cx="6"
            cy="6"
            r="3.35"
            stroke="currentColor"
            strokeWidth="1.35"
          />
          <path
            d="M6 4.4V6.15l1.35.95"
            stroke="currentColor"
            strokeWidth="1.35"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      ) : null}
      {name === "x" ? (
        <path
          d="M4 4l4 4M8 4l-4 4"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      ) : null}
    </svg>
  );
}

export interface BadgeDotProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  type?: BadgeDotType;
  size?: BadgeDotSize;
}

export function BadgeDot({
  type = "notification",
  size = "medium",
  className,
  ...rest
}: BadgeDotProps) {
  const glyph = size === "small" ? undefined : glyphs[type];

  return (
    <span
      data-testid="badge-dot"
      aria-hidden="true"
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-full",
        sizes[size],
        fills[type],
        className,
      )}
      {...rest}
    >
      {glyph ? <Glyph name={glyph} /> : null}
    </span>
  );
}
