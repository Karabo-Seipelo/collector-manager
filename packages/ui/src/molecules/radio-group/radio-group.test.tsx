import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import { Radio } from "../../atoms/radio/radio";
import { RadioGroup } from "./radio-group";

describe("RadioGroup", () => {
  it("renders a labelled native group with one shared generated name", () => {
    render(
      <RadioGroup label="Format" required>
        <Radio label="Vinyl" value="vinyl" />
        <Radio label="CD" value="cd" />
      </RadioGroup>,
    );

    const group = screen.getByRole("group", { name: /Format/ });
    const radios = screen.getAllByRole("radio");

    expect(group.tagName).toBe("FIELDSET");
    expect(radios[0]).toHaveAttribute("name");
    expect(radios[1]).toHaveAttribute("name", radios[0]?.getAttribute("name"));
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("allows only one option to be selected", async () => {
    const user = userEvent.setup();
    render(
      <RadioGroup label="Format" name="format">
        <Radio label="Vinyl" value="vinyl" />
        <Radio label="CD" value="cd" />
      </RadioGroup>,
    );

    const vinyl = screen.getByRole("radio", { name: "Vinyl" });
    const cd = screen.getByRole("radio", { name: "CD" });

    await user.click(vinyl);
    expect(vinyl).toBeChecked();

    await user.click(cd);
    expect(cd).toBeChecked();
    expect(vinyl).not.toBeChecked();
  });

  it("passes small size by default and supports large", () => {
    const { rerender } = render(
      <RadioGroup label="Format">
        <Radio label="Vinyl" value="vinyl" />
        <Radio label="CD" value="cd" />
      </RadioGroup>,
    );

    expect(screen.getByTestId("radio-group-list")).toHaveClass("gap-4", "pt-6");
    for (const control of screen.getAllByTestId("radio-control")) {
      expect(control).toHaveClass("size-6");
    }

    rerender(
      <RadioGroup label="Format" size="large">
        <Radio label="Vinyl" value="vinyl" />
        <Radio label="CD" value="cd" />
      </RadioGroup>,
    );
    for (const control of screen.getAllByTestId("radio-control")) {
      expect(control).toHaveClass("size-8");
    }
  });

  it("connects hint and error text and marks children invalid", () => {
    render(
      <RadioGroup
        label="Format"
        hint="Choose one"
        error="Choose a format"
      >
        <Radio label="Vinyl" value="vinyl" />
      </RadioGroup>,
    );

    const group = screen.getByRole("group", { name: "Format" });
    const hint = screen.getByText("Choose one");
    const error = screen.getByRole("alert");

    expect(group).toHaveAttribute(
      "aria-describedby",
      `${hint.id} ${error.id}`,
    );
    expect(screen.getByRole("radio", { name: "Vinyl" })).toHaveAttribute(
      "aria-invalid",
      "true",
    );
  });
});
