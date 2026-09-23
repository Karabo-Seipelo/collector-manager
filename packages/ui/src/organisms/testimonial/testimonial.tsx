"use client";

import * as React from "react";

import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import { Rating } from "../../molecules/rating/rating";
import {
  getTestimonialClassName,
  getTestimonialQuoteClassName,
  getTestimonialRatingClassName,
  type TestimonialAlign,
} from "./testimonial-styles";

export type { TestimonialAlign };

export interface TestimonialAuthor {
  name: string;
  description?: string;
  src?: string;
  alt?: string;
}

export interface TestimonialProps extends React.HTMLAttributes<HTMLElement> {
  quote: string;
  align?: TestimonialAlign;
  author?: TestimonialAuthor;
  rating?: number;
  maxRating?: number;
}

export function Testimonial({
  quote,
  align = "left",
  author,
  rating,
  maxRating = 5,
  className,
  ...rest
}: TestimonialProps) {
  return (
    <figure
      className={getTestimonialClassName({ align, className })}
      {...rest}
    >
      {author ? (
        <figcaption className="w-full">
          <AvatarLabelled
            name={author.name}
            description={author.description}
            src={author.src}
            alt={author.alt}
            size="medium"
          />
        </figcaption>
      ) : null}

      <blockquote className="w-full">
        <p className={getTestimonialQuoteClassName(align)}>{quote}</p>
      </blockquote>

      {rating !== undefined ? (
        <Rating
          value={rating}
          max={maxRating}
          showValue={false}
          showReviews={false}
          className={getTestimonialRatingClassName(align)}
        />
      ) : null}
    </figure>
  );
}
