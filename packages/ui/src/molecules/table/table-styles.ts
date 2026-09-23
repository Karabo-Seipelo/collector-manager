import { cn } from "../../lib/cn";

export type TableVariant = "default" | "striped";
export type TableAlign = "left" | "right";
export type TableHeadPadding = "default" | "checkbox" | "actions";
export type TableCellPadding = "default" | "checkbox" | "actions";
export type TableSortDirection = "asc" | "desc";

export function getTableClassName(className?: string) {
  return cn("w-full font-body", className);
}

export function getTableScrollClassName(className?: string) {
  return cn("w-full overflow-x-auto", className);
}

export function getTableElementClassName() {
  return cn("w-full border-collapse text-left");
}

export function getTableBodyClassName(variant: TableVariant) {
  return cn(
    variant === "striped" && "[&>tr:nth-child(even)]:bg-fill-weaker",
  );
}

export function getTableHeadClassName({
  align = "left",
  padding = "default",
  className,
}: {
  align?: TableAlign;
  padding?: TableHeadPadding;
  className?: string;
}) {
  return cn(
    "h-12 border-t border-b border-stroke-weak align-middle text-tiny font-semibold leading-5 text-fg-weak",
    padding === "default" && "px-6",
    padding === "checkbox" && "w-[72px] pl-0 pr-6",
    padding === "actions" && "pl-6 pr-0",
    align === "right" && "text-right",
    className,
  );
}

export function getTableHeadButtonClassName() {
  return cn(
    "inline-flex w-full items-center gap-2 outline-none",
    "focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
  );
}

export function getTableCellClassName({
  align = "left",
  padding = "default",
  className,
}: {
  align?: TableAlign;
  padding?: TableCellPadding;
  className?: string;
}) {
  return cn(
    "min-h-20 border-b border-stroke-weak align-middle text-small font-normal leading-6 text-fg-weak",
    padding === "default" && "px-6",
    padding === "checkbox" && "w-[72px] pl-0 pr-6",
    padding === "actions" && "pl-6 pr-0",
    align === "right" && "text-right",
    className,
  );
}

export function getTableCellContentClassName({
  align = "left",
}: {
  align?: TableAlign;
}) {
  return cn(
    "flex min-h-20 items-center",
    align === "right" && "justify-end",
  );
}

export function getTableCellNumberClassName() {
  return cn("inline-flex items-center justify-end gap-2");
}

export function getTableCellTextBoldClassName() {
  return cn("font-semibold text-fg-strong");
}

export function getTableCellSecondaryTextClassName() {
  return cn("text-tiny leading-5 text-fg-weak");
}

export function getTableActionIconsClassName() {
  return cn("inline-flex items-center justify-end");
}

export function getTableActionLinksClassName() {
  return cn("inline-flex items-center gap-4");
}

export function getTablePaginationClassName(className?: string) {
  return cn(
    "flex w-full items-center justify-between gap-6 pt-6",
    className,
  );
}

export function getTablePaginationControlsClassName() {
  return cn("flex items-center gap-2");
}

export function getTablePaginationPagesClassName() {
  return cn("flex items-center");
}

export function getTablePaginationPageClassName(active?: boolean) {
  return cn(
    "inline-flex size-10 items-center justify-center rounded-lg text-tiny leading-5 text-fg-weak outline-none",
    "focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
    active && "border border-stroke-strong",
  );
}

export function getTablePaginationSummaryClassName() {
  return cn("shrink-0 text-tiny leading-5 text-fg-weak");
}
