"use client";

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
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "../../organisms/table/table";

const rows = Array.from({ length: 10 }, (_, index) => ({
  id: `row-${index + 1}`,
  trend: index % 2 === 0 ? ("up" as const) : ("down" as const),
}));

export function TemplateTableDemo({ selectable = false }: { selectable?: boolean }) {
  return (
    <Table
      aria-label="Team members"
      footer={
        <TablePagination
          currentPage={2}
          totalPages={10}
          totalItems={128}
          pageSize={10}
          onPageChange={() => {}}
        />
      }
    >
      <TableHeader>
        <TableRow>
          {selectable ? (
            <TableHead padding="checkbox">
              <Checkbox aria-label="Select all rows" />
            </TableHead>
          ) : null}
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
            {selectable ? (
              <TableCell padding="checkbox">
                <Checkbox aria-label={`Select ${row.id}`} />
              </TableCell>
            ) : null}
            <TableCell>
              <AvatarLabelled name="Name" description="Secondary text" size="medium" />
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
