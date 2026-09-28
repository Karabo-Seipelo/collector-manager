"use client";

import { ApplicationShell } from "../../../templates/application-shell/application-shell";

export interface ApplicationSidenavPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function ApplicationSidenavPage(props: ApplicationSidenavPageProps) {
  return (
    <ApplicationShell {...props}>
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-small text-fg-weak">Main content area</p>
      </div>
    </ApplicationShell>
  );
}
