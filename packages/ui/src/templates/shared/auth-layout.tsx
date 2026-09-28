"use client";

import { Button } from "../../atoms/button/button";
import { TextLink } from "../../atoms/text-link/text-link";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { TextField } from "../../molecules/text-field/text-field";
import { Footer } from "../../organisms/footer/footer";
import { FeatherIcon } from "../../atoms/icon/icon";
import { templateHeroGradientSrc } from "./mock-photo";
import { PracticalUiLogo } from "./practical-ui-logo";

export type AuthLayoutVariant = "split" | "centered" | "stacked" | "minimal";

export interface AuthLayoutProps {
  variant?: AuthLayoutVariant;
  mode?: "login" | "signup";
}

export function AuthLayout({ variant = "split", mode = "login" }: AuthLayoutProps) {
  const title = mode === "login" ? "Welcome back" : "Create your account";
  const primary = mode === "login" ? "Sign in" : "Sign up";
  const alternate =
    mode === "login" ? (
      <>
        Don&apos;t have an account? <TextLink href="#signup">Sign up</TextLink>
      </>
    ) : (
      <>
        Already have an account? <TextLink href="#login">Sign in</TextLink>
      </>
    );

  const form = (
    <div className="flex w-full max-w-md flex-col gap-6">
      <div className="flex flex-col gap-2">
        <PracticalUiLogo />
        <h1 className="text-heading-2 font-semibold text-fg-strong">{title}</h1>
        <p className="text-small text-fg-weak">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <TextField label="Email" type="email" placeholder="you@example.com" />
        <TextField label="Password" type="password" placeholder="••••••••" />
        {mode === "signup" ? (
          <TextField label="Confirm password" type="password" placeholder="••••••••" />
        ) : null}
      </div>
      {mode === "login" ? (
        <TextLink href="#forgot" size="small">
          Forgot password?
        </TextLink>
      ) : null}
      <ButtonGroup layout="vertical" aria-label="Auth actions">
        <Button>{primary}</Button>
        <Button variant="secondary" tone="neutral">
          Continue with Google
        </Button>
      </ButtonGroup>
      <p className="text-small text-fg-weak">{alternate}</p>
    </div>
  );

  const media = (
    <div className="relative hidden min-h-[240px] flex-1 overflow-hidden bg-fill-weak md:block">
      <img
        src={templateHeroGradientSrc}
        alt=""
        className="absolute inset-0 size-full object-cover"
      />
      <div className="relative flex h-full flex-col justify-end p-8 text-text-inverse-strong">
        <p className="text-heading-4 font-semibold">Practical UI</p>
        <p className="mt-2 max-w-sm text-small">
          Build polished interfaces faster with a complete design system.
        </p>
      </div>
    </div>
  );

  if (variant === "centered") {
    return (
      <div className="flex min-h-svh flex-col bg-fill-weaker">
        <div className="flex flex-1 items-center justify-center p-6">
          <div className="w-full max-w-md rounded-2xl border border-stroke-weak bg-fill-inverse p-8 shadow-raised">
            {form}
          </div>
        </div>
        <AuthFooter />
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className="flex min-h-svh flex-col bg-fill-inverse">
        <header className="flex items-center justify-between border-b border-stroke-weak px-6 py-4">
          <PracticalUiLogo />
          <TextLink href="#help" iconRight={<FeatherIcon name="help-circle" size={20} />}>
            Help
          </TextLink>
        </header>
        <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center px-6 py-12">
          {form}
        </div>
        <AuthFooter />
      </div>
    );
  }

  if (variant === "minimal") {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center bg-fill-weaker p-6">
        {form}
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col md:flex-row">
      <div className="flex flex-1 items-center justify-center p-6 md:p-12">{form}</div>
      {media}
    </div>
  );
}

function AuthFooter() {
  return (
    <Footer
      logo={<PracticalUiLogo />}
      copyright="© Practical UI"
      socialLinks={[]}
      navLinks={[
        { label: "Privacy", href: "#privacy" },
        { label: "Terms", href: "#terms" },
      ]}
    />
  );
}
