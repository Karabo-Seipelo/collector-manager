"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { TooltipCaret } from "./tooltip-arrow";
import {
  getTooltipBodyClassName,
  getTooltipBubbleClassName,
  getTooltipBubbleWrapperClassName,
  getTooltipHeadingClassName,
  parseTooltipPlacement,
  type TooltipPlacement,
  type TooltipSize,
} from "./tooltip-styles";

export interface TooltipBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: TooltipSize;
  placement?: TooltipPlacement;
  heading?: React.ReactNode;
  children: React.ReactNode;
}

function VerticalArrow({
  flip,
  align,
}: {
  flip: boolean;
  align: "left" | "center" | "right";
}) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-start",
        align === "left" && "h-3.5 self-stretch pl-8",
        align === "right" && "h-4 self-end pr-8",
        align === "center" && "h-4 justify-center",
      )}
    >
      <TooltipCaret flip={flip} />
    </div>
  );
}

function HorizontalArrow({ side }: { side: "left" | "right" }) {
  return (
    <div
      className={cn(
        "relative z-[2] flex h-8 w-4 shrink-0 items-center justify-center",
        side === "left" && "-mr-px",
      )}
    >
      <div className={cn("flex-none", side === "left" ? "rotate-90" : "-rotate-90")}>
        <TooltipCaret />
      </div>
    </div>
  );
}

export function TooltipBubble({
  size = "small",
  placement = "bottom-left",
  heading,
  children,
  className,
  ...rest
}: TooltipBubbleProps) {
  const { side, arrowAlign } = parseTooltipPlacement(placement);

  const bubble = (
    <div className={getTooltipBubbleClassName(size, side)}>
      {size === "large" && heading ? (
        <p className={getTooltipHeadingClassName()}>{heading}</p>
      ) : null}
      <p className={getTooltipBodyClassName(size)}>{children}</p>
    </div>
  );

  return (
    <div
      className={cn(
        getTooltipBubbleWrapperClassName({ side, arrowAlign }),
        className,
      )}
      {...rest}
    >
      {side === "left" ? <HorizontalArrow side="left" /> : null}
      {bubble}
      {side === "right" ? <HorizontalArrow side="right" /> : null}
      {side === "bottom" ? (
        <VerticalArrow flip={false} align={arrowAlign} />
      ) : null}
      {side === "top" ? <VerticalArrow flip align={arrowAlign} /> : null}
    </div>
  );
}
