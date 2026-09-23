import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { FeatherIcon } from "../../atoms/icon/icon";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./tabs";

const labels = Array.from({ length: 8 }, (_, index) => `Label ${index + 1}`);

const meta = {
  title: "Molecules/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Tabbed navigation with text or icon labels, optional badge counts, and associated panels.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[928px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList aria-label="Text tabs">
        {labels.map((label, index) => (
          <TabsTrigger key={label} value={`tab-${index + 1}`}>
            {label.replace(/\s\d+/, "")}
          </TabsTrigger>
        ))}
      </TabsList>
      {labels.map((label, index) => (
        <TabsPanel key={label} value={`tab-${index + 1}`}>
          Content for {label}
        </TabsPanel>
      ))}
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getAllByRole("tab")).toHaveLength(8);
    await expect(canvas.getByRole("tab", { selected: true })).toHaveTextContent(
      "Label",
    );
  },
};

export const WithBadges: Story = {
  render: () => (
    <Tabs defaultValue="inbox">
      <TabsList aria-label="Inbox tabs">
        <TabsTrigger value="inbox" badge={8}>
          Inbox
        </TabsTrigger>
        <TabsTrigger value="drafts" badge={2}>
          Drafts
        </TabsTrigger>
        <TabsTrigger value="sent">Sent</TabsTrigger>
      </TabsList>
      <TabsPanel value="inbox">8 unread messages</TabsPanel>
      <TabsPanel value="drafts">2 drafts</TabsPanel>
      <TabsPanel value="sent">Sent mail</TabsPanel>
    </Tabs>
  ),
};

export const IconTabs: Story = {
  render: () => (
    <Tabs defaultValue="tab-1">
      <TabsList wrap aria-label="Icon tabs">
        {labels.map((label, index) => (
          <TabsTrigger
            key={label}
            value={`tab-${index + 1}`}
            icon={<FeatherIcon name="layers" size={20} />}
          >
            {label.replace(/\s\d+/, "")}
          </TabsTrigger>
        ))}
      </TabsList>
      {labels.map((label, index) => (
        <TabsPanel key={label} value={`tab-${index + 1}`}>
          Content for {label}
        </TabsPanel>
      ))}
    </Tabs>
  ),
};

export const Controlled: Story = {
  render: () => {
    const onValueChange = fn();

    return (
      <Tabs defaultValue="one" onValueChange={onValueChange}>
        <TabsList aria-label="Controlled tabs">
          <TabsTrigger value="one">One</TabsTrigger>
          <TabsTrigger value="two">Two</TabsTrigger>
        </TabsList>
        <TabsPanel value="one">First panel</TabsPanel>
        <TabsPanel value="two">Second panel</TabsPanel>
      </Tabs>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("tab", { name: "Two" }));
    await expect(canvas.getByRole("tabpanel")).toHaveTextContent("Second panel");
  },
};

export const DisabledTab: Story = {
  render: () => (
    <Tabs defaultValue="open">
      <TabsList aria-label="Status tabs">
        <TabsTrigger value="open">Open</TabsTrigger>
        <TabsTrigger value="closed" disabled>
          Closed
        </TabsTrigger>
      </TabsList>
      <TabsPanel value="open">Open items</TabsPanel>
      <TabsPanel value="closed">Closed items</TabsPanel>
    </Tabs>
  ),
};
