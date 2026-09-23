import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { ProgressIndicator } from "./progress-indicator";

const meta = {
  title: "Molecules/ProgressIndicator",
  component: ProgressIndicator,
  parameters: {
    layout: "padded",
  },
  args: {
    totalSteps: 5,
    onBack: fn(),
  },
  decorators: [
    (Story) => (
      <div className="w-full max-w-[600px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof ProgressIndicator>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Step1: Story = {
  args: {
    currentStep: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Step 1 of 5")).toBeVisible();
    await expect(canvas.getByRole("link", { name: "Back" })).toHaveAttribute(
      "aria-disabled",
      "true",
    );
  },
};

export const Step2: Story = {
  args: {
    currentStep: 2,
  },
};

export const Step3: Story = {
  args: {
    currentStep: 3,
  },
};

export const Step4: Story = {
  args: {
    currentStep: 4,
  },
};

export const Step5: Story = {
  args: {
    currentStep: 5,
  },
};

export const WithoutBack: Story = {
  args: {
    currentStep: 3,
    showBack: false,
  },
};

export const CustomLabel: Story = {
  args: {
    currentStep: 2,
    totalSteps: 4,
    label: "Step 2 of 4",
    showBack: false,
  },
};

export const Interaction: Story = {
  args: {
    currentStep: 3,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: "Back" }));
    await expect(args.onBack).toHaveBeenCalled();
  },
};
