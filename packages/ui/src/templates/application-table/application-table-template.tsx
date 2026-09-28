"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { SearchInput } from "../../molecules/search-input/search-input";
import { SegmentedControl } from "../../molecules/segmented-control/segmented-control";
import { Tabs, TabsList, TabsTrigger } from "../../molecules/tabs/tabs";
import { ApplicantsTable } from "../shared/applicants-table";
import { ApplicationShell } from "../shared/application-shell";

export interface ApplicationTableTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

const statusTabs = [
  { value: "all", label: "All" },
  { value: "approved", label: "Approved" },
  { value: "on_hold", label: "On hold" },
  { value: "pending", label: "Pending" },
  { value: "rejected", label: "Rejected" },
];

export function ApplicationTableTemplate(props: ApplicationTableTemplateProps) {
  const [statusTab, setStatusTab] = React.useState("all");
  const [dateRange, setDateRange] = React.useState("7d");

  return (
    <ApplicationShell
      {...props}
      defaultActiveNav="teams"
      breadcrumbs={[
        { label: "Home", href: "#home" },
        { label: "Teams", href: "#teams" },
        { label: "Applicants" },
      ]}
    >
      <div className="flex flex-1 flex-col gap-8 bg-fill-inverse px-4 py-8 md:px-6 md:py-12">
        <header className="flex flex-col gap-2">
          <h1 className="text-heading-1 font-semibold text-fg-strong">Applicants</h1>
          <p className="text-small text-fg-weak">
            Control who can access your team dashboard, files, and reports.
          </p>
        </header>

        <Tabs value={statusTab} onValueChange={setStatusTab} className="overflow-x-auto">
          <TabsList aria-label="Applicant status">
            {statusTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput
                aria-label="Search applicants"
                placeholder="Search"
                size="small"
                className="w-full sm:w-[152px]"
              />
              <Button
                size="small"
                variant="secondary"
                tone="neutral"
                iconLeft={<FeatherIcon name="filter" size={20} />}
              >
                Filter
              </Button>
            </div>
            <SegmentedControl
              aria-label="Date range"
              size="small"
              value={dateRange}
              onValueChange={setDateRange}
              options={[
                { value: "7d", label: "Last 7 days" },
                { value: "30d", label: "Last 30 days" },
                { value: "all", label: "All time" },
              ]}
            />
          </div>
          <div className="overflow-x-auto">
            <ApplicantsTable />
          </div>
        </div>
      </div>
    </ApplicationShell>
  );
}
