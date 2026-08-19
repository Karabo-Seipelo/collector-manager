"use client";

import * as React from "react";

const cx = (...c: Array<string | false | undefined>) => c.filter(Boolean).join(" ");

type ButtonType = "primary" | "secondary" | "tertiary";
type ButtonTone = "brand" | "neutral" | "destructive" | "inverse";
type ButtonSize = "xsmall" | "small" | "medium" | "large";

const sizes: Record<ButtonSize, { root: string, text: string; icon: string; square: string}> = {
  xsmall: {
    root: "h-8 px-3 gap-1",
    text: "text-xs leading-4",
    icon: "size-4",
    square: "size-8",
  },
  small: {
    root: "h-10 px-4 gap-1",
    text: "text-sm leading-5",
    icon: "size-5",
    square: "size-10",
  },
  medium: {
    root: "h-12 px-5 gap-1",
    text: "text-base leading-6",
    icon: "size-6",
    square: "size-12",
  },
  large: {
    root: "h-14 px-6 gap-1",
    text: "text-base  leading-6",
    icon: "size-7",
    square: "size-14",
  }
};

const tones: Record<ButtonType, Record<ButtonTone, string>> = {
  primary: {
    brand: "bg-primary text-white shadow-raised hover:bg-primary/90 text-white active:bg-[#37489f] focus-visible:ring-[#4c64d9]",
    neutral: "bg-neutral-900 text-white shadow-raised hover:bg-neutral-800 active:bg-neutral-700 focus-visible:ring-neutral-900",
    destructive: "bg-red-600 text-white shadow-raised hover:bg-red-700 active:bg-red-800 focus-visible:ring-red-600",
    inverse: "bg-white text-neutral-900 shadow-raised hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-white"
  },
  secondary: {
    brand: "bg-white text-[#4c64d9] border border-[#4c64d9] hover:bg-[#4c64d9]/5 active:bg-[#4c64d9]/10 focus-visible:ring-[#4c64d9]",
    neutral: "bg-white text-neutral-900 border border-neutral-300  hover:bg-neutral-50 active:bg-neutral-100 focus-visible:ring-neutral-900",
    destructive: "bg-white text-red-600 border border-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-600",
    inverse: "bg-transpatent text-white border border-white/60 hover:bg-white/10 active:bg-white/2 focus-visible:ring-white"
  },
  tertiary: {
    brand: "bg-transparent text-[#4c664d9] hover:bg-[#4c64d9]/8 active:bg-[#4c64d9]/15 focus-visible:ring-[#4c64d9]",
    neutral: "bg-transparent text-neutral-900 hover:bg-neutral-100 active:bg-neutral-200 focus-visible:ring-neutral-900",
    destructive: "bg-transperant text-red-600 hover:bg-red-50 active:bg-red-100 focus-visible:ring-red-600",
    inverse: "bg-transparent text-white hover:bg-white/10 active:bg-white/20 focus-visible:ring-white"
  },
};


export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonType;
  tone?: ButtonTone;
  size?: ButtonSize;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: React.ReactNode;
  fullWidth?: boolean;
};

function Icon({className, children}: {className: string, children: React.ReactNode}) {
  return (
    <span 
      aria-hidden="true"
      className={cx("grid shrink-0 place-items-center [&>svg]:size-full", className)}
      >
      {children}
    </span>
  )
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({
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
  }, ref){
    const s = sizes[size];
    const base = cx(
      "inline-flex items-center justify-center rounded-lg font-semibold",
      "transition-colors outline-none",
      "focus-visible:ring-2 focus-visible:ring-offset-2",
      "disabled:pointer-events-none disabled:opacity-40 disabled:shadow-none",
      tones[variant][tone],
    );

    if (iconOnly) {
      return (
        <button ref={ref} disabled={disabled} className={cx(base, s.square, "shrink-0", className)} {...rest}>
          <Icon className={s.icon}>{iconOnly}</Icon>
        </button>
      )
    }

    return (
      <button
        ref={ref}
        disabled={disabled}
        className={cx(base, s.root, s.text, fullWidth ? "w-full" : "w-fit", className)}      
        {...rest}
        >
        {iconLeft && <Icon className={s.icon}>{iconLeft}</Icon>}
        <span className="whitespace-nowrap px-1">{children}</span>
        {iconRight && <Icon className={s.icon}>{iconRight}</Icon>}
      </button>
    );
  }
);
