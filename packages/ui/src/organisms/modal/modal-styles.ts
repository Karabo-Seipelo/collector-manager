import { cn } from "../../lib/cn";

import type { ModalSize, ModalTone } from "./modal-context";

export function getModalOverlayClassName(visible: boolean, className?: string) {
  return cn(
    "fixed inset-0 z-50 flex bg-fill-overlay backdrop-blur-[12px] p-4",
    "items-end justify-center md:items-center md:p-8",
    "transition-opacity duration-300 ease-out motion-reduce:transition-none",
    visible ? "opacity-100" : "opacity-0",
    className,
  );
}

export function getModalPanelClassName({
  size,
  visible,
  className,
}: {
  size: ModalSize;
  visible: boolean;
  className?: string;
}) {
  return cn(
    "relative flex w-full max-w-full flex-col gap-6 rounded-2xl border border-stroke-weak bg-fill-inverse p-8 shadow-overlay",
    "max-h-[calc(100vh-2rem)] overflow-y-auto",
    size === "small" ? "md:w-[500px]" : "md:w-[700px]",
    "transform transition-[transform,opacity] duration-300 ease-out motion-reduce:transition-none",
    visible
      ? "translate-y-0 opacity-100 md:scale-100"
      : "translate-y-4 opacity-0 md:translate-y-0 md:scale-95",
    className,
  );
}

export function getModalHeaderClassName(className?: string) {
  return cn("flex w-full flex-col gap-4", className);
}

export function getModalHeadingClassName(dismissible: boolean) {
  return cn(
    "m-0 w-full text-heading-3 font-semibold leading-8 text-fg-strong [word-break:break-word]",
    dismissible && "pr-12",
  );
}

export function getModalDescriptionClassName() {
  return "w-full text-small leading-6 text-fg-weak [word-break:break-word]";
}

export function getModalContentClassName(className?: string) {
  return cn("flex w-full flex-col gap-6", className);
}

export function getModalFooterClassName(className?: string) {
  return cn("flex w-full shrink-0 flex-col gap-4 md:flex-row md:items-start", className);
}

export function getModalMediaClassName(className?: string) {
  return cn(
    "relative h-[245px] w-full shrink-0 overflow-hidden rounded-lg [&>*]:h-full [&>*]:w-full [&>*]:object-cover",
    className,
  );
}

export function getModalIconTone(tone: ModalTone) {
  return tone === "destructive" ? "destructive" : "neutral";
}
