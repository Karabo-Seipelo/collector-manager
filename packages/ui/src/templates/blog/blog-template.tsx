"use client";

import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import { AvatarStack } from "../../molecules/avatar-stack/avatar-stack";
import { Rating } from "../../molecules/rating/rating";
import { Hero } from "../../organisms/hero/hero";
import heroSrc from "../shared/practical-travel/assets/hero.jpg";
import {
  destinations,
  travellers,
} from "../shared/practical-travel/destinations-data";
import {
  DestinationCardGrid,
  PracticalTravelFooter,
  PracticalTravelNavigation,
  PracticalTravelSubscribeForm,
  PracticalTravelSubscribeSection,
  practicalTravelSubscribeDescription,
} from "../shared/practical-travel/practical-travel";

export interface BlogTemplateProps {
  /** Called with the entered email when either subscribe form is submitted. */
  onSubscribe?: (email: string) => void;
}

const heroTitle = "Never stop exploring";
const destinationsTitle = "Top destinations";
const destinationsDescription =
  "Discover the most captivating travel destinations around the globe and get inspired for your next adventure.";

function HeroSocialProof() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <AvatarStack
        people={travellers}
        max={5}
        className="[&>span:nth-child(n+4)]:max-md:hidden"
      />
      <Rating
        value={5}
        layout="vertical"
        reviewCount={223}
        reviewsNoun="travellers"
        reviewsHref="#reviews"
      />
    </div>
  );
}

export function BlogTemplate({ onSubscribe }: BlogTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse">
      <PracticalTravelNavigation activeHref="#home" />

      <Hero
        layout="vertical"
        className="border-b-0 bg-fill-inverse"
        title={heroTitle}
        description={practicalTravelSubscribeDescription}
        emailSignup={
          <PracticalTravelSubscribeForm
            id="hero-email"
            onSubscribe={onSubscribe}
          />
        }
        socialProof={<HeroSocialProof />}
        media={<img src={heroSrc} alt="" />}
      />

      <section
        id="destinations"
        aria-labelledby="top-destinations-heading"
        className="flex flex-col gap-12 px-8 py-16 md:px-[120px] md:py-24"
      >
        <div className="flex flex-col gap-4">
          <h2
            id="top-destinations-heading"
            className="text-heading-2 font-semibold text-fg-strong"
          >
            {destinationsTitle}
          </h2>
          <p className="max-w-[600px] text-small text-fg-weak md:text-heading-4 md:font-normal">
            {destinationsDescription}
          </p>
        </div>
        <DestinationCardGrid destinations={destinations} />
        <div>
          <TextLink
            href="#all-destinations"
            size="small"
            tone="neutral-weak"
            underline={false}
            iconRight={<FeatherIcon name="arrow-right" size={20} />}
          >
            View all destinations
          </TextLink>
        </div>
      </section>

      <PracticalTravelSubscribeSection onSubscribe={onSubscribe} />
      <PracticalTravelFooter />
    </div>
  );
}
