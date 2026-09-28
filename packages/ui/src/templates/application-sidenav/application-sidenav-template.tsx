"use client";

import { ApplicationShell } from "../shared/application-shell";

export interface ApplicationSidenavTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function ApplicationSidenavTemplate(props: ApplicationSidenavTemplateProps) {
  return (
    <ApplicationShell {...props}>
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </div>
    </ApplicationShell>
  );
}
