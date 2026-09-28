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

export function TemplateUserMenu({
  defaultOpen = false,
  compact = false,
}: {
  defaultOpen?: boolean;
  compact?: boolean;
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  const [darkMode, setDarkMode] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} align="bottom-right">
      <DropdownMenuTrigger>
        {compact ? (
          <button
            type="button"
            aria-label="John Smith"
            className="inline-flex rounded-full outline-none focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2"
          >
            <Avatar name="John Smith" src={login4AvatarSrc} alt="" size="small" />
          </button>
        ) : (
          <AvatarDropdown
            name="John Smith"
            src={login4AvatarSrc}
            open={open}
            size="small"
          />
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Account">
        <DropdownMenuAvatarItem
          name="John Smith"
          description="john@practical-ui.com"
          src={login4AvatarSrc}
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
