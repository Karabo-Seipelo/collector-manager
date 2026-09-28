"use client";

import * as React from "react";

import { Button } from "../../../atoms/button/button";
import { FeatherIcon } from "../../../atoms/icon/icon";
import { TextLink } from "../../../atoms/text-link/text-link";
import { AlertGlobal } from "../../../molecules/alert-global/alert-global";
import { SearchInput } from "../../../molecules/search-input/search-input";
import { Tabs, TabsList, TabsTrigger } from "../../../molecules/tabs/tabs";
import { ApplicantsTable } from "../../../templates/shared/applicants-table";
import { ApplicationShell } from "../../../templates/application-shell/application-shell";

export interface ApplicationTableSelectPageProps {
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

export function ApplicationTableSelectPage(
  props: ApplicationTableSelectPageProps,
) {
  const [bannerVisible, setBannerVisible] = React.useState(true);
  const [statusTab, setStatusTab] = React.useState("all");
  const [selectedIds, setSelectedIds] = React.useState<Set<string>>(
    () => new Set(["1", "2"]),
  );

  return (
    <ApplicationShell
      {...props}
      defaultActiveNav="teams"
      breadcrumbs={[
        { label: "Home", href: "#home" },
        { label: "Teams", href: "#teams" },
        { label: "Applicants" },
      ]}
      banner={
        bannerVisible ? (
          <>
            {(["desktop", "mobile"] as const).map((device) => (
              <AlertGlobal
                key={device}
                device={device}
                tone="inverse-brand"
                className={device === "desktop" ? "max-md:hidden" : "md:hidden"}
                icon={<FeatherIcon name="info" size={24} />}
                action={
                  <Button
                    size="small"
                    variant="secondary"
                    tone="inverse"
                    className={device === "mobile" ? "self-start" : undefined}
                  >
                    Learn about scheduling
                  </Button>
                }
                onClose={() => setBannerVisible(false)}
              >
                You can now schedule reports with the new calendar feature
              </AlertGlobal>
            ))}
          </>
        ) : null
      }
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
            {selectedIds.size > 0 ? (
              <div className="flex flex-wrap items-center gap-6">
                <p className="text-tiny text-fg-weak" aria-live="polite">
                  {selectedIds.size} {selectedIds.size === 1 ? "item" : "items"} selected
                </p>
                <TextLink
                  href="#cancel"
                  size="tiny"
                  onClick={(event) => {
                    event.preventDefault();
                    setSelectedIds(new Set());
                  }}
                >
                  Cancel
                </TextLink>
                <div className="flex items-center gap-2">
                  <Button size="small" variant="secondary">
                    Download
                  </Button>
                  <Button size="small" variant="secondary">
                    Delete
                  </Button>
                </div>
              </div>
            ) : null}
          </div>
          <div className="overflow-x-auto">
            <ApplicantsTable selectedIds={selectedIds} onSelectedIdsChange={setSelectedIds} />
          </div>
        </div>
      </div>
    </ApplicationShell>
  );
}
