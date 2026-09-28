"use client";

import * as React from "react";

import { PracticalUiLogo } from "../shared/practical-ui-logo";

export interface AuthCenteredTemplateProps {
  children: React.ReactNode;
}

export function AuthCenteredTemplate({ children }: AuthCenteredTemplateProps) {
  return (
    <div className="relative flex min-h-svh flex-col bg-fill-inverse">
      <div className="absolute left-6 top-8 md:left-12">
        <PracticalUiLogo />
      </div>
      <div className="flex flex-1 items-center justify-center px-6 py-24">
        {children}
      </div>
    </div>
  );
}
