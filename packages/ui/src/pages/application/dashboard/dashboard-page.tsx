"use client";

import * as React from "react";

import { Alert } from "../../../atoms/alert/alert";
import { Button } from "../../../atoms/button/button";
import { FeatherIcon } from "../../../atoms/icon/icon";
import { IconContainer } from "../../../atoms/icon-container/icon-container";
import { Card, CardContent, CardHeader } from "../../../molecules/card/card";
import { SearchInput } from "../../../molecules/search-input/search-input";
import { SegmentedControl } from "../../../molecules/segmented-control/segmented-control";
import { ApplicantsTable } from "../../../templates/shared/applicants-table";
import { ApplicationShell } from "../../../templates/application-shell/application-shell";

export interface DashboardPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  userMenuDefaultOpen?: boolean;
}

const shortcutCards = [
  {
    heading: "Teams",
    description: "Manage members and roles across your organisation.",
    icon: "users" as const,
  },
  {
    heading: "Reports",
    description: "Track performance with up-to-date analytics.",
    icon: "file-text" as const,
  },
  {
    heading: "Calendar",
    description: "Schedule interviews and review upcoming events.",
    icon: "calendar" as const,
  },
];

export function DashboardPage({
  userMenuDefaultOpen,
  ...shellProps
}: DashboardPageProps) {
  const [verifyEmailVisible, setVerifyEmailVisible] = React.useState(true);
  const [dateRange, setDateRange] = React.useState("7d");

  return (
    <ApplicationShell {...shellProps} userMenuDefaultOpen={userMenuDefaultOpen}>
      <div className="flex flex-col gap-6 p-8 md:gap-8 md:p-12">
        {verifyEmailVisible ? (
          <Alert
            tone="warning"
            size="small"
            heading="Verify your email"
            onClose={() => setVerifyEmailVisible(false)}
          >
            We sent a confirmation link to john@practical-ui.com. Verify your email to
            unlock all features.
          </Alert>
        ) : null}

        <header className="flex flex-col gap-1">
          <h1 className="text-heading-2 font-semibold text-fg-strong">Hi, John</h1>
          <p className="text-small text-fg-weak">Last login: 28 Sep 2026 at 9:14 AM</p>
        </header>

        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {shortcutCards.map((item) => (
            <Card key={item.heading}>
              <CardContent className="gap-4 p-6 md:p-8">
                <CardHeader
                  icon={
                    <IconContainer
                      tone="brand"
                      variant="filled"
                      icon={<FeatherIcon name={item.icon} size={24} />}
                    />
                  }
                  heading={item.heading}
                  description={item.description}
                />
              </CardContent>
            </Card>
          ))}
        </div>

        <section className="flex flex-col gap-4 md:gap-6">
          <h2 className="text-heading-3 font-semibold text-fg-strong">Applicants</h2>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <SearchInput
                aria-label="Search applicants"
                placeholder="Search"
                className="w-full sm:w-[280px]"
              />
              <Button
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
          <ApplicantsTable />
        </section>
      </div>
    </ApplicationShell>
  );
}
