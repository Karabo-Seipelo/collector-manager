import type { Meta, StoryObj } from "@storybook/react-vite";

import { ImagePlaceholder } from "./image-placeholder";

const meta = {
  title: "Atoms/ImagePlaceholder",
  component: ImagePlaceholder,
  args: {
    size: 30,
  },
} satisfies Meta<typeof ImagePlaceholder>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Large: Story = {
  args: {
    size: 48,
  },
};

export const InImageArea: Story = {
  render: () => (
    <div className="flex h-[190px] w-[220px] items-center justify-center rounded-card bg-fill-weak">
      <ImagePlaceholder />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-4 rounded-card bg-fill-weak p-6">
      <ImagePlaceholder size={24} />
      <ImagePlaceholder size={30} />
      <ImagePlaceholder size={48} />
    </div>
  ),
};
