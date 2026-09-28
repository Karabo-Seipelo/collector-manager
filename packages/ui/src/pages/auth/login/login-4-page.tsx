"use client";

import { AuthSplitTestimonialTemplate } from "../../../templates/auth-split-testimonial/auth-split-testimonial-template";
import { LoginAuthFormPanel } from "../shared/login-auth-form";

export function Login4Page() {
  return (
    <AuthSplitTestimonialTemplate>
      <LoginAuthFormPanel className="relative z-10" />
    </AuthSplitTestimonialTemplate>
  );
}
