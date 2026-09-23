import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { ButtonIcon } from "./button-icon";

describe("ButtonIcon", () => {
  it("renders an icon-only button named by aria-label", () => {
    render(
      <ButtonIcon icon={<span data-testid="icon" />} aria-label="Settings" />,
    );

    expect(screen.getByRole("button", { name: "Settings" })).toBeInTheDocument();
    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("matches Figma medium and small hit areas", () => {
    const { rerender } = render(
      <ButtonIcon icon={<span />} aria-label="Add" size="medium" />,
    );

    expect(screen.getByRole("button", { name: "Add" })).toHaveClass("size-12");

    rerender(<ButtonIcon icon={<span />} aria-label="Add" size="small" />);

    expect(screen.getByRole("button", { name: "Add" })).toHaveClass("size-8");
  });

  it("uses a circular shape when requested", () => {
    render(
      <ButtonIcon icon={<span />} aria-label="Add" shape="circle" />,
    );

    expect(screen.getByRole("button", { name: "Add" })).toHaveClass(
      "rounded-full",
    );
  });

  it("keeps tertiary as a ghost icon without underline", () => {
    render(
      <ButtonIcon
        icon={<span />}
        aria-label="More"
        variant="tertiary"
      />,
    );

    const button = screen.getByRole("button", { name: "More" });
    expect(button).toHaveClass("shadow-none", "bg-transparent");
    expect(button).not.toHaveClass("underline");
  });

  it("shows a notification dot", () => {
    render(
      <ButtonIcon icon={<span />} aria-label="Alerts" badge="dot" />,
    );

    expect(screen.getByTestId("badge-dot")).toBeInTheDocument();
  });

  it("shows a numeric badge", () => {
    render(
      <ButtonIcon icon={<span />} aria-label="Cart" badge={8} />,
    );

    expect(screen.getByTestId("badge-count")).toHaveTextContent("8");
  });

  it("does not call onClick when disabled", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(
      <ButtonIcon
        icon={<span />}
        aria-label="Delete"
        disabled
        onClick={onClick}
      />,
    );

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(onClick).not.toHaveBeenCalled();
  });

  it("forwards ref to the button element", () => {
    const ref = createRef<HTMLButtonElement>();
    render(
      <ButtonIcon ref={ref} icon={<span />} aria-label="Settings" />,
    );
    expect(ref.current?.tagName).toBe("BUTTON");
  });
});
