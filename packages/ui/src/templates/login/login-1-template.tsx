"use client";

import { PracticalUiLogo } from "../shared/practical-ui-logo";
import { LoginAuthFormPanel } from "./shared/login-auth-form";

export function Login1Template() {
  return (
    <div className="relative flex min-h-svh flex-col bg-fill-inverse">
      <div className="absolute left-6 top-8 md:left-12">
        <PracticalUiLogo />
      </div>

      <div className="flex flex-1 items-center justify-center px-6 py-24">
        <LoginAuthFormPanel />
      </div>
    </div>
  );
}
