"use client";

import { AuthCardTemplate } from "../../../templates/auth-card/auth-card-template";
import {
  SignupAuthFields,
  SignupAuthHeading,
  SignupLegalTextCardFooter,
} from "../shared/signup-auth-form";

export function Signup2Page() {
  return (
    <AuthCardTemplate footer={<SignupLegalTextCardFooter />}>
      <SignupAuthHeading />
      <SignupAuthFields orPillClassName="bg-fill-inverse" />
    </AuthCardTemplate>
  );
}
