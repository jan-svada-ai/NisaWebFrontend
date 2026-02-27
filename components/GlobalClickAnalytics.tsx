"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

function getAnchorFromTarget(target: EventTarget | null): HTMLAnchorElement | null {
  if (!(target instanceof Element)) return null;
  return target.closest("a[href]");
}

function normalizeValue(raw: string, prefix: string): string {
  return raw.replace(prefix, "").trim();
}

export default function GlobalClickAnalytics() {
  useEffect(() => {
    const onDocumentClick = (event: MouseEvent) => {
      const anchor = getAnchorFromTarget(event.target);
      if (!anchor) return;

      const href = anchor.getAttribute("href")?.trim() ?? "";
      if (!href) return;

      if (href.startsWith("tel:")) {
        trackEvent("contact_click", {
          contact_method: "phone",
          contact_value: normalizeValue(href, "tel:"),
        });
        return;
      }

      if (href.startsWith("mailto:")) {
        trackEvent("contact_click", {
          contact_method: "email",
          contact_value: normalizeValue(href, "mailto:"),
        });
      }
    };

    document.addEventListener("click", onDocumentClick);
    return () => document.removeEventListener("click", onDocumentClick);
  }, []);

  return null;
}

