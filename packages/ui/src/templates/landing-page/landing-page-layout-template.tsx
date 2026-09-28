"use client";

import * as React from "react";

export interface LandingPageLayoutTemplateProps {
  navigation: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function LandingPageLayoutTemplate({
  navigation,
  children,
  footer,
}: LandingPageLayoutTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      {navigation}
      {children}
      {footer}
    </div>
  );
}
