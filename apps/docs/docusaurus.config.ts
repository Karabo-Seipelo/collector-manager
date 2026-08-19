import { themes as prismThemes } from "prism-react-renderer";
import type { Config } from "@docusaurus/types";
import type * as Preset from "@docusaurus/preset-classic";

const config: Config = {
  title: "Collection Manager",
  tagline: "Documentation for the collection-manager monorepo",
  favicon: "img/logo.svg",
  future: {
    v4: true,
  },
  url: "https://example.com",
  baseUrl: "/",
  organizationName: "collection-manager",
  projectName: "collection-manager",
  onBrokenLinks: "throw",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          routeBasePath: "docs",
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],
  themeConfig: {
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Collection Manager",
      logo: {
        alt: "Collection Manager logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docsSidebar",
          position: "left",
          label: "Docs",
        },
        {
          href: "http://localhost:6006",
          label: "Storybook",
          position: "right",
        },
        {
          href: "http://localhost:3000",
          label: "Web App",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Introduction",
              to: "/docs/intro",
            },
            {
              label: "Getting Started",
              to: "/docs/getting-started",
            },
          ],
        },
        {
          title: "Development",
          items: [
            {
              label: "Storybook",
              href: "http://localhost:6006",
            },
            {
              label: "Web App",
              href: "http://localhost:3000",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Collection Manager. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
