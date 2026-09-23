import * as React from "react";

import { cn } from "../../lib/cn";

export type CardOrientation = "vertical" | "horizontal";
export type CardHeadingLevel = 2 | 3 | 4 | 5 | 6;

const CardOrientationContext =
  React.createContext<CardOrientation>("vertical");

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: CardOrientation;
}

export function Card({
  orientation = "vertical",
  className,
  children,
  ...rest
}: CardProps) {
  return (
    <CardOrientationContext.Provider value={orientation}>
      <div
        data-testid="card"
        className={cn(
          "flex w-full overflow-hidden rounded-2xl border border-stroke-weak bg-fill-inverse shadow-raised",
          "hover:shadow-overlay active:shadow-sunken",
          "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stroke-focus",
          "focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-stroke-focus",
          orientation === "vertical" ? "flex-col" : "flex-row",
          className,
        )}
        {...rest}
      >
        {children}
      </div>
    </CardOrientationContext.Provider>
  );
}

export type CardImageProps = React.HTMLAttributes<HTMLDivElement>;

export function CardImage({
  className,
  children,
  ...rest
}: CardImageProps) {
  const orientation = React.useContext(CardOrientationContext);

  return (
    <div
      data-testid="card-image"
      className={cn(
        "shrink-0 overflow-hidden bg-fill-weak [&>img]:size-full [&>img]:object-cover",
        orientation === "vertical"
          ? "h-[204px] w-full border-b border-stroke-weak"
          : "w-[225px] self-stretch border-r border-stroke-weak",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export type CardContentProps = React.HTMLAttributes<HTMLDivElement>;

export function CardContent({
  className,
  children,
  ...rest
}: CardContentProps) {
  return (
    <div
      className={cn(
        "flex min-w-0 flex-1 flex-col items-start gap-6 p-8",
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}

export interface CardHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  icon?: React.ReactNode;
  label?: React.ReactNode;
  heading?: React.ReactNode;
  headingLevel?: CardHeadingLevel;
  description?: React.ReactNode;
}

export function CardHeader({
  icon,
  label,
  heading,
  headingLevel = 3,
  description,
  className,
  ...rest
}: CardHeaderProps) {
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <div
      data-testid="card-header"
      className={cn(
        "flex w-full flex-col items-start",
        icon ? "gap-4" : "gap-0",
        className,
      )}
      {...rest}
    >
      {icon}
      <div className="flex w-full flex-col items-start gap-2 [word-break:break-word]">
        {label != null || heading != null ? (
          <div className="flex w-full flex-col items-start gap-1">
            {label != null ? (
              <span className="text-tiny font-semibold tracking-[2px] text-fg-weak uppercase">
                {label}
              </span>
            ) : null}
            {heading != null ? (
              <HeadingTag className="m-0 w-full text-heading-4 font-semibold text-fg-strong">
                {heading}
              </HeadingTag>
            ) : null}
          </div>
        ) : null}
        {description != null ? (
          <div className="w-full text-small font-normal text-fg-weak">
            {description}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default Card;
