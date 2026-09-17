import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { FeatherIcon } from "../../atoms/icon/icon";
import { ButtonGroup } from "./button-group";

const meta = {
  title: "Molecules/ButtonGroup",
  component: ButtonGroup,
  args: {
    size: "medium",
    tone: "brand",
    "aria-label": "View mode",
    children: null,
  },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <ButtonGroup {...args} defaultValue="list">
      <ButtonGroup.Item value="list">List</ButtonGroup.Item>
      <ButtonGroup.Item value="grid">Grid</ButtonGroup.Item>
      <ButtonGroup.Item value="board">Board</ButtonGroup.Item>
    </ButtonGroup>
  ),
};

function ControlledExample(args: React.ComponentProps<typeof ButtonGroup>) {
  const [value, setValue] = React.useState("week");

  return (
    <div className="flex flex-col gap-4">
      <ButtonGroup
        {...args}
        value={value}
        onChange={setValue}
        aria-label="Time range"
      >
        <ButtonGroup.Item value="day">Day</ButtonGroup.Item>
        <ButtonGroup.Item value="week">Week</ButtonGroup.Item>
        <ButtonGroup.Item value="month">Month</ButtonGroup.Item>
      </ButtonGroup>
      <p className="text-sm text-neutral-600">Selected: {value}</p>
    </div>
  );
}

export const Controlled: Story = {
  render: (args) => <ControlledExample {...args} />,
};

const viewOptions = [
  { value: "list", label: "List" },
  { value: "grid", label: "Grid" },
  { value: "board", label: "Board" },
] as const;

function SelectedCheckIconExample(
  args: React.ComponentProps<typeof ButtonGroup>,
) {
  const [value, setValue] = React.useState<string>("list");

  return (
    <ButtonGroup
      {...args}
      value={value}
      onChange={setValue}
      aria-label="View mode"
    >
      {viewOptions.map((option) => (
        <ButtonGroup.Item
          key={option.value}
          value={option.value}
          iconLeft={
            value === option.value ? <FeatherIcon name="check" /> : undefined
          }
        >
          {option.label}
        </ButtonGroup.Item>
      ))}
    </ButtonGroup>
  );
}

export const SelectedWithCheckIcon: Story = {
  render: (args) => <SelectedCheckIconExample {...args} />,
};

export const IconOnly: Story = {
  render: (args) => (
    <ButtonGroup {...args} defaultValue="list" aria-label="Layout">
      <ButtonGroup.Item
        value="list"
        iconOnly={<FeatherIcon name="list" />}
        aria-label="List view"
      />
      <ButtonGroup.Item
        value="grid"
        iconOnly={<FeatherIcon name="grid" />}
        aria-label="Grid view"
      />
      <ButtonGroup.Item
        value="columns"
        iconOnly={<FeatherIcon name="columns" />}
        aria-label="Columns view"
      />
    </ButtonGroup>
  ),
};

export const DisabledGroup: Story = {
  render: (args) => (
    <ButtonGroup {...args} defaultValue="draft" disabled>
      <ButtonGroup.Item value="draft">Draft</ButtonGroup.Item>
      <ButtonGroup.Item value="published">Published</ButtonGroup.Item>
      <ButtonGroup.Item value="archived">Archived</ButtonGroup.Item>
    </ButtonGroup>
  ),
};

export const DisabledItem: Story = {
  render: (args) => (
    <ButtonGroup {...args} defaultValue="list">
      <ButtonGroup.Item value="list">List</ButtonGroup.Item>
      <ButtonGroup.Item value="grid" disabled>
        Grid
      </ButtonGroup.Item>
      <ButtonGroup.Item value="board">Board</ButtonGroup.Item>
    </ButtonGroup>
  ),
};
