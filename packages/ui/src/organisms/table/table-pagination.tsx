"use client";

import {
  Pagination,
  type PaginationProps,
} from "../../molecules/pagination/pagination";

export type TablePaginationProps = Omit<PaginationProps, "aria-label"> & {
  "aria-label"?: string;
};

export function TablePagination({
  "aria-label": ariaLabel = "Table pagination",
  ...props
}: TablePaginationProps) {
  return <Pagination aria-label={ariaLabel} {...props} />;
}
