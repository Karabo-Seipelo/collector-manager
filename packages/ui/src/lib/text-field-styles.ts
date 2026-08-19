import { cn } from "./cn";

export type TextFieldVisualState = "default" | "hover" | "press" | "focus";

interface TextFieldBoxOptions {
  invalid: boolean;
  disabled: boolean;
  multiline: boolean;
  state: TextFieldVisualState;
}

export function getTextFieldBoxClassName({
  invalid,
  disabled,
  multiline,
  state,
}: TextFieldBoxOptions) {
  const pinned = state !== "default";

  return cn(
    "relative flex w-full gap-2 rounded-lg border text-base transition-colors duration-100",
    "before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:content-['']",
    multiline ? "min-h-[160px] items-start" : "h-12 items-center",
    invalid
      ? "border-2 border-stroke-error-strong bg-fill-error-weak"
      : disabled
        ? "cursor-not-allowed border-stroke-disabled bg-fill-inverse"
        : "border-stroke-strong bg-fill-inverse",
    !disabled &&
      !pinned &&
      "hover:before:bg-fill-hover active:before:bg-fill-press",
    !disabled &&
      !pinned &&
      cn(
        "focus-within:outline focus-within:outline-2 focus-within:outline-stroke-focus",
        invalid ? "focus-within:outline-offset-4" : "focus-within:outline-offset-3",
      ),
    state === "hover" && "before:bg-fill-hover",
    state === "press" && "before:bg-fill-press",
    state === "focus" &&
      cn(
        "outline outline-2 outline-stroke-focus",
        invalid ? "outline-offset-4" : "outline-offset-3",
      ),
  );
}

export function getTextFieldControlClassName(
  multiline: boolean,
  leadingIcon: boolean,
) {
  return cn(
    "w-full min-w-0 bg-transparent text-base leading-6 outline-none",
    "text-fg-strong placeholder:text-fg-weak",
    "disabled:cursor-not-allowed disabled:text-text-disabled",
    multiline ? "resize-none px-4 py-3" : "h-full",
    !leadingIcon && !multiline && "px-4",
    leadingIcon && !multiline && "pr-4",
  );
}

export const textFieldClearButtonClassName =
  "pr-4 text-fg-weak hover:text-fg-strong focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus";
