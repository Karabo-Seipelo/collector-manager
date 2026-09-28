"use client";

import { ApplicationShell } from "../shared/application-shell";
import { TemplateTableDemo } from "../shared/template-table-demo";

export interface ApplicationTableTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function ApplicationTableTemplate(props: ApplicationTableTemplateProps) {
  return (
    <ApplicationShell {...props} pageTitle="Team members" showMobileHeader>
      <div className="overflow-x-auto p-4 md:p-8">
        <TemplateTableDemo selectable={false} />
      </div>
    </ApplicationShell>
  );
}
