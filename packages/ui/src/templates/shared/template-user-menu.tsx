"use client";

import * as React from "react";

import { Avatar } from "../../atoms/avatar/avatar";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Toggle } from "../../atoms/toggle/toggle";
import { AvatarDropdown } from "../../organisms/avatar-dropdown/avatar-dropdown";
import {
  DropdownMenu,
  DropdownMenuAvatarItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../organisms/dropdown-menu/dropdown-menu";
import login4AvatarSrc from "./assets/login-4-avatar.png";

export type TemplateUserMenuVariant = "header" | "compact" | "navigation";

export interface TemplateUser {
  name: string;
  email: string;
  src: string;
}

export const defaultTemplateUser: TemplateUser = {
  name: "John Smith",
  email: "john@practical-ui.com",
  src: login4AvatarSrc,
};

export function TemplateUserMenu({
  defaultOpen = false,
  variant = "header",
  user = defaultTemplateUser,
}: {
  defaultOpen?: boolean;
  variant?: TemplateUserMenuVariant;
  user?: TemplateUser;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [darkMode, setDarkMode] = React.useState(false);

  let trigger: React.ReactElement;
  if (variant === "compact") {
    trigger = (
      <button
        type="button"
        aria-label={user.name}
        className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2"
      >
        <Avatar name={user.name} src={user.src} alt="" size="small" />
      </button>
    );
  } else if (variant === "navigation") {
    trigger = (
      <AvatarDropdown
        variant="navigation"
        name={user.name}
        description={user.email}
        src={user.src}
        open={open}
        size="medium"
      />
    );
  } else {
    trigger = (
      <AvatarDropdown
        name={user.name}
        src={user.src}
        open={open}
        size="small"
      />
    );
  }

  return (
    <DropdownMenu
      open={open}
      onOpenChange={setOpen}
      align={variant === "navigation" ? "top-left" : "bottom-right"}
    >
      <DropdownMenuTrigger>{trigger}</DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Account">
        <DropdownMenuAvatarItem
          name={user.name}
          description={user.email}
          src={user.src}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<FeatherIcon name="user" size={24} />}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem icon={<FeatherIcon name="settings" size={24} />}>
          Account settings
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<FeatherIcon name="link" size={24} />}
          trailing={<BadgeCount emphasis="weak">8</BadgeCount>}
        >
          Integrations
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<FeatherIcon name="moon" size={24} />}
          trailing={
            <Toggle
              checked={darkMode}
              onChange={(event) => setDarkMode(event.target.checked)}
              aria-label="Dark mode"
            />
          }
          closeOnSelect={false}
        >
          Dark mode
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<FeatherIcon name="log-out" size={24} />}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
