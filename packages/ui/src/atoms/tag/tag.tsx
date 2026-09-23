"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export type TagSize = "small" | "medium";

const sizes: Record<TagSize, { root: string; icon: string }> = {
  small: {
    root: "h-6 gap-1 px-2 text-tiny leading-5",
    icon: "size-3.5",
  },
  medium: {
    root: "h-8 gap-1 px-3 text-small leading-6",
    icon: "size-4",
  },
};

export interface TagProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  size?: TagSize;
  icon?: React.ReactNode;
}

export const Tag = React.forwardRef<HTMLButtonElement, TagProps>(function Tag(
  {
    selected = false,
    size = "medium",
    icon,
    className,
    children,
    disabled,
    type = "button",
    ...rest
  },
  ref,
) {
  const s = sizes[size];

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "inline-flex w-fit items-center justify-center rounded-2xl font-normal whitespace-nowrap",
        "transition-colors outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-40",
        selected
          ? "bg-primary text-primary-foreground hover:bg-primary/90 active:bg-primary-active"
          : "border border-stroke-weak bg-fill-weak text-fg-strong hover:bg-fill-hover active:bg-fill-press",
        s.root,
        className,
      )}
      {...rest}
    >
      {icon ? (
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
      <span className="px-1">{children}</span>
    </button>
  );
});
