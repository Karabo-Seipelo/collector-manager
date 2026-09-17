import path from "node:path";
import { fileURLToPath } from "node:url";

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: dirname,
  plugins: [react(), tailwindcss()],
  test: {
    name: "unit",
    environment: "jsdom",
    setupFiles: [path.join(dirname, "vitest.setup.ts")],
    include: [path.join(dirname, "src/**/*.test.{ts,tsx}")],
  },
});
