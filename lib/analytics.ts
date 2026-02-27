"use client";

type AnalyticsParams = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: Array<unknown>;
  }
}

function normalizeParams(params: AnalyticsParams): Record<string, string | number | boolean> {
  const normalized: Record<string, string | number | boolean> = {};

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    normalized[key] = value;
  }

  return normalized;
}

export function trackEvent(eventName: string, params: AnalyticsParams = {}): void {
  if (typeof window === "undefined") return;

  const normalizedParams = normalizeParams(params);

  try {
    if (typeof window.gtag === "function") {
      window.gtag("event", eventName, normalizedParams);
      return;
    }

    if (!Array.isArray(window.dataLayer)) {
      window.dataLayer = [];
    }

    // Queue event in gtag-compatible format for cases when gtag bootstrap is delayed.
    window.dataLayer.push(["event", eventName, normalizedParams]);
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Analytics event dispatch failed:", eventName, error);
    }
  }
}
