import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Rating } from "./rating";

describe("Rating", () => {
  it("renders a horizontal star rating with value and reviews link", () => {
    render(<Rating value={3.5} />);

    expect(screen.getByRole("img", { name: "3.5 out of 5 stars" })).toBeVisible();
    expect(screen.getByText("3.5")).toBeVisible();
    expect(screen.getByRole("link", { name: "(23 reviews)" })).toBeVisible();
  });

  it("renders a vertical layout with a From prefix on the reviews link", () => {
    render(<Rating value={3.5} layout="vertical" reviewCount={23} />);

    expect(screen.getByText("From")).toBeVisible();
    expect(screen.getByRole("link", { name: "23 reviews" })).toBeVisible();
  });

  it("hides the numeric value and reviews link when requested", () => {
    render(
      <Rating value={3.5} showValue={false} showReviews={false} />,
    );

    expect(screen.queryByText("3.5")).not.toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("supports heart icons and clamps values to the max", () => {
    render(<Rating value={6} max={5} icon="heart" showReviews={false} />);

    expect(
      screen.getByRole("img", { name: "5 out of 5 hearts" }),
    ).toBeVisible();
  });
});
