"use client";

import * as React from "react";

import { Button } from "../button/button";
import type { ButtonTone, ButtonType } from "../../lib/button-types";
import { cn } from "../../lib/cn";

export type ButtonIconSize = "small" | "medium";
export type ButtonIconShape = "square" | "circle";
export type ButtonIconBadge = "dot" | number;

export interface ButtonIconProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children" | "aria-label"
  > {
  icon: React.ReactNode;
  variant?: ButtonType;
  tone?: ButtonTone;
  size?: ButtonIconSize;
  shape?: ButtonIconShape;
  badge?: ButtonIconBadge;
  "aria-label": string;
}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  function ButtonIcon(
    {
      icon,
      variant = "primary",
      tone = "brand",
      size = "medium",
      shape = "square",
      badge,
      className,
      ...rest
    },
    ref,
  ) {
    const count = typeof badge === "number" ? badge : undefined;

    return (
      <span className="relative inline-flex shrink-0">
        <Button
          ref={ref}
          variant={variant}
          tone={tone}
          size={size}
          iconOnly={icon}
          className={cn(
            shape === "circle" && "rounded-full",
            size === "medium" && "[&>span]:!size-6",
            className,
          )}
          {...rest}
        />
        {badge === "dot" ? (
          <span
            data-testid="button-icon-badge-dot"
            aria-hidden="true"
            className="pointer-events-none absolute top-2 right-2 size-2 rounded-full bg-text-error"
          />
        ) : null}
        {count != null ? (
          <span
            data-testid="button-icon-badge-count"
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 left-[31px] flex h-6 min-w-6 items-center justify-center rounded-full border-2 border-white bg-text-error px-2 text-white shadow-raised"
          >
            <span className="text-tiny font-normal">{count}</span>
          </span>
        ) : null}
      </span>
    );
  },
);
