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
      "flex flex-col gap-12 md:gap-16 lg:flex-row lg:items-center lg:gap-0",
    layout === "horizontal" && "lg:pl-[120px]",
    layout === "horizontal-padded" &&
      "gap-12 px-8 py-16 md:gap-16 lg:gap-8 lg:px-[120px] lg:py-24",
    isVertical(layout) && "flex flex-col items-center gap-12 md:gap-0",
    layout === "vertical-large" && "px-8 md:px-12 lg:px-[120px]",
    layout === "vertical-small" &&
      "px-8 pb-16 md:px-12 md:pb-24 lg:px-[120px] lg:pb-24",
    className,
  );
}

export function getHeroContentClassName(layout: HeroLayout) {
  return cn(
    "flex w-full flex-col gap-8",
    isHorizontal(layout) && "flex-1 items-start",
    layout === "horizontal" &&
      "px-8 pt-16 md:px-12 md:pt-20 lg:px-0 lg:pt-32 lg:pr-16",
    layout === "horizontal-padded" && "gap-10 lg:pr-8",
    isVertical(layout) &&
      "max-w-[790px] items-center px-8 pt-16 md:pt-24 pb-12 md:pb-16",
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

export function getHeroTitleClassName(layout: HeroLayout) {
  return cn(
    "w-full font-semibold text-fg-strong",
    "text-[36px] leading-[44px] tracking-[-0.5px]",
    "md:text-[56px] md:leading-[64px] md:tracking-[-1px]",
    isVertical(layout) && "text-center",
  );
}

export function getHeroDescriptionClassName(layout: HeroLayout) {
  return cn(
    "w-full font-normal text-fg-weak",
    "text-small leading-6",
    "md:text-heading-4 md:leading-7",
    isVertical(layout) && "text-center",
  );
}

export function getHeroEyebrowClassName(layout: HeroLayout) {
  return cn(
    "text-tiny font-semibold uppercase leading-5 tracking-[2px] text-fg-weak [word-break:break-word]",
    isVertical(layout) && "text-center",
  );
}

export function getHeroSlotClassName(layout: HeroLayout) {
  return cn(
    "w-full",
    isVertical(layout) && "flex justify-center",
  );
}

export function getHeroMediaWrapperClassName(layout: HeroLayout) {
  return cn(
    "w-full shrink-0",
    layout === "horizontal" &&
      "h-[364px] md:h-[600px] lg:h-auto lg:min-h-[712px] lg:flex-1 lg:self-stretch",
    layout === "horizontal-padded" &&
      "h-[364px] md:min-h-[280px] lg:flex-1 lg:self-stretch",
    isVertical(layout) && "w-full",
    layout === "vertical" && "h-[428px] md:h-[600px]",
    layout === "vertical-large" && "h-[428px] md:h-[600px]",
    layout === "vertical-small" &&
      "h-[360px] w-full max-w-[790px] md:h-[530px]",
  );
}

export function getHeroMediaClassName(layout: HeroLayout) {
  return cn(
    "relative h-full w-full overflow-hidden [&>*]:block [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
    (layout === "horizontal-padded" || layout === "vertical-small") &&
      "rounded-3xl",
    layout === "vertical-large" && "rounded-t-3xl",
  );
}
