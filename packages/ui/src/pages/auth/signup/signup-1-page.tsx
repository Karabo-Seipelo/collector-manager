"use client";

import { AuthCenteredTemplate } from "../../../templates/auth-centered/auth-centered-template";
import { SignupAuthFormPanel } from "../shared/signup-auth-form";

export function Signup1Page() {
  return (
    <AuthCenteredTemplate>
      <SignupAuthFormPanel />
    </AuthCenteredTemplate>
  );
}
