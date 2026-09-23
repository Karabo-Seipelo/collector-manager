"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { Input } from "../../atoms/input/input";
import { cn } from "../../lib/cn";

export interface HeroEmailSignupProps
  extends Omit<React.FormHTMLAttributes<HTMLFormElement>, "onSubmit"> {
  placeholder?: string;
  buttonLabel?: string;
  inputClassName?: string;
  onSubscribe?: (email: string) => void;
}

export function HeroEmailSignup({
  placeholder = "Email",
  buttonLabel = "Subscribe",
  className,
  inputClassName,
  onSubscribe,
  ...rest
}: HeroEmailSignupProps) {
  const [email, setEmail] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubscribe?.(email);
  }

  return (
    <form
      className={cn(
        "flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-start",
        className,
      )}
      onSubmit={handleSubmit}
      {...rest}
    >
      <Input
        type="email"
        placeholder={placeholder}
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className={cn("w-full md:w-[300px] md:max-w-[300px]", inputClassName)}
        aria-label={placeholder}
      />
      <Button type="submit" size="medium" fullWidth className="md:w-auto">
        {buttonLabel}
      </Button>
    </form>
  );
}
