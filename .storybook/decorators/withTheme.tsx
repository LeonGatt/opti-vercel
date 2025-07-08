import React, { useEffect } from "react";

export const withTheme = (Story, context) => {
  const theme = context.globals.theme || "light";

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);
    root.style.colorScheme = theme;

    // Also apply to the iframe in case it's used
    const iframe = document.querySelector("iframe");
    if (iframe?.contentDocument?.documentElement) {
      iframe.contentDocument.documentElement.setAttribute("data-theme", theme);
      iframe.contentDocument.documentElement.style.colorScheme = theme;
    }
  }, [theme]);

  return <Story {...context} />;
};
