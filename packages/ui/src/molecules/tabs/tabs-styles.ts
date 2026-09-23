import { cn } from "../../lib/cn";

export function getTabsClassName(className?: string) {
  return cn("font-body", className);
}

export function getTabsListClassName(wrap?: boolean, className?: string) {
  return cn(
    "relative flex items-end",
    "after:absolute after:inset-x-0 after:bottom-0 after:h-1 after:bg-stroke-weak after:content-['']",
    wrap && "flex-wrap content-start",
    className,
  );
}

export function getTabsTriggerClassName({
  selected,
  disabled,
}: {
  selected: boolean;
  disabled: boolean;
}) {
  return cn(
    "relative inline-flex h-12 shrink-0 items-center gap-2 px-4 outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
    disabled && "pointer-events-none",
    selected
      ? cn(
          "z-10 border-b-4 border-primary font-semibold text-primary",
          !disabled && "hover:bg-fill-hover active:bg-fill-press",
          disabled && "border-stroke-disabled text-text-disabled",
        )
      : cn(
          "font-normal text-fg-weak",
          !disabled && "hover:bg-fill-hover active:bg-fill-press",
          disabled && "text-text-disabled",
        ),
  );
}

export function getTabsTriggerLabelClassName() {
  return cn("whitespace-nowrap text-small leading-6");
}

export function getTabsTriggerIconClassName(selected: boolean) {
  return cn(
    "grid size-5 shrink-0 place-items-center [&>svg]:size-full",
    selected ? "text-icon-brand" : "text-icon-neutral",
  );
}

export function getTabsPanelClassName(className?: string) {
  return cn("pt-6", className);
}
