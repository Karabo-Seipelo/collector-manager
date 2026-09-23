import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Breadcrumbs } from "./breadcrumbs";

const trail = [
  { label: "Home", href: "/" },
  { label: "Library", href: "/library" },
  { label: "Vinyl" },
];

describe("Breadcrumbs", () => {
  it("exposes a labelled breadcrumb landmark with an ordered list", () => {
    render(<Breadcrumbs items={trail} />);

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav.querySelector("ol")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByText("Vinyl")).toHaveAttribute("aria-current", "page");
  });

  it("marks the last link as the current page when it has an href", () => {
    render(
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Vinyl", href: "/vinyl" },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Vinyl" })).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  it("collapses middle items behind an ellipsis", () => {
    render(<Breadcrumbs items={trail} collapsed />);

    expect(screen.getByRole("link", { name: "Home" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Library" })).not.toBeInTheDocument();
    expect(screen.getByText("Vinyl")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Show more breadcrumbs" })).toHaveTextContent(
      "...",
    );
  });

  it("calls onExpand when the collapsed ellipsis is activated", async () => {
    const user = userEvent.setup();
    const onExpand = vi.fn();

    render(<Breadcrumbs items={trail} collapsed onExpand={onExpand} />);

    await user.click(screen.getByRole("button", { name: "Show more breadcrumbs" }));
    expect(onExpand).toHaveBeenCalledOnce();
  });
});
