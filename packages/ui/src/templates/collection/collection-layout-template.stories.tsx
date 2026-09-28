import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { CollectionLayoutTemplate } from "./collection-layout-template";

const meta = {
  title: "Templates/CollectionLayout",
  component: CollectionLayoutTemplate,
  parameters: { layout: "fullscreen" },
  args: {
    children: (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </div>
    ),
  },
} satisfies Meta<typeof CollectionLayoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <CollectionLayoutTemplate>
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </div>
    </CollectionLayoutTemplate>
  ),
  play: async () => {
    const body = within(document.body);
    await expect(body.getByText("Main content area")).toBeVisible();
    await expect(
      body.getByRole("navigation", { name: "Main" }),
    ).toBeVisible();
  },
};
