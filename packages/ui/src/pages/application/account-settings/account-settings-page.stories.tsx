import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { AccountSettingsPage } from "./account-settings-page";

const meta = {
  title: "Pages/AccountSettings",
  component: AccountSettingsPage,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof AccountSettingsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <AccountSettingsPage
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <Example />,
  play: async () => {
    const body = within(document.body);
    await expect(
      body.getByRole("heading", { level: 1, name: "Account settings" }),
    ).toBeVisible();
    await expect(body.getByRole("tab", { name: "Profile" })).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(
      body.getByRole("heading", { level: 2, name: "Personal details" }),
    ).toBeVisible();
    await expect(body.getByText("08/09/1990")).toBeVisible();
    await expect(
      body.getByRole("link", { name: "Edit contact details" }),
    ).toBeVisible();
    await expect(
      body.getByText("john@practical-ui.com", { selector: "dd" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};
