import { cn } from "../../lib/cn";

export function getProgressIndicatorClassName(className?: string) {
  return cn("flex w-full flex-col items-start gap-4", className);
}

export function getProgressIndicatorHeaderClassName() {
  return cn("flex w-full flex-col gap-2");
}

export function getProgressIndicatorLabelClassName() {
  return cn(
    "w-full text-small font-semibold leading-6 text-fg-strong [word-break:break-word]",
  );
}

export function getProgressIndicatorStepsClassName() {
  return cn("flex w-full gap-1");
}

export function getProgressIndicatorStepClassName(complete: boolean) {
  return cn(
    "h-2 min-w-px flex-1 rounded",
    complete
      ? "bg-primary"
      : "border border-stroke-weak bg-fill-weak shadow-sunken",
  );
}
