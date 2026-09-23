import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldHeader } from "./field-header";

describe("FieldHeader", () => {
  it("associates the label with the field id", () => {
    render(
      <FieldHeader
        fieldId="item-name"
        label="Item name"
        hint="Hint text"
        hintId="item-name-hint"
      />,
    );

    expect(screen.getByText("Item name").closest("label")).toHaveAttribute(
      "for",
      "item-name",
    );
    expect(screen.getByText("Hint text")).toHaveAttribute(
      "id",
      "item-name-hint",
    );
  });

  it("shows required and optional markers", () => {
    const { rerender } = render(
      <FieldHeader fieldId="required-field" label="Required" required />,
    );
    expect(screen.getByText("*")).toBeInTheDocument();

    rerender(
      <FieldHeader fieldId="optional-field" label="Optional" optional />,
    );
    expect(screen.getByText("(optional)")).toBeInTheDocument();
  });
});
