import { cn } from "../../lib/cn";

export type HeroLayout =
  | "horizontal"
  | "horizontal-padded"
  | "vertical"
  | "vertical-large"
  | "vertical-small";

function isHorizontal(layout: HeroLayout) {
  return layout === "horizontal" || layout === "horizontal-padded";
}

function isVertical(layout: HeroLayout) {
  return layout.startsWith("vertical");
}

export function getHeroClassName({
  layout,
  className,
}: {
  layout: HeroLayout;
  className?: string;
}) {
  return cn(
    "w-full overflow-hidden border-b border-stroke-weak bg-fill-weaker font-body",
    isHorizontal(layout) &&
      "flex flex-col lg:flex-row lg:items-center",
    layout === "horizontal" && "pl-8 lg:pl-[120px]",
    layout === "horizontal-padded" &&
      "gap-8 px-8 py-16 lg:px-[120px] lg:py-24",
    isVertical(layout) && "flex flex-col items-center",
    layout === "vertical-large" && "px-8 lg:px-[120px]",
    layout === "vertical-small" && "px-8 pb-16 lg:px-[120px] lg:pb-24",
    className,
  );
}

export function getHeroContentClassName(layout: HeroLayout) {
  return cn(
    "flex w-full flex-col gap-8",
    isHorizontal(layout) && "flex-1 items-start",
    layout === "horizontal" && "py-16 pr-8 lg:py-32 lg:pr-16",
    layout === "horizontal-padded" && "gap-10 py-8 lg:pr-8",
    isVertical(layout) && "max-w-[790px] items-center px-8 pt-16 lg:pt-24 pb-12 lg:pb-16",
  );
}

export function getHeroTopContainerClassName(layout: HeroLayout) {
  return cn(
    "flex w-full flex-col gap-4",
    isHorizontal(layout) ? "items-start" : "items-center",
  );
}

export function getHeroTextBlockClassName(layout: HeroLayout) {
  return cn(
    "flex w-full flex-col gap-6 [word-break:break-word]",
    isVertical(layout) && "text-center",
  );
}

export function getHeroTitleClassName() {
  return cn(
    "w-full font-semibold tracking-[-1px] text-fg-strong",
    "text-[40px] leading-[48px] lg:text-[56px] lg:leading-[64px]",
  );
}

export function getHeroDescriptionClassName() {
  return "w-full text-heading-4 font-normal leading-7 text-fg-weak";
}

export function getHeroEyebrowClassName(layout: HeroLayout) {
  return cn(
    "text-tiny font-semibold uppercase leading-5 tracking-[2px] text-fg-weak [word-break:break-word]",
    isVertical(layout) && "text-center",
  );
}

export function getHeroMediaWrapperClassName(layout: HeroLayout) {
  return cn(
    isHorizontal(layout) && "flex flex-1 self-stretch lg:min-h-[712px]",
    layout === "horizontal-padded" && "min-h-[280px]",
    isVertical(layout) && "w-full shrink-0",
    layout === "vertical" && "h-[400px] lg:h-[600px]",
    layout === "vertical-large" && "h-[400px] lg:h-[600px]",
    layout === "vertical-small" && "h-[360px] w-full max-w-[790px] lg:h-[530px]",
  );
}

export function getHeroMediaClassName(layout: HeroLayout) {
  return cn(
    "relative h-full min-h-[280px] w-full overflow-hidden [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
    layout === "horizontal-padded" && "rounded-3xl",
    layout === "vertical-large" && "rounded-t-3xl",
    layout === "vertical-small" && "rounded-3xl",
  );
}
