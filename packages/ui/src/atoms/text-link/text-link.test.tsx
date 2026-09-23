import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatherIcon } from "../icon/icon";
import { TextLink } from "./text-link";

describe("TextLink", () => {
  it("renders as an anchor with label text", () => {
    render(
      <TextLink href="#details">Learn more</TextLink>,
    );

    expect(screen.getByRole("link", { name: "Learn more" })).toHaveAttribute(
      "href",
      "#details",
    );
  });

  it("applies default brand, tiny, underlined styles", () => {
    render(<TextLink href="#details">Label</TextLink>);

    const link = screen.getByRole("link", { name: "Label" });
    expect(link).toHaveClass("text-primary");
    expect(link.firstElementChild).toHaveClass(
      "text-tiny",
      "underline",
      "hover:no-underline",
    );
  });

  it("supports small size, bold weight, and no underline", () => {
    render(
      <TextLink href="#details" size="small" weight="bold" underline={false}>
        Label
      </TextLink>,
    );

    const link = screen.getByRole("link", { name: "Label" });
    expect(link.firstElementChild).toHaveClass("text-small", "font-semibold");
    expect(link.firstElementChild).not.toHaveClass("underline");
  });

  it("applies tone and disabled styles", () => {
    render(
      <TextLink href="#details" tone="destructive" disabled>
        Label
      </TextLink>,
    );

    const link = screen.getByRole("link", { name: "Label" });
    expect(link).toHaveClass("text-text-error");
    expect(link.firstElementChild).toHaveClass("text-text-disabled");
    expect(link).toHaveAttribute("aria-disabled", "true");
  });

  it("renders optional leading and trailing icons", () => {
    render(
      <TextLink
        href="#details"
        iconLeft={<FeatherIcon name="external-link" size={20} />}
        iconRight={<FeatherIcon name="arrow-right" size={20} />}
      >
        Label
      </TextLink>,
    );

    const link = screen.getByRole("link", { name: "Label" });
    expect(link).toBeVisible();
    expect(link.querySelectorAll("svg")).toHaveLength(2);
  });

  it("forwards its ref to the anchor element", () => {
    const ref = createRef<HTMLAnchorElement>();
    render(
      <TextLink ref={ref} href="#details">
        Label
      </TextLink>,
    );

    expect(ref.current?.tagName).toBe("A");
  });
});
