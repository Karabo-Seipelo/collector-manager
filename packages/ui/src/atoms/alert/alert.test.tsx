import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Alert } from "./alert";

describe("Alert", () => {
  it("renders an error alert with heading and description by default", () => {
    render(
      <Alert heading="Heading">
        Payment failed. Try again.
      </Alert>,
    );

    const alert = screen.getByRole("alert");
    expect(alert).toHaveClass("bg-fill-error-weak", "border-stroke-error-weak");
    expect(screen.getByText("Heading")).toHaveClass("text-heading-4");
    expect(screen.getByText("Payment failed. Try again.")).toBeInTheDocument();
    expect(screen.getByTestId("alert-bar")).toHaveClass("bg-stroke-error-strong");
  });

  it("uses status role for non-urgent tones", () => {
    render(<Alert tone="success" heading="Saved" />);

    expect(screen.getByRole("status")).toHaveClass("bg-fill-success-weak");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
  });

  it("matches Figma sizes and layouts", () => {
    const { rerender } = render(<Alert heading="Heading" />);
    expect(screen.getByRole("alert")).toHaveClass("p-6");
    expect(screen.getByTestId("alert-body")).toHaveClass("flex-row");

    rerender(<Alert heading="Heading" size="small" />);
    expect(screen.getByRole("alert")).toHaveClass("p-4");
    expect(screen.getByText("Heading")).toHaveClass("text-tiny");

    rerender(<Alert heading="Heading" layout="vertical" />);
    expect(screen.getByTestId("alert-body")).toHaveClass("flex-col");
  });

  it("dismisses when the close button is activated", async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<Alert heading="Heading" onClose={onClose} />);

    await user.click(screen.getByRole("button", { name: "Dismiss" }));
    expect(onClose).toHaveBeenCalledOnce();
  });

  it("renders inverse tones, footer, and a custom icon", () => {
    render(
      <Alert
        tone="inverse-brand"
        heading="Heading"
        icon={<span data-testid="custom-icon" />}
        footer={<a href="#retry">Retry</a>}
      >
        Nightly sync complete.
      </Alert>,
    );

    expect(screen.getByRole("status")).toHaveClass("bg-primary");
    expect(screen.getByTestId("custom-icon")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Retry" })).toBeInTheDocument();
  });
});
