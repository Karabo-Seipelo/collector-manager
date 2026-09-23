"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";
import { useDrawerContext } from "./drawer-context";

export type DrawerHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface DrawerHeaderProps {
  title: string;
  headingLevel?: DrawerHeadingLevel;
  className?: string;
}

export function DrawerHeader({
  title,
  headingLevel = 2,
  className,
}: DrawerHeaderProps) {
  const { titleId, onClose } = useDrawerContext();
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <header
      className={cn(
        "flex shrink-0 items-center gap-4 border-b border-stroke-weak px-8 py-6",
        className,
      )}
    >
      <HeadingTag
        id={titleId}
        className="m-0 min-w-0 flex-1 pr-12 text-heading-3 font-semibold text-fg-strong [word-break:break-word]"
      >
        {title}
      </HeadingTag>
      <ButtonIcon
        aria-label="Close"
        icon={<FeatherIcon name="x" size={24} />}
        variant="tertiary"
        tone="neutral"
        onClick={onClose}
      />
    </header>
  );
}
