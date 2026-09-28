"use client";

import * as React from "react";

import { Avatar } from "../../../atoms/avatar/avatar";
import { Button } from "../../../atoms/button/button";
import { Divider } from "../../../atoms/divider/divider";
import { TextLink } from "../../../atoms/text-link/text-link";
import { Breadcrumbs } from "../../../molecules/breadcrumbs/breadcrumbs";
import { Select } from "../../../molecules/select/select";
import { TextField } from "../../../molecules/text-field/text-field";
import { DatePicker } from "../../../organisms/date-picker/date-picker";
import { ApplicationShell } from "../../../templates/application-shell/application-shell";
import login4AvatarSrc from "../../../templates/shared/assets/login-4-avatar.png";

export interface EditPersonalDetailsPageProps {
  sidebarOpen?: boolean;
  defaultSidebarOpen?: boolean;
  onSidebarOpenChange?: (open: boolean) => void;
  userMenuDefaultOpen?: boolean;
}

export function EditPersonalDetailsPage(
  props: EditPersonalDetailsPageProps,
) {
  return (
    <ApplicationShell
      {...props}
      layout="sidenav"
      defaultActiveNav="home"
      showMobileHeader
    >
      <form
        className="flex flex-1 flex-col gap-8 px-4 py-8 md:gap-12 md:px-16 md:py-12"
        onSubmit={(event) => event.preventDefault()}
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "#home" },
            { label: "Account settings", href: "#account-settings" },
            { label: "Edit personal details", href: "#edit-personal-details" },
          ]}
        />

        <h1 className="text-heading-1 font-semibold text-fg-strong">
          Edit personal details
        </h1>

        <Divider />

        <div className="flex w-full max-w-[364px] flex-col gap-8">
          <div className="flex items-center gap-4">
            <Avatar
              name="John Smith"
              src={login4AvatarSrc}
              alt=""
              size="large"
            />
            <div className="flex flex-col items-start gap-2">
              <Button
                type="button"
                size="small"
                variant="secondary"
                tone="neutral"
              >
                Change photo
              </Button>
              <p className="text-tiny text-fg-weak">Maximum file size is 5MB</p>
            </div>
          </div>

          <TextField
            label="First name"
            defaultValue="John"
            autoComplete="given-name"
          />
          <TextField
            label="Last name"
            defaultValue="Smith"
            autoComplete="family-name"
          />
          <DatePicker
            label="Date of birth"
            defaultValue="08/09/1990"
            className="md:max-w-[182px]"
          />
          <Select
            label="Language"
            defaultValue="en"
            className="md:max-w-[182px]"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
          </Select>
        </div>

        <Divider />

        <div className="flex items-center gap-4">
          <Button type="submit">Save personal details</Button>
          <TextLink
            href="#account-settings"
            size="small"
            weight="bold"
            tone="brand"
            className="h-12"
          >
            Cancel
          </TextLink>
        </div>
      </form>
    </ApplicationShell>
  );
}
