import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Hero } from "./hero";

const title = "Lorem ipsum dolor sit amet tetur elit";
const description =
  "Lorem ipsum dolor sit amet, con sec tetur adipiscing elit dolor sit.";

function HeroMedia() {
  return <img src="/hero.jpg" alt="Product preview" />;
}

describe("Hero", () => {
  it("renders title, description, and media", () => {
    render(
      <Hero
        title={title}
        description={description}
        media={<HeroMedia />}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 1, name: title }),
    ).toBeVisible();
    expect(screen.getByText(description)).toBeVisible();
    expect(screen.getByRole("img", { name: "Product preview" })).toBeVisible();
  });

  it("renders optional eyebrow, tag, and slots", () => {
    render(
      <Hero
        title={title}
        description={description}
        eyebrow="Label"
        tag={<span data-testid="hero-tag">New</span>}
        actions={<button type="button">Buy now</button>}
        emailSignup={<input aria-label="Email" placeholder="Email" />}
        socialProof={<span data-testid="hero-social">Social proof</span>}
        media={<HeroMedia />}
      />,
    );

    expect(screen.getByText("Label")).toBeVisible();
    expect(screen.getByTestId("hero-tag")).toBeVisible();
    expect(screen.getByRole("button", { name: "Buy now" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Email" })).toBeVisible();
    expect(screen.getByTestId("hero-social")).toBeVisible();
  });

  it("applies horizontal layout classes by default", () => {
    render(
      <Hero
        data-testid="hero"
        title={title}
        description={description}
        media={<HeroMedia />}
      />,
    );

    expect(screen.getByTestId("hero")).toHaveClass("lg:flex-row");
  });

  it("applies vertical layout classes", () => {
    render(
      <Hero
        data-testid="hero"
        layout="vertical"
        title={title}
        description={description}
        media={<HeroMedia />}
      />,
    );

    expect(screen.getByTestId("hero")).toHaveClass("flex-col");
    expect(screen.getByTestId("hero")).toHaveClass("items-center");
  });
});
