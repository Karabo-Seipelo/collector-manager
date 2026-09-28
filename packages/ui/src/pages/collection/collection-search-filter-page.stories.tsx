import type { Meta, StoryObj } from "@storybook/react-vite";
import { http, HttpResponse } from "msw";
import * as React from "react";
import { expect, fn, userEvent, waitFor, within } from "storybook/test";

import { CollectionSearchFilterPage } from "./collection-search-filter-page";

const FIGMA_SEARCH_FILTER_URL =
  "https://www.figma.com/design/oTMqXOCl6Ah7HONbWWUyvZ/Practical-UI-design-system?node-id=9424-83";

const meta = {
  title: "Pages/CollectionSearchFilter",
  component: CollectionSearchFilterPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: `Search results with filters and list view. [Figma](${FIGMA_SEARCH_FILTER_URL})`,
      },
    },
  },
  args: {
    onSidebarOpenChange: fn(),
    onResetFilters: fn(),
  },
  argTypes: {
    sidebarOpen: { control: false },
    defaultSidebarOpen: { control: false },
  },
} satisfies Meta<typeof CollectionSearchFilterPage>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example({
  defaultSidebarOpen = false,
  ...pageProps
}: React.ComponentProps<typeof CollectionSearchFilterPage> & {
  defaultSidebarOpen?: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = React.useState(defaultSidebarOpen);

  return (
    <CollectionSearchFilterPage
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
      body.findByRole("heading", { level: 1, name: "Search results" }),
    ).resolves.toBeVisible();
    await expect(
      body.findByText('36 items match “blue” across 4 collections'),
    ).resolves.toBeVisible();
    await expect(
      body.findByRole("heading", { name: "Filters" }),
    ).resolves.toBeVisible();
    await expect(body.getByLabelText("Vinyl records")).toBeChecked();
    const table = await body.findByRole("table");
    await expect(within(table).getByText("Kind of Blue")).toBeVisible();
    await expect(
      body.findByRole("navigation", { name: "Table pagination" }),
    ).resolves.toBeVisible();

    await userEvent.click(body.getByRole("link", { name: "Reset" }));
    await expect(args.onResetFilters).toHaveBeenCalled();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
  play: async () => {
    const body = within(document.body);
    await expect(
      body.findByRole("heading", { name: "Search results" }),
    ).resolves.toBeVisible();
    await expect(body.getByLabelText("Maximum estimated value")).toBeInTheDocument();
    await expect(body.getByTestId("slider-track")).toBeVisible();
    await expect(body.getByText("R 30 000+")).toBeVisible();
  },
};

export const SearchLoadError: Story = {
  render: (args) => <Example {...args} />,
  parameters: {
    msw: {
      handlers: [
        http.get("/api/collection/search", () => HttpResponse.error()),
      ],
    },
  },
  play: async () => {
    await waitFor(async () => {
      await expect(
        within(document.body).getByRole("heading", {
          name: "Could not load data",
        }),
      ).toBeVisible();
    });
  },
};
