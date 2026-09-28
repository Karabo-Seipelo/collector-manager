import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";

import { TypographyPage } from "./typography-page";

const FIGMA_TYPOGRAPHY_URL =
  "https://www.figma.com/design/oTMqXOCl6Ah7HONbWWUyvZ/Practical-UI-design-system?node-id=3405-126418";

const meta = {
  title: "Foundations/Typography",
  component: TypographyPage,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component: [
          "Typography tokens for `@repo/ui`: **Inter** via `font-body`, seven text styles from Display through Tiny, defined in `styles.css` and consumed as `text-*` utilities.",
          "Larger headings use tighter steps on viewports under 768px; combine arbitrary sizes with `md:text-heading-*` where the scale matches Figma mobile.",
          `[Figma — Typography foundations](${FIGMA_TYPOGRAPHY_URL})`,
        ].join("\n\n"),
      },
    },
  },
} satisfies Meta<typeof TypographyPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole("heading", { level: 1, name: "Typography" }),
    ).toBeVisible();
    await expect(canvas.getByRole("heading", { name: "Typeface" })).toBeVisible();
    await expect(canvas.getByRole("heading", { name: "Type scale" })).toBeVisible();
    const table = canvas.getByRole("table");
    await expect(
      within(table).getByRole("columnheader", { name: "Tailwind" }),
    ).toBeVisible();
    const displayRow = within(table).getAllByRole("row")[1];
    await expect(displayRow).toBeDefined();
    await expect(within(displayRow!).getAllByRole("cell")[0]).toHaveTextContent(
      "Display",
    );
  },
};
