import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { ShopTemplate } from "./shop-template";

const meta = {
  title: "Templates/Shop",
  component: ShopTemplate,
  parameters: { layout: "fullscreen" },
  args: { onAddToBag: fn(), onAddToWishlist: fn() },
} satisfies Meta<typeof ShopTemplate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  play: async ({ args }) => {
    const body = within(document.body);

    await expect(
      body.getByRole("link", { name: "Shop", current: "page" }),
    ).toBeVisible();
    await expect(
      body.getByRole("button", { name: "Shopping bag, 1 item" }),
    ).toBeVisible();
    await expect(body.getByRole("link", { name: "Clothing" })).toBeVisible();
    await expect(
      body.getByRole("heading", {
        level: 1,
        name: "White textured linen button-up blouse",
      }),
    ).toBeVisible();
    await expect(body.getByText("$39.95")).toBeVisible();
    await expect(body.getByRole("link", { name: "23 reviews" })).toBeVisible();
    await expect(body.getByText("1 / 6")).toBeVisible();
    await expect(body.getByRole("button", { name: "Zoom in" })).toBeVisible();

    await userEvent.click(body.getByRole("radio", { name: "M" }));
    await userEvent.click(body.getByRole("button", { name: "Add to bag" }));
    await expect(args.onAddToBag).toHaveBeenCalledWith("m");

    await expect(body.getByText("Free returns")).toBeVisible();
    await expect(
      body.getByRole("button", { name: "Care instructions" }),
    ).toHaveAttribute("aria-expanded", "false");
    await expect(
      body.getByRole("heading", { level: 2, name: "Wear it with" }),
    ).toBeVisible();
    await expect(body.getByText("Helm grey watch")).toBeVisible();
    await expect(body.getByText("© 2024 Practical Shop")).toBeVisible();
  },
};

export const Mobile: Story = {
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
