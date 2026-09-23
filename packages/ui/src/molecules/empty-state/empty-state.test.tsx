import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { ButtonGroup } from "../button-group/button-group";
import { EmptyState } from "./empty-state";

describe("EmptyState", () => {
  it("renders title, description, icon, and actions", () => {
    render(
      <EmptyState
        title="No items yet"
        description="Create your first item to get started."
        icon={<FeatherIcon name="inbox" size={24} />}
        actions={
          <ButtonGroup aria-label="Empty state actions">
            <Button>Create item</Button>
          </ButtonGroup>
        }
      />,
    );

    expect(
      screen.getByRole("heading", { name: "No items yet", level: 2 }),
    ).toBeVisible();
    expect(
      screen.getByText("Create your first item to get started."),
    ).toBeVisible();
    expect(screen.getByTestId("empty-state-icon")).toBeInTheDocument();
    expect(
      screen.getByRole("group", { name: "Empty state actions" }),
    ).toBeVisible();
  });

  it("renders without an icon for the basic variant", () => {
    render(
      <EmptyState
        title="No results"
        description="Try adjusting your filters."
        actions={
          <ButtonGroup aria-label="Empty state actions">
            <Button>Clear filters</Button>
          </ButtonGroup>
        }
      />,
    );

    expect(screen.getByRole("heading", { name: "No results" })).toBeVisible();
    expect(screen.queryByTestId("empty-state-icon")).not.toBeInTheDocument();
  });

  it("supports custom heading levels", () => {
    render(<EmptyState title="Empty" headingLevel={3} />);
    expect(screen.getByRole("heading", { level: 3, name: "Empty" })).toBeVisible();
  });
});
