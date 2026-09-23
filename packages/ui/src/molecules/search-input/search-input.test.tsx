import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { SearchInput } from "./search-input";

describe("SearchInput", () => {
  it("renders a default search field with placeholder", () => {
    render(<SearchInput />);

    expect(screen.getByRole("searchbox", { name: "Search" })).toHaveAttribute(
      "placeholder",
      "Search",
    );
  });

  it("shows a clear button when filled and clears the value", async () => {
    const user = userEvent.setup();
    const onClear = vi.fn();

    render(
      <SearchInput defaultValue="Vinyl" onClear={onClear} aria-label="Search collection" />,
    );

    await user.click(screen.getByRole("button", { name: "Clear search" }));
    expect(screen.getByRole("searchbox", { name: "Search collection" })).toHaveValue("");
    expect(onClear).toHaveBeenCalledOnce();
  });

  it("renders the button variant and submits the current value", async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(
      <SearchInput
        variant="button"
        defaultValue="Blue Train"
        onSearch={onSearch}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Search" }));
    expect(onSearch).toHaveBeenCalledWith("Blue Train");
  });

  it("applies small sizing classes", () => {
    render(<SearchInput size="small" defaultValue="Filled" />);

    expect(screen.getByTestId("search-input-field")).toHaveClass("h-8", "gap-1");
    expect(screen.getByRole("searchbox", { name: "Search" })).toHaveClass(
      "leading-5",
    );
  });

  it("uses disabled styling when disabled", () => {
    render(<SearchInput disabled defaultValue="Filled" />);

    expect(screen.getByRole("searchbox", { name: "Search" })).toBeDisabled();
    expect(screen.getByTestId("search-input-field")).toHaveClass(
      "border-stroke-disabled",
    );
    expect(
      screen.queryByRole("button", { name: "Clear search" }),
    ).not.toBeInTheDocument();
  });
});
