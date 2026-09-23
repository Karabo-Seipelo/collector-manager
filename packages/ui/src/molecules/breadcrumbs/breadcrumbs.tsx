"use client";

import * as React from "react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  collapsed?: boolean;
  onExpand?: () => void;
  className?: string;
  "aria-label"?: string;
}

type VisibleCrumb =
  | { kind: "item"; item: BreadcrumbItem; current: boolean; key: string }
  | { kind: "ellipsis" };

function visibleCrumbs(
  items: BreadcrumbItem[],
  collapsed: boolean,
): VisibleCrumb[] {
  if (!collapsed || items.length <= 2) {
    return items.map((item, index) => ({
      kind: "item" as const,
      item,
      current: index === items.length - 1,
      key: `${item.label}-${index}`,
    }));
  }

  const first = items[0];
  const last = items[items.length - 1];

  if (!first || !last) {
    return [];
  }

  return [
    {
      kind: "item",
      item: first,
      current: false,
      key: `${first.label}-0`,
    },
    { kind: "ellipsis" },
    {
      kind: "item",
      item: last,
      current: true,
      key: `${last.label}-${items.length - 1}`,
    },
  ];
}

const crumbClass =
  "rounded-sm text-fg-weak outline-none hover:text-fg-strong focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";

export function Breadcrumbs({
  items,
  collapsed = false,
  onExpand,
  className,
  "aria-label": ariaLabel = "Breadcrumb",
}: BreadcrumbsProps) {
  if (items.length === 0) {
    return null;
  }

  const crumbs = visibleCrumbs(items, collapsed);

  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="flex flex-wrap items-center">
        {crumbs.map((crumb) => (
          <li
            key={crumb.kind === "ellipsis" ? "ellipsis" : crumb.key}
            className="inline-flex items-center gap-2 text-tiny font-normal before:text-icon-neutral before:content-['/'] first:before:hidden not-first:ms-2"
          >
            {crumb.kind === "ellipsis" ? (
              <button
                type="button"
                className={crumbClass}
                aria-label="Show more breadcrumbs"
                onClick={onExpand}
              >
                ...
              </button>
            ) : crumb.item.href ? (
              <a
                href={crumb.item.href}
                className={crumbClass}
                aria-current={crumb.current ? "page" : undefined}
              >
                {crumb.item.label}
              </a>
            ) : (
              <span
                className="text-fg-weak"
                aria-current={crumb.current ? "page" : undefined}
              >
                {crumb.item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
