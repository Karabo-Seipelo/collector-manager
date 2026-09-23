import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { withWidth } from "../../../.storybook/decorators";
import { Select } from "./select";

const fieldWidth = withWidth("360px");

const categoryOptions = (
  <>
    <option value="">Select</option>
    <option value="vinyl">Vinyl records</option>
    <option value="books">Books</option>
    <option value="cards">Trading cards</option>
  </>
);

const meta = {
  title: "Molecules/Select",
  component: Select,
  args: {
    label: "Category",
    children: categoryOptions,
  },
  decorators: [fieldWidth],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const combobox = canvas.getByRole("combobox", { name: "Category" });
    await userEvent.selectOptions(combobox, "vinyl");
    await expect(combobox).toHaveValue("vinyl");
  },
};

export const WithValue: Story = {
  args: {
    defaultValue: "books",
  },
};

export const Required: Story = {
  args: {
    required: true,
  },
};

export const WithError: Story = {
  args: {
    error: "Choose a category.",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole("alert")).toHaveTextContent(
      "Choose a category.",
    );
  },
};

export const Disabled: Story = {
  args: {
    defaultValue: "vinyl",
    disabled: true,
  },
};
