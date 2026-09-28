"use client";

import { AuthSplitTestimonialTemplate } from "../../../templates/auth-split-testimonial/auth-split-testimonial-template";
import { SignupAuthFormPanel } from "../shared/signup-auth-form";

export function Signup4Page() {
  return (
    <AuthSplitTestimonialTemplate>
      <SignupAuthFormPanel className="relative z-10" legalVariant="split" />
    </AuthSplitTestimonialTemplate>
  );
}
