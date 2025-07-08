import { HeaderClient } from "./Component.client";
import { getCachedGlobal } from "@/utilities/getGlobals";
import React from "react";

import type { Header } from "@/payload-types";
import { DataFromGlobalSlug } from "payload";
import Navbar from "./navbar/navbar5";
import { PublicContextProps } from "@/utilities/publicContextProps";

export async function Header({
  publicContext,
}: {
  publicContext: PublicContextProps;
}) {
  const header = (await getCachedGlobal(
    "header",
    1,
  )()) as DataFromGlobalSlug<"header">;

  return (
    <>
      <Navbar header={header} publicContext={publicContext} />
      <HeaderClient />
    </>
  );
}
