import type { Preview } from "@storybook/react-vite";
import { mswLoader } from "msw-storybook-addon/csf3";

import { collectionHandlers } from "../src/mocks/handlers/collection";
import "../src/styles.css";

const preview: Preview = {
  tags: ["autodocs"],
  loaders: [mswLoader()],
  beforeEach({ msw, parameters }) {
    msw.use(...collectionHandlers);
    const storyHandlers = parameters.msw?.handlers;
    if (storyHandlers) {
      msw.use(...(Array.isArray(storyHandlers) ? storyHandlers : [storyHandlers]));
    }
  },
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;
