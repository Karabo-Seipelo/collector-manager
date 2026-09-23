import { cn } from "../../lib/cn";

export type SegmentedControlSize = "small" | "medium";

const sizes: Record<
  SegmentedControlSize,
  { root: string; label: string; icon: string; padding: string }
> = {
  medium: {
    root: "h-12 gap-1",
    label: "text-[length:var(--text-small)] leading-6",
    icon: "size-5",
    padding: "px-4",
  },
  small: {
    root: "h-8 gap-0",
    label: "text-[length:var(--text-tiny)] leading-5",
    icon: "size-4",
    padding: "px-3",
  },
};

export function getSegmentedControlTrackClassName(className?: string) {
  return cn(
    "inline-flex w-fit items-stretch rounded-lg border border-stroke-weak bg-fill-weak",
    className,
  );
}

export function getSegmentedControlItemClassName({
  selected,
  size,
  disabled,
}: {
  selected: boolean;
  size: SegmentedControlSize;
  disabled: boolean;
}) {
  const s = sizes[size];

  return cn(
    "relative isolate inline-flex shrink-0 items-center justify-center whitespace-nowrap outline-none transition-colors",
    "focus-visible:outline focus-visible:outline-2 focus-visible:outline-stroke-focus focus-visible:outline-offset-[-4px]",
    "disabled:pointer-events-none disabled:opacity-40",
    s.root,
    s.padding,
    selected
      ? cn(
          "rounded-lg border border-stroke-strong bg-fill-inverse text-fg-strong shadow-raised",
          "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:content-['']",
          !disabled && "hover:before:bg-fill-hover active:before:bg-fill-press",
        )
      : cn(
          "text-fg-weak",
          !disabled && "hover:bg-fill-hover active:bg-fill-press",
        ),
  );
}

export function getSegmentedControlLabelClassName(size: SegmentedControlSize) {
  return cn("px-1", sizes[size].label);
}

export function getSegmentedControlIconClassName(size: SegmentedControlSize) {
  return cn(
    "grid shrink-0 place-items-center [&>svg]:size-full",
    sizes[size].icon,
  );
}
