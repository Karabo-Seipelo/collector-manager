"use client";

import { Button } from "../../atoms/button/button";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { Select } from "../../molecules/select/select";
import { TextField } from "../../molecules/text-field/text-field";
import { ApplicationShell } from "../shared/application-shell";

export interface AccountSettingsTemplateProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
}

export function AccountSettingsTemplate(props: AccountSettingsTemplateProps) {
  return (
    <ApplicationShell {...props} pageTitle="Account settings" showMobileHeader>
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-6 p-4 md:gap-8 md:p-8">
        <section className="flex flex-col gap-4">
          <h2 className="text-heading-4 font-semibold text-fg-strong">Profile</h2>
          <TextField label="Display name" defaultValue="John Smith" />
          <TextField label="Email" type="email" defaultValue="john@practical-ui.com" />
        </section>
        <section className="flex flex-col gap-4">
          <h2 className="text-heading-4 font-semibold text-fg-strong">Preferences</h2>
          <Select label="Language" defaultValue="en">
            <option value="en">English</option>
            <option value="fr">French</option>
          </Select>
          <Select label="Timezone" defaultValue="utc">
            <option value="utc">UTC</option>
            <option value="est">Eastern Time</option>
          </Select>
        </section>
        <ButtonGroup aria-label="Save settings">
          <Button>Save changes</Button>
          <Button variant="secondary" tone="neutral">
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </ApplicationShell>
  );
}
