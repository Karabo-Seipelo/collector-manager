"use client";

import { Button } from "../../atoms/button/button";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { TextField } from "../../molecules/text-field/text-field";
import { ApplicationShell } from "../shared/application-shell";

export interface EditPersonalDetailsTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function EditPersonalDetailsTemplate(props: EditPersonalDetailsTemplateProps) {
  return (
    <ApplicationShell {...props} pageTitle="Personal details" showMobileHeader>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4 md:p-8">
        <TextField label="First name" defaultValue="John" />
        <TextField label="Last name" defaultValue="Smith" />
        <TextField label="Job title" defaultValue="Product designer" />
        <TextField label="Phone" type="tel" defaultValue="+1 555 0100" />
        <ButtonGroup aria-label="Personal details actions">
          <Button>Save</Button>
          <Button variant="secondary" tone="neutral">
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </ApplicationShell>
  );
}
