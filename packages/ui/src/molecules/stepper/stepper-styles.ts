import { cn } from "../../lib/cn";

export function getStepperRootClassName(className?: string) {
  return cn("flex w-full flex-col gap-1 font-body", className);
}

export function getStepperFieldClassName({
  invalid,
  disabled,
}: {
  invalid: boolean;
  disabled: boolean;
}) {
  return cn(
    "relative flex h-12 w-full items-stretch overflow-hidden rounded-lg bg-fill-inverse transition-colors",
    invalid
      ? cn(
          "border-2 border-stroke-error-strong bg-fill-error-weak shadow-raised",
          !disabled &&
            "focus-within:outline focus-within:outline-2 focus-within:outline-stroke-focus focus-within:outline-offset-4",
        )
      : disabled
        ? "border border-stroke-disabled"
        : cn(
            "border border-stroke-strong shadow-raised",
            "focus-within:outline focus-within:outline-2 focus-within:outline-stroke-focus focus-within:outline-offset-3",
          ),
  );
}

export function getStepperButtonClassName({
  side,
  invalid,
  disabled,
}: {
  side: "decrease" | "increase";
  invalid: boolean;
  disabled: boolean;
}) {
  return cn(
    "relative grid size-12 shrink-0 place-items-center bg-fill-inverse outline-none transition-colors",
    side === "decrease" ? "border-r" : "border-l",
    invalid
      ? "border-stroke-error-strong text-fg-strong"
      : disabled
        ? "border-stroke-disabled text-text-disabled"
        : cn(
            "border-stroke-strong text-fg-strong",
            "hover:bg-fill-hover active:bg-fill-press",
          ),
    "disabled:cursor-not-allowed disabled:text-text-disabled",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-stroke-focus focus-visible:outline-offset-[-4px]",
  );
}

export function getStepperInputClassName(disabled: boolean) {
  return cn(
    "min-w-0 flex-1 bg-transparent px-4 text-center text-base leading-6 text-fg-strong outline-none",
    "[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
    disabled && "cursor-not-allowed text-text-disabled",
  );
}
