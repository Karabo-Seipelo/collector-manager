"use client";

import * as React from "react";

import { IconContainer } from "../../atoms/icon-container/icon-container";
import { useModalContext } from "./modal-context";
import {
  getModalDescriptionClassName,
  getModalHeaderClassName,
  getModalHeadingClassName,
  getModalIconTone,
} from "./modal-styles";

export type ModalHeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface ModalHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  headingLevel?: ModalHeadingLevel;
  className?: string;
}

export function ModalHeader({
  title,
  description,
  icon,
  headingLevel = 2,
  className,
}: ModalHeaderProps) {
  const { titleId, descriptionId, tone, dismissible, setHasDescription } =
    useModalContext();
  const HeadingTag = `h${headingLevel}` as const;

  React.useEffect(() => {
    setHasDescription(Boolean(description));
    return () => setHasDescription(false);
  }, [description, setHasDescription]);

  return (
    <header className={getModalHeaderClassName(className)}>
      {icon ? (
        <IconContainer icon={icon} tone={getModalIconTone(tone)} />
      ) : null}
      <div className="flex w-full flex-col gap-2">
        <HeadingTag
          id={titleId}
          className={getModalHeadingClassName(dismissible)}
        >
          {title}
        </HeadingTag>
        {description ? (
          <p id={descriptionId} className={getModalDescriptionClassName()}>
            {description}
          </p>
        ) : null}
      </div>
    </header>
  );
}
