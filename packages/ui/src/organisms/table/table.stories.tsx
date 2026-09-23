import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";

import { Badge } from "../../atoms/badge/badge";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { FeatherIcon } from "../../atoms/icon/icon";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
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

const rows = Array.from({ length: 10 }, (_, index) => ({
  id: `row-${index + 1}`,
  trend: index % 2 === 0 ? ("up" as const) : ("down" as const),
}));

function DemoTable({
  variant = "default",
  withPagination = true,
}: {
  variant?: "default" | "striped";
  withPagination?: boolean;
}) {
  return (
    <Table
      variant={variant}
      aria-label="Team members"
      footer={
        withPagination ? (
          <TablePagination
            currentPage={2}
            totalPages={10}
            totalItems={128}
            pageSize={10}
            onPageChange={fn()}
          />
        ) : undefined
      }
    >
      <TableHeader>
        <TableRow>
          <TableHead padding="checkbox">
            <Checkbox aria-label="Select all rows" />
          </TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead align="right" sortable sortDirection="asc">
            Score
          </TableHead>
          <TableHead padding="actions" align="right">
            Actions
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((row) => (
          <TableRow key={row.id}>
            <TableCell padding="checkbox">
              <Checkbox aria-label={`Select ${row.id}`} />
            </TableCell>
            <TableCell>
              <AvatarLabelled
                name="Name"
                description="Secondary text"
                size="medium"
              />
            </TableCell>
            <TableCell>
              <Badge tone="success" size="small" icon={<FeatherIcon name="check" size={16} />}>
                Label
              </Badge>
            </TableCell>
            <TableCell align="right">
              <TableCellNumber value="0" trend={row.trend} />
            </TableCell>
            <TableCell padding="actions" align="right">
              <TableCellActions
                type="icons"
                icons={[
                  { label: "Copy", icon: "copy" },
                  { label: "Download", icon: "download" },
                  { label: "Delete", icon: "trash-2" },
                  { label: "More options", icon: "more-horizontal" },
                ]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

const meta = {
  title: "Organisms/Table",
  component: Table,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Data table with sortable headers, striped rows, rich cell content, and optional pagination.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[1024px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => <DemoTable />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByLabelText("Team members")).toBeVisible();
    await expect(canvas.getAllByRole("row")).toHaveLength(11);
  },
};

export const Striped: Story = {
  render: () => <DemoTable variant="striped" />,
};

export const CellVariants: Story = {
  render: () => (
    <Table aria-label="Cell variants">
      <TableHeader>
        <TableRow>
          <TableHead>Text</TableHead>
          <TableHead>Link</TableHead>
          <TableHead align="right">Number</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>
            <TableCellText bold>Name</TableCellText>
          </TableCell>
          <TableCell>
            <TableCellActions
              type="links"
              links={[
                { label: "Copy", href: "#copy" },
                { label: "Delete", href: "#delete" },
              ]}
            />
          </TableCell>
          <TableCell align="right">
            <TableCellNumber value="42" trend="up" />
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const PaginationInteraction: Story = {
  render: () => {
    const onPageChange = fn();

    return (
      <Table
        aria-label="Paginated table"
        footer={
          <TablePagination
            currentPage={2}
            totalPages={10}
            totalItems={128}
            pageSize={10}
            onPageChange={onPageChange}
          />
        }
      >
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <TableCellText>Row</TableCellText>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("link", { name: /Next/i }));
    await expect(canvas.getByText("Showing 11 - 20 of 128")).toBeVisible();
  },
};
