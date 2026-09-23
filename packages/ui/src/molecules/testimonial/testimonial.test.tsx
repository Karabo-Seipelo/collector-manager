import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Testimonial } from "./testimonial";

const quote =
  "Such a useful and practical book by one of the best in the game. Love this logic-driven approach to UI design. Surprisingly powerful.";

describe("Testimonial", () => {
  it("renders quote, author, and rating", () => {
    render(
      <Testimonial
        quote={quote}
        author={{
          name: "John Smith",
          description: "john@practical-ui.com",
        }}
        rating={3.5}
      />,
    );

    expect(screen.getByText(quote)).toBeVisible();
    expect(screen.getByText("John Smith")).toBeVisible();
    expect(screen.getByText("john@practical-ui.com")).toBeVisible();
    expect(screen.getByRole("img", { name: /3.5 out of 5 stars/i })).toBeVisible();
  });

  it("applies left alignment by default", () => {
    render(
      <Testimonial
        quote={quote}
        data-testid="testimonial"
      />,
    );

    expect(screen.getByTestId("testimonial")).toHaveClass("items-start");
    expect(screen.getByText(quote)).not.toHaveClass("text-center");
  });

  it("applies center alignment", () => {
    render(
      <Testimonial
        align="center"
        quote={quote}
        data-testid="testimonial"
      />,
    );

    expect(screen.getByTestId("testimonial")).toHaveClass("items-center");
    expect(screen.getByText(quote)).toHaveClass("text-center");
  });

  it("renders quote only when author and rating are omitted", () => {
    render(<Testimonial quote={quote} />);

    expect(screen.getByText(quote)).toBeVisible();
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });
});
