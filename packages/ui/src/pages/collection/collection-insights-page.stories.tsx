import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { CollectionInsightsPage } from "./collection-insights-page";

const FIGMA_INSIGHTS_URL =
  "https://www.figma.com/design/oTMqXOCl6Ah7HONbWWUyvZ/Practical-UI-design-system?node-id=9424-84";

const meta = {
  title: "Pages/CollectionInsights",
  component: CollectionInsightsPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Profile & stats (Insights dashboard). [Figma](${FIGMA_INSIGHTS_URL})`,
      },
    },
  },
  args: {
    onSidebarOpenChange: fn(),
  },
  argTypes: {
    sidebarOpen: { control: false },
    defaultSidebarOpen: { control: false },
  },
} satisfies Meta<typeof CollectionInsightsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  defaultSidebarOpen = false,
}: {
  defaultSidebarOpen?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);

  return (
    <CollectionInsightsPage
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
      body.getByRole("heading", { level: 1, name: "Insights" }),
    ).toBeVisible();
    await expect(
      body.getByText("Across 248 items in 6 collections"),
    ).toBeVisible();
    await expect(body.getByText("Estimated value")).toBeVisible();
    await expect(body.getByText("R 41 200")).toBeVisible();
    await expect(body.getByText("Collection value over time")).toBeVisible();
    await expect(body.getByText("Value by category")).toBeVisible();
    await expect(body.getByText("Recently added")).toBeVisible();
    await expect(body.getByText("Omega Seamaster")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
  play: async () => {
    const body = within(document.body);
    await expect(body.getByRole("heading", { name: "Insights" })).toBeVisible();
    await expect(body.getByRole("link", { name: "Stats" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  },
};
