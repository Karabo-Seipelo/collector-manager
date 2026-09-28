"use client";

import * as React from "react";

import { AuthPageGridDecoration } from "../shared/auth-page-grid";
import { PracticalUiLogo } from "../shared/practical-ui-logo";

export interface AuthSplitHeroTemplateProps {
  children: React.ReactNode;
  heroSrc: string;
  heroAlt?: string;
}

export function AuthSplitHeroTemplate({
  children,
  heroSrc,
  heroAlt = "",
}: AuthSplitHeroTemplateProps) {
  return (
    <div className="relative flex min-h-svh flex-col bg-fill-inverse md:flex-row">
      <div className="absolute left-8 top-8 z-20 hidden md:left-12 md:block">
        <PracticalUiLogo />
      </div>
      <section className="relative flex flex-1 flex-col gap-12 p-8 md:items-center md:justify-center md:p-2">
        <div className="md:hidden">
          <PracticalUiLogo />
        </div>
        <AuthPageGridDecoration className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-[360px] rotate-180 opacity-70 [mask-image:linear-gradient(to_top,black,transparent)] md:block" />
        <div className="relative z-10 w-full">{children}</div>
      </section>
      <aside className="relative hidden min-h-[240px] flex-1 border-l border-stroke-weak md:block">
        <img
          src={heroSrc}
          alt={heroAlt}
          className="absolute inset-0 size-full object-cover"
        />
      </aside>
    </div>
  );
}
