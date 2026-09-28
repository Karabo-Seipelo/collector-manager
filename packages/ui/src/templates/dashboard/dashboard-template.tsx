"use client";

import { Card, CardContent, CardHeader, CardImage } from "../../molecules/card/card";
import { SummaryList } from "../../molecules/summary-list/summary-list";
import { ImagePlaceholder } from "../../atoms/image-placeholder/image-placeholder";
import { ApplicationShell } from "../shared/application-shell";

export interface DashboardTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function DashboardTemplate(props: DashboardTemplateProps) {
  return (
    <ApplicationShell {...props} pageTitle="Dashboard" showMobileHeader>
      <div className="flex flex-col gap-6 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          {["Revenue", "Users", "Conversion"].map((label) => (
            <Card key={label}>
              <CardContent className="gap-2 p-6">
                <CardHeader
                  label="Metric"
                  heading={label}
                  description="Lorem ipsum dolor sit amet."
                />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardImage className="flex h-48 items-center justify-center">
              <ImagePlaceholder size={40} />
            </CardImage>
            <CardContent className="p-6">
              <CardHeader heading="Activity" description="Recent updates across your workspace." />
            </CardContent>
          </Card>
          <SummaryList
            aria-label="Summary"
            items={[
              { term: "Active projects", description: "12" },
              { term: "Open tasks", description: "48" },
              { term: "Team members", description: "8" },
            ]}
          />
        </div>
      </div>
    </ApplicationShell>
  );
}
