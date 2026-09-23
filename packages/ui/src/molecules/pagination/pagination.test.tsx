import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Pagination } from "./pagination";

describe("Pagination", () => {
  it("renders desktop controls, summary, and active page", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        totalItems={128}
        pageSize={10}
      />,
    );

    expect(screen.getByRole("navigation", { name: "Pagination" })).toHaveClass(
      "@container",
      "w-full",
    );
    expect(screen.getByText("Showing 11 - 20 of 128")).toBeVisible();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveClass(
      "border-stroke-strong",
    );
  });

  it("changes page from next and previous links", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        totalItems={128}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole("link", { name: /Next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("link", { name: /Previous/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("renders mobile status text", () => {
    render(
      <Pagination currentPage={2} totalPages={10} totalItems={128} pageSize={10} />,
    );

    expect(screen.getByText("2 of 10")).toBeVisible();
  });

  it("navigates from mobile previous and next buttons", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        onPageChange={onPageChange}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Next page" }));
    expect(onPageChange).toHaveBeenCalledWith(3);

    await user.click(screen.getByRole("button", { name: "Previous page" }));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });

  it("renders ellipsis for large page counts", () => {
    render(
      <Pagination
        currentPage={2}
        totalPages={10}
        totalItems={128}
        pageSize={10}
      />,
    );

    expect(screen.getByText("...")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Page 10" })).toBeInTheDocument();
  });
});
