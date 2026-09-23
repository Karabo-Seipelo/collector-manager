import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Avatar } from "./avatar";

describe("Avatar", () => {
  it("renders initials from the name", () => {
    render(<Avatar name="Karabo Seipelo" />);
    expect(screen.getByRole("img", { name: "Karabo Seipelo" })).toHaveTextContent(
      "KS",
    );
  });

  it("uses two letters from a single-word name", () => {
    render(<Avatar name="Karabo" />);
    expect(screen.getByRole("img", { name: "Karabo" })).toHaveTextContent("KA");
  });

  it("defaults to the medium size", () => {
    render(<Avatar name="Karabo Seipelo" />);
    expect(screen.getByRole("img", { name: "Karabo Seipelo" })).toHaveClass(
      "size-12",
    );
  });

  it("renders a photo when src is provided", () => {
    render(<Avatar name="Karabo Seipelo" src="/avatar.jpg" />);

    const photo = screen.getByRole("img", { name: "Karabo Seipelo" });
    expect(photo.tagName).toBe("IMG");
    expect(photo).toHaveAttribute("src", "/avatar.jpg");
  });

  it("falls back to initials when the photo fails to load", () => {
    render(<Avatar name="Karabo Seipelo" src="/broken.jpg" />);

    fireEvent.error(screen.getByRole("img", { name: "Karabo Seipelo" }));

    expect(screen.getByRole("img", { name: "Karabo Seipelo" })).toHaveTextContent(
      "KS",
    );
    expect(screen.queryByRole("img", { name: "Karabo Seipelo" })?.tagName).toBe(
      "SPAN",
    );
  });

  it("renders a user icon when type is icon", () => {
    const { container } = render(
      <Avatar name="Karabo Seipelo" type="icon" />,
    );

    expect(screen.getByRole("img", { name: "Karabo Seipelo" })).not.toHaveTextContent(
      "KS",
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });

  it("hides from assistive tech when decorative", () => {
    const { container } = render(
      <Avatar name="Karabo Seipelo" aria-hidden="true" />,
    );

    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("forwards ref to the root element", () => {
    const ref = createRef<HTMLSpanElement>();
    render(<Avatar name="Karabo Seipelo" ref={ref} />);
    expect(ref.current?.tagName).toBe("SPAN");
  });

  it("renders an initials override", () => {
    render(<Avatar name="2 more" initials="2+" />);
    expect(screen.getByRole("img", { name: "2 more" })).toHaveTextContent("2+");
  });
});
