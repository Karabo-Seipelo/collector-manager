import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { ApplicationTableSelectPage } from "./application-table-select-page";

const meta = {
  title: "Pages/ApplicationTableSelect",
  component: ApplicationTableSelectPage,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof ApplicationTableSelectPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <ApplicationTableSelectPage
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
    await expect(body.getByRole("checkbox", { name: "Select all rows" })).toBePartiallyChecked();
    await expect(body.getByRole("checkbox", { name: "Select John Smith" })).toBeChecked();
    await expect(body.getByText("2 items selected")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};
