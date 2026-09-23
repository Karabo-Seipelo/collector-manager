import { cn } from "../../lib/cn";

export function getNavigationHeaderClassName(className?: string) {
  return cn(
    "flex h-[72px] w-full shrink-0 items-center gap-0 border-b border-stroke-weak bg-fill-inverse px-8 md:gap-12",
    className,
  );
}

export function getNavigationHeaderLeftClassName(className?: string) {
  return cn("flex min-w-0 flex-1 items-center gap-6 md:gap-12", className);
}

export function getNavigationHeaderRightClassName(className?: string) {
  return cn("flex shrink-0 items-center gap-4", className);
}

export function getNavigationHeaderLogoClassName(className?: string) {
  return cn("flex h-12 shrink-0 items-center", className);
}

export function getNavigationHeaderNavClassName(className?: string) {
  return cn("flex min-w-0 flex-1 items-center max-md:hidden", className);
}

export function getNavigationHeaderItemClassName({
  selected,
  className,
}: {
  selected?: boolean;
  className?: string;
}) {
  return cn(
    "inline-flex h-[72px] shrink-0 items-center gap-3 px-4 text-small leading-6 text-fg-strong outline-none whitespace-nowrap",
    "hover:bg-fill-hover active:bg-fill-press",
    "focus-visible:bg-fill-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stroke-focus",
    "disabled:pointer-events-none disabled:opacity-30",
    selected && "relative z-10 -mb-px border-b-4 border-primary font-normal",
    className,
  );
}

export function getNavigationHeaderMobileDrawerClassName({
  open,
  className,
}: {
  open: boolean;
  className?: string;
}) {
  return cn(
    "fixed inset-y-0 left-0 z-50 flex h-full w-[327px] max-w-[calc(100%-3rem)] flex-col overflow-hidden border-r border-stroke-weak bg-fill-inverse shadow-overlay",
    "transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden",
    open ? "translate-x-0" : "pointer-events-none -translate-x-full",
    className,
  );
}

export function getNavigationHeaderMobileDrawerContentClassName(
  className?: string,
) {
  return cn("flex h-full min-h-0 flex-col gap-6", className);
}

export function getNavigationHeaderOverlayClassName(visible: boolean) {
  return cn(
    "fixed inset-0 z-40 bg-fill-overlay md:hidden",
    "transition-opacity duration-300 ease-out motion-reduce:transition-none",
    visible ? "opacity-100" : "pointer-events-none opacity-0",
  );
}

export function getNavigationHeaderMobileItemClassName({
  selected,
  className,
}: {
  selected?: boolean;
  className?: string;
}) {
  return cn(
    "flex w-full items-center gap-3 px-6 py-3 text-left text-small leading-6 text-fg-strong outline-none [word-break:break-word]",
    "hover:bg-fill-hover active:bg-fill-press",
    "focus-visible:bg-fill-hover focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-stroke-focus",
    selected && "border-l-4 border-primary bg-fill-hover pl-[calc(1.5rem-4px)]",
    className,
  );
}

export function getNavigationHeaderMobileHeaderClassName(className?: string) {
  return cn("flex shrink-0 flex-col gap-6 px-6 pt-6", className);
}

export function getNavigationHeaderMobileContentClassName(className?: string) {
  return cn("flex min-h-0 flex-1 flex-col overflow-y-auto", className);
}

export function getNavigationHeaderMobileFooterClassName(className?: string) {
  return cn("flex shrink-0 flex-col px-6 pb-6", className);
}

export function getNavigationHeaderMobileProfileClassName(className?: string) {
  return cn("flex w-full flex-col", className);
}
