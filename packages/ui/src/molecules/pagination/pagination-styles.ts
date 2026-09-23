import { cn } from "../../lib/cn";

export function getPaginationClassName(className?: string) {
  return cn("@container flex w-full items-center justify-between gap-4", className);
}

export function getPaginationControlsClassName() {
  return cn(
    "flex min-w-0 flex-1 items-center gap-4",
    "md:flex-none md:gap-2 @md:flex-none @md:gap-2",
  );
}

export function getPaginationPreviousClassName() {
  return cn("flex h-10 shrink-0 items-center md:pr-4 @md:pr-4");
}

export function getPaginationNextClassName() {
  return cn("flex h-10 shrink-0 items-center md:pl-4 @md:pl-4");
}

export function getPaginationPageClassName({
  selected,
  className,
}: {
  selected?: boolean;
  className?: string;
}) {
  return cn(
    "inline-flex size-10 shrink-0 items-center justify-center px-2.5 py-[11px] text-tiny leading-5 text-fg-weak outline-none",
    "hover:rounded-lg hover:bg-fill-hover active:rounded-lg active:bg-fill-press",
    "focus-visible:rounded-lg focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-30",
    selected &&
      "rounded-lg border border-stroke-strong hover:bg-transparent active:bg-transparent",
    className,
  );
}

export function getPaginationPagesClassName() {
  return cn("hidden items-center gap-2 md:flex @md:flex");
}

export function getPaginationSummaryClassName() {
  return cn("hidden shrink-0 text-tiny leading-5 text-fg-weak md:block @md:block");
}

export function getPaginationMobileControlClassName() {
  return cn(
    "inline-flex h-10 shrink-0 items-center text-fg-weak outline-none md:hidden @md:hidden",
    "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
    "disabled:pointer-events-none disabled:opacity-30",
  );
}

export function getPaginationDesktopControlClassName() {
  return cn("hidden md:inline-flex @md:inline-flex");
}

export function getPaginationMobileIconClassName() {
  return cn("grid size-4 shrink-0 place-items-center [&>svg]:size-full");
}

export function getPaginationMobileStatusClassName() {
  return cn(
    "min-w-0 flex-1 text-center text-tiny leading-5 text-fg-weak [word-break:break-word] md:hidden @md:hidden",
  );
}
