"use client";

import * as React from "react";

import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { getModalPanelClassName } from "./modal-styles";
import type { ModalSize } from "./modal-context";

export interface ModalPanelProps {
  panelRef: React.RefObject<HTMLDivElement | null>;
  titleId: string;
  descriptionId?: string;
  size: ModalSize;
  visible: boolean;
  dismissible: boolean;
  onClose: () => void;
  className?: string;
  onTransitionEnd?: React.TransitionEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

export function ModalPanel({
  panelRef,
  titleId,
  descriptionId,
  size,
  visible,
  dismissible,
  onClose,
  className,
  onTransitionEnd,
  children,
}: ModalPanelProps) {
  return (
    <div
      ref={panelRef}
      data-testid="modal-panel"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      aria-describedby={descriptionId || undefined}
      onTransitionEnd={onTransitionEnd}
      className={getModalPanelClassName({ size, visible, className })}
    >
      {dismissible ? (
        <ButtonIcon
          aria-label="Close"
          icon={<FeatherIcon name="x" size={24} />}
          variant="tertiary"
          tone="neutral"
          className="absolute right-8 top-8"
          onClick={onClose}
        />
      ) : null}
      {children}
    </div>
  );
}
