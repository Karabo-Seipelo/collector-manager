import { config } from "@repo/eslint-config/react-internal";

/** @type {import("eslint").Linter.Config[]} */
export default [
  ...config,
  {
    ignores: ["storybook-static/**", "dist/**"],
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
              group: ["**/molecules/**", "**/organisms/**"],
              message:
                "Atoms must not import from molecules or organisms. Compose upward only.",
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
              group: ["**/organisms/**"],
              message:
                "Molecules must not import from organisms. Use atoms or lib instead.",
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
];
