"use client";

import * as React from "react";
import { createPortal } from "react-dom";

import { useControllableBoolean } from "../../lib/use-controllable-boolean";
import { useFocusTrap } from "../../lib/use-focus-trap";
import { useScrollLock } from "../../lib/use-scroll-lock";
import {
  ModalContext,
  type ModalSize,
  type ModalTone,
} from "./modal-context";
import { ModalOverlay } from "./modal-overlay";
import { ModalPanel } from "./modal-panel";

export type { ModalSize, ModalTone };
export { ModalContent } from "./modal-content";
export { ModalFooter } from "./modal-footer";
export { ModalHeader } from "./modal-header";
export { ModalMedia } from "./modal-media";

export interface ModalProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  size?: ModalSize;
  tone?: ModalTone;
  dismissible?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  className?: string;
  children: React.ReactNode;
}

export function Modal({
  open,
  defaultOpen = false,
  onOpenChange,
  size = "small",
  tone = "default",
  dismissible = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  className,
  children,
}: ModalProps) {
  const { currentValue, setCurrentValue } = useControllableBoolean(
    open,
    defaultOpen,
  );
  const panelRef = React.useRef<HTMLDivElement>(null);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const [hasDescription, setHasDescription] = React.useState(false);
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
    if (event.target !== panelRef.current || currentValue) {
      return;
    }
    setPresent(false);
  };

  if (!present || !mounted) return null;

  return createPortal(
    <ModalContext.Provider
      value={{
        titleId,
        descriptionId,
        setHasDescription,
        onClose,
        size,
        tone,
        dismissible,
      }}
    >
      <ModalOverlay
        visible={visible}
        onClose={closeOnOverlayClick ? onClose : () => undefined}
      >
        <ModalPanel
          panelRef={panelRef}
          titleId={titleId}
          descriptionId={hasDescription ? descriptionId : undefined}
          size={size}
          visible={visible}
          dismissible={dismissible}
          onClose={onClose}
          className={className}
          onTransitionEnd={handlePanelTransitionEnd}
        >
          {children}
        </ModalPanel>
      </ModalOverlay>
    </ModalContext.Provider>,
    document.body,
  );
}
