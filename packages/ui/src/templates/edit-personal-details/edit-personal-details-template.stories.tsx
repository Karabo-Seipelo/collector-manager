import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { EditPersonalDetailsTemplate } from "./edit-personal-details-template";

const meta = {
  title: "Templates/EditPersonalDetails",
  component: EditPersonalDetailsTemplate,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof EditPersonalDetailsTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <EditPersonalDetailsTemplate
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
      body.getByRole("heading", { level: 1, name: "Edit personal details" }),
    ).toBeVisible();
    await expect(
      body.getByRole("link", { name: "Account settings" }),
    ).toBeVisible();
    await expect(body.getByRole("textbox", { name: "First name" })).toHaveValue(
      "John",
    );
    await expect(body.getByRole("textbox", { name: "Last name" })).toHaveValue(
      "Smith",
    );
    await expect(
      body.getByRole("textbox", { name: /Date of birth/ }),
    ).toHaveValue("08/09/1990");
    await expect(body.getByRole("combobox", { name: "Language" })).toHaveValue(
      "en",
    );
    await expect(
      body.getByRole("button", { name: "Save personal details" }),
    ).toBeVisible();
    await expect(body.getByRole("link", { name: "Cancel" })).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};
