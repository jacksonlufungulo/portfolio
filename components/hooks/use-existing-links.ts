"use client";

import * as React from "react";
import type { NavLink } from "@/lib/data";

/**
 * Self-healing nav: returns only the links whose on-page section actually
 * exists in the DOM, so a stale anchor (e.g. "#blog" after the Blog section is
 * removed) never renders a dead link. Non-anchor links are always kept.
 *
 * Starts with the full list (matching SSR) and prunes after mount, so there's
 * no hydration mismatch — just a brief, harmless flash of any stale link.
 */
export function useExistingLinks(links: NavLink[]): NavLink[] {
  const [visible, setVisible] = React.useState(links);

  React.useEffect(() => {
    setVisible(
      links.filter((l) =>
        l.href.startsWith("#") ? !!document.querySelector(l.href) : true
      )
    );
  }, [links]);

  return visible;
}
