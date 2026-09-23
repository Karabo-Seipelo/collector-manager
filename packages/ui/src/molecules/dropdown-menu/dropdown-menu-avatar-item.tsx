"use client";

import * as React from "react";

import type { AvatarSize, AvatarType } from "../../atoms/avatar/avatar";
import { AvatarLabelled } from "../avatar-labelled/avatar-labelled";
import { cn } from "../../lib/cn";

export interface DropdownMenuAvatarItemProps {
  name: string;
  description?: string;
  src?: string;
  alt?: string;
  avatarType?: AvatarType;
  size?: AvatarSize;
  className?: string;
}

export function DropdownMenuAvatarItem({
  name,
  description,
  src,
  alt,
  avatarType,
  size = "medium",
  className,
}: DropdownMenuAvatarItemProps) {
  return (
    <div
      role="presentation"
      className={cn("px-4 py-3", className)}
    >
      <AvatarLabelled
        name={name}
        description={description}
        src={src}
        alt={alt}
        type={avatarType}
        size={size}
        className="min-w-0"
      />
    </div>
  );
}
