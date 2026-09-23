"use client";

import * as React from "react";

import type {
  ButtonSize,
  ButtonTone,
  ButtonType,
} from "../../lib/button-types";
import { cn } from "../../lib/cn";

export type {
  ButtonSize,
  ButtonTone,
  ButtonType,
} from "../../lib/button-types";

const sizes: Record<
  ButtonSize,
  { root: string; text: string; icon: string; square: string }
> = {
  small: {
    root: "h-8 gap-0 rounded-lg px-3",
    text: "text-tiny",
    icon: "size-4",
    square: "size-8 rounded-lg",
  },
  medium: {
    root: "h-12 gap-1 rounded-lg px-4",
    text: "text-small",
    icon: "size-5",
    square: "size-12 rounded-lg",
  },
  large: {
    root: "h-14 gap-1 rounded-xl px-6",
    text: "text-heading-4",
    icon: "size-6",
    square: "size-14 rounded-xl",
  },
};

const tones: Record<ButtonType, Record<ButtonTone, string>> = {
  primary: {
    brand: "bg-primary text-white shadow-raised",
    neutral:
      "bg-fg-strong text-white shadow-raised",
    destructive:
      "bg-text-error text-white shadow-raised",
    inverse:
      "bg-fill-inverse text-fg-strong shadow-raised",
  },
  secondary: {
    brand:
      "border border-primary/80 bg-white/[0.01] text-primary shadow-raised",
    neutral:
      "border border-stroke-strong bg-white/[0.01] text-fg-strong shadow-raised",
    destructive:
      "border border-stroke-error-strong bg-white/[0.01] text-text-error shadow-raised",
    inverse:
      "border border-white/60 bg-transparent text-white shadow-raised",
  },
  tertiary: {
    brand: "bg-transparent text-primary shadow-none",
    neutral: "bg-transparent text-fg-strong shadow-none",
    destructive: "bg-transparent text-text-error shadow-none",
    inverse: "bg-transparent text-white shadow-none",
  },
};

const disabledStyles: Record<ButtonType, string> = {
  primary: "disabled:bg-fill-disabled disabled:text-white",
  secondary:
    "disabled:border-stroke-disabled disabled:bg-transparent disabled:text-text-disabled",
  tertiary: "disabled:bg-transparent disabled:text-text-disabled",
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  tone?: ButtonTone;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: React.ReactNode;
  fullWidth?: boolean;
}

function Icon({
  className,
  children,
}: {
  className: string;
  children: React.ReactNode;
}) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative z-10 grid shrink-0 place-items-center [&>svg]:size-full",
        className,
      )}
    >
      {children}
    </span>
  );
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      tone = "brand",
      size = "medium",
      iconLeft,
      iconRight,
      iconOnly,
      fullWidth,
      className,
      children,
      disabled,
      ...rest
    },
    ref,
  ) {
    const s = sizes[size];
    const base = cn(
      "relative isolate inline-flex items-center justify-center font-semibold",
      "outline-none transition-colors",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit]",
      "hover:before:bg-fill-hover active:before:bg-fill-press",
      "focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:shadow-none disabled:before:bg-transparent",
      tones[variant][tone],
      disabledStyles[variant],
    );

    if (iconOnly) {
      return (
        <button
          ref={ref}
          disabled={disabled}
          className={cn(base, s.square, "shrink-0", className)}
          {...rest}
        >
          <Icon className={s.icon}>{iconOnly}</Icon>
        </button>
      );
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cn(
          base,
          s.root,
          fullWidth ? "w-full" : "w-fit",
          className,
        )}
        {...rest}
      >
        {iconLeft && <Icon className={s.icon}>{iconLeft}</Icon>}
        <span
          className={cn(
            "relative z-10 whitespace-nowrap px-1",
            s.text,
            variant === "tertiary" && "underline",
          )}
        >
          {children}
        </span>
        {iconRight && <Icon className={s.icon}>{iconRight}</Icon>}
      </button>
    );
  },
);
