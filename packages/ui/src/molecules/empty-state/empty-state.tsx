"use client";

import * as React from "react";

import { IconContainer } from "../../atoms/icon-container/icon-container";
import { cn } from "../../lib/cn";

export type EmptyStateHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface EmptyStateProps extends React.HTMLAttributes<HTMLElement> {
  title: string;
  description?: React.ReactNode;
  headingLevel?: EmptyStateHeadingLevel;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
}

export function EmptyState({
  title,
  description,
  headingLevel = 2,
  icon,
  actions,
  className,
  ...rest
}: EmptyStateProps) {
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <section
      className={cn("flex max-w-[536px] flex-col items-start gap-6", className)}
      {...rest}
    >
      {icon ? (
        <IconContainer
          data-testid="empty-state-icon"
          icon={icon}
          tone="neutral"
          variant="filled"
        />
      ) : null}
      <div className="flex w-full flex-col gap-2">
        <HeadingTag className="pr-12 text-heading-3 font-semibold leading-8 text-fg-strong [word-break:break-word]">
          {title}
        </HeadingTag>
        {description ? (
          <p className="text-small leading-6 text-fg-weak [word-break:break-word]">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="w-full">{actions}</div> : null}
    </section>
  );
}
