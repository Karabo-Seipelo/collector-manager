"use client";

import templateLogin3HeroSrc from "../../../templates/shared/assets/login-3-hero.png";
import { AuthSplitHeroTemplate } from "../../../templates/auth-split-hero/auth-split-hero-template";
import { SignupAuthFormPanel } from "../shared/signup-auth-form";

export function Signup3Page() {
  return (
    <AuthSplitHeroTemplate heroSrc={templateLogin3HeroSrc}>
      <SignupAuthFormPanel className="relative z-10" />
    </AuthSplitHeroTemplate>
  );
}
