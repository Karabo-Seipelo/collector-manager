"use client";

import { cn } from "../../../lib/cn";
import { Button } from "../../../atoms/button/button";
import { Divider } from "../../../atoms/divider/divider";
import { TextLink } from "../../../atoms/text-link/text-link";
import { TextField } from "../../../molecules/text-field/text-field";
import { GoogleIcon, OrDivider } from "./login-auth-form";

export function SignupAuthHeading() {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-heading-1 font-semibold tracking-[-0.5px] text-fg-strong">
        Sign up free
      </h1>
      <p className="text-small text-fg-weak">No credit card required</p>
    </div>
  );
}

export function SignupLegalText() {
  return (
    <p className="text-tiny leading-5 text-fg-weak">
      By signing up you agree to our{" "}
      <TextLink href="#terms" size="tiny">
        terms
      </TextLink>{" "}
      and have read the{" "}
      <TextLink href="#privacy" size="tiny">
        privacy policy
      </TextLink>
      .
    </p>
  );
}

/** Sign up 2 card footer (Figma splits links across two lines). */
export function SignupLegalTextCardFooter() {
  return (
    <div className="flex flex-col gap-2 text-tiny leading-5 text-fg-weak">
      <p className="flex flex-wrap items-center gap-1">
        <span>By signing up you agree to our</span>
        <TextLink href="#terms" size="tiny">
          terms of service
        </TextLink>
      </p>
      <p className="flex flex-wrap items-center gap-1">
        <span>and have read the</span>
        <TextLink href="#privacy" size="tiny">
          privacy policy.
        </TextLink>
      </p>
    </div>
  );
}

export function SignupAuthFields({ orPillClassName }: { orPillClassName?: string }) {
  return (
    <div className="flex w-full flex-col gap-4">
      <Button type="button" variant="secondary" tone="neutral" fullWidth iconLeft={<GoogleIcon />}>
        Sign up with Google
      </Button>

      <OrDivider orPillClassName={orPillClassName} />

      <div className="flex flex-col gap-6">
        <TextField label="Email" type="email" autoComplete="email" />
        <TextField label="Password" type="password" autoComplete="new-password" />

        <Button type="button" fullWidth>
          Sign up
        </Button>

        <p className="flex flex-wrap items-center gap-2 text-tiny leading-5 text-fg-weak">
          <span>Already have an account?</span>
          <TextLink href="#login" size="tiny">
            Log in
          </TextLink>
        </p>
      </div>
    </div>
  );
}

export function SignupAuthFormPanel({
  className,
  legalVariant = "inline",
}: {
  className?: string;
  /** Sign up 1 uses one paragraph; sign up 3+ use two-line terms links. */
  legalVariant?: "inline" | "split";
}) {
  return (
    <div className={cn("flex w-full max-w-[364px] flex-col gap-12", className)}>
      <SignupAuthHeading />

      <div className="flex flex-col gap-6">
        <SignupAuthFields />
        <Divider type="weak" />
        {legalVariant === "split" ? <SignupLegalTextCardFooter /> : <SignupLegalText />}
      </div>
    </div>
  );
}
