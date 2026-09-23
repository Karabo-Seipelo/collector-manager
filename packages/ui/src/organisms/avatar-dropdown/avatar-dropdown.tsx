"use client";

import * as React from "react";

import { FeatherIcon } from "../../atoms/icon/icon";
import { type AvatarSize, type AvatarType } from "../../atoms/avatar/avatar";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import { cn } from "../../lib/cn";

export type AvatarDropdownVariant = "button" | "navigation";

export interface AvatarDropdownProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  /** Visible name and accessible name of the trigger. */
  name: string;
  /** Optional second line under the name. */
  description?: string;
  /** Photo URL. Omit to show initials (or an icon when `avatarType` is `"icon"`). */
  src?: string;
  /** Native image `alt`. Defaults to `name`. */
  alt?: string;
  /** Avatar treatment when not inferred from `src`. */
  avatarType?: AvatarType;
  /** Avatar size. Spec uses `"small"` (32px). */
  size?: AvatarSize;
  /**
   * `"button"` hugs content with a chevron.
   * `"navigation"` stretches to the parent width with a more-horizontal icon.
   */
  variant?: AvatarDropdownVariant;
  /** Sets `aria-expanded`. Button variant uses chevron-up when true. */
  open?: boolean;
}

export const AvatarDropdown = React.forwardRef<
  HTMLButtonElement,
  AvatarDropdownProps
>(function AvatarDropdown(
  {
    name,
    description,
    src,
    alt,
    avatarType,
    size = "small",
    variant = "button",
    open = false,
    className,
    disabled,
    ...rest
  },
  ref,
) {
  const navigation = variant === "navigation";
  const iconName = navigation
    ? "more-horizontal"
    : open
      ? "chevron-up"
      : "chevron-down";

  return (
    <button
      ref={ref}
      type="button"
      disabled={disabled}
      aria-expanded={open}
      aria-haspopup="menu"
      className={cn(
        "inline-flex items-center gap-2 rounded-lg font-body outline-none",
        "hover:bg-fill-hover active:bg-fill-press",
        "focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-30",
        navigation ? "w-full px-6 py-3" : "px-4 py-2",
        className,
      )}
      {...rest}
    >
      <AvatarLabelled
        name={name}
        description={description}
        src={src}
        alt={alt}
        type={avatarType}
        size={size}
        className={cn("min-w-0 text-left", navigation && "flex flex-1")}
      />
      <FeatherIcon
        name={iconName}
        size={24}
        className="shrink-0 text-fg-weak"
      />
    </button>
  );
});
