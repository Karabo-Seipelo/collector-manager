"use client";

import * as React from "react";

import { getModalContentClassName } from "./modal-styles";

export interface ModalContentProps {
  className?: string;
  children: React.ReactNode;
}

export function ModalContent({ className, children }: ModalContentProps) {
  return (
    <div className={getModalContentClassName(className)}>{children}</div>
  );
}
