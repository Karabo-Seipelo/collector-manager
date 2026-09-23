"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import {
  getPaginationClassName,
  getPaginationControlsClassName,
  getPaginationDesktopControlClassName,
  getPaginationMobileControlClassName,
  getPaginationMobileIconClassName,
  getPaginationMobileStatusClassName,
  getPaginationNextClassName,
  getPaginationPageClassName,
  getPaginationPagesClassName,
  getPaginationPreviousClassName,
  getPaginationSummaryClassName,
} from "./pagination-styles";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems?: number;
  pageSize?: number;
  onPageChange?: (page: number) => void;
  "aria-label"?: string;
  className?: string;
}

function getVisiblePages(
  currentPage: number,
  totalPages: number,
): Array<number | "ellipsis"> {
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

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  onPageChange,
  "aria-label": ariaLabel = "Pagination",
  className,
}: PaginationProps) {
  const pages = getVisiblePages(currentPage, totalPages);
  const canGoPrevious = currentPage > 1;
  const canGoNext = currentPage < totalPages;
  const hasSummary =
    totalItems !== undefined && pageSize !== undefined && totalItems > 0;
  const rangeStart = hasSummary ? (currentPage - 1) * pageSize + 1 : 0;
  const rangeEnd = hasSummary
    ? Math.min(currentPage * pageSize, totalItems)
    : 0;

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange?.(page);
    }
  };

  return (
    <nav aria-label={ariaLabel} className={getPaginationClassName(className)}>
      <div className={getPaginationControlsClassName()}>
        <div className={getPaginationPreviousClassName()}>
          <button
            type="button"
            aria-label="Previous page"
            disabled={!canGoPrevious}
            className={getPaginationMobileControlClassName()}
            onClick={() => goToPage(currentPage - 1)}
          >
            <span className={getPaginationMobileIconClassName()}>
              <FeatherIcon name="arrow-left" size={16} />
            </span>
          </button>
          <TextLink
            href="#previous"
            tone="neutral-weak"
            underline={false}
            disabled={!canGoPrevious}
            iconLeft={<FeatherIcon name="chevron-left" size={20} />}
            className={getPaginationDesktopControlClassName()}
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage - 1);
            }}
          >
            Previous
          </TextLink>
        </div>

        <div className={getPaginationPagesClassName()}>
          {pages.map((page, index) =>
            page === "ellipsis" ? (
              <span
                key={`ellipsis-${index}`}
                className={getPaginationPageClassName({ className: "pointer-events-none" })}
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
                className={getPaginationPageClassName({
                  selected: page === currentPage,
                })}
                onClick={() => goToPage(page)}
              >
                {page}
              </button>
            ),
          )}
        </div>

        <p className={getPaginationMobileStatusClassName()} aria-live="polite">
          {currentPage} of {totalPages}
        </p>

        <div className={getPaginationNextClassName()}>
          <button
            type="button"
            aria-label="Next page"
            disabled={!canGoNext}
            className={getPaginationMobileControlClassName()}
            onClick={() => goToPage(currentPage + 1)}
          >
            <span className={getPaginationMobileIconClassName()}>
              <FeatherIcon name="arrow-right" size={16} />
            </span>
          </button>
          <TextLink
            href="#next"
            tone="neutral-weak"
            underline={false}
            disabled={!canGoNext}
            iconRight={<FeatherIcon name="chevron-right" size={20} />}
            className={getPaginationDesktopControlClassName()}
            onClick={(event) => {
              event.preventDefault();
              goToPage(currentPage + 1);
            }}
          >
            Next
          </TextLink>
        </div>
      </div>

      {hasSummary ? (
        <p className={getPaginationSummaryClassName()}>
          Showing {rangeStart} - {rangeEnd} of {totalItems}
        </p>
      ) : null}
    </nav>
  );
}
