import { cn } from "../../lib/cn";

export const dropdownMenuItemClassName = cn(
  "flex w-full items-center gap-3 px-4 py-3 text-left font-body text-small text-fg-strong outline-none",
  "hover:bg-fill-hover active:bg-fill-press",
  "focus-visible:bg-fill-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stroke-focus",
  "disabled:pointer-events-none disabled:opacity-30",
);

export const dropdownMenuItemSelectedClassName = "bg-fill-weak";
