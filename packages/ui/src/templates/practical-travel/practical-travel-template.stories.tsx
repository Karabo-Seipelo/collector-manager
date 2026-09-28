import type { Meta, StoryObj } from "@storybook/react-vite";

import { PracticalTravelTemplate } from "./practical-travel-template";

const meta = {
  title: "Templates/PracticalTravel",
  component: PracticalTravelTemplate,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof PracticalTravelTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    activeHref: "#home",
    children: (
      <main className="flex flex-1 flex-col items-center justify-center p-16">
        <p className="text-small text-fg-weak">Page content slot</p>
      </main>
    ),
    subscribeSection: (
      <section className="border-t border-stroke-weak bg-fill-weaker px-8 py-16 text-center text-small text-fg-weak md:px-[120px]">
        Subscribe section slot
      </section>
    ),
  },
};
