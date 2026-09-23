import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AvatarLabelled } from "./avatar-labelled";

describe("AvatarLabelled", () => {
  it("renders the name next to a decorative avatar", () => {
    render(<AvatarLabelled name="John Smith" />);

    expect(screen.getByText("John Smith")).toBeInTheDocument();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders the description when provided", () => {
    render(
      <AvatarLabelled
        name="John Smith"
        description="john@practical-ui.com"
      />,
    );

    expect(screen.getByText("john@practical-ui.com")).toBeInTheDocument();
  });

  it("omits description when it is not passed", () => {
    render(<AvatarLabelled name="John Smith" />);

    expect(screen.queryByText("john@practical-ui.com")).not.toBeInTheDocument();
  });
});
