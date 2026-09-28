"use client";

import * as React from "react";

import { PracticalUiLogo } from "../shared/practical-ui-logo";
import { AuthPageGridDecoration } from "../shared/auth-page-grid";

export interface AuthCardTemplateProps {
  children: React.ReactNode;
  footer?: React.ReactNode;
}

export function AuthCardTemplate({ children, footer }: AuthCardTemplateProps) {
  return (
    <div className="relative flex min-h-svh flex-col items-center justify-center bg-fill-weak">
      <AuthPageGridDecoration />
      <div className="absolute left-6 top-8 md:left-12">
        <PracticalUiLogo />
      </div>
      <div className="relative z-10 mx-6 w-full max-w-[460px] overflow-hidden rounded-2xl border border-stroke-weak bg-fill-inverse shadow-overlay">
        <div className="flex flex-col items-center p-12">
          <div className="flex w-full max-w-[364px] flex-col gap-12">{children}</div>
        </div>
        {footer ? (
          <div className="border-t border-stroke-weak bg-fill-weaker px-12 py-8">
            {footer}
          </div>
        ) : null}
      </div>
    </div>
  );
}
