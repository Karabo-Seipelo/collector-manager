import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { FeatherIcon } from "../../atoms/icon/icon";
import { Tabs, TabsList, TabsPanel, TabsTrigger } from "./tabs";

function renderTabs({
  defaultValue = "one",
  onValueChange,
}: {
  defaultValue?: string;
  onValueChange?: (value: string) => void;
} = {}) {
  return render(
    <Tabs defaultValue={defaultValue} onValueChange={onValueChange}>
      <TabsList aria-label="Sections">
        <TabsTrigger value="one">One</TabsTrigger>
        <TabsTrigger value="two" badge={8}>
          Two
        </TabsTrigger>
        <TabsTrigger value="three" disabled>
          Three
        </TabsTrigger>
      </TabsList>
      <TabsPanel value="one">Panel one</TabsPanel>
      <TabsPanel value="two">Panel two</TabsPanel>
      <TabsPanel value="three">Panel three</TabsPanel>
    </Tabs>,
  );
}

describe("Tabs", () => {
  it("renders the selected panel", () => {
    renderTabs();

    expect(screen.getByRole("tablist", { name: "Sections" })).toBeVisible();
    expect(screen.getByRole("tab", { name: "One", selected: true })).toHaveClass(
      "border-primary",
      "text-primary",
    );
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel one");
  });

  it("switches panels when a tab is clicked", async () => {
    const user = userEvent.setup();
    renderTabs();

    await user.click(screen.getByRole("tab", { name: /Two/i }));

    expect(screen.getByRole("tab", { name: /Two/i, selected: true })).toBeVisible();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });

  it("calls onValueChange when selection changes", async () => {
    const user = userEvent.setup();
    const onValueChange = vi.fn();
    renderTabs({ onValueChange });

    await user.click(screen.getByRole("tab", { name: /Two/i }));
    expect(onValueChange).toHaveBeenCalledWith("two");
  });

  it("supports icon triggers", () => {
    render(
      <Tabs defaultValue="alpha">
        <TabsList aria-label="Icon tabs">
          <TabsTrigger
            value="alpha"
            icon={<FeatherIcon name="layers" size={20} />}
          >
            Alpha
          </TabsTrigger>
        </TabsList>
        <TabsPanel value="alpha">Alpha panel</TabsPanel>
      </Tabs>,
    );

    expect(screen.getByRole("tab", { name: "Alpha", selected: true })).toBeVisible();
  });

  it("renders badge counts on tabs", () => {
    renderTabs();
    expect(screen.getByTestId("badge-count")).toHaveTextContent("8");
  });

  it("navigates tabs with arrow keys", async () => {
    const user = userEvent.setup();
    renderTabs();

    const firstTab = screen.getByRole("tab", { name: "One" });
    firstTab.focus();

    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: /Two/i, selected: true })).toHaveFocus();
    expect(screen.getByRole("tabpanel")).toHaveTextContent("Panel two");
  });
});
