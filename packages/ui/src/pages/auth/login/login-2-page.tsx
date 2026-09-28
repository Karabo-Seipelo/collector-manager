"use client";

import { AuthCardTemplate } from "../../../templates/auth-card/auth-card-template";
import {
  LoginAuthFields,
  LoginAuthHeading,
  LoginLegalText,
} from "../shared/login-auth-form";

export function Login2Page() {
  return (
    <AuthCardTemplate footer={<LoginLegalText />}>
      <LoginAuthHeading />
      <LoginAuthFields orPillClassName="bg-fill-inverse" />
    </AuthCardTemplate>
  );
}
