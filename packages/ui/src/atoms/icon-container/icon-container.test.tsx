import { createRef } from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatherIcon } from "../icon/icon";
import { IconContainer } from "./icon-container";

describe("IconContainer", () => {
  it("renders the neutral filled Figma variant by default", () => {
    render(
      <IconContainer
        icon={<FeatherIcon name="star" />}
        data-testid="icon-container"
      />,
    );

    const container = screen.getByTestId("icon-container");
    expect(container).toHaveClass(
      "size-12",
      "rounded-full",
      "bg-fill-weak",
      "text-icon-neutral",
    );
    expect(container.querySelector("svg")?.parentElement).toHaveClass("size-6");
  });

  it.each([
    ["neutral", "bg-fill-weak", "text-icon-neutral"],
    ["brand", "bg-fill-brand-weak", "text-icon-brand"],
    ["inverse", "bg-fill-inverse-weak", "text-icon-inverse"],
    ["destructive", "bg-fill-error-weak", "text-icon-error"],
    ["warning", "bg-fill-warning-weak", "text-icon-warning"],
    ["success", "bg-fill-success-weak", "text-icon-success"],
    ["information", "bg-fill-information-weak", "text-icon-information"],
  ] as const)(
    "uses the %s filled tone tokens",
    (tone, backgroundClass, iconClass) => {
      render(
        <IconContainer
          icon={<FeatherIcon name="star" />}
          tone={tone}
          data-testid="icon-container"
        />,
      );

      expect(screen.getByTestId("icon-container")).toHaveClass(
        backgroundClass,
        iconClass,
      );
    },
  );

  it.each([
    ["neutral", "border-stroke-weak"],
    ["brand", "border-stroke-brand-weak"],
    ["inverse", "border-stroke-inverse-weak"],
    ["destructive", "border-stroke-error-weak"],
    ["warning", "border-stroke-warning-weak"],
    ["success", "border-stroke-success-weak"],
    ["information", "border-stroke-information-weak"],
  ] as const)("uses the %s stroked tone token", (tone, borderClass) => {
    render(
      <IconContainer
        icon={<FeatherIcon name="star" />}
        tone={tone}
        variant="stroked"
        data-testid="icon-container"
      />,
    );

    expect(screen.getByTestId("icon-container")).toHaveClass(
      "border",
      borderClass,
    );
  });

  it("forwards span props, className, and ref", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <IconContainer
        ref={ref}
        icon={<FeatherIcon name="star" />}
        className="custom-class"
        aria-label="Featured"
      />,
    );

    expect(ref.current).toHaveClass("custom-class");
    expect(ref.current).toHaveAttribute("aria-label", "Featured");
  });
});
