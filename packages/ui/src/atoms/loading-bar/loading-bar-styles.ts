import { cn } from "../../lib/cn";

export function getLoadingBarClassName({
  showLabel,
  className,
}: {
  showLabel: boolean;
  className?: string;
}) {
  return cn(
    "flex w-full items-center",
    showLabel && "gap-2",
    className,
  );
}

export function getLoadingBarTrackClassName() {
  return cn(
    "relative h-2 min-w-0 flex-1 overflow-hidden rounded-full border border-stroke-weak bg-fill-weak shadow-sunken",
  );
}

export function getLoadingBarFillClassName() {
  return cn(
    "absolute inset-y-0 left-0 rounded-full bg-primary shadow-sunken",
  );
}

export function getLoadingBarLabelClassName() {
  return cn(
    "w-[41px] shrink-0 text-right text-tiny leading-5 text-fg-weak [word-break:break-word]",
  );
}
