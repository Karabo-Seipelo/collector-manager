"use client";

import * as React from "react";

export interface MusicPlayerLayoutTemplateProps {
  mobileHeader: React.ReactNode;
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function MusicPlayerLayoutTemplate({
  mobileHeader,
  sidebar,
  children,
}: MusicPlayerLayoutTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse md:flex-row">
      {mobileHeader}
      {sidebar}
      {children}
    </div>
  );
}
