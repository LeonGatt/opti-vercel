import type { Preview } from "@storybook/nextjs-vite";
import React from "react";

import { withProviders } from "./decorators/withProviders";
import { withTheme } from "./decorators/withTheme";
import "../src/app/(frontend)/[[...slugs]]/globals.css";

export const globalTypes = {
  theme: {
    name: "Theme",
    description: "Theme selector",
    defaultValue: "dark",
    toolbar: {
      items: [
        { value: "light", title: "Light", icon: "sun" },
        { value: "dark", title: "Dark", icon: "moon" },
      ],
      showName: true,
    },
  },
};

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      test: "todo",
    },
  },
  decorators: [withProviders, withTheme],
};

export default preview;
