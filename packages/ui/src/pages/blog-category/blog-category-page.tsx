"use client";

import * as React from "react";

import { Tabs, TabsList, TabsTrigger } from "../../molecules/tabs/tabs";
import { destinations } from "../../templates/shared/practical-travel/destinations-data";
import { PracticalTravelTemplate } from "../../templates/practical-travel/practical-travel-template";
import {
  DestinationCardGrid,
  PracticalTravelSubscribeSection,
} from "../../templates/shared/practical-travel/practical-travel";

export interface BlogCategoryPageProps {
  /** Called with the entered email when the subscribe form is submitted. */
  onSubscribe?: (email: string) => void;
}

const categoryTabs = [
  { value: "top-rated", label: "Top rated" },
  { value: "adventure", label: "Adventure" },
  { value: "budget", label: "Budget" },
  { value: "romantic", label: "Romantic" },
  { value: "tropical", label: "Tropical" },
];

const pageTitle = "Destinations";
const pageDescription =
  "Discover the most captivating travel destinations around the globe and get inspired for your next adventure.";

export function BlogCategoryPage({
  onSubscribe,
}: BlogCategoryPageProps) {
  const [category, setCategory] = React.useState("top-rated");

  return (
    <PracticalTravelTemplate
      activeHref="#destinations"
      subscribeSection={
        <PracticalTravelSubscribeSection onSubscribe={onSubscribe} />
      }
    >
      <main className="flex flex-1 flex-col gap-12 px-8 py-16 md:gap-16 md:px-[120px] md:py-24">
        <div className="flex max-w-[687px] flex-col gap-4">
          <h1 className="text-[36px] leading-[44px] font-semibold tracking-[-0.5px] text-fg-strong md:text-[56px] md:leading-[64px] md:tracking-[-1px]">
            {pageTitle}
          </h1>
          <p className="text-small text-fg-weak md:text-heading-4 md:font-normal">
            {pageDescription}
          </p>
        </div>

        <Tabs
          value={category}
          onValueChange={setCategory}
          className="overflow-x-auto"
        >
          <TabsList aria-label="Destination categories">
            {categoryTabs.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <DestinationCardGrid destinations={destinations} />
      </main>
    </PracticalTravelTemplate>
  );
}
