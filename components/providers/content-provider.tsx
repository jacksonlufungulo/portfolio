"use client";

import * as React from "react";
import { defaultContent, type SiteContent } from "@/lib/data";

const ContentContext = React.createContext<SiteContent>(defaultContent);

export function ContentProvider({
  initial,
  children,
}: {
  initial: SiteContent;
  children: React.ReactNode;
}) {
  return (
    <ContentContext.Provider value={initial}>
      {children}
    </ContentContext.Provider>
  );
}

/** Read the live site content anywhere in the tree. */
export function useContent() {
  return React.useContext(ContentContext);
}
