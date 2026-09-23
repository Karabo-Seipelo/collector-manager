"use client";

import * as React from "react";

import { getModalOverlayClassName } from "./modal-styles";

export interface ModalOverlayProps {
  visible: boolean;
  className?: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function ModalOverlay({
  visible,
  className,
  onClose,
  children,
}: ModalOverlayProps) {
  return (
    <div
      data-testid="modal-overlay"
      className={getModalOverlayClassName(visible, className)}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      {children}
    </div>
  );
}
