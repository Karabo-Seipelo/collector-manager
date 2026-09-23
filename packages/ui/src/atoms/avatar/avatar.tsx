"use client";

import * as React from "react";

import { cn } from "../../lib/cn";
import { FeatherIcon } from "../icon/icon";

export type AvatarSize = "small" | "medium" | "large";
export type AvatarType = "photo" | "icon" | "initials";

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  const first = parts[0];
  const second = parts[1];
  if (!first) {
    return "";
  }
  if (!second) {
    return first.slice(0, 2).toUpperCase();
  }
  return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase();
}

const sizes: Record<
  AvatarSize,
  { root: string; text: string; icon: number }
> = {
  small: {
    root: "size-8",
    text: "text-tiny font-semibold leading-5",
    icon: 20,
  },
  medium: {
    root: "size-12",
    text: "text-heading-4 font-semibold",
    icon: 24,
  },
  large: {
    root: "size-16",
    text: "text-heading-3 font-semibold",
    icon: 32,
  },
};

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  name: string;
  src?: string;
  alt?: string;
  size?: AvatarSize;
  type?: AvatarType;
  initials?: string;
}

export const Avatar = React.forwardRef<HTMLSpanElement, AvatarProps>(
  function Avatar(
    { name, src, alt, size = "medium", type, initials, className, ...rest },
    ref,
  ) {
    const [failed, setFailed] = React.useState(false);
    const resolvedType: AvatarType = type ?? (src ? "photo" : "initials");
    const showPhoto = resolvedType === "photo" && Boolean(src) && !failed;
    const showIcon = resolvedType === "icon";
    const decorative =
      rest["aria-hidden"] === true || rest["aria-hidden"] === "true";
    const s = sizes[size];

    React.useEffect(() => {
      setFailed(false);
    }, [src]);

    return (
      <span
        ref={ref}
        {...rest}
        role={showPhoto || decorative ? rest.role : "img"}
        aria-label={showPhoto || decorative ? rest["aria-label"] : name}
        className={cn(
          "relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full",
          "border border-stroke-weak bg-fill-weak font-body",
          s.root,
          className,
        )}
      >
        {showPhoto ? (
          <img
            src={src}
            alt={decorative ? "" : (alt ?? name)}
            className="size-full object-cover"
            onError={() => setFailed(true)}
          />
        ) : showIcon ? (
          <FeatherIcon
            name="user"
            size={s.icon}
            className="text-icon-neutral"
          />
        ) : (
          <span aria-hidden="true" className={`${s.text} text-fg-weak`}>
            {initials ?? getInitials(name)}
          </span>
        )}
      </span>
    );
  },
);
