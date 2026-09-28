"use client";

import { Divider } from "../../atoms/divider/divider";
import { FeatherIcon } from "../../atoms/icon/icon";
import { Tag } from "../../atoms/tag/tag";
import { TextLink } from "../../atoms/text-link/text-link";
import { AvatarLabelled } from "../../molecules/avatar-labelled/avatar-labelled";
import forbiddenCitySrc from "../../templates/shared/practical-travel/assets/forbidden-city.jpg";
import { destinations } from "../../templates/shared/practical-travel/destinations-data";
import { PracticalTravelTemplate } from "../../templates/practical-travel/practical-travel-template";
import {
  DestinationCardGrid,
  PracticalTravelSubscribeSection,
} from "../../templates/shared/practical-travel/practical-travel";

export interface BlogArticlePageProps {
  /** Called with the entered email when the subscribe form is submitted. */
  onSubscribe?: (email: string) => void;
}

function destinationById(id: string) {
  const destination = destinations.find((item) => item.id === id);
  if (!destination) {
    throw new Error(`Destination "${id}" is missing from the data`);
  }
  return destination;
}

const article = destinationById("china");
const relatedDestinations = ["greece", "italy", "utah"].map(destinationById);

const articleTitle = "Marvels of China";
const articleDescription =
  "Discover the unique blend of ancient traditions and modern marvels that make China unforgettable.";

const tags = ["Asia", "Adventure", "Foodie"];

const shareLinks = [
  { label: "Facebook", href: "#facebook", icon: "facebook" },
  { label: "LinkedIn", href: "#linkedin", icon: "linkedin" },
  { label: "X", href: "#x", icon: "twitter" },
] as const;

interface ArticleSection {
  heading: string;
  paragraphs: string[];
}

const sections: ArticleSection[] = [
  {
    heading: "Overview",
    paragraphs: [
      "China, a land steeped in ancient history and brimming with modern marvels, offers a treasure trove of adventures for travellers. From bustling cities to serene landscapes, China promises a holiday filled with unforgettable experiences.",
      "Here’s your guide to some of the most adventurous and fascinating things to do while exploring this captivating country.",
    ],
  },
  {
    heading: "Hike the Great Wall of China",
    paragraphs: [
      "No visit to China is complete without a trek along the Great Wall. Spanning over 13,000 miles, this ancient structure offers breathtaking views and a glimpse into China’s rich history.",
      "For a more adventurous experience, head to the less crowded parts like Jinshanling or Simatai, where you can hike rugged paths and enjoy panoramic vistas.",
    ],
  },
  {
    heading: "Explore the Forbidden City",
    paragraphs: [
      "Step back in time with a visit to the Forbidden City in Beijing. This sprawling palace complex, once home to emperors, is a UNESCO World Heritage site filled with stunning architecture and artefacts. Wander through its vast courtyards and ornate halls, and imagine the grandeur of imperial China.",
    ],
  },
];

const closingSections: ArticleSection[] = [
  {
    heading: "Cruise the Yangtze River",
    paragraphs: [
      "Embark on a scenic cruise along the Yangtze River, the longest river in Asia. This journey takes you through some of China’s most picturesque landscapes, including the awe-inspiring Three Gorges. Along the way, you’ll have the opportunity to visit ancient temples, quaint villages, and dramatic cliffs.",
    ],
  },
  {
    heading: "Final thoughts",
    paragraphs: [
      "China’s diverse landscapes, rich history, and vibrant culture offer endless opportunities for adventure and exploration. Whether you’re hiking ancient trails, cruising through scenic rivers, or delving into the heart of bustling cities, China promises a holiday filled with fascinating experiences.",
      "Pack your bags and get ready to embark on an unforgettable journey through this enchanting country.",
    ],
  },
];

function ArticleBlock({ section }: { section: ArticleSection }) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-heading-2 font-semibold text-fg-strong">
        {section.heading}
      </h2>
      <div className="flex flex-col gap-4 text-small text-fg-weak md:text-heading-4 md:font-normal">
        {section.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}

export function BlogArticlePage({ onSubscribe }: BlogArticlePageProps) {
  return (
    <PracticalTravelTemplate
      activeHref="#destinations"
      subscribeSection={
        <PracticalTravelSubscribeSection
          onSubscribe={onSubscribe}
          className="bg-fill-inverse"
        />
      }
    >
      <article>
        <header className="flex flex-col items-center gap-8 px-8 pt-16 pb-12 md:px-[120px] md:pt-24 md:pb-16">
          <div className="flex w-full max-w-[790px] flex-col items-center gap-4 text-center">
            <p className="text-tiny font-semibold tracking-[2px] text-fg-weak uppercase">
              8 July 2025
            </p>
            <div className="flex flex-col gap-6">
              <h1 className="text-[36px] leading-[44px] font-semibold tracking-[-0.5px] text-fg-strong md:text-[56px] md:leading-[64px] md:tracking-[-1px]">
                {articleTitle}
              </h1>
              <p className="text-small text-fg-weak md:text-heading-4 md:font-normal">
                {articleDescription}
              </p>
            </div>
          </div>
          <AvatarLabelled
            name={article.author.name}
            description={article.readTime}
            src={article.author.src}
            size="medium"
          />
        </header>

        <div className="px-8 md:px-[120px]">
          <img
            src={article.imageSrc}
            alt=""
            className="h-[360px] w-full rounded-3xl object-cover md:h-[600px]"
          />
        </div>

        <div className="mx-auto flex w-full max-w-[790px] flex-col gap-12 px-8 py-16 md:px-0 md:py-24">
          {sections.map((section) => (
            <ArticleBlock key={section.heading} section={section} />
          ))}
          <img
            src={forbiddenCitySrc}
            alt=""
            className="h-[360px] w-full rounded-3xl object-cover md:h-[526px]"
          />
          {closingSections.map((section) => (
            <ArticleBlock key={section.heading} section={section} />
          ))}

          <Divider />

          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div className="flex flex-col gap-4">
              <p className="text-tiny font-semibold tracking-[2px] text-fg-weak uppercase">
                Tagged in
              </p>
              <ul className="flex list-none flex-wrap gap-1 p-0">
                {tags.map((tag) => (
                  <li key={tag}>
                    <Tag>{tag}</Tag>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-4 md:items-end">
              <p className="text-tiny font-semibold tracking-[2px] text-fg-weak uppercase">
                Share
              </p>
              <ul className="flex list-none gap-6 p-0">
                {shareLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      aria-label={link.label}
                      className="inline-grid size-6 place-items-center text-icon-neutral outline-none hover:text-fg-strong focus-visible:rounded-sm focus-visible:ring-2 focus-visible:ring-stroke-focus focus-visible:ring-offset-2"
                    >
                      <FeatherIcon name={link.icon} size={24} />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </article>

      <section
        aria-labelledby="related-heading"
        className="flex flex-col gap-8 border-t border-stroke-weak bg-fill-weaker px-8 py-16 md:px-[120px] md:py-24"
      >
        <h2
          id="related-heading"
          className="text-heading-2 font-semibold text-fg-strong"
        >
          You might also like
        </h2>
        <DestinationCardGrid destinations={relatedDestinations} />
        <div>
          <TextLink
            href="#all-destinations"
            size="small"
            tone="neutral-weak"
            iconRight={<FeatherIcon name="arrow-right" size={20} />}
          >
            View all destinations
          </TextLink>
        </div>
      </section>
    </PracticalTravelTemplate>
  );
}
