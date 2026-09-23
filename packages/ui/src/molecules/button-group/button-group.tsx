"use client";

import * as React from "react";

import type { ButtonProps } from "../../atoms/button/button";
import type { ButtonSize, ButtonTone, ButtonType } from "../../lib/button-types";
import { cn } from "../../lib/cn";

const variants: ButtonType[] = ["primary", "secondary", "tertiary"];

export type ButtonGroupLayout = "horizontal" | "vertical" | "responsive";
export type ButtonGroupOrder = "default" | "reverse";

export interface ButtonGroupProps {
  layout?: ButtonGroupLayout;
  order?: ButtonGroupOrder;
  size?: ButtonSize;
  tone?: ButtonTone;
  className?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  children: React.ReactNode;
}

export function ButtonGroup({
  layout = "horizontal",
  order = "default",
  size = "medium",
  tone = "brand",
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: ButtonGroupProps) {
  const responsive = layout === "responsive";
  const vertical = layout === "vertical";
  const buttons = React.Children.toArray(children)
    .filter(React.isValidElement)
    .map((child, index) =>
      React.cloneElement(child as React.ReactElement<ButtonProps>, {
        variant: variants[index],
        size,
        tone,
        fullWidth: vertical,
        className: cn(
          responsive && "w-full md:w-auto",
          (child as React.ReactElement<ButtonProps>).props.className,
        ),
      }),
    );

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      aria-labelledby={ariaLabelledBy}
      className={cn(
        "inline-flex gap-4",
        vertical && "w-[364px] flex-col items-stretch",
        responsive && "w-full flex-col items-stretch md:w-auto md:flex-row md:items-start",
        !vertical && !responsive && "items-start",
        className,
      )}
    >
      {order === "reverse" ? [...buttons].reverse() : buttons}
    </div>
  );
}
