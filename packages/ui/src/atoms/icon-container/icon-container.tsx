import * as React from "react";

import { cn } from "../../lib/cn";

export type IconContainerTone =
  | "neutral"
  | "brand"
  | "inverse"
  | "destructive"
  | "warning"
  | "success"
  | "information";

export type IconContainerVariant = "filled" | "stroked";

const tones: Record<
  IconContainerTone,
  { fill: string; stroke: string; icon: string }
> = {
  neutral: {
    fill: "bg-fill-weak",
    stroke: "border-stroke-weak",
    icon: "text-icon-neutral",
  },
  brand: {
    fill: "bg-fill-brand-weak",
    stroke: "border-stroke-brand-weak",
    icon: "text-icon-brand",
  },
  inverse: {
    fill: "bg-fill-inverse-weak",
    stroke: "border-stroke-inverse-weak",
    icon: "text-icon-inverse",
  },
  destructive: {
    fill: "bg-fill-error-weak",
    stroke: "border-stroke-error-weak",
    icon: "text-icon-error",
  },
  warning: {
    fill: "bg-fill-warning-weak",
    stroke: "border-stroke-warning-weak",
    icon: "text-icon-warning",
  },
  success: {
    fill: "bg-fill-success-weak",
    stroke: "border-stroke-success-weak",
    icon: "text-icon-success",
  },
  information: {
    fill: "bg-fill-information-weak",
    stroke: "border-stroke-information-weak",
    icon: "text-icon-information",
  },
};

export interface IconContainerProps extends Omit<
  React.HTMLAttributes<HTMLSpanElement>,
  "children"
> {
  icon: React.ReactNode;
  tone?: IconContainerTone;
  variant?: IconContainerVariant;
}

export const IconContainer = React.forwardRef<
  HTMLSpanElement,
  IconContainerProps
>(function IconContainer(
  { icon, tone = "neutral", variant = "filled", className, ...rest },
  ref,
) {
  const toneClasses = tones[tone];

  return (
    <span
      ref={ref}
      className={cn(
        "inline-grid size-12 shrink-0 place-items-center rounded-full",
        toneClasses.icon,
        variant === "filled"
          ? toneClasses.fill
          : cn("border", toneClasses.stroke),
        className,
      )}
      {...rest}
    >
      <span
        aria-hidden="true"
        className="grid size-6 shrink-0 place-items-center [&>svg]:size-full"
      >
        {icon}
      </span>
    </span>
  );
});
