import { cn } from "../../lib/cn";
import type { TextFieldVisualState } from "../../lib/text-field-styles";

export type SearchInputVariant = "default" | "button";
export type SearchInputSize = "small" | "medium";

interface SearchFieldOptions {
  variant: SearchInputVariant;
  size: SearchInputSize;
  disabled: boolean;
  state: TextFieldVisualState;
}

export function getSearchGroupClassName({
  variant,
  disabled,
  state,
}: Pick<SearchFieldOptions, "variant" | "disabled" | "state">) {
  if (variant !== "button") {
    return "flex w-full";
  }

  const pinned = state !== "default";

  return cn(
    "relative flex w-full items-stretch",
    !disabled &&
      !pinned &&
      "focus-within:outline focus-within:outline-2 focus-within:outline-stroke-focus focus-within:outline-offset-3 focus-within:rounded-xl",
    state === "focus" &&
      "rounded-xl outline outline-2 outline-stroke-focus outline-offset-3",
  );
}

export function getSearchFieldClassName({
  variant,
  size,
  disabled,
  state,
}: SearchFieldOptions) {
  const pinned = state !== "default";

  return cn(
    "relative flex min-w-0 flex-1 items-center border bg-fill-inverse transition-colors duration-100",
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:content-['']",
    size === "medium" ? "h-12 gap-2" : "h-8 gap-1",
    variant === "button" ? "rounded-l-lg border-r-0" : "rounded-lg",
    disabled
      ? "cursor-not-allowed border-stroke-disabled"
      : "border-stroke-strong",
    !disabled &&
      !pinned &&
      "hover:before:bg-fill-hover active:before:bg-fill-press",
    variant === "default" &&
      !disabled &&
      !pinned &&
      "focus-within:outline focus-within:outline-2 focus-within:outline-stroke-focus focus-within:outline-offset-3",
    state === "hover" && "before:bg-fill-hover",
    state === "press" && "before:bg-fill-press",
    variant === "default" &&
      state === "focus" &&
      "outline outline-2 outline-stroke-focus outline-offset-3",
  );
}

export function getSearchFieldPadding(size: SearchInputSize) {
  return size === "medium" ? "px-4" : "px-3";
}

export function getSearchInputClassName(size: SearchInputSize) {
  return cn(
    "min-w-0 flex-1 bg-transparent text-fg-strong outline-none",
    "placeholder:text-fg-weak",
    "disabled:cursor-not-allowed disabled:text-text-disabled disabled:placeholder:text-text-disabled",
    size === "medium"
      ? "text-[length:var(--text-small)] leading-6"
      : "text-[length:var(--text-tiny)] leading-5",
  );
}

export function getSearchButtonClassName(size: SearchInputSize) {
  return cn(
    "relative shrink-0 bg-primary text-text-inverse-strong shadow-raised outline-none transition-colors",
    "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:content-['']",
    "hover:before:bg-fill-hover active:before:bg-fill-press",
    "disabled:pointer-events-none disabled:bg-fill-disabled disabled:text-white disabled:shadow-none disabled:before:bg-transparent",
    size === "medium"
      ? "h-12 rounded-r-lg px-4 text-small font-semibold leading-6"
      : "h-8 rounded-r-lg px-3 text-tiny font-semibold leading-5",
  );
}

export function getSearchClearButtonClassName(size: SearchInputSize) {
  return cn(
    "shrink-0 text-fg-weak outline-none hover:text-fg-strong",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus",
    "disabled:pointer-events-none disabled:text-text-disabled",
    size === "medium" ? "size-6" : "size-4",
  );
}
