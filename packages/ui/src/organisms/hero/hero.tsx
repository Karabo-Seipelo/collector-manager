"use client";

import * as React from "react";

import {
  getHeroClassName,
  getHeroContentClassName,
  getHeroDescriptionClassName,
  getHeroEyebrowClassName,
  getHeroMediaClassName,
  getHeroMediaWrapperClassName,
  getHeroTextBlockClassName,
  getHeroTitleClassName,
  getHeroTopContainerClassName,
  type HeroLayout,
} from "./hero-styles";

export type { HeroLayout };
export { HeroEmailSignup, type HeroEmailSignupProps } from "./hero-email-signup";

export interface HeroProps extends React.HTMLAttributes<HTMLElement> {
  layout?: HeroLayout;
  title: string;
  description: string;
  eyebrow?: string;
  tag?: React.ReactNode;
  media: React.ReactNode;
  actions?: React.ReactNode;
  emailSignup?: React.ReactNode;
  socialProof?: React.ReactNode;
}

export function Hero({
  layout = "horizontal",
  title,
  description,
  eyebrow,
  tag,
  media,
  actions,
  emailSignup,
  socialProof,
  className,
  ...rest
}: HeroProps) {
  const isVertical = layout.startsWith("vertical");

  return (
    <section
      className={getHeroClassName({ layout, className })}
      {...rest}
    >
      <div className={getHeroContentClassName(layout)}>
        <div className={getHeroTopContainerClassName(layout)}>
          {eyebrow ? (
            <p className={getHeroEyebrowClassName(layout)}>{eyebrow}</p>
          ) : null}
          {tag ? <div>{tag}</div> : null}
          <div className={getHeroTextBlockClassName(layout)}>
            <h1 className={getHeroTitleClassName()}>{title}</h1>
            <p className={getHeroDescriptionClassName()}>{description}</p>
          </div>
        </div>

        {emailSignup ? (
          <div className={isVertical ? "flex justify-center" : undefined}>
            {emailSignup}
          </div>
        ) : null}

        {actions ? (
          <div className={isVertical ? "flex justify-center" : undefined}>
            {actions}
          </div>
        ) : null}

        {socialProof ? (
          <div
            className={
              isVertical ? "flex justify-center" : "flex items-center"
            }
          >
            {socialProof}
          </div>
        ) : null}
      </div>

      <div className={getHeroMediaWrapperClassName(layout)}>
        <div className={getHeroMediaClassName(layout)}>{media}</div>
      </div>
    </section>
  );
}
