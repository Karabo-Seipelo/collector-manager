import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SummaryList } from "./summary-list";

const baseItems = Array.from({ length: 5 }, (_, index) => ({
  id: `item-${index + 1}`,
  term: "Term",
  description: "Description",
}));

describe("SummaryList", () => {
  it("renders term and description rows", () => {
    render(<SummaryList aria-label="Order summary" items={baseItems} />);

    expect(screen.getByLabelText("Order summary")).toBeVisible();
    expect(screen.getAllByText("Term")).toHaveLength(5);
    expect(screen.getAllByText("Description")).toHaveLength(5);
    expect(screen.getAllByTestId("summary-list-row")[0]).toHaveClass(
      "min-h-20",
      "border-b",
    );
  });

  it("renders a single change link action", () => {
    render(
      <SummaryList
        items={[
          {
            term: "Term",
            description: "Description",
            action: { type: "link", label: "Change", href: "#change" },
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Change" })).toHaveAttribute(
      "href",
      "#change",
    );
  });

  it("renders multiple text link actions", () => {
    render(
      <SummaryList
        items={[
          {
            term: "Term",
            description: "Description",
            action: {
              type: "links",
              links: [
                { type: "link", label: "Copy", href: "#copy" },
                { type: "link", label: "Delete", href: "#delete" },
              ],
            },
          },
        ]}
      />,
    );

    expect(screen.getByRole("link", { name: "Copy" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Delete" })).toBeVisible();
  });

  it("renders icon actions and handles clicks", async () => {
    const user = userEvent.setup();
    const onCopy = vi.fn();

    render(
      <SummaryList
        items={[
          {
            term: "Term",
            description: "Description",
            action: {
              type: "icons",
              icons: [
                { label: "Copy", icon: "copy", onClick: onCopy },
                { label: "Delete", icon: "trash-2" },
              ],
            },
          },
        ]}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Copy" }));
    expect(onCopy).toHaveBeenCalledOnce();
    expect(screen.getByRole("button", { name: "Delete" })).toBeVisible();
  });
});
