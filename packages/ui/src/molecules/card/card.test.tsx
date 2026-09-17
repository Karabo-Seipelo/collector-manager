import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ItemCard } from "./card";

describe("ItemCard", () => {
  it("renders title, meta, and price", () => {
    render(
      <ItemCard
        title="Kind of Blue"
        meta={["Vinyl", "1959", "NM"]}
        price="$120.00"
      />,
    );

    expect(screen.getByText("Kind of Blue")).toBeInTheDocument();
    expect(screen.getByText("Vinyl · 1959 · NM")).toBeInTheDocument();
    expect(screen.getByText("$120.00")).toBeInTheDocument();
  });

  it("formats comma-separated meta", () => {
    render(<ItemCard title="Blue Train" meta="Vinyl, 1959, NM" />);
    expect(screen.getByText("Vinyl · 1959 · NM")).toBeInTheDocument();
  });

  it("renders a button when clickable", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<ItemCard title="Abbey Road" onClick={onClick} />);

    await user.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("renders a static div when not clickable", () => {
    const { container } = render(<ItemCard title="Abbey Road" />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
    expect(container.querySelector("div")).toBeInTheDocument();
  });

  it("shows a placeholder when no image is provided", () => {
    const { container } = render(<ItemCard title="No image" />);
    expect(container.querySelector('[aria-hidden="true"] img')).toHaveAttribute(
      "alt",
      "",
    );
  });

  it("renders a provided image", () => {
    render(
      <ItemCard
        title="With image"
        imageSrc="/example.jpg"
        imageAlt="Example cover"
      />,
    );
    expect(screen.getByRole("img", { name: "Example cover" })).toHaveAttribute(
      "src",
      "/example.jpg",
    );
  });
});
