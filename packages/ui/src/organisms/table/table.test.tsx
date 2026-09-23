import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from "../../atoms/checkbox/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableCellNumber,
  TableCellText,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "./table";

describe("Table", () => {
  it("renders header and body rows", () => {
    render(
      <Table aria-label="Orders">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead align="right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <TableCellText>Alpha</TableCellText>
            </TableCell>
            <TableCell align="right">
              <TableCellNumber value="10" trend="up" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByLabelText("Orders")).toBeVisible();
    expect(screen.getByRole("columnheader", { name: "Name" })).toBeVisible();
    expect(screen.getByText("Alpha")).toBeVisible();
    expect(screen.getByText("10")).toBeVisible();
  });

  it("applies striped styling to even body rows", () => {
    render(
      <Table variant="striped">
        <TableBody data-testid="table-body">
          <TableRow>
            <TableCell>One</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Two</TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByTestId("table-body")).toHaveClass(
      "[&>tr:nth-child(even)]:bg-fill-weaker",
    );
  });

  it("supports sortable headers", async () => {
    const user = userEvent.setup();
    const onSort = vi.fn();

    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead sortable sortDirection="asc" onSort={onSort}>
              Name
            </TableHead>
          </TableRow>
        </TableHeader>
      </Table>,
    );

    const sortButton = screen.getByRole("button", { name: /Name/i });
    expect(sortButton).toHaveAttribute("aria-sort", "ascending");

    await user.click(sortButton);
    expect(onSort).toHaveBeenCalledOnce();
  });

  it("renders checkbox and action cells", () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead padding="checkbox">
              <Checkbox aria-label="Select all rows" />
            </TableHead>
            <TableHead padding="actions" align="right">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell padding="checkbox">
              <Checkbox aria-label="Select row" />
            </TableCell>
            <TableCell padding="actions" align="right">
              <TableCellActions
                type="icons"
                icons={[{ label: "Copy", icon: "copy" }]}
              />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>,
    );

    expect(screen.getByRole("checkbox", { name: "Select all rows" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Copy" })).toBeVisible();
  });

  it("renders pagination and changes page", async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <TablePagination
        currentPage={2}
        totalPages={10}
        totalItems={128}
        pageSize={10}
        onPageChange={onPageChange}
      />,
    );

    expect(screen.getByText("Showing 11 - 20 of 128")).toBeVisible();
    expect(screen.getByRole("button", { name: "Page 2" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    await user.click(screen.getByRole("link", { name: /Next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
