"use client";

import * as React from "react";

import { Avatar } from "../../../atoms/avatar/avatar";
import { Button } from "../../../atoms/button/button";
import { FeatherIcon } from "../../../atoms/icon/icon";
import { TextLink } from "../../../atoms/text-link/text-link";
import { Breadcrumbs } from "../../../molecules/breadcrumbs/breadcrumbs";
import {
  SummaryList,
  type SummaryListItem,
} from "../../../molecules/summary-list/summary-list";
import { Tabs, TabsList, TabsTrigger } from "../../../molecules/tabs/tabs";
import { ApplicationShell } from "../../../templates/application-shell/application-shell";
import login4AvatarSrc from "../../../templates/shared/assets/login-4-avatar.png";

export interface AccountSettingsPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  userMenuDefaultOpen?: boolean;
}

const settingsTabs = [
  { value: "profile", label: "Profile" },
  { value: "preferences", label: "Preferences" },
  { value: "plan", label: "Plan" },
  { value: "notifications", label: "Notifications" },
  { value: "security", label: "Security" },
] as const;

const personalDetails: SummaryListItem[] = [
  { id: "first-name", term: "First name", description: "John" },
  { id: "last-name", term: "Last name", description: "Smith" },
  { id: "date-of-birth", term: "Date of birth", description: "08/09/1990" },
  { id: "language", term: "Language", description: "English" },
];

const contactDetails: SummaryListItem[] = [
  { id: "email", term: "Email", description: "john@practical-ui.com" },
  { id: "mobile", term: "Mobile", description: "0433 123 123" },
];

export function AccountSettingsPage(props: AccountSettingsPageProps) {
  const [tab, setTab] = React.useState<string>("profile");

  return (
    <ApplicationShell
      {...props}
      layout="sidenav"
      defaultActiveNav="home"
      showMobileHeader
    >
      <div className="flex flex-1 flex-col gap-8 px-4 py-8 md:gap-12 md:px-16 md:py-12">
        <Breadcrumbs
          items={[
            { label: "Home", href: "#home" },
            { label: "Account settings", href: "#account-settings" },
          ]}
        />

        <div className="flex w-full max-w-[600px] flex-col gap-2">
          <h1 className="text-heading-1 font-semibold text-fg-strong">
            Account settings
          </h1>
          <p className="text-small text-fg-weak">
            Manage your profile, preferences, plan and security in one place.
          </p>
        </div>

        <Tabs value={tab} onValueChange={setTab} className="overflow-x-auto">
          <TabsList aria-label="Account settings sections">
            {settingsTabs.map((item) => (
              <TabsTrigger key={item.value} value={item.value}>
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <section
          aria-labelledby="personal-details-heading"
          className="flex w-full max-w-[600px] flex-col gap-6"
        >
          <h2
            id="personal-details-heading"
            className="text-heading-2 font-semibold text-fg-strong"
          >
            Personal details
          </h2>
          <div className="flex items-center gap-4">
            <Avatar
              name="John Smith"
              src={login4AvatarSrc}
              alt=""
              size="large"
            />
            <div className="flex flex-col items-start gap-2">
              <Button size="small" variant="secondary" tone="neutral">
                Change photo
              </Button>
              <p className="text-tiny text-fg-weak">Maximum file size is 5MB</p>
            </div>
          </div>
          <SummaryList aria-label="Personal details" items={personalDetails} />
          <TextLink
            href="#edit-personal-details"
            size="tiny"
            tone="brand"
            iconLeft={<FeatherIcon name="edit" size={20} />}
          >
            Edit personal details
          </TextLink>
        </section>

        <section
          aria-labelledby="contact-details-heading"
          className="flex w-full max-w-[600px] flex-col gap-6"
        >
          <h2
            id="contact-details-heading"
            className="text-heading-2 font-semibold text-fg-strong"
          >
            Contact details
          </h2>
          <SummaryList aria-label="Contact details" items={contactDetails} />
          <TextLink
            href="#edit-contact-details"
            size="tiny"
            tone="brand"
            iconLeft={<FeatherIcon name="edit" size={20} />}
          >
            Edit contact details
          </TextLink>
        </section>
      </div>
    </ApplicationShell>
  );
}
