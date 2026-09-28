/// <reference types="vitest/globals" />
/// <reference types="@testing-library/jest-dom/vitest" />

declare module "*.png" {
  const src: string;
  export default src;
}
