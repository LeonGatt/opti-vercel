import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { Decorator } from "@storybook/react";
import React from "react";

import { HeaderThemeProvider } from "../../src/providers/HeaderTheme";
import { ThemeProvider } from "../../src/providers/Theme";

const queryClient = new QueryClient();

export const withProviders: Decorator = (Story) => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <HeaderThemeProvider>
        <Story />
      </HeaderThemeProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
