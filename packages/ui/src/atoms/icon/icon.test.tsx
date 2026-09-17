import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatherIcon } from "./icon";

describe("FeatherIcon", () => {
  it("renders an svg for a valid icon name", () => {
    const { container } = render(<FeatherIcon name="bell" />);
    const svg = container.querySelector("svg");
    expect(svg).not.toBeNull();
    expect(svg).toHaveAttribute("aria-hidden", "true");
  });

  it("returns null for an invalid icon name", () => {
    const { container } = render(
      <FeatherIcon name={"not-a-real-icon" as "bell"} />,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it("respects size", () => {
    const { container } = render(<FeatherIcon name="bell" size={16} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "16");
  });
});
