import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { ApplicationSidenavTemplate } from "./application-sidenav-template";

const meta = {
  title: "Templates/ApplicationSidenav",
  component: ApplicationSidenavTemplate,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof ApplicationSidenavTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({ defaultSidebarOpen = false }: { defaultSidebarOpen?: boolean }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);
  return (
    <ApplicationSidenavTemplate
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <Example />,
  play: async () => {
    await expect(
      within(document.body).getByText("Main content area"),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};

export const MobileSidebarOpen: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example defaultSidebarOpen />,
  play: async () => {
    await expect(
      within(document.body).getByRole("button", { name: "Close navigation" }),
    ).toBeVisible();
  },
};
