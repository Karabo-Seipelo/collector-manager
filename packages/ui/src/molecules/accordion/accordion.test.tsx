import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Accordion, AccordionItem } from "./accordion";

const sample = (
  <>
    <AccordionItem value="one" heading="Shipping">
      Ships in 2–3 days.
    </AccordionItem>
    <AccordionItem value="two" heading="Returns">
      30-day returns.
    </AccordionItem>
  </>
);

describe("Accordion", () => {
  it("renders headings as buttons that start collapsed", () => {
    render(<Accordion>{sample}</Accordion>);

    const shipping = screen.getByRole("button", { name: "Shipping" });
    expect(shipping).toHaveAttribute("aria-expanded", "false");
    expect(shipping.closest("h3")).not.toBeNull();
    expect(screen.getByText("Ships in 2–3 days.")).not.toBeVisible();
  });

  it("toggles a panel open and closed and allows multiple open", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion onValueChange={onValueChange}>{sample}</Accordion>,
    );

    await user.click(screen.getByRole("button", { name: "Shipping" }));
    expect(screen.getByRole("button", { name: "Shipping" })).toHaveAttribute(
      "aria-expanded",
      "true",
    );
    expect(screen.getByText("Ships in 2–3 days.")).toBeVisible();
    expect(onValueChange).toHaveBeenCalledWith(["one"]);

    await user.click(screen.getByRole("button", { name: "Returns" }));
    expect(screen.getByText("30-day returns.")).toBeVisible();
    expect(onValueChange).toHaveBeenLastCalledWith(["one", "two"]);

    await user.click(screen.getByRole("button", { name: "Shipping" }));
    expect(screen.getByText("Ships in 2–3 days.")).not.toBeVisible();
    expect(onValueChange).toHaveBeenLastCalledWith(["two"]);
  });

  it("closes the previous panel when type is single", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();

    render(
      <Accordion type="single" defaultValue="one" onValueChange={onValueChange}>
        {sample}
      </Accordion>,
    );

    expect(screen.getByText("Ships in 2–3 days.")).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Returns" }));
    expect(screen.getByText("Ships in 2–3 days.")).not.toBeVisible();
    expect(screen.getByText("30-day returns.")).toBeVisible();
    expect(onValueChange).toHaveBeenCalledWith("two");
  });

  it("does not expand a disabled item and wires aria-controls", () => {
    render(
      <Accordion>
        <AccordionItem value="one" heading="Shipping" disabled>
          Ships in 2–3 days.
        </AccordionItem>
      </Accordion>,
    );

    const button = screen.getByRole("button", { name: "Shipping" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-expanded", "false");
    const panelId = button.getAttribute("aria-controls");
    expect(panelId).toBeTruthy();
    expect(document.getElementById(panelId!)).toHaveAttribute("hidden");
  });

  it("uses the provided heading level", () => {
    render(
      <Accordion headingLevel={2}>
        <AccordionItem value="one" heading="Shipping">
          Ships in 2–3 days.
        </AccordionItem>
      </Accordion>,
    );

    expect(screen.getByRole("button", { name: "Shipping" }).closest("h2")).not.toBeNull();
  });
});
