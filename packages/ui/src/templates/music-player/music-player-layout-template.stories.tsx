import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { MusicPlayerLayoutTemplate } from "./music-player-layout-template";

const meta = {
  title: "Templates/MusicPlayerLayout",
  component: MusicPlayerLayoutTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof MusicPlayerLayoutTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    mobileHeader: (
      <header className="border-b border-stroke-weak px-4 py-3 text-small text-fg-weak md:hidden">
        Mobile header slot
      </header>
    ),
    sidebar: (
      <aside className="hidden w-64 shrink-0 border-r border-stroke-weak p-4 text-small text-fg-weak md:block">
        Sidebar slot
      </aside>
    ),
    children: (
      <main className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </main>
    ),
  },
  play: async () => {
    const body = within(document.body);
    await expect(body.getByText("Main content area")).toBeVisible();
  },
};
