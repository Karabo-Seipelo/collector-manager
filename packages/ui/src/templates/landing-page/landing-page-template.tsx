"use client";

import type { ReactNode } from "react";

import { Button } from "../../atoms/button/button";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Tag } from "../../atoms/tag/tag";
import { IconContainer } from "../../atoms/icon-container/icon-container";
import { TextLink } from "../../atoms/text-link/text-link";
import { Accordion, AccordionItem } from "../../molecules/accordion/accordion";
import { AvatarStack } from "../../molecules/avatar-stack/avatar-stack";
import { ButtonGroup } from "../../molecules/button-group/button-group";
import { Card, CardContent, CardHeader, CardImage } from "../../molecules/card/card";
import { Rating } from "../../molecules/rating/rating";
import { Hero } from "../../organisms/hero/hero";
import { Testimonial } from "../../organisms/testimonial/testimonial";
import { templatePhotoSrc } from "../shared/mock-photo";
import { LandingPageFooter } from "./landing-page-footer";
import { LandingPageNavigation } from "./landing-page-navigation";

const primaryHeroImageUrl =
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1200&h=800&fit=crop";

const primaryHeroTitle = "Investing made easy for everyone";
const primaryHeroDescription =
  "Start investing in minutes with as little or as much as you like. It's simple and affordable.";

const featureHeroImageUrl =
  "https://images.unsplash.com/photo-1556745750-682ef8718459?w=1200&h=800&fit=crop";

const featureHeroTitle = "Everything you need to start investing in your future";
const featureHeroDescription =
  "Track and manage all your investments in one place with intuitive tools, detailed analytics, and personalized insights to optimize your portfolio.";

const avatarPeople = [
  { name: "Ada Lovelace", src: templatePhotoSrc },
  { name: "Alan Turing", src: templatePhotoSrc },
  { name: "Grace Hopper", src: templatePhotoSrc },
  { name: "Katherine Johnson", src: templatePhotoSrc },
  { name: "Donald Knuth", src: templatePhotoSrc },
];

const testimonialQuote =
  "Such a useful and practical book by one of the best in the game. Love this logic-driven approach to UI design.";

const ctaSectionTitle = "Get started for free";
const ctaSectionDescription =
  "Start investing in minutes with as little or as much as you like. It's simple and affordable.";

const faqSectionTitle = "Frequently asked questions";
const faqSectionDescription =
  "Find answers to the most common questions about our application.";

const faqItems = [
  {
    id: "get-started",
    question: "How do I get started with the app?",
    answer:
      "Download the app, create an account, and complete the short onboarding flow. You can link a bank account and make your first investment in a few minutes.",
  },
  {
    id: "investment-types",
    question: "What types of investments can I make?",
    answer:
      "You can invest in stocks, ETFs, and other supported assets depending on your region. The explore tab shows what is available for your account.",
  },
  {
    id: "security",
    question: "Is my personal and financial information secure?",
    answer:
      "We use industry-standard encryption, secure authentication, and regulated custodians where required. Your data is never sold to third parties.",
  },
  {
    id: "withdraw",
    question: "How do I withdraw funds from my account?",
    answer:
      "Open Settings → Transfers, choose Withdraw, and select the linked account. Most withdrawals arrive within a few business days.",
  },
  {
    id: "fees",
    question: "What fees are associated with using the app?",
    answer:
      "Pricing is transparent in the app before you trade. Any platform, regulatory, or fund fees are shown on the order confirmation screen.",
  },
  {
    id: "advice",
    question: "Can I get personalized investment advice?",
    answer:
      "The app offers educational content and portfolio insights. It does not replace advice from a licensed financial adviser where that is required.",
  },
  {
    id: "performance",
    question: "How do I track the performance of my investments?",
    answer:
      "Your dashboard shows holdings, returns, and history over time. You can filter by account, asset, and date range.",
  },
  {
    id: "help",
    question: "What if I need help with the app?",
    answer:
      "Use in-app chat or email support from the Help section. Our team is available seven days a week for account and technical questions.",
  },
] as const;

const guideSectionTitle = "Learn as you go";
const guideSectionDescription =
  "Dive into our helpful guides to explore a wealth of knowledge, valuable insights, and investment tips.";

const guideCards = [
  {
    title: "Understanding and adapting to market trends",
    description:
      "Learn how to analyze and interpret market trends to make informed investment decisions.",
    imageUrl:
      "https://images.unsplash.com/photo-1611162616475-9b8e8ee70eb9?w=800&h=600&fit=crop",
    tags: ["Basic", "Article"],
  },
  {
    title: "Diversifying your investment portfolio",
    description:
      "Discover the benefits of diversification and how to build a balanced portfolio that mitigates risks.",
    imageUrl:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=600&fit=crop",
    tags: ["Basic", "Tutorial"],
  },
  {
    title: "Mastering investment psychology",
    description:
      "Explore the psychological aspects of investing and learn how to overcome common biases and emotions.",
    imageUrl:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",
    tags: ["Intermediate", "Video"],
  },
] as const;

function Section({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`px-4 py-16 md:px-[120px] md:py-24 ${className}`.trim()}
    >
      {children}
    </section>
  );
}

function SectionHeading({
  title,
  description,
  className = "",
  descriptionClassName = "mt-4 text-small text-fg-weak",
}: {
  title: string;
  description: string;
  className?: string;
  descriptionClassName?: string;
}) {
  return (
    <div className={`max-w-[600px] ${className}`.trim()}>
      <h2 className="text-heading-2 font-semibold text-fg-strong">{title}</h2>
      <p className={descriptionClassName}>{description}</p>
    </div>
  );
}

function HeroMedia({ src }: { src: string }) {
  return (
    <img src={src} alt="" className="block h-full w-full object-cover" />
  );
}

function PrimaryHeroActions() {
  return (
    <ButtonGroup layout="responsive" size="large" aria-label="Hero actions">
      <Button>Sign up</Button>
      <Button variant="secondary">Book a demo</Button>
    </ButtonGroup>
  );
}

function LandingCtaActions() {
  return (
    <ButtonGroup aria-label="Call to action" layout="responsive" size="large">
      <Button variant="secondary">Book a demo</Button>
      <Button>Sign up</Button>
    </ButtonGroup>
  );
}

function FeatureHeroActions() {
  return (
    <Button variant="secondary" size="medium">
      All features
    </Button>
  );
}

function PrimaryHeroSocialProof() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <AvatarStack people={avatarPeople} max={5} />
      <Rating
        value={5}
        reviewCount={223}
        reviewsHref="#reviews"
        layout="vertical"
      />
    </div>
  );
}

export function LandingPageTemplate() {
  return (
    <div className="flex min-h-svh flex-col bg-fill-weaker">
      <LandingPageNavigation />

      <Hero
        layout="horizontal-padded"
        title={primaryHeroTitle}
        description={primaryHeroDescription}
        media={<HeroMedia src={primaryHeroImageUrl} />}
        actions={<PrimaryHeroActions />}
        socialProof={<PrimaryHeroSocialProof />}
      />

      <Section>
        <div className="mx-auto grid max-w-[1200px] gap-12 md:grid-cols-3 md:gap-8">
          {["Heading", "Heading", "Heading"].map((heading, index) => (
            <div key={heading + index} className="flex flex-col gap-4">
              <IconContainer
                tone="brand"
                icon={<FeatherIcon name="layers" size={24} />}
              />
              <h3 className="text-heading-4 font-semibold text-fg-strong">{heading}</h3>
              <p className="text-small text-fg-weak">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus
                blandit euismod.
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Hero
        layout="horizontal-compact"
        title={featureHeroTitle}
        description={featureHeroDescription}
        media={<HeroMedia src={featureHeroImageUrl} />}
        actions={<FeatureHeroActions />}
      />

      <Section id="features">
        <SectionHeading
          title="Heading"
          description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam finibus blandit euismod. Pellentesque et blandit nunc."
        />
        <div className="mx-auto mt-12 grid max-w-[1200px] gap-8 md:grid-cols-3 md:gap-8">
          {Array.from({ length: 3 }, (_, index) => (
            <Testimonial
              key={index}
              quote={testimonialQuote}
              author={{
                name: "John Smith",
                description: "john@practical-ui.com",
                src: templatePhotoSrc,
              }}
              rating={3.5}
            />
          ))}
        </div>
        <TextLink
          href="#testimonials"
          size="small"
          weight="bold"
          iconRight={<FeatherIcon name="arrow-right" size={20} />}
          className="mt-12"
        >
          View all testimonials
        </TextLink>
      </Section>

      <Section
        id="guides"
        className="border-t border-stroke-weak bg-fill-weaker"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
          <SectionHeading
            title={guideSectionTitle}
            description={guideSectionDescription}
            descriptionClassName="mt-4 text-heading-4 font-normal leading-7 text-fg-weak"
          />
          <div className="grid gap-8 md:grid-cols-3">
            {guideCards.map((guide) => (
              <Card key={guide.title}>
                <CardImage>
                  <img src={guide.imageUrl} alt="" />
                </CardImage>
                <CardContent>
                  <CardHeader heading={guide.title} description={guide.description} />
                  <div className="flex flex-wrap gap-1">
                    {guide.tags.map((tag) => (
                      <Tag key={tag} size="small">
                        {tag}
                      </Tag>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <TextLink
            href="#guides"
            size="small"
            iconRight={<FeatherIcon name="arrow-right" size={20} />}
          >
            View all guides
          </TextLink>
        </div>
      </Section>

      <Section id="faq" className="flex justify-center border-t border-stroke-weak">
        <div className="flex w-full max-w-[790px] flex-col gap-12">
          <SectionHeading
            title={faqSectionTitle}
            description={faqSectionDescription}
            descriptionClassName="mt-4 text-heading-4 font-normal leading-7 text-fg-weak"
          />
          <Accordion headingLevel={3} className="border-b border-stroke-weak">
            {faqItems.map((item) => (
              <AccordionItem key={item.id} value={item.id} heading={item.question}>
                {item.answer}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </Section>

      <Section
        id="cta"
        className="border-t border-stroke-weak bg-fill-weaker"
      >
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <SectionHeading
            title={ctaSectionTitle}
            description={ctaSectionDescription}
            descriptionClassName="mt-4 text-heading-4 font-normal leading-7 text-fg-weak"
            className="md:max-w-[600px]"
          />
          <LandingCtaActions />
        </div>
      </Section>

      <LandingPageFooter />
    </div>
  );
}
