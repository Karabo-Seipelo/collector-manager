import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: ["storybook-static/**", "dist/**", "public/mockServiceWorker.js"],
  },
  {
    files: ["src/atoms/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/molecules/**", "**/organisms/**", "**/pages/**"],
              message:
                "Atoms must not import from molecules, organisms, or pages. Compose upward only.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/molecules/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/organisms/**", "**/pages/**"],
              message:
                "Molecules must not import from organisms or pages. Use atoms or lib instead.",
            },
            {
              group: ["**/molecules/**"],
              message:
                "Molecules must not import other molecules. Extract shared parts to atoms or compose at the organism layer.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/organisms/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/pages/**"],
              message:
                "Organisms must not import from pages. Compose upward only.",
            },
          ],
        },
      ],
    },
  },
  {
    files: ["src/templates/**/*.{ts,tsx}"],
    ignores: ["**/*.stories.tsx", "**/*.test.tsx"],
    rules: {
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["**/pages/**"],
              message:
                "Templates must not import from pages. Pages fill template slots.",
            },
          ],
        },
      ],
    },
  },
];
