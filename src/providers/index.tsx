import React from "react";

import { ClientProviders } from "./ClientProviders";
import { ServerProviders } from "./ServerProviders";
import type { Locale } from "@/localization.config";

export const Providers: React.FC<{
  children: React.ReactNode;
  locale: Locale;
  messages: any;
}> = ({ children, locale, messages }) => {
  return (
    <ServerProviders>
      <ClientProviders locale={locale} messages={messages}>{children}</ClientProviders>
    </ServerProviders>
  );
};
