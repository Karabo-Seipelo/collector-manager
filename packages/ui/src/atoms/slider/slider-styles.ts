import { cn } from "../../lib/cn";

export function getSliderRootClassName(
  className?: string,
  disabled = false,
) {
  return cn(
    "flex w-full flex-col gap-2",
    disabled && "opacity-40",
    className,
  );
}

export function getSliderHeaderClassName() {
  return cn(
    "flex items-center gap-4 text-[length:var(--text-small)] leading-6",
  );
}

export function getSliderLabelClassName() {
  return cn("min-w-0 flex-1 text-fg-strong");
}

export function getSliderValueClassName() {
  return cn("shrink-0 whitespace-nowrap text-fg-weak");
}

export function getSliderTrackAreaClassName() {
  return "relative h-6 w-full";
}

export function getSliderTrackClassName() {
  return cn(
    "pointer-events-none absolute inset-x-0 top-1/2 h-2 -translate-y-1/2 rounded-full border border-stroke-weak bg-fill-weak shadow-sunken",
  );
}

export function getSliderFillClassName() {
  return cn(
    "pointer-events-none absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-primary shadow-sunken",
  );
}

export function getSliderThumbClassName() {
  return cn(
    "pointer-events-none absolute top-1/2 size-6 -translate-x-1/2 -translate-y-1/2 rounded-full border border-stroke-weak bg-fill-inverse shadow-overlay transition-colors",
    "peer-hover:bg-fill-hover peer-active:bg-fill-press",
    "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-stroke-focus peer-focus-visible:outline-offset-2",
  );
}

export function getSliderInputClassName(disabled: boolean) {
  return cn(
    "absolute inset-0 z-10 h-full w-full cursor-pointer appearance-none bg-transparent opacity-0",
    disabled && "cursor-not-allowed",
  );
}
