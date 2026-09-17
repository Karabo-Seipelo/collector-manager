import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ImagePlaceholder } from "./image-placeholder";

describe("ImagePlaceholder", () => {
  it("renders a decorative image", () => {
    const { container } = render(<ImagePlaceholder />);
    const wrapper = container.firstElementChild;
    expect(wrapper).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("img")).toHaveAttribute("alt", "");
  });

  it("respects size", () => {
    const { container } = render(<ImagePlaceholder size={48} />);
    expect(container.firstElementChild).toHaveStyle({
      width: "48px",
      height: "48px",
    });
  });
});
