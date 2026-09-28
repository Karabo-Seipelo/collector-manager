"use client";

import { ApplicationShell } from "../shared/application-shell";
import { TemplateTableDemo } from "../shared/template-table-demo";

export interface ApplicationTableSelectTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function ApplicationTableSelectTemplate(
  props: ApplicationTableSelectTemplateProps,
) {
  return (
    <ApplicationShell {...props} pageTitle="Select members" showMobileHeader>
      <div className="overflow-x-auto p-4 md:p-8">
        <TemplateTableDemo selectable />
      </div>
    </ApplicationShell>
  );
}
