import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { ApplicationTablePage } from "./application-table-page";

const meta = {
  title: "Pages/ApplicationTable",
  component: ApplicationTablePage,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof ApplicationTablePage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example(props: { defaultSidebarOpen?: boolean }) {
  const [sidebarOpen, setSidebarOpen] = React.useState(props.defaultSidebarOpen ?? false);
  return (
    <ApplicationTablePage
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: () => <Example />,
  play: async () => {
    const body = within(document.body);
    await expect(body.getByRole("heading", { name: "Applicants", level: 1 })).toBeVisible();
    await expect(body.getByRole("radio", { name: "Last 7 days" })).toBeChecked();
    await expect(body.getByRole("cell", { name: /John Smith/ })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};
