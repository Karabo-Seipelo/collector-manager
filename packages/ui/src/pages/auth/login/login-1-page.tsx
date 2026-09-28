"use client";

import { AuthCenteredTemplate } from "../../../templates/auth-centered/auth-centered-template";
import { LoginAuthFormPanel } from "../shared/login-auth-form";

export function Login1Page() {
  return (
    <AuthCenteredTemplate>
      <LoginAuthFormPanel />
    </AuthCenteredTemplate>
  );
}
