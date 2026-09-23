import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { AvatarStack } from "./avatar-stack";

const people = [
  { name: "Ada Lovelace" },
  { name: "Alan Turing" },
  { name: "Grace Hopper" },
  { name: "Katherine Johnson" },
  { name: "Donald Knuth" },
  { name: "Barbara Liskov" },
  { name: "Edsger Dijkstra" },
];

describe("AvatarStack", () => {
  it("renders each visible person", () => {
    render(<AvatarStack people={people.slice(0, 3)} />);

    expect(
      screen.getByRole("group", { name: "Ada Lovelace and 2 others" }),
    ).toBeInTheDocument();
    expect(screen.getByText("AL")).toBeInTheDocument();
    expect(screen.getByText("AT")).toBeInTheDocument();
    expect(screen.getByText("GH")).toBeInTheDocument();
  });

  it("does not show an overflow count when everyone fits", () => {
    render(<AvatarStack people={people.slice(0, 3)} max={5} />);

    expect(screen.queryByText("2+")).not.toBeInTheDocument();
    expect(screen.queryByText("99+")).not.toBeInTheDocument();
  });

  it("caps visible avatars and shows the remaining count", () => {
    render(<AvatarStack people={people} max={5} />);

    expect(screen.getByText("AL")).toBeInTheDocument();
    expect(screen.getByText("DK")).toBeInTheDocument();
    expect(screen.queryByText("BL")).not.toBeInTheDocument();
    expect(screen.getByText("2+")).toBeInTheDocument();
  });

  it("caps the overflow label at 99+", () => {
    const crowd = Array.from({ length: 120 }, (_, i) => ({
      name: `Person ${i + 1}`,
    }));

    render(<AvatarStack people={crowd} max={5} />);

    expect(screen.getByText("99+")).toBeInTheDocument();
  });
});
