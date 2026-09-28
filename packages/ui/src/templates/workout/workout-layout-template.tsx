"use client";

import * as React from "react";

export interface WorkoutLayoutTemplateProps {
  navigation?: React.ReactNode;
  children: React.ReactNode;
  afterMain?: React.ReactNode;
  footer?: React.ReactNode;
  mobileStickyAction?: React.ReactNode;
}

export function WorkoutLayoutTemplate({
  navigation,
  children,
  afterMain,
  footer,
  mobileStickyAction,
}: WorkoutLayoutTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse">
      {navigation}
      {children}
      {afterMain}
      {footer}
      {mobileStickyAction}
    </div>
  );
}
