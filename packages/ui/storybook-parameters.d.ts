declare module "storybook/internal/csf" {
  interface Parameters {
    /** When true, preview applies a failing `/api/collection/search` handler after defaults. */
    collectionSearchLoadError?: boolean;
  }
}

export {};
