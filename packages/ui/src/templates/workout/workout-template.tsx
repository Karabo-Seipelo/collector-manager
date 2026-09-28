"use client";

import * as React from "react";

import { Button } from "../../atoms/button/button";
import { ButtonIcon } from "../../atoms/button-icon/button-icon";
import { FeatherIcon } from "../../atoms/icon/icon";
import { TextLink } from "../../atoms/text-link/text-link";
import { Breadcrumbs } from "../../molecules/breadcrumbs/breadcrumbs";
import {
  Card,
  CardContent,
  CardHeader,
  CardImage,
} from "../../molecules/card/card";
import { Rating } from "../../molecules/rating/rating";
import { SearchInput } from "../../molecules/search-input/search-input";
import { Footer } from "../../organisms/footer/footer";
import {
  NavigationHeader,
  NavigationHeaderActions,
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
} from "../../organisms/navigation-header/navigation-header";
import clockIcon from "./assets/clock.svg";
import coreSrc from "./assets/core.jpg";
import dumbbellIcon from "./assets/dumbbell.svg";
import eveningSrc from "./assets/evening.jpg";
import flexibilitySrc from "./assets/flexibility.jpg";
import gaugeIcon from "./assets/gauge.svg";
import heroSrc from "./assets/hero.jpg";
import musicIcon from "./assets/music.svg";
import symbolSrc from "./assets/symbol.svg";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Workouts", href: "#workouts" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const headerActions = [
  { label: "Search", icon: "search" },
  { label: "Saved workouts", icon: "bookmark" },
  { label: "Account", icon: "user" },
] as const;

const breadcrumbs = [
  { label: "Home", href: "#home" },
  { label: "Workouts", href: "#workouts" },
  { label: "Yoga", href: "#yoga" },
];

const description =
  "Start your day with a balanced blend of mindful breathing techniques and invigorating postures. This morning yoga session will refresh your mind and body, helping you escape everyday stresses. By focusing on your breath, you'll create a strong foundation, ensuring you're mentally and physically prepared for the day ahead.";

const stats = [
  { label: "20 mins", icon: clockIcon },
  { label: "Beginner", icon: gaugeIcon },
  { label: "Ambient", icon: musicIcon },
  { label: "None", icon: dumbbellIcon },
];

const similarWorkouts = [
  {
    id: "flexibility",
    name: "Flexibility booster",
    description:
      "Deep stretches and progressive poses to leave you feeling limber and relaxed",
    duration: "40 mins",
    level: "Advanced",
    imageSrc: flexibilitySrc,
  },
  {
    id: "core",
    name: "Core strength flow",
    description:
      "Dynamic poses and targeted exercises to enhance balance and improve posture",
    duration: "20 mins",
    level: "Beginner",
    imageSrc: coreSrc,
  },
  {
    id: "evening",
    name: "Evening unwind",
    description:
      "Slow stretches and relaxation techniques to release stress and promote sleep",
    duration: "30 mins",
    level: "Intermediate",
    imageSrc: eveningSrc,
  },
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

export interface WorkoutTemplateProps {
  onStartWorkout?: () => void;
  onShare?: () => void;
  onSave?: () => void;
}

function PracticalPumpLogo() {
  return (
    <span
      aria-label="Practical Pump"
      className="flex h-12 items-center gap-2 text-fg-strong"
    >
      <img src={symbolSrc} alt="" width={32} height={32} className="size-8" />
      <span className="pb-0.5 text-[28px] leading-7 tracking-[-0.28px]">
        <span className="font-semibold">Practical</span>
        <span className="font-light">Pump</span>
      </span>
    </span>
  );
}

function PumpNavigation() {
  const [open, setOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState("#workouts");

  return (
    <NavigationHeader open={open} onOpenChange={setOpen}>
      <NavigationHeaderBar className="md:px-[120px]">
        <NavigationHeaderLeft>
          <NavigationHeaderLogo>
            <PracticalPumpLogo />
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
          <NavigationHeaderActions>
            {headerActions.map((action) => (
              <ButtonIcon
                key={action.label}
                aria-label={action.label}
                icon={<FeatherIcon name={action.icon} size={24} />}
                variant="tertiary"
                tone="neutral"
              />
            ))}
          </NavigationHeaderActions>
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

function WorkoutHero({
  onShare,
  onSave,
}: Pick<WorkoutTemplateProps, "onShare" | "onSave">) {
  return (
    <div className="relative md:size-[584px] md:shrink-0">
      <img
        src={heroSrc}
        alt="Woman practising a breathing exercise with her eyes closed"
        className="aspect-[428/426] w-full object-cover object-center md:aspect-square md:rounded-2xl md:object-bottom"
      />
      <div className="absolute top-8 left-8 md:hidden">
        <ButtonIcon
          aria-label="Back"
          icon={<FeatherIcon name="arrow-left" size={24} />}
          variant="secondary"
          tone="neutral"
          shape="circle"
          className="bg-fill-inverse"
        />
      </div>
      <div className="absolute top-8 right-8 flex gap-3 md:hidden">
        <ButtonIcon
          aria-label="Share"
          icon={<FeatherIcon name="share" size={24} />}
          variant="secondary"
          tone="neutral"
          shape="circle"
          className="bg-fill-inverse"
          onClick={onShare}
        />
        <ButtonIcon
          aria-label="Save"
          icon={<FeatherIcon name="bookmark" size={24} />}
          variant="secondary"
          tone="neutral"
          shape="circle"
          className="bg-fill-inverse"
          onClick={onSave}
        />
      </div>
    </div>
  );
}

function WorkoutDetails({
  onStartWorkout,
  onShare,
  onSave,
}: WorkoutTemplateProps) {
  return (
    <div className="flex flex-col gap-4 px-8 pt-8 pb-28 md:gap-8 md:px-0 md:pt-0 md:pb-0">
      <div className="flex flex-col gap-4 md:gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-[36px] leading-[44px] font-semibold tracking-[-0.5px] text-fg-strong md:text-heading-1 md:leading-[48px]">
            Morning energiser
          </h1>
          <p className="text-small text-fg-weak md:text-heading-4">
            With Brooklyn Sims
          </p>
        </div>

        <div className="flex items-center gap-6">
          <Rating
            value={5}
            layout="horizontal"
            reviewCount={23}
            className="md:hidden"
          />
          <Rating
            value={5}
            layout="vertical"
            reviewCount={23}
            className="hidden md:flex"
          />
          <TextLink
            href="#share"
            size="small"
            tone="neutral-weak"
            underline={false}
            iconLeft={<FeatherIcon name="share" size={20} />}
            className="ml-auto hidden md:inline-flex"
            onClick={(event) => {
              event.preventDefault();
              onShare?.();
            }}
          >
            Share
          </TextLink>
          <TextLink
            href="#save"
            size="small"
            tone="neutral-weak"
            underline={false}
            iconLeft={<FeatherIcon name="bookmark" size={20} />}
            className="hidden md:inline-flex"
            onClick={(event) => {
              event.preventDefault();
              onSave?.();
            }}
          >
            Save
          </TextLink>
        </div>

        <ul className="flex list-none justify-between border-y border-stroke-weak px-4 py-6">
          {stats.map((stat) => (
            <li key={stat.label} className="flex flex-col items-center gap-1">
              <img
                src={stat.icon}
                alt=""
                width={32}
                height={32}
                className="size-8"
              />
              <span className="text-tiny text-fg-weak">{stat.label}</span>
            </li>
          ))}
        </ul>

        <p className="text-small text-fg-weak">{description}</p>
      </div>

      <Button
        size="large"
        tone="neutral"
        className="hidden md:inline-flex"
        onClick={onStartWorkout}
      >
        Start workout
      </Button>
    </div>
  );
}

function SimilarWorkouts() {
  return (
    <section
      aria-labelledby="similar-workouts-heading"
      className="hidden flex-col gap-8 border-t border-stroke-weak bg-fill-weaker px-[120px] py-24 md:flex"
    >
      <h2
        id="similar-workouts-heading"
        className="text-heading-2 font-semibold text-fg-strong"
      >
        Similar workouts
      </h2>
      <ul className="grid list-none grid-cols-3 gap-8 p-0">
        {similarWorkouts.map((workout) => (
          <li key={workout.id}>
            <Card>
              <CardImage>
                <img src={workout.imageSrc} alt="" className="object-bottom" />
              </CardImage>
              <CardContent>
                <CardHeader
                  heading={workout.name}
                  description={
                    <>
                      <p className="mb-6">{workout.description}</p>
                      <p>
                        {workout.duration}
                        {"  |  "}
                        {workout.level}
                      </p>
                    </>
                  }
                />
              </CardContent>
            </Card>
          </li>
        ))}
      </ul>
      <TextLink
        href="#workouts"
        size="small"
        tone="neutral-weak"
        iconRight={<FeatherIcon name="arrow-right" size={20} />}
      >
        View all workouts
      </TextLink>
    </section>
  );
}

export function WorkoutTemplate({
  onStartWorkout,
  onShare,
  onSave,
}: WorkoutTemplateProps) {
  return (
    <div className="flex min-h-svh flex-col bg-fill-inverse">
      <div className="hidden md:block">
        <PumpNavigation />
      </div>

      <main className="flex flex-1 flex-col md:grid md:grid-cols-[minmax(0,1fr)_584px] md:items-center md:gap-x-16 md:gap-y-8 md:px-[120px] md:pt-8 md:pb-16">
        <div className="hidden md:col-span-2 md:block">
          <Breadcrumbs items={breadcrumbs} />
        </div>
        <div className="md:col-start-2 md:row-start-2">
          <WorkoutHero onShare={onShare} onSave={onSave} />
        </div>
        <div className="md:col-start-1 md:row-start-2">
          <WorkoutDetails
            onStartWorkout={onStartWorkout}
            onShare={onShare}
            onSave={onSave}
          />
        </div>
      </main>

      <SimilarWorkouts />

      <Footer
        className="hidden md:block"
        logo={<PracticalPumpLogo />}
        copyright="© 2024 Practical Shop"
        navLinks={footerLinks}
        socialLinks={socialLinks}
      />

      <div className="fixed inset-x-0 bottom-0 border-t border-stroke-weak bg-fill-inverse px-8 py-6 md:hidden">
        <Button fullWidth size="large" tone="neutral" onClick={onStartWorkout}>
          Start workout
        </Button>
      </div>
    </div>
  );
}
