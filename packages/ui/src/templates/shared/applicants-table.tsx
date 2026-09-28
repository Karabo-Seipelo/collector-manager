"use client";

import { Badge } from "../../atoms/badge/badge";
import { Checkbox } from "../../atoms/checkbox/checkbox";
import { FeatherIcon } from "../../atoms/icon/icon";
import type { FeatherIconName } from "../../atoms/icon/icon";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import {
  Table,
  TableBody,
  TableCell,
  TableCellActions,
  TableHead,
  TableHeader,
  TablePagination,
  TableRow,
} from "../../organisms/table/table";
import { applicants, type ApplicantRow, type ApplicantStatus } from "./applicants-data";
import login4AvatarSrc from "./assets/login-4-avatar.png";
import { templatePhotoSrc } from "./mock-photo";

const statusConfig: Record<
  ApplicantStatus,
  { label: string; tone: "success" | "warning" | "error" | "information"; icon: FeatherIconName }
> = {
  approved: { label: "Approved", tone: "success", icon: "check" },
  on_hold: { label: "On hold", tone: "warning", icon: "alert-circle" },
  rejected: { label: "Rejected", tone: "error", icon: "x" },
  pending: { label: "Pending", tone: "information", icon: "info" },
};

function ApplicantStatusBadge({ status }: { status: ApplicantStatus }) {
  const config = statusConfig[status];
  return (
    <Badge tone={config.tone} size="small" icon={<FeatherIcon name={config.icon} size={16} />}>
      {config.label}
    </Badge>
  );
}

function applicantAvatarSrc(row: ApplicantRow) {
  return row.name === "John Smith" ? login4AvatarSrc : templatePhotoSrc;
}

export interface ApplicantsTableProps {
  rows?: ApplicantRow[];
  selectedIds?: ReadonlySet<string>;
  onSelectedIdsChange?: (ids: Set<string>) => void;
}

export function ApplicantsTable({
  rows = applicants,
  selectedIds,
  onSelectedIdsChange,
}: ApplicantsTableProps) {
  const selectable = selectedIds !== undefined;
  const selectedCount = rows.filter((row) => selectedIds?.has(row.id)).length;
  const allSelected = rows.length > 0 && selectedCount === rows.length;

  const toggleRow = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    onSelectedIdsChange?.(next);
  };

  const toggleAll = () => {
    onSelectedIdsChange?.(allSelected ? new Set() : new Set(rows.map((row) => row.id)));
  };

  return (
    <Table
      aria-label="Applicants"
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
              <Checkbox
                aria-label="Select all rows"
                checked={allSelected}
                indeterminate={selectedCount > 0 && !allSelected}
                onChange={toggleAll}
              />
            </TableHead>
          ) : null}
          <TableHead>Applicant</TableHead>
          <TableHead>Email</TableHead>
          <TableHead sortable sortDirection="asc">
            Date applied
          </TableHead>
          <TableHead>Status</TableHead>
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
                <Checkbox
                  aria-label={`Select ${row.name}`}
                  checked={selectedIds.has(row.id)}
                  onChange={() => toggleRow(row.id)}
                />
              </TableCell>
            ) : null}
            <TableCell>
              <AvatarLabelled
                name={row.name}
                description={row.role}
                src={applicantAvatarSrc(row)}
                alt=""
                size="medium"
              />
            </TableCell>
            <TableCell>{row.email}</TableCell>
            <TableCell>{row.dateApplied}</TableCell>
            <TableCell>
              <ApplicantStatusBadge status={row.status} />
            </TableCell>
            <TableCell padding="actions" align="right">
              <TableCellActions
                type="icons"
                icons={[{ label: "More options", icon: "more-horizontal" }]}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
