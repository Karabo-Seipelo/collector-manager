import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import * as React from "react";

import { Badge } from "../../atoms/badge/badge";
import { BadgeCount } from "../../atoms/badge-count/badge-count";
import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Toggle } from "../../atoms/toggle/toggle";
import { AvatarDropdown } from "../avatar-dropdown/avatar-dropdown";
import {
  DropdownMenu,
  DropdownMenuAvatarItem,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./dropdown-menu";

const photoSrc =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 96 96">
      <rect width="96" height="96" fill="#c9a07a"/>
      <circle cx="48" cy="38" r="16" fill="#e8c4a0"/>
      <ellipse cx="48" cy="92" rx="28" ry="32" fill="#3f4a5c"/>
    </svg>`,
  );

const meta = {
  title: "Organisms/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Floating menu triggered by a button, icon button, or avatar trigger. Supports alignment, keyboard navigation, and item variants from the Practical UI spec.",
      },
    },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

function ButtonTriggerMenu({
  align = "bottom-left",
  size = "medium",
}: {
  align?: "bottom-left" | "bottom-right" | "top-left" | "top-right";
  size?: "small" | "medium";
}) {
  const [open, setOpen] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen} align={align}>
      <DropdownMenuTrigger>
        <Button
          variant="secondary"
          size={size}
          iconRight={
            <FeatherIcon name={open ? "chevron-up" : "chevron-down"} />
          }
        >
          Label
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Actions">
        <DropdownMenuAvatarItem
          name="John Smith"
          description="john@practical-ui.com"
          src={photoSrc}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<FeatherIcon name="user" size={24} />}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem icon={<FeatherIcon name="settings" size={24} />}>
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<FeatherIcon name="bell" size={24} />}
          description="Secondary text"
        >
          Notifications
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<FeatherIcon name="log-out" size={24} />}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const Default: Story = {
  render: () => <ButtonTriggerMenu />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Label" }));
    await expect(canvas.getByRole("menu", { name: "Actions" })).toBeVisible();
  },
};

export const SmallButton: Story = {
  render: () => <ButtonTriggerMenu size="small" />,
};

export const TopRight: Story = {
  render: () => <ButtonTriggerMenu align="top-right" />,
};

function IconButtonTriggerExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <ButtonIcon
          aria-label="More actions"
          icon={<FeatherIcon name="more-vertical" />}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="More actions">
        <DropdownMenuItem icon={<FeatherIcon name="edit-2" size={24} />}>
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem icon={<FeatherIcon name="copy" size={24} />}>
          Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<FeatherIcon name="trash-2" size={24} />}>
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function AvatarTriggerExample() {
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} align="bottom-right">
      <DropdownMenuTrigger>
        <AvatarDropdown name="John Smith" src={photoSrc} open={open} />
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Account">
        <DropdownMenuAvatarItem
          name="John Smith"
          description="john@practical-ui.com"
          src={photoSrc}
        />
        <DropdownMenuSeparator />
        <DropdownMenuItem icon={<FeatherIcon name="user" size={24} />}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem icon={<FeatherIcon name="log-out" size={24} />}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function ItemVariantsExample() {
  const [open, setOpen] = React.useState(true);
  const [checked, setChecked] = React.useState(true);
  const [enabled, setEnabled] = React.useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger>
        <Button variant="secondary">Menu</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent aria-label="Item variants">
        <DropdownMenuLabel>Heading</DropdownMenuLabel>
        <DropdownMenuItem selected icon={<FeatherIcon name="star" size={24} />}>
          Selected item
        </DropdownMenuItem>
        <DropdownMenuCheckboxItem
          checked={checked}
          onCheckedChange={setChecked}
        >
          Checkbox item
        </DropdownMenuCheckboxItem>
        <DropdownMenuItem
          icon={<FeatherIcon name="tag" size={24} />}
          trailing={<Badge tone="neutral">Label</Badge>}
        >
          With badge
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<FeatherIcon name="inbox" size={24} />}
          trailing={<BadgeCount emphasis="weak">8</BadgeCount>}
        >
          With count
        </DropdownMenuItem>
        <DropdownMenuItem
          icon={<FeatherIcon name="moon" size={24} />}
          trailing={
            <Toggle
              checked={enabled}
              onChange={(event) => setEnabled(event.target.checked)}
              aria-label="Dark mode"
            />
          }
          closeOnSelect={false}
        >
          With toggle
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const IconButtonTrigger: Story = {
  render: () => <IconButtonTriggerExample />,
};

export const AvatarTrigger: Story = {
  render: () => <AvatarTriggerExample />,
};

export const ItemVariants: Story = {
  render: () => <ItemVariantsExample />,
};
