import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { DashboardTemplate } from "./dashboard-template";

const meta = {
  title: "Templates/Dashboard",
  component: DashboardTemplate,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof DashboardTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(props: React.ComponentProps<typeof DashboardTemplate>) {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <DashboardTemplate
      {...props}
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <Example />,
  play: async () => {
    const body = within(document.body);
    await expect(body.getByRole("heading", { name: "Hi, John" })).toBeVisible();
    await expect(body.getByRole("heading", { name: "Applicants" })).toBeVisible();
    await expect(body.getByRole("alert")).toHaveTextContent(/Verify your email/i);
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};

export const UserMenuOpen: Story = {
  render: () => <Example userMenuDefaultOpen />,
  play: async () => {
    const body = within(document.body);
    await expect(body.getByRole("menu", { name: "Account" })).toBeVisible();
    await expect(body.getByRole("menuitem", { name: /Profile/i })).toBeVisible();
  },
};
