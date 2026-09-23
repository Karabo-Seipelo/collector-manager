"use client";

import * as React from "react";

import { getModalFooterClassName } from "./modal-styles";

export interface ModalFooterProps {
  className?: string;
  children: React.ReactNode;
}

export function ModalFooter({ className, children }: ModalFooterProps) {
  return (
    <footer className={getModalFooterClassName(className)}>{children}</footer>
  );
}
