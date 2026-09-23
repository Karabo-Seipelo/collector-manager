"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon, type FeatherIconName } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import {
  getSummaryListActionClassName,
  getSummaryListActionIconsClassName,
  getSummaryListActionLinksClassName,
  getSummaryListClassName,
  getSummaryListDescriptionClassName,
  getSummaryListRowClassName,
  getSummaryListTermClassName,
} from "./summary-list-styles";

export interface SummaryListLinkAction {
  type: "link";
  label: string;
  href: string;
}

export interface SummaryListLinksAction {
  type: "links";
  links: SummaryListLinkAction[];
}

export interface SummaryListIconAction {
  label: string;
  icon: FeatherIconName;
  onClick?: () => void;
}

export interface SummaryListIconsAction {
  type: "icons";
  icons: SummaryListIconAction[];
}

export type SummaryListConfiguredAction =
  | SummaryListLinkAction
  | SummaryListLinksAction
  | SummaryListIconsAction;

export type SummaryListAction =
  | SummaryListConfiguredAction
  | React.ReactNode;

export interface SummaryListItem {
  id?: string;
  term: React.ReactNode;
  description: React.ReactNode;
  action?: SummaryListAction;
}

export interface SummaryListProps extends React.HTMLAttributes<HTMLDListElement> {
  items: SummaryListItem[];
  "aria-label"?: string;
}

function isConfiguredAction(
  action: SummaryListAction,
): action is SummaryListConfiguredAction {
  return (
    typeof action === "object" &&
    action !== null &&
    !React.isValidElement(action) &&
    "type" in action &&
    (action.type === "link" ||
      action.type === "links" ||
      action.type === "icons")
  );
}

function renderConfiguredAction(action: SummaryListAction) {
  if (!isConfiguredAction(action)) {
    return action;
  }

  if (action.type === "link") {
    return (
      <TextLink href={action.href} size="tiny" tone="brand">
        {action.label}
      </TextLink>
    );
  }

  if (action.type === "links") {
    return (
      <div className={getSummaryListActionLinksClassName()}>
        {action.links.map((link) => (
          <TextLink key={link.label} href={link.href} size="tiny" tone="brand">
            {link.label}
          </TextLink>
        ))}
      </div>
    );
  }

  return (
    <div className={getSummaryListActionIconsClassName()}>
      {action.icons.map((iconAction) => (
        <ButtonIcon
          key={iconAction.label}
          type="button"
          aria-label={iconAction.label}
          variant="tertiary"
          tone="neutral"
          size="medium"
          icon={<FeatherIcon name={iconAction.icon} size={24} />}
          onClick={iconAction.onClick}
        />
      ))}
    </div>
  );
}

export function SummaryList({
  items,
  className,
  "aria-label": ariaLabel,
  ...rest
}: SummaryListProps) {
  return (
    <dl
      aria-label={ariaLabel}
      className={getSummaryListClassName(className)}
      {...rest}
    >
      {items.map((item, index) => {
        const key = item.id ?? `${index}`;

        return (
          <div
            key={key}
            className={getSummaryListRowClassName()}
            data-testid="summary-list-row"
          >
            <dt className={getSummaryListTermClassName()}>{item.term}</dt>
            <dd className={getSummaryListDescriptionClassName()}>
              {item.description}
            </dd>
            {item.action ? (
              <dd className={getSummaryListActionClassName()}>
                {renderConfiguredAction(item.action)}
              </dd>
            ) : null}
          </div>
        );
      })}
    </dl>
  );
}
