"use client";

import * as React from "react";

import { cn } from "../../lib/cn";

export type TextLinkSize = "tiny" | "small";
export type TextLinkTone =
  | "brand"
  | "neutral-strong"
  | "neutral-weak"
  | "destructive"
  | "inverse-strong"
  | "inverse-weak";
export type TextLinkWeight = "regular" | "bold";

const sizes: Record<TextLinkSize, string> = {
  tiny: "text-tiny leading-5",
  small: "text-small leading-6",
};

const tones: Record<TextLinkTone, string> = {
  brand: "text-primary",
  "neutral-strong": "text-fg-strong",
  "neutral-weak": "text-fg-weak",
  destructive: "text-text-error",
  "inverse-strong": "text-text-inverse-strong",
  "inverse-weak": "text-text-inverse-weak",
};

export interface TextLinkProps
  extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "className"> {
  size?: TextLinkSize;
  tone?: TextLinkTone;
  weight?: TextLinkWeight;
  underline?: boolean;
  disabled?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  className?: string;
}

function IconSlot({ children }: { children: React.ReactNode }) {
  return (
    <span
      aria-hidden="true"
      className="grid size-5 shrink-0 place-items-center [&>svg]:size-full"
    >
      {children}
    </span>
  );
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  function TextLink(
    {
      size = "tiny",
      tone = "brand",
      weight = "regular",
      underline = true,
      iconLeft,
      iconRight,
      disabled = false,
      className,
      children,
      onClick,
      tabIndex,
      ...rest
    },
    ref,
  ) {
    return (
      <a
        ref={ref}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : tabIndex}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }

          onClick?.(event);
        }}
        className={cn(
          "inline-flex w-fit items-center gap-2 whitespace-nowrap outline-none transition-colors",
          "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
          "aria-disabled:pointer-events-none",
          tones[tone],
          className,
        )}
        {...rest}
      >
        {iconLeft ? <IconSlot>{iconLeft}</IconSlot> : null}
        <span
          className={cn(
            sizes[size],
            weight === "bold" ? "font-semibold" : "font-normal",
            underline
              ? disabled
                ? "underline"
                : "underline hover:no-underline active:no-underline"
              : undefined,
            disabled && "text-text-disabled",
          )}
        >
          {children}
        </span>
        {iconRight ? <IconSlot>{iconRight}</IconSlot> : null}
      </a>
    );
  },
);
