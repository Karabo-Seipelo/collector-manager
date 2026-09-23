import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";

import { Accordion, AccordionItem } from "./accordion";

const body =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus blandit euismod. Pellentesque et blandit nunc, ultricies aliquam lectus. Nam et urna vitae libero blandit vestibulum in id ex.";

function SampleItems() {
  return (
    <>
      <AccordionItem value="one" heading="Heading label">
        {body}
      </AccordionItem>
      <AccordionItem value="two" heading="Heading label">
        {body}
      </AccordionItem>
      <AccordionItem value="three" heading="Heading label">
        {body}
      </AccordionItem>
      <AccordionItem value="four" heading="Heading label">
        {body}
      </AccordionItem>
      <AccordionItem value="five" heading="Heading label">
        {body}
      </AccordionItem>
    </>
  );
}

const meta = {
  title: "Molecules/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[600px] bg-fill-inverse">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    value: { control: false },
    defaultValue: { control: false },
    onValueChange: { control: false },
    children: { control: false },
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Accordion>
      <SampleItems />
    </Accordion>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const headers = canvas.getAllByRole("button", { name: "Heading label" });
    await expect(headers[0]).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(headers[0]!);
    await expect(headers[0]).toHaveAttribute("aria-expanded", "true");
  },
};

export const Open: Story = {
  render: () => (
    <Accordion defaultValue={["two"]}>
      <SampleItems />
    </Accordion>
  ),
};

export const Single: Story = {
  render: () => (
    <Accordion type="single" defaultValue="one">
      <SampleItems />
    </Accordion>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Accordion>
      <AccordionItem value="one" heading="Heading label">
        {body}
      </AccordionItem>
      <AccordionItem value="two" heading="Heading label" disabled>
        {body}
      </AccordionItem>
      <AccordionItem value="three" heading="Heading label">
        {body}
      </AccordionItem>
    </Accordion>
  ),
};
