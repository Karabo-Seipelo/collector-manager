"use client";

import * as React from "react";

export interface ShopLayoutTemplateProps {
  navigation: React.ReactNode;
  children: React.ReactNode;
  footer: React.ReactNode;
}

export function ShopLayoutTemplate({
  navigation,
  children,
  footer,
}: ShopLayoutTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse">
      {navigation}
      {children}
      {footer}
    </div>
  );
}
