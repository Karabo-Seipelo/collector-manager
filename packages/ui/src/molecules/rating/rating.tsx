"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { RatingIcon, type RatingIconType } from "./rating-icon";
import { formatRatingValue, getRatingIconState } from "./rating-utils";

export type RatingLayout = "horizontal" | "vertical";

export interface RatingProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  icon?: RatingIconType;
  layout?: RatingLayout;
  showValue?: boolean;
  showReviews?: boolean;
  reviewCount?: number;
  reviewsHref?: string;
  /** Noun shown after the count, e.g. "reviews" or "travellers". */
  reviewsNoun?: string;
}

export function Rating({
  value,
  max = 5,
  icon = "star",
  layout = "horizontal",
  showValue = true,
  showReviews = true,
  reviewCount = 23,
  reviewsHref = "#reviews",
  reviewsNoun = "reviews",
  className,
  ...rest
}: RatingProps) {
  const clampedValue = Math.min(max, Math.max(0, value));
  const iconLabel = icon === "heart" ? "hearts" : "stars";
  const ariaLabel = `${formatRatingValue(clampedValue)} out of ${max} ${iconLabel}`;

  const icons = (
    <div className="flex gap-1" aria-hidden="true">
      {Array.from({ length: max }, (_, index) => (
        <RatingIcon
          key={index}
          type={icon}
          state={getRatingIconState(clampedValue, index)}
        />
      ))}
    </div>
  );

  const valueLabel = showValue ? (
    <span className="whitespace-nowrap text-small font-semibold leading-6 text-fg-strong">
      {formatRatingValue(clampedValue)}
    </span>
  ) : null;

  const reviewLinkLabel =
    layout === "horizontal"
      ? `(${reviewCount} ${reviewsNoun})`
      : `${reviewCount} ${reviewsNoun}`;

  const reviewsLink = showReviews ? (
    <a
      href={reviewsHref}
      className="whitespace-nowrap text-tiny leading-5 text-primary underline outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2"
    >
      {reviewLinkLabel}
    </a>
  ) : null;

  if (layout === "vertical") {
    return (
      <div
        role="img"
        aria-label={ariaLabel}
        className={cn("flex flex-col items-start gap-1", className)}
        {...rest}
      >
        <div className="flex items-center gap-2">
          {icons}
          {valueLabel}
        </div>
        {showReviews ? (
          <div className="flex items-center gap-1">
            <span className="whitespace-nowrap text-tiny leading-5 text-fg-weak">
              From
            </span>
            {reviewsLink}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn("flex items-center gap-2", className)}
      {...rest}
    >
      <div className="flex items-center gap-2">
        {icons}
        {valueLabel}
      </div>
      {reviewsLink}
    </div>
  );
}
