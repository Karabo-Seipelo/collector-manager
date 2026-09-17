import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Code } from "./code";

describe("Code", () => {
  it("renders children", () => {
    render(<Code>apps/web</Code>);
    expect(screen.getByText("apps/web")).toBeInTheDocument();
  });

  it("merges custom className", () => {
    render(<Code className="custom-class">snippet</Code>);
    expect(screen.getByText("snippet")).toHaveClass("custom-class");
  });
});
