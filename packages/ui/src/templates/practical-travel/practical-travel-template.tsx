"use client";

import * as React from "react";

import {
  PracticalTravelFooter,
  PracticalTravelNavigation,
  type PracticalTravelNavHref,
} from "../shared/practical-travel/practical-travel";

export interface PracticalTravelTemplateProps {
  activeHref?: PracticalTravelNavHref;
  children: React.ReactNode;
  subscribeSection?: React.ReactNode;
}

export function PracticalTravelTemplate({
  activeHref,
  children,
  subscribeSection,
}: PracticalTravelTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse">
      <PracticalTravelNavigation activeHref={activeHref} />
      {children}
      {subscribeSection}
      <PracticalTravelFooter />
    </div>
  );
}
