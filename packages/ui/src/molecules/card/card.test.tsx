import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Card, CardContent, CardHeader, CardImage } from "./card";

describe("Card", () => {
  it("composes image, heading, description, and custom content", () => {
    render(
      <Card>
        <CardImage>
          <img src="/beach.jpg" alt="Beach" />
        </CardImage>
        <CardContent>
          <CardHeader
            label="Featured"
            heading="Heading"
            description="Card description"
          />
          <a href="/details">View details</a>
        </CardContent>
      </Card>,
    );

    expect(screen.getByRole("img", { name: "Beach" })).toHaveAttribute(
      "src",
      "/beach.jpg",
    );
    expect(screen.getByText("Featured")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Heading" })).toBeInTheDocument();
    expect(screen.getByText("Card description")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details" })).toBeInTheDocument();
  });

  it("renders the vertical layout by default", () => {
    render(
      <Card>
        <CardContent>
          <CardHeader heading="Heading" />
        </CardContent>
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveClass(
      "flex-col",
      "rounded-2xl",
      "border-stroke-weak",
      "shadow-raised",
    );
  });

  it("supports the horizontal image and content layout", () => {
    render(
      <Card orientation="horizontal">
        <CardImage>
          <img src="/beach.jpg" alt="" />
        </CardImage>
        <CardContent>
          <CardHeader heading="Heading" />
        </CardContent>
      </Card>,
    );

    expect(screen.getByTestId("card")).toHaveClass("flex-row");
    expect(screen.getByTestId("card-image")).toHaveClass(
      "w-[225px]",
      "self-stretch",
    );
  });

  it("renders an optional icon before the text block", () => {
    render(
      <Card>
        <CardContent>
          <CardHeader
            icon={<span data-testid="icon">Icon</span>}
            heading="Heading"
          />
        </CardContent>
      </Card>,
    );

    expect(screen.getByTestId("icon")).toBeInTheDocument();
    expect(screen.getByTestId("card-header")).toHaveClass(
      "flex-col",
      "gap-4",
    );
  });

  it("uses the requested semantic heading level", () => {
    render(
      <Card>
        <CardContent>
          <CardHeader heading="Heading" headingLevel={2} />
        </CardContent>
      </Card>,
    );

    expect(screen.getByRole("heading", { level: 2 })).toHaveTextContent(
      "Heading",
    );
  });
});
