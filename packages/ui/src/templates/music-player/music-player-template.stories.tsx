import type { Meta, StoryObj } from "@storybook/react-vite";
import * as React from "react";
import { expect, fn, within } from "storybook/test";

import { MusicPlayerTemplate } from "./music-player-template";

const meta = {
  title: "Templates/MusicPlayer",
  component: MusicPlayerTemplate,
  parameters: { layout: "fullscreen" },
  args: { onSidebarOpenChange: fn() },
} satisfies Meta<typeof MusicPlayerTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

function Example() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  return (
    <MusicPlayerTemplate
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
      body.getByRole("heading", { level: 1, name: "Summer Chill" }),
    ).toBeVisible();
    await expect(body.getByRole("button", { name: "Play" })).toBeVisible();
    await expect(body.getByRole("button", { name: "Save" })).toBeVisible();
    await expect(
      body.getByRole("cell", { name: /Global Rebellion/ }),
    ).toBeVisible();
    await expect(
      body.getByRole("slider", { name: "Playback position" }),
    ).toHaveValue("24");
    await expect(
      body.getByRole("button", { name: "Play When I Fall Asleep" }),
    ).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
  render: () => <Example />,
};
