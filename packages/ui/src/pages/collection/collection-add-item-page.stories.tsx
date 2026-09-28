import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, userEvent, within } from "storybook/test";

import { CollectionAddItemPage } from "./collection-add-item-page";

const FIGMA_ADD_ITEM_URL =
  "https://www.figma.com/design/oTMqXOCl6Ah7HONbWWUyvZ/Practical-UI-design-system?node-id=9424-82";

const meta = {
  title: "Pages/CollectionAddItem",
  component: CollectionAddItemPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Add a collection item manually or via photos. [Figma](${FIGMA_ADD_ITEM_URL})`,
      },
    },
  },
  args: {
    onSidebarOpenChange: fn(),
    onCancel: fn(),
    onSave: fn(),
    onSaveAndAddAnother: fn(),
  },
  argTypes: {
    sidebarOpen: { control: false },
    defaultSidebarOpen: { control: false },
  },
} satisfies Meta<typeof CollectionAddItemPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  defaultSidebarOpen = false,
  ...pageProps
}: React.ComponentProps<typeof CollectionAddItemPage> & {
  defaultSidebarOpen?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);

  return (
    <CollectionAddItemPage
      {...pageProps}
      sidebarOpen={sidebarOpen}
      onSidebarOpenChange={setSidebarOpen}
    />
  );
}

export const Desktop: Story = {
  render: (args) => <Example {...args} />,
  play: async ({ args }) => {
    const body = within(document.body);
    await expect(
      body.findByRole("heading", { level: 1, name: "Add item" }),
    ).resolves.toBeVisible();
    await expect(
      body.getByText("Drop photos here, or scan a barcode"),
    ).toBeVisible();
    await expect(body.getByLabelText("Item name")).toBeVisible();
    await expect(body.getByLabelText("Category")).toBeVisible();
    await expect(body.getByLabelText("Year")).toBeVisible();
    await expect(body.getByLabelText("Condition")).toBeVisible();

    await userEvent.type(body.getByLabelText("Item name"), "Kind of Blue");
    await expect(body.getByDisplayValue("Kind of Blue")).toBeVisible();

    await userEvent.click(body.getByRole("button", { name: "Save item" }));
    await expect(args.onSave).toHaveBeenCalled();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
  play: async () => {
    await expect(
      within(document.body).getByRole("heading", { name: "Add item" }),
    ).toBeVisible();
    await expect(
      within(document.body).getByRole("button", { name: "Save item" }),
    ).toBeVisible();
  },
};
