import type { Metadata } from "next";
import type React from "react";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { serverUrl as NEXT_PUBLIC_SERVER_URL } from "@/config/server";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/globals/Footer/Component";
import { Header } from "@/globals/Header/Component";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { draftMode } from "next/headers";

import { resolveSlugs } from "@/utilities/resolveSlugs";
import localization, { type Locale } from "@/localization.config";
import type { PublicContextProps } from "@/utilities/publicContextProps";
import { getMessages } from "@/i18n/messages";

import "./globals.css";
import {
  TrackingScriptsBody,
  TrackingScriptsHead,
} from "@/providers/TrackingScriptWrapper";
import { cn } from "@/utilities/cn";
import { haasGrotText, haasGrotDisplay, haasGrotBody } from "@/fonts";

export const metadata: Metadata = {
  metadataBase: new URL(NEXT_PUBLIC_SERVER_URL || "https://trieb.work"),
  openGraph: mergeOpenGraph(),
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: any;
}) {
  const paramsR = await params;
  const { slugs } = paramsR;
  const slugData = resolveSlugs(slugs || []);
  const { isEnabled } = await draftMode();

  const publicContext: PublicContextProps = {
    ...slugData,
  };

  const locale = (slugData.locale || localization.defaultLocale) as Locale;
  const messages = await getMessages(locale);

  return (
    <html
      className={cn(haasGrotText.variable, haasGrotDisplay.variable, haasGrotBody.variable)}
      lang={locale}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon.svg" rel="icon" type="image/svg+xml" />

        <TrackingScriptsHead />
      </head>
      <body>
        <TrackingScriptsBody />
        <Providers locale={locale} messages={messages}>
          <AdminBar adminBarProps={{ preview: isEnabled }} />
          <LivePreviewListener />
          <Header publicContext={publicContext} />
          {children}
          <Footer publicContext={publicContext} />
        </Providers>
      </body>
    </html>
  );
}
