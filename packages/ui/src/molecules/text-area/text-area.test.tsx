import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { TextArea } from "./text-area";

describe("TextArea", () => {
  it("renders a labelled native textarea with the Figma field height", () => {
    render(<TextArea label="Notes" id="notes" />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea).toBeInstanceOf(HTMLTextAreaElement);
    expect(textarea).toHaveAttribute("id", "notes");
    expect(textarea).toHaveClass("self-stretch");
    expect(textarea.parentElement).toHaveClass("min-h-[160px]");
  });

  it("updates an uncontrolled value and calls onChange", async () => {
    const user = userEvent.setup();
    const onChange = vi.fn();
    render(<TextArea label="Notes" onChange={onChange} />);

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    await user.type(textarea, "Stored upright in a protective sleeve.");

    expect(textarea).toHaveValue("Stored upright in a protective sleeve.");
    expect(onChange).toHaveBeenCalled();
  });

  it("connects hint and error text through accessible descriptions", () => {
    render(
      <TextArea
        label="Notes"
        hint="Describe condition and storage history."
        error="Notes are too long."
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea).toHaveAttribute("aria-invalid", "true");
    expect(textarea).toHaveAccessibleDescription(
      "Describe condition and storage history. Notes are too long.",
    );
    expect(screen.getByRole("alert")).toHaveTextContent("Notes are too long.");
  });

  it("uses disabled styling instead of error styling when disabled", () => {
    render(
      <TextArea
        label="Notes"
        disabled
        error="Notes are too long."
        defaultValue="Stored upright."
      />,
    );

    const textarea = screen.getByRole("textbox", { name: "Notes" });
    expect(textarea).toBeDisabled();
    expect(textarea).not.toHaveAttribute("aria-invalid");
    expect(screen.queryByRole("alert")).not.toBeInTheDocument();
    expect(textarea.parentElement).toHaveClass("border-stroke-disabled");
  });
});
