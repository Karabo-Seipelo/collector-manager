"use client";

import * as React from "react";

import { BadgeCount } from "../badge-count/badge-count";
import { BadgeDot } from "../badge-dot/badge-dot";
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
          <BadgeDot
            type="notification"
            size="small"
            className="pointer-events-none absolute top-2 right-2"
          />
        ) : null}
        {count != null ? (
          <BadgeCount
            aria-hidden="true"
            className="pointer-events-none absolute -top-2 left-[31px] ring-2 ring-white shadow-raised"
          >
            {count}
          </BadgeCount>
        ) : null}
      </span>
    );
  },
);
