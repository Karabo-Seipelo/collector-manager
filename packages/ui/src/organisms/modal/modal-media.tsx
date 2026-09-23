"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { getModalMediaClassName } from "./modal-styles";

export interface ModalMediaProps {
  className?: string;
  children: React.ReactNode;
}

export function ModalMedia({ className, children }: ModalMediaProps) {
  return (
    <div className={cn(getModalMediaClassName(), className)}>{children}</div>
  );
}
