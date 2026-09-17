import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FieldError } from "./field-error";

describe("FieldError", () => {
  it("renders an alert with the message and id", () => {
    render(<FieldError id="item-name-error" message="Name is required." />);

    const alert = screen.getByRole("alert");
    expect(alert).toHaveAttribute("id", "item-name-error");
    expect(alert).toHaveTextContent("Name is required.");
  });
});
