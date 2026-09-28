"use client";

import login4AvatarSrc from "../shared/assets/login-4-avatar.png";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import { PracticalUiLogo } from "../shared/practical-ui-logo";
import { AuthPageGridDecoration } from "./shared/auth-page-grid";
import { LoginAuthFormPanel } from "./shared/login-auth-form";

const LOGIN4_QUOTE = `\u201CI\u2019ve never found a single resource I can share with people to help them improve their design skills. That just changed.\u201D`;

function Login4TestimonialPanel() {
  return (
    <div className="relative flex flex-1 flex-col gap-8">
      <blockquote className="text-[32px] font-normal leading-10 text-fg-weak [word-break:break-word]">
        {LOGIN4_QUOTE}
      </blockquote>
      <AvatarLabelled
        name="John Smith"
        description="Product designer"
        src={login4AvatarSrc}
        alt=""
        size="large"
        className="gap-3"
      />
    </div>
  );
}

export function Login4Template() {
  return (
    <div className="relative flex min-h-svh flex-col bg-fill-inverse md:flex-row">
      <div className="absolute left-8 top-8 z-20 hidden md:left-12 md:block">
        <PracticalUiLogo />
      </div>

      <section className="relative flex flex-1 flex-col gap-12 p-8 md:items-center md:justify-center md:p-2">
        <div className="md:hidden">
          <PracticalUiLogo />
        </div>

        <LoginAuthFormPanel className="relative z-10" />
      </section>

      <aside className="relative hidden min-h-[240px] flex-1 items-center justify-center overflow-hidden border-l border-stroke-weak bg-fill-weak px-8 md:flex md:px-32">
        <AuthPageGridDecoration className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 rotate-180 opacity-70 [mask-image:linear-gradient(to_top,black,transparent)]" />

        <div className="relative z-10 w-full max-w-xl">
          <Login4TestimonialPanel />
        </div>
      </aside>
    </div>
  );
}
