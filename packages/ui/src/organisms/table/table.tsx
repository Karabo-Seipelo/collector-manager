"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon, type FeatherIconName } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import { cn } from "../../lib/cn";
import { TablePagination } from "./table-pagination";
import {
  getTableActionIconsClassName,
  getTableActionLinksClassName,
  getTableBodyClassName,
  getTableCellClassName,
  getTableCellContentClassName,
  getTableCellNumberClassName,
  getTableCellSecondaryTextClassName,
  getTableCellTextBoldClassName,
  getTableClassName,
  getTableElementClassName,
  getTableHeadButtonClassName,
  getTableHeadClassName,
  getTableScrollClassName,
  type TableAlign,
  type TableCellPadding,
  type TableHeadPadding,
  type TableSortDirection,
  type TableVariant,
} from "./table-styles";

export type {
  TableAlign,
  TableCellPadding,
  TableHeadPadding,
  TableSortDirection,
  TableVariant,
};
export { TablePagination };
export type { TablePaginationProps } from "./table-pagination";

const TableContext = React.createContext<TableVariant>("default");

export interface TableProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: TableVariant;
  footer?: React.ReactNode;
  "aria-label"?: string;
}

export function Table({
  variant = "default",
  footer,
  className,
  children,
  "aria-label": ariaLabel,
  ...rest
}: TableProps) {
  return (
    <TableContext.Provider value={variant}>
      <div
        aria-label={ariaLabel}
        className={cn(getTableClassName(className), footer && "flex flex-col gap-6")}
        {...rest}
      >
        <div className={getTableScrollClassName()}>
          <table className={getTableElementClassName()}>{children}</table>
        </div>
        {footer}
      </div>
    </TableContext.Provider>
  );
}

export type TableHeaderProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableHeader({ className, ...rest }: TableHeaderProps) {
  return <thead className={className} {...rest} />;
}

export type TableBodyProps = React.HTMLAttributes<HTMLTableSectionElement>;

export function TableBody({ className, ...rest }: TableBodyProps) {
  const variant = React.useContext(TableContext);

  return (
    <tbody className={cn(getTableBodyClassName(variant), className)} {...rest} />
  );
}

export type TableRowProps = React.HTMLAttributes<HTMLTableRowElement>;

export function TableRow({ className, ...rest }: TableRowProps) {
  return <tr className={className} {...rest} />;
}

export interface TableHeadProps
  extends React.ThHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  padding?: TableHeadPadding;
  sortable?: boolean;
  sortDirection?: TableSortDirection;
  onSort?: () => void;
}

export function TableHead({
  align = "left",
  padding = "default",
  sortable = false,
  sortDirection,
  onSort,
  className,
  children,
  ...rest
}: TableHeadProps) {
  const content = sortable ? (
    <button
      type="button"
      className={getTableHeadButtonClassName()}
      aria-sort={
        sortDirection === "asc"
          ? "ascending"
          : sortDirection === "desc"
            ? "descending"
            : "none"
      }
      onClick={onSort}
    >
      <span className={align === "right" ? "ml-auto" : undefined}>{children}</span>
      <FeatherIcon
        name={
          sortDirection === "asc"
            ? "chevron-up"
            : sortDirection === "desc"
              ? "chevron-down"
              : "chevron-down"
        }
        size={16}
        className={cn(
          "shrink-0 text-icon-neutral",
          sortDirection ? undefined : "opacity-50",
        )}
      />
    </button>
  ) : (
    children
  );

  return (
    <th
      scope="col"
      className={getTableHeadClassName({ align, padding, className })}
      {...rest}
    >
      {content}
    </th>
  );
}

export interface TableCellProps
  extends React.TdHTMLAttributes<HTMLTableCellElement> {
  align?: TableAlign;
  padding?: TableCellPadding;
}

export function TableCell({
  align = "left",
  padding = "default",
  className,
  children,
  ...rest
}: TableCellProps) {
  return (
    <td
      className={getTableCellClassName({ align, padding, className })}
      {...rest}
    >
      <div className={getTableCellContentClassName({ align })}>{children}</div>
    </td>
  );
}

export interface TableCellTextProps {
  children: React.ReactNode;
  bold?: boolean;
}

export function TableCellText({ children, bold = false }: TableCellTextProps) {
  return (
    <span className={bold ? getTableCellTextBoldClassName() : undefined}>
      {children}
    </span>
  );
}

export interface TableCellSecondaryTextProps {
  children: React.ReactNode;
}

export function TableCellSecondaryText({
  children,
}: TableCellSecondaryTextProps) {
  return (
    <span className={getTableCellSecondaryTextClassName()}>{children}</span>
  );
}

export interface TableCellNumberProps {
  value: React.ReactNode;
  trend?: "up" | "down";
}

export function TableCellNumber({ value, trend }: TableCellNumberProps) {
  return (
    <span className={getTableCellNumberClassName()}>
      <span>{value}</span>
      {trend ? (
        <FeatherIcon
          name={trend === "up" ? "arrow-up" : "arrow-down"}
          size={24}
          className={
            trend === "up" ? "text-icon-success" : "text-text-error"
          }
          aria-hidden="true"
        />
      ) : null}
    </span>
  );
}

export interface TableCellLinkAction {
  label: string;
  href: string;
}

export interface TableCellIconAction {
  label: string;
  icon: FeatherIconName;
  onClick?: () => void;
}

export interface TableCellActionsProps {
  type: "links" | "icons";
  links?: TableCellLinkAction[];
  icons?: TableCellIconAction[];
}

export function TableCellActions({ type, links = [], icons = [] }: TableCellActionsProps) {
  if (type === "links") {
    return (
      <div className={getTableActionLinksClassName()}>
        {links.map((link) => (
          <TextLink key={link.label} href={link.href} size="tiny" tone="brand">
            {link.label}
          </TextLink>
        ))}
      </div>
    );
  }

  return (
    <div className={getTableActionIconsClassName()}>
      {icons.map((iconAction) => (
        <ButtonIcon
          key={iconAction.label}
          type="button"
          aria-label={iconAction.label}
          variant="tertiary"
          tone="neutral"
          size="medium"
          icon={<FeatherIcon name={iconAction.icon} size={24} />}
          onClick={iconAction.onClick}
        />
      ))}
    </div>
  );
}
