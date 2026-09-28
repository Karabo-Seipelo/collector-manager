"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Input } from "../../atoms/input/input";
import { TextLink } from "../../atoms/text-link/text-link";
import { cn } from "../../lib/cn";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import { AvatarStack } from "../../molecules/avatar-stack/avatar-stack";
import {
  Card,
  CardContent,
  CardHeader,
  CardImage,
} from "../../molecules/card/card";
import { Rating } from "../../molecules/rating/rating";
import { SearchInput } from "../../molecules/search-input/search-input";
import { Footer } from "../../organisms/footer/footer";
import { Hero } from "../../organisms/hero/hero";
import {
  NavigationHeader,
  NavigationHeaderBar,
  NavigationHeaderItem,
  NavigationHeaderLeft,
  NavigationHeaderLogo,
  NavigationHeaderMobileDrawer,
  NavigationHeaderMobileHeader,
  NavigationHeaderMobileItem,
  NavigationHeaderMobileNav,
  NavigationHeaderMobileSearch,
  NavigationHeaderNav,
  NavigationHeaderRight,
  NavigationHeaderSearch,
} from "../../organisms/navigation-header/navigation-header";
import heroSrc from "./assets/hero.jpg";
import { destinations, travellers } from "./blog-data";

export interface BlogTemplateProps {
  /** Called with the entered email when either subscribe form is submitted. */
  onSubscribe?: (email: string) => void;
}

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#destinations", label: "Destinations" },
  { href: "#tours", label: "Tours" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
  { label: "Terms", href: "#terms" },
  { label: "Privacy", href: "#privacy" },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "#instagram",
    icon: <FeatherIcon name="instagram" size={24} />,
  },
  {
    label: "Facebook",
    href: "#facebook",
    icon: <FeatherIcon name="facebook" size={24} />,
  },
  {
    label: "LinkedIn",
    href: "#linkedin",
    icon: <FeatherIcon name="linkedin" size={24} />,
  },
  { label: "X", href: "#x", icon: <FeatherIcon name="twitter" size={24} /> },
  {
    label: "YouTube",
    href: "#youtube",
    icon: <FeatherIcon name="youtube" size={24} />,
  },
];

const heroTitle = "Never stop exploring";
const heroDescription =
  "Get top travel tips weekly from real travellers around the world";
const destinationsTitle = "Top destinations";
const destinationsDescription =
  "Discover the most captivating travel destinations around the globe and get inspired for your next adventure.";
const ctaTitle = "Subscribe today";

function PracticalTravelLogo() {
  return (
    <span
      aria-label="Practical Travel"
      className="flex h-12 items-center text-[30px] leading-7 tracking-[-0.3px] text-fg-strong"
    >
      <span className="font-semibold">practical</span>
      <span className="font-light text-fg-weak">travel</span>
    </span>
  );
}

function BlogNavigation() {
  const [open, setOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState("#home");

  return (
    <NavigationHeader open={open} onOpenChange={setOpen}>
      <NavigationHeaderBar className="md:px-[120px]">
        <NavigationHeaderLeft>
          <NavigationHeaderLogo>
            <PracticalTravelLogo />
          </NavigationHeaderLogo>
          <NavigationHeaderNav>
            {navItems.map((item) => (
              <NavigationHeaderItem
                key={item.href}
                href={item.href}
                selected={activeHref === item.href}
                onClick={() => setActiveHref(item.href)}
              >
                {item.label}
              </NavigationHeaderItem>
            ))}
          </NavigationHeaderNav>
        </NavigationHeaderLeft>
        <NavigationHeaderRight>
          <NavigationHeaderSearch>
            <SearchInput aria-label="Search" size="small" />
          </NavigationHeaderSearch>
        </NavigationHeaderRight>
      </NavigationHeaderBar>
      <NavigationHeaderMobileDrawer>
        <NavigationHeaderMobileHeader />
        <NavigationHeaderMobileSearch>
          <SearchInput aria-label="Search" />
        </NavigationHeaderMobileSearch>
        <NavigationHeaderMobileNav>
          {navItems.map((item) => (
            <NavigationHeaderMobileItem
              key={item.href}
              href={item.href}
              selected={activeHref === item.href}
              onClick={() => setActiveHref(item.href)}
            >
              {item.label}
            </NavigationHeaderMobileItem>
          ))}
        </NavigationHeaderMobileNav>
      </NavigationHeaderMobileDrawer>
    </NavigationHeader>
  );
}

function SubscribeForm({
  id,
  onSubscribe,
  className,
}: {
  id: string;
  onSubscribe?: (email: string) => void;
  className?: string;
}) {
  const [email, setEmail] = React.useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubscribe?.(email);
  }

  return (
    <form
      className={cn(
        "flex w-full flex-col gap-4 md:w-auto md:flex-row md:items-start",
        className,
      )}
      onSubmit={handleSubmit}
    >
      <Input
        id={id}
        type="email"
        name="email"
        autoComplete="email"
        placeholder="Email"
        aria-label="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        className="w-full md:w-[300px] md:max-w-[300px]"
      />
      <Button type="submit" tone="neutral" fullWidth className="md:w-auto">
        Subscribe
      </Button>
    </form>
  );
}

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

function DestinationCard({
  destination,
}: {
  destination: (typeof destinations)[number];
}) {
  return (
    <Card>
      <CardImage>
        <img src={destination.imageSrc} alt="" />
      </CardImage>
      <CardContent>
        <CardHeader
          heading={destination.title}
          headingLevel={3}
          description={destination.description}
        />
        <AvatarLabelled
          name={destination.author.name}
          description={destination.readTime}
          src={destination.author.src}
          size="medium"
        />
      </CardContent>
    </Card>
  );
}

export function BlogTemplate({ onSubscribe }: BlogTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse">
      <BlogNavigation />

      <Hero
        layout="vertical"
        className="border-b-0 bg-fill-inverse"
        title={heroTitle}
        description={heroDescription}
        emailSignup={
          <SubscribeForm id="hero-email" onSubscribe={onSubscribe} />
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
        <ul className="grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <li key={destination.id} className="flex">
              <DestinationCard destination={destination} />
            </li>
          ))}
        </ul>
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

      <section
        aria-labelledby="subscribe-heading"
        className="flex flex-col gap-12 border-t border-stroke-weak bg-fill-weaker px-8 py-16 md:px-[120px] md:py-24 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex max-w-[600px] flex-col gap-4">
          <h2
            id="subscribe-heading"
            className="text-heading-2 font-semibold text-fg-strong"
          >
            {ctaTitle}
          </h2>
          <p className="text-small text-fg-weak md:text-heading-4 md:font-normal">
            {heroDescription}
          </p>
        </div>
        <SubscribeForm
          id="cta-email"
          onSubscribe={onSubscribe}
          className="shrink-0"
        />
      </section>

      <Footer
        logo={<PracticalTravelLogo />}
        copyright="© 2024 Practical Travel"
        navLinks={footerLinks}
        socialLinks={socialLinks}
      />
    </div>
  );
}
