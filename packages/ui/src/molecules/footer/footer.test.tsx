import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { FeatherIcon } from "../../atoms/icon/icon";
import { Footer } from "./footer";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: <FeatherIcon name="instagram" size={24} />,
  },
];

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

describe("Footer", () => {
  it("renders a small footer with navigation and social links", () => {
    render(
      <Footer
        size="small"
        logo={<span>Practical UI</span>}
        copyright="© 2024 Practical UI"
        navLinks={navLinks}
        socialLinks={socialLinks}
      />,
    );

    expect(screen.getByRole("contentinfo")).toBeVisible();
    expect(screen.getByText("Practical UI")).toBeVisible();
    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "#about",
    );
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute(
      "href",
      "https://instagram.com",
    );
    expect(screen.getByText("© 2024 Practical UI")).toBeVisible();
  });

  it("renders a large footer with description and topic columns", () => {
    render(
      <Footer
        size="large"
        logo={<span>Practical UI</span>}
        description="Product description copy."
        copyright="© 2024 Practical UI"
        socialLinks={socialLinks}
        columns={[
          {
            title: "Product",
            links: [{ label: "Features", href: "#features" }],
          },
          {
            title: "Company",
            links: [{ label: "Careers", href: "#careers" }],
          },
        ]}
      />,
    );

    expect(screen.getByText("Product description copy.")).toBeVisible();
    expect(screen.getByRole("heading", { name: "Product" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Features" })).toBeVisible();
    expect(screen.getByRole("link", { name: "Careers" })).toBeVisible();
  });
});
