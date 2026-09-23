"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { useControllableBoolean } from "../../lib/use-controllable-boolean";
import { useFocusTrap } from "../../lib/use-focus-trap";
import { useScrollLock } from "../../lib/use-scroll-lock";
import {
  DrawerContext,
  type DrawerSide,
  type DrawerSize,
} from "./drawer-context";
import { DrawerOverlay } from "./drawer-overlay";
import { DrawerPanel } from "./drawer-panel";

export type { DrawerSide, DrawerSize } from "./drawer-context";
export { DrawerContent } from "./drawer-content";
export { DrawerFooter } from "./drawer-footer";
export { DrawerHeader } from "./drawer-header";

export interface DrawerProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  size?: DrawerSize;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Drawer({
  open,
  defaultOpen = false,
  onOpenChange,
  side = "right",
  size = "small",
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  children,
}: DrawerProps) {
  const { currentValue, setCurrentValue } = useControllableBoolean(
    open,
    defaultOpen,
  );
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const [mounted, setMounted] = React.useState(false);
  const [present, setPresent] = React.useState(currentValue);
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  React.useLayoutEffect(() => {
    if (currentValue) {
      setPresent(true);
      setVisible(false);
    }
  }, [currentValue]);

  React.useEffect(() => {
    if (!present || !currentValue) {
      if (!currentValue) setVisible(false);
      return;
    }

    setVisible(false);
    let frame2 = 0;
    const frame1 = requestAnimationFrame(() => {
      frame2 = requestAnimationFrame(() => setVisible(true));
    });

    return () => {
      cancelAnimationFrame(frame1);
      cancelAnimationFrame(frame2);
    };
  }, [currentValue, present]);

  React.useEffect(() => {
    if (visible || currentValue || !present) return;
    const timeout = window.setTimeout(() => setPresent(false), 320);
    return () => clearTimeout(timeout);
  }, [visible, currentValue, present]);

  const setOpen = React.useCallback(
    (next: boolean) => {
      setCurrentValue(next);
      onOpenChange?.(next);
    },
    [onOpenChange, setCurrentValue],
  );

  const onClose = React.useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useScrollLock(present);
  useFocusTrap(panelRef, currentValue);

  React.useEffect(() => {
    if (!currentValue || !closeOnEscape) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeOnEscape, currentValue, onClose]);

  const handlePanelTransitionEnd = (
    event: React.TransitionEvent<HTMLDivElement>,
  ) => {
    if (event.propertyName !== "transform" || event.target !== panelRef.current) {
      return;
    }
    if (!currentValue) {
      setPresent(false);
    }
  };

  if (!present || !mounted) return null;

  return createPortal(
    <DrawerContext.Provider value={{ titleId, onClose, side, size }}>
      <DrawerOverlay
        side={side}
        visible={visible}
        onClose={closeOnOverlayClick ? onClose : () => undefined}
      >
        <DrawerPanel
          panelRef={panelRef}
          titleId={titleId}
          side={side}
          size={size}
          visible={visible}
          className={className}
          onTransitionEnd={handlePanelTransitionEnd}
        >
          {children}
        </DrawerPanel>
      </DrawerOverlay>
    </DrawerContext.Provider>,
    document.body,
  );
}
