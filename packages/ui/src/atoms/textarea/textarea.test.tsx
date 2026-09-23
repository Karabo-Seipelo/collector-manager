import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Textarea } from "./textarea";

describe("Textarea", () => {
  it("renders a native textarea with the Figma field height", () => {
    render(<Textarea aria-label="Notes" />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
    expect(textarea).toHaveClass("self-stretch");
    expect(textarea.parentElement).toHaveClass("min-h-[160px]");
  });
});
