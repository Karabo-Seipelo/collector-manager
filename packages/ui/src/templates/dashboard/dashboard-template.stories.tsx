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

function Example() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <DashboardTemplate sidebarOpen={sidebarOpen} onSidebarOpenChange={setSidebarOpen} />
  );
}

export const Desktop: Story = {
  render: () => <Example />,
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Dashboard" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};
