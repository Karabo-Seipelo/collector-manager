import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Checkbox } from "../../atoms/checkbox/checkbox";
import { CheckboxGroup } from "./checkbox-group";

describe("CheckboxGroup", () => {
  it("labels a semantic group and describes it with hint text", () => {
    render(
      <CheckboxGroup label="Condition" required hint="Choose all that apply">
        <Checkbox label="Mint" />
        <Checkbox label="Good" />
      </CheckboxGroup>,
    );

    const group = screen.getByRole("group", { name: /Condition/ });
    const hint = screen.getByText("Choose all that apply");

    expect(group.tagName).toBe("FIELDSET");
    expect(group).toHaveAttribute("aria-describedby", hint.id);
    expect(screen.getByText("*")).toHaveAttribute("aria-hidden", "true");
  });

  it("renders an accessible error and marks every checkbox invalid", () => {
    render(
      <CheckboxGroup label="Condition" error="Choose at least one">
        <Checkbox label="Mint" />
        <Checkbox label="Good" />
      </CheckboxGroup>,
    );

    expect(screen.getByRole("alert")).toHaveTextContent("Choose at least one");
    for (const checkbox of screen.getAllByRole("checkbox")) {
      expect(checkbox).toHaveAttribute("aria-invalid", "true");
    }
  });

  it("passes size to every checkbox and uses Figma list spacing", () => {
    const { rerender } = render(
      <CheckboxGroup label="Condition">
        <Checkbox label="Mint" />
        <Checkbox label="Good" />
      </CheckboxGroup>,
    );

    expect(screen.getByTestId("checkbox-group-list")).toHaveClass(
      "gap-4",
      "pt-6",
    );
    for (const box of screen.getAllByTestId("checkbox-box")) {
      expect(box).toHaveClass("size-6");
    }

    rerender(
      <CheckboxGroup label="Condition" size="large">
        <Checkbox label="Mint" />
        <Checkbox label="Good" />
      </CheckboxGroup>,
    );
    for (const box of screen.getAllByTestId("checkbox-box")) {
      expect(box).toHaveClass("size-8");
    }
  });

  it("supports optional and disabled group states", () => {
    render(
      <CheckboxGroup label="Condition" optional disabled>
        <Checkbox label="Mint" />
      </CheckboxGroup>,
    );

    expect(screen.getByText("(optional)")).toBeInTheDocument();
    expect(screen.getByRole("checkbox", { name: "Mint" })).toBeDisabled();
  });
});
