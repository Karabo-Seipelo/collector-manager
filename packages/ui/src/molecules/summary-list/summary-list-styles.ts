import { cn } from "../../lib/cn";

export function getSummaryListClassName(className?: string) {
  return cn(
    "w-full border-t border-stroke-weak",
    className,
  );
}

export function getSummaryListRowClassName() {
  return cn(
    "flex min-h-20 items-center border-b border-stroke-weak",
  );
}

export function getSummaryListTermClassName() {
  return cn(
    "min-w-0 flex-1 break-words pr-6 text-small font-semibold leading-6 text-fg-weak",
  );
}

export function getSummaryListDescriptionClassName() {
  return cn(
    "min-w-0 flex-1 break-words pr-6 text-small font-normal leading-6 text-fg-weak",
  );
}

export function getSummaryListActionClassName() {
  return cn(
    "flex shrink-0 items-center justify-end gap-4 pl-6",
  );
}

export function getSummaryListActionLinksClassName() {
  return cn("flex items-center gap-4");
}

export function getSummaryListActionIconsClassName() {
  return cn("flex items-center justify-end");
}
