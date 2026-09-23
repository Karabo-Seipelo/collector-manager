import { cn } from "../../lib/cn";

export type TooltipSize = "small" | "large";
export type TooltipPlacement =
  | "bottom-left"
  | "bottom-right"
  | "bottom-center"
  | "top-left"
  | "top-right"
  | "top-center"
  | "left"
  | "right";

export type TooltipArrowAlign = "left" | "center" | "right";

export function parseTooltipPlacement(placement: TooltipPlacement): {
  side: "top" | "bottom" | "left" | "right";
  arrowAlign: TooltipArrowAlign;
} {
  if (placement === "left" || placement === "right") {
    return { side: placement, arrowAlign: "center" };
  }

  const [side, arrowAlign = "center"] = placement.split("-") as [
    "top" | "bottom",
    TooltipArrowAlign?,
  ];

  return { side, arrowAlign };
}

export function getTooltipRootClassName(className?: string) {
  return cn("relative inline-flex w-fit", className);
}

export function getTooltipBubbleClassName(
  size: TooltipSize,
  side: "top" | "bottom" | "left" | "right",
) {
  return cn(
    "relative z-[1] rounded-xl bg-fill-inverse-strong px-8 py-6 shadow-overlay",
    size === "large" && "flex max-w-[364px] flex-col gap-1",
    side === "bottom" && "-mb-px",
    side === "top" && "-mt-px",
    side === "right" && "-mr-px",
  );
}

export function getTooltipHeadingClassName() {
  return cn(
    "text-tiny font-semibold leading-5 text-text-inverse-strong [word-break:break-word]",
  );
}

export function getTooltipBodyClassName(size: TooltipSize) {
  return cn(
    "text-tiny leading-5 [word-break:break-word]",
    size === "small"
      ? "whitespace-nowrap text-text-inverse-strong"
      : "text-text-inverse-weak",
  );
}

export function getTooltipBubbleWrapperClassName({
  side,
  arrowAlign,
}: {
  side: "top" | "bottom" | "left" | "right";
  arrowAlign: TooltipArrowAlign;
}) {
  if (side === "left" || side === "right") {
    return cn("relative isolate flex items-center");
  }

  return cn(
    "relative flex flex-col",
    side === "top" && "flex-col-reverse",
    arrowAlign === "left" && "items-start",
    arrowAlign === "center" && "items-center",
    arrowAlign === "right" && "items-end",
  );
}

const placementClasses: Record<TooltipPlacement, string> = {
  "bottom-left": "left-0 top-[calc(100%+8px)] origin-top-left",
  "bottom-right": "right-0 top-[calc(100%+8px)] origin-top-right",
  "bottom-center":
    "left-1/2 top-[calc(100%+8px)] -translate-x-1/2 origin-top",
  "top-left": "left-0 bottom-[calc(100%+8px)] origin-bottom-left",
  "top-right": "right-0 bottom-[calc(100%+8px)] origin-bottom-right",
  "top-center":
    "left-1/2 bottom-[calc(100%+8px)] -translate-x-1/2 origin-bottom",
  left: "right-[calc(100%+8px)] top-1/2 -translate-y-1/2 origin-right",
  right: "left-[calc(100%+8px)] top-1/2 -translate-y-1/2 origin-left",
};

export function getTooltipContentClassName(
  placement: TooltipPlacement,
  className?: string,
) {
  return cn(
    "absolute z-50 w-max transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
    placementClasses[placement],
    className,
  );
}
