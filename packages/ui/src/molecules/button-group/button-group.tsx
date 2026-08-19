"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import type { ButtonSize, ButtonTone } from "../../lib/button-types";
import { cn } from "../../lib/cn";

interface RegisteredItem {
  value: string;
  disabled: boolean;
  order: number;
}

interface ButtonGroupContextValue {
  value: string | undefined;
  onSelect: (value: string) => void;
  size: ButtonSize;
  tone: ButtonTone;
  groupDisabled: boolean;
  registerItem: (value: string, disabled: boolean) => void;
  unregisterItem: (value: string) => void;
  items: RegisteredItem[];
  focusItem: (value: string) => void;
  registerRef: (value: string, node: HTMLButtonElement | null) => void;
}

const ButtonGroupContext = React.createContext<ButtonGroupContextValue | null>(
  null,
);

function useButtonGroupContext() {
  const context = React.useContext(ButtonGroupContext);
  if (!context) {
    throw new Error("ButtonGroup.Item must be used within ButtonGroup");
  }
  return context;
}

export interface ButtonGroupProps {
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: ButtonSize;
  tone?: ButtonTone;
  disabled?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
  children: React.ReactNode;
}

function getEnabledItems(items: RegisteredItem[]) {
  return items.filter((item) => !item.disabled);
}

function ButtonGroupRoot({
  value: controlledValue,
  defaultValue,
  onChange,
  size = "medium",
  tone = "brand",
  disabled: groupDisabled = false,
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
}: ButtonGroupProps) {
  const [uncontrolledValue, setUncontrolledValue] = React.useState<
    string | undefined
  >(defaultValue);
  const [items, setItems] = React.useState<RegisteredItem[]>([]);
  const orderCounter = React.useRef(0);
  const itemRefs = React.useRef<Map<string, HTMLButtonElement | null>>(
    new Map(),
  );

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const registerItem = React.useCallback(
    (itemValue: string, itemDisabled: boolean) => {
      setItems((current) => {
        const existing = current.find((item) => item.value === itemValue);
        if (existing) {
          if (existing.disabled === itemDisabled) {
            return current;
          }

          return current.map((item) =>
            item.value === itemValue
              ? { ...item, disabled: itemDisabled }
              : item,
          );
        }

        return [
          ...current,
          {
            value: itemValue,
            disabled: itemDisabled,
            order: orderCounter.current++,
          },
        ];
      });
    },
    [],
  );

  const unregisterItem = React.useCallback((itemValue: string) => {
    setItems((current) => current.filter((item) => item.value !== itemValue));
    itemRefs.current.delete(itemValue);
  }, []);

  const registerRef = React.useCallback(
    (itemValue: string, node: HTMLButtonElement | null) => {
      if (node) {
        itemRefs.current.set(itemValue, node);
      } else {
        itemRefs.current.delete(itemValue);
      }
    },
    [],
  );

  const sortedItems = React.useMemo(
    () => [...items].sort((a, b) => a.order - b.order),
    [items],
  );

  const enabledItems = React.useMemo(
    () => getEnabledItems(sortedItems),
    [sortedItems],
  );

  React.useEffect(() => {
    if (
      isControlled ||
      uncontrolledValue !== undefined ||
      defaultValue !== undefined
    ) {
      return;
    }

    const firstEnabled = enabledItems[0];
    if (firstEnabled) {
      setUncontrolledValue(firstEnabled.value);
    }
  }, [
    defaultValue,
    enabledItems,
    isControlled,
    uncontrolledValue,
  ]);

  const onSelect = React.useCallback(
    (nextValue: string) => {
      if (groupDisabled) {
        return;
      }

      const target = sortedItems.find((item) => item.value === nextValue);
      if (!target || target.disabled) {
        return;
      }

      if (!isControlled) {
        setUncontrolledValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [groupDisabled, isControlled, onChange, sortedItems],
  );

  const focusItem = React.useCallback((itemValue: string) => {
    itemRefs.current.get(itemValue)?.focus();
  }, []);

  const contextValue = React.useMemo<ButtonGroupContextValue>(
    () => ({
      value,
      onSelect,
      size,
      tone,
      groupDisabled,
      registerItem,
      unregisterItem,
      items: sortedItems,
      focusItem,
      registerRef,
    }),
    [
      value,
      onSelect,
      size,
      tone,
      groupDisabled,
      registerItem,
      unregisterItem,
      sortedItems,
      focusItem,
      registerRef,
    ],
  );

  return (
    <ButtonGroupContext.Provider value={contextValue}>
      <div
        role="radiogroup"
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        className={cn("inline-flex gap-2", className)}
      >
        {children}
      </div>
    </ButtonGroupContext.Provider>
  );
}

export interface ButtonGroupItemProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "value"> {
  value: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  iconOnly?: React.ReactNode;
}

function ButtonGroupItem({
  value: itemValue,
  iconLeft,
  iconRight,
  iconOnly,
  disabled: itemDisabled = false,
  className,
  children,
  onClick,
  onKeyDown,
  ...rest
}: ButtonGroupItemProps) {
  const {
    value,
    onSelect,
    size,
    tone,
    groupDisabled,
    registerItem,
    unregisterItem,
    items,
    focusItem,
    registerRef,
  } = useButtonGroupContext();

  const disabled = groupDisabled || itemDisabled;
  const selected = value === itemValue;
  const enabledItems = getEnabledItems(items);

  React.useEffect(() => {
    registerItem(itemValue, itemDisabled);

    return () => {
      unregisterItem(itemValue);
    };
  }, [itemDisabled, itemValue, registerItem, unregisterItem]);

  const setRef = React.useCallback(
    (node: HTMLButtonElement | null) => {
      registerRef(itemValue, node);
    },
    [itemValue, registerRef],
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    onKeyDown?.(event);
    if (event.defaultPrevented || disabled) {
      return;
    }

    const currentIndex = enabledItems.findIndex(
      (item) => item.value === itemValue,
    );
    if (currentIndex === -1) {
      return;
    }

    let nextIndex: number | null = null;

    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (currentIndex + 1) % enabledItems.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex =
          (currentIndex - 1 + enabledItems.length) % enabledItems.length;
        break;
      default:
        return;
    }

    event.preventDefault();
    const nextItem = enabledItems[nextIndex];
    if (nextItem) {
      onSelect(nextItem.value);
      focusItem(nextItem.value);
    }
  };

  return (
    <Button
      ref={setRef}
      type="button"
      role="radio"
      aria-checked={selected}
      tabIndex={selected ? 0 : -1}
      variant={selected ? "primary" : "secondary"}
      tone={tone}
      size={size}
      disabled={disabled}
      iconLeft={iconLeft}
      iconRight={iconRight}
      iconOnly={iconOnly}
      className={cn(
        "relative shrink-0 !rounded-full focus-visible:z-10",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled || selected) {
          return;
        }
        onSelect(itemValue);
      }}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {children}
    </Button>
  );
}

export const ButtonGroup = Object.assign(ButtonGroupRoot, {
  Item: ButtonGroupItem,
});
