"use client";

import templateLogin3HeroSrc from "../../../templates/shared/assets/login-3-hero.png";
import { AuthSplitHeroTemplate } from "../../../templates/auth-split-hero/auth-split-hero-template";
import { LoginAuthFormPanel } from "../shared/login-auth-form";

export function Login3Page() {
  return (
    <AuthSplitHeroTemplate heroSrc={templateLogin3HeroSrc}>
      <LoginAuthFormPanel className="relative z-10" />
    </AuthSplitHeroTemplate>
  );
}
