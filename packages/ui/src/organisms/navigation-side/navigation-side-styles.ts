import { cn } from "../../lib/cn";

export function getNavigationSideClassName(className?: string) {
  return cn(
    "flex w-80 max-w-full shrink-0 flex-col border-stroke-weak bg-fill-inverse",
    "md:relative md:h-auto md:min-h-svh md:self-stretch md:translate-x-0 md:border-r",
    "max-md:fixed max-md:inset-y-0 max-md:left-0 max-md:z-50 max-md:h-full max-md:border-r max-md:shadow-overlay",
    "max-md:transition-transform max-md:duration-300 max-md:ease-out motion-reduce:max-md:transition-none",
    className,
  );
}

export function getNavigationSideOpenClassName(open: boolean) {
  return open
    ? "max-md:translate-x-0"
    : "max-md:pointer-events-none max-md:-translate-x-full";
}

export function getNavigationSideOverlayClassName(visible: boolean) {
  return cn(
    "fixed inset-0 z-40 bg-fill-overlay md:hidden",
    "transition-opacity duration-300 ease-out motion-reduce:transition-none",
    visible ? "opacity-100" : "pointer-events-none opacity-0",
  );
}

export function getNavigationSideMobileHeaderClassName(className?: string) {
  return cn(
    "flex h-[72px] shrink-0 items-center gap-6 border-b border-stroke-weak bg-fill-inverse px-8 md:hidden",
    className,
  );
}

export function getNavigationSideTopClassName(className?: string) {
  return cn("flex shrink-0 flex-col py-3", className);
}

export function getNavigationSideLogoClassName(className?: string) {
  return cn(
    "flex h-[68px] shrink-0 flex-col justify-center px-6 py-3",
    className,
  );
}

export function getNavigationSideSectionClassName(className?: string) {
  return cn("flex shrink-0 flex-col px-6 py-3", className);
}

export function getNavigationSideContentClassName(className?: string) {
  return cn("flex min-h-0 flex-1 flex-col overflow-y-auto", className);
}

export function getNavigationSideBottomClassName(className?: string) {
  return cn("mt-auto flex w-full shrink-0 flex-col pb-3", className);
}

export function getNavigationSideItemClassName({
  selected,
  className,
}: {
  selected?: boolean;
  className?: string;
}) {
  return cn(
    "flex w-full items-center gap-3 px-6 py-3 text-left text-small leading-6 text-fg-strong outline-none [word-break:break-word]",
    "hover:bg-fill-hover active:bg-fill-press",
    "focus-visible:bg-fill-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stroke-focus",
    selected && "border-l-4 border-primary bg-fill-hover pl-[calc(1.5rem-4px)]",
    className,
  );
}

export function getNavigationSideItemIconClassName() {
  return "grid size-6 shrink-0 place-items-center text-icon-neutral [&>svg]:size-full";
}

export function getNavigationSideItemLabelClassName() {
  return "min-w-0 flex-1";
}

export function getNavigationSideHeaderClassName(className?: string) {
  return cn(
    "flex flex-col justify-center px-6 pb-1 pt-4 text-tiny font-semibold leading-5 text-fg-weak",
    className,
  );
}

export function getNavigationSideDividerClassName(full?: boolean) {
  return cn("flex shrink-0 flex-col", full ? "py-6" : "px-6 py-6");
}
