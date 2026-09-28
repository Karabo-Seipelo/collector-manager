import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, within } from "storybook/test";

import { ApplicationShell } from "./application-shell";

const placeholder = (
  <div className="flex flex-1 items-center justify-center p-8">
    <p className="text-small text-fg-weak">Main content area</p>
  </div>
);

const meta = {
  title: "Templates/ApplicationShell",
  component: ApplicationShell,
  parameters: { layout: "fullscreen" },
  args: { children: placeholder },
} satisfies Meta<typeof ApplicationShell>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  defaultSidebarOpen = false,
  layout,
}: {
  defaultSidebarOpen?: boolean;
  layout?: "header" | "sidenav";
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);
  return (
    <ApplicationShell
      layout={layout}
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
      breadcrumbs={[
        { label: "Home", href: "#home" },
        { label: "Section", href: "#section" },
        { label: "Page" },
      ]}
    >
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </div>
    </ApplicationShell>
  );
}

export const HeaderLayout: Story = {
  render: () => <Example />,
  play: async () => {
    await expect(
      within(document.body).getByText("Main content area"),
    ).toBeVisible();
  },
};

export const SidenavLayout: Story = {
  render: () => <Example layout="sidenav" />,
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
