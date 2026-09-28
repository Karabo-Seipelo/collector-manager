"use client";

import * as React from "react";

import { AuthPageGridDecoration } from "../shared/auth-page-grid";
import { AuthTestimonialPanel } from "../shared/auth-testimonial-panel";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

export interface AuthSplitTestimonialTemplateProps {
  children: React.ReactNode;
}

export function AuthSplitTestimonialTemplate({
  children,
}: AuthSplitTestimonialTemplateProps) {
  return (
    <div className="relative flex min-h-svh flex-col bg-fill-inverse md:flex-row">
      <div className="absolute left-8 top-8 z-20 hidden md:left-12 md:block">
        <PracticalUiLogo />
      </div>
      <section className="relative flex flex-1 flex-col gap-12 p-8 md:items-center md:justify-center md:p-2">
        <div className="md:hidden">
          <PracticalUiLogo />
        </div>
        <div className="relative z-10 w-full">{children}</div>
      </section>
      <aside className="relative hidden min-h-[240px] flex-1 items-center justify-center overflow-hidden border-l border-stroke-weak bg-fill-weak px-8 md:flex md:px-32">
        <AuthPageGridDecoration className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rotate-180 opacity-70 [mask-image:linear-gradient(to_top,black,transparent)]" />
        <div className="relative z-10 w-full max-w-xl">
          <AuthTestimonialPanel />
        </div>
      </aside>
    </div>
  );
}
