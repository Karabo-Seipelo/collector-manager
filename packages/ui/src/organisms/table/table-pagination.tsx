"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import {
  getTablePaginationClassName,
  getTablePaginationControlsClassName,
  getTablePaginationPageClassName,
  getTablePaginationPagesClassName,
  getTablePaginationSummaryClassName,
} from "./table-styles";

export interface TablePaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

function getVisiblePages(currentPage: number, totalPages: number): Array<number | "ellipsis"> {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 2) pages.add(currentPage - 1);
  if (currentPage < totalPages - 1) pages.add(currentPage + 1);
  if (currentPage <= 3) pages.add(2).add(3);
  if (currentPage >= totalPages - 2) {
    pages.add(totalPages - 1).add(totalPages - 2);
  }

  const sorted = [...pages].sort((left, right) => left - right);
  const result: Array<number | "ellipsis"> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];

    if (page !== undefined && previous !== undefined && page - previous > 1) {
      result.push("ellipsis");
    }

    if (page !== undefined) {
      result.push(page);
    }
  }

  return result;
}

export function TablePagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  className,
}: TablePaginationProps) {
  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);
  const pages = getVisiblePages(currentPage, totalPages);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;

  return (
    <nav
      aria-label="Table pagination"
      className={getTablePaginationClassName(className)}
    >
      <div className={getTablePaginationControlsClassName()}>
        <TextLink
          href="#previous"
          tone="neutral-weak"
          underline={false}
          aria-disabled={!canGoPrevious || undefined}
          iconLeft={<FeatherIcon name="chevron-left" size={20} />}
          className={canGoPrevious ? undefined : "pointer-events-none opacity-50"}
          onClick={(event) => {
            event.preventDefault();
            if (canGoPrevious) {
              onPageChange?.(currentPage - 1);
            }
          }}
        >
          Previous
        </TextLink>

        <div className={getTablePaginationPagesClassName()}>
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className={getTablePaginationPageClassName()}
                aria-hidden="true"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                type="button"
                aria-current={page === currentPage ? "page" : undefined}
                aria-label={`Page ${page}`}
                className={getTablePaginationPageClassName(page === currentPage)}
                onClick={() => onPageChange?.(page)}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <TextLink
          href="#next"
          tone="neutral-weak"
          underline={false}
          aria-disabled={!canGoNext || undefined}
          iconRight={<FeatherIcon name="chevron-right" size={20} />}
          className={canGoNext ? undefined : "pointer-events-none opacity-50"}
          onClick={(event) => {
            event.preventDefault();
            if (canGoNext) {
              onPageChange?.(currentPage + 1);
            }
          }}
        >
          Next
        </TextLink>
      </div>

      <p className={getTablePaginationSummaryClassName()}>
        Showing {rangeStart} - {rangeEnd} of {totalItems}
      </p>
    </nav>
  );
}
