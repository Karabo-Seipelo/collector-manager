"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { cn } from "../../lib/cn";

export type AccordionHeadingLevel = 2 | 3 | 4 | 5 | 6;

type AccordionSharedProps = {
  headingLevel?: AccordionHeadingLevel;
  className?: string;
  children: React.ReactNode;
};

export type AccordionProps =
  | (AccordionSharedProps & {
      type?: "multiple";
      value?: string[];
      defaultValue?: string[];
      onValueChange?: (value: string[]) => void;
    })
  | (AccordionSharedProps & {
      type: "single";
      value?: string;
      defaultValue?: string;
      onValueChange?: (value: string) => void;
    });

interface AccordionContextValue {
  isOpen: (itemValue: string) => boolean;
  toggle: (itemValue: string) => void;
  headingLevel: AccordionHeadingLevel;
}

const AccordionContext = React.createContext<AccordionContextValue | null>(
  null,
);

function useAccordionContext() {
  const context = React.useContext(AccordionContext);
  if (!context) {
    throw new Error("AccordionItem must be used within Accordion");
  }
  return context;
}

function toOpenSet(
  type: "single" | "multiple",
  value: string | string[] | undefined,
): Set<string> {
  if (value == null || value === "") {
    return new Set();
  }
  if (type === "single") {
    return new Set([value as string]);
  }
  return new Set(value as string[]);
}

export function Accordion(props: AccordionProps) {
  const {
    type = "multiple",
    headingLevel = 3,
    className,
    children,
    value,
    defaultValue,
    onValueChange,
  } = props;

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = React.useState(() =>
    toOpenSet(type, defaultValue),
  );
  const openSet = isControlled ? toOpenSet(type, value) : uncontrolled;

  const toggle = React.useCallback(
    (itemValue: string) => {
      const next = new Set(openSet);
      if (type === "single") {
        next.clear();
        if (!openSet.has(itemValue)) {
          next.add(itemValue);
        }
      } else if (next.has(itemValue)) {
        next.delete(itemValue);
      } else {
        next.add(itemValue);
      }

      if (!isControlled) {
        setUncontrolled(next);
      }

      if (type === "single") {
        (onValueChange as ((nextValue: string) => void) | undefined)?.(
          next.values().next().value ?? "",
        );
      } else {
        (onValueChange as ((nextValue: string[]) => void) | undefined)?.(
          [...next],
        );
      }
    },
    [isControlled, onValueChange, openSet, type],
  );

  const isOpen = React.useCallback(
    (itemValue: string) => openSet.has(itemValue),
    [openSet],
  );

  return (
    <AccordionContext.Provider
      value={{ isOpen, toggle, headingLevel }}
    >
      <div className={cn("flex w-full flex-col", className)}>{children}</div>
    </AccordionContext.Provider>
  );
}

export interface AccordionItemProps {
  value: string;
  heading: React.ReactNode;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export function AccordionItem({
  value,
  heading,
  disabled = false,
  className,
  children,
}: AccordionItemProps) {
  const { isOpen, toggle, headingLevel } = useAccordionContext();
  const autoId = React.useId();
  const panelId = `${autoId}-panel`;
  const open = isOpen(value);
  const HeadingTag = `h${headingLevel}` as const;

  return (
    <div
      className={cn(
        "group/item border-t border-stroke-weak py-4",
        disabled
          ? "text-text-disabled"
          : "text-fg-strong hover:bg-fill-hover active:bg-fill-press",
        "has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-stroke-focus",
        className,
      )}
    >
      <HeadingTag className="m-0 text-small font-semibold">
        <button
          type="button"
          disabled={disabled}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={() => toggle(value)}
          className={cn(
            "flex w-full items-center bg-transparent p-0 text-left text-small font-semibold",
            open ? "gap-6" : "gap-4",
            disabled ? "cursor-not-allowed" : "cursor-pointer",
            "focus-visible:outline-none",
          )}
        >
          <span
            className={cn(
              "min-w-0 flex-1",
              !disabled &&
                "group-hover/item:underline group-active/item:underline",
            )}
          >
            {heading}
          </span>
          <FeatherIcon
            name={open ? "chevron-up" : "chevron-down"}
            className={disabled ? "text-text-disabled" : "text-icon-neutral"}
          />
        </button>
      </HeadingTag>
      <div
        id={panelId}
        hidden={!open}
        className={cn(
          "pt-2 pr-8 text-small font-normal",
          disabled ? "text-text-disabled" : "text-fg-weak",
        )}
      >
        {children}
      </div>
    </div>
  );
}
