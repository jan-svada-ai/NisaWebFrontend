"use client";

export const COOKIE_CONSENT_STORAGE_KEY = "nisa_cookie_consent";
export const COOKIE_CONSENT_COOKIE_NAME = "nisa_cookie_consent";
export const COOKIE_CONSENT_VERSION = 1;
export const COOKIE_SETTINGS_EVENT = "nisa:open-cookie-settings";

declare global {
  interface Window {
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

export type CookieConsent = {
  version: number;
  necessary: true;
  analytics: boolean;
  updatedAt: string;
};

function isValidConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false;

  const candidate = value as Partial<CookieConsent>;
  return (
    candidate.version === COOKIE_CONSENT_VERSION &&
    candidate.necessary === true &&
    typeof candidate.analytics === "boolean" &&
    typeof candidate.updatedAt === "string"
  );
}

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") return null;

  const entry = document.cookie
    .split("; ")
    .find((item) => item.startsWith(`${name}=`));

  if (!entry) return null;
  return decodeURIComponent(entry.slice(name.length + 1));
}

function buildCookieValue(consent: CookieConsent): string {
  return encodeURIComponent(JSON.stringify(consent));
}

function persistCookieValue(name: string, value: string): void {
  if (typeof document === "undefined") return;

  const maxAge = 60 * 60 * 24 * 180;
  const secure = window.location.protocol === "https:" ? "; Secure" : "";

  document.cookie = `${name}=${value}; Max-Age=${maxAge}; Path=/; SameSite=Lax${secure}`;
}

function clearCookie(name: string, domain?: string): void {
  if (typeof document === "undefined") return;
  const domainPart = domain ? `; Domain=${domain}` : "";
  document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domainPart}`;
}

function getCandidateDomains(hostname: string): string[] {
  if (!hostname || hostname === "localhost" || /^\d{1,3}(\.\d{1,3}){3}$/.test(hostname)) {
    return [];
  }

  const domains = new Set<string>();
  const parts = hostname.split(".");

  domains.add(hostname);
  domains.add(`.${hostname}`);

  for (let index = 0; index < parts.length - 1; index += 1) {
    const domain = parts.slice(index).join(".");
    domains.add(domain);
    domains.add(`.${domain}`);
  }

  return Array.from(domains);
}

function ensureGtagQueue(): void {
  if (typeof window === "undefined") return;

  if (!Array.isArray(window.dataLayer)) {
    window.dataLayer = [];
  }

  if (typeof window.gtag !== "function") {
    window.gtag = (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };
  }
}

function setGaDisabledFlag(measurementId: string, disabled: boolean): void {
  if (typeof window === "undefined" || !measurementId) return;
  window[`ga-disable-${measurementId}`] = disabled;
}

export function createCookieConsent(analytics: boolean): CookieConsent {
  return {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics,
    updatedAt: new Date().toISOString(),
  };
}

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;

  try {
    const storageValue = window.localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY);
    if (storageValue) {
      const parsed = JSON.parse(storageValue) as unknown;
      if (isValidConsent(parsed)) return parsed;
    }
  } catch {}

  const cookieValue = readCookieValue(COOKIE_CONSENT_COOKIE_NAME);
  if (!cookieValue) return null;

  try {
    const parsed = JSON.parse(cookieValue) as unknown;
    if (isValidConsent(parsed)) return parsed;
  } catch {}

  return null;
}

export function persistCookieConsent(consent: CookieConsent): void {
  if (typeof window === "undefined") return;

  const serialized = JSON.stringify(consent);

  try {
    window.localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, serialized);
  } catch {}

  persistCookieValue(COOKIE_CONSENT_COOKIE_NAME, buildCookieValue(consent));
}

export function hasAnalyticsConsent(): boolean {
  return readCookieConsent()?.analytics === true;
}

export function applyAnalyticsPreference(analyticsEnabled: boolean, measurementId: string): void {
  if (typeof window === "undefined" || !measurementId) return;

  ensureGtagQueue();
  setGaDisabledFlag(measurementId, !analyticsEnabled);

  window.gtag?.("consent", "update", {
    analytics_storage: analyticsEnabled ? "granted" : "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });

  if (!analyticsEnabled) {
    const cookieNames = document.cookie
      .split("; ")
      .map((entry) => entry.split("=")[0])
      .filter(
        (name) => name === "_ga" || name === "_gid" || name === "_gat" || name.startsWith("_ga_"),
      );

    const domains = getCandidateDomains(window.location.hostname);
    for (const name of cookieNames) {
      clearCookie(name);
      for (const domain of domains) {
        clearCookie(name, domain);
      }
    }
  }
}

export function openCookieSettings(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(COOKIE_SETTINGS_EVENT));
}
