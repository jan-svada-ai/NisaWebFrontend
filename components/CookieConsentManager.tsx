"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { Check, Cookie, Settings2, ShieldCheck, X } from "lucide-react";
import {
  applyAnalyticsPreference,
  COOKIE_SETTINGS_EVENT,
  createCookieConsent,
  openCookieSettings,
  persistCookieConsent,
  readCookieConsent,
  type CookieConsent,
} from "@/lib/cookie-consent";

type CookieConsentManagerProps = {
  measurementId: string;
};

function CookieTypeRow({
  title,
  description,
  enabled,
  locked = false,
  onChange,
}: {
  title: string;
  description: string;
  enabled: boolean;
  locked?: boolean;
  onChange?: (nextValue: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-black/10 bg-white/70 p-4">
      <div className="min-w-0">
        <p className="font-semibold text-black">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-black/65">{description}</p>
      </div>
      <button
        type="button"
        disabled={locked}
        onClick={() => onChange?.(!enabled)}
        aria-pressed={enabled}
        className={`relative inline-flex h-7 w-12 flex-shrink-0 items-center rounded-full transition ${
          enabled ? "bg-[color:var(--gold1)]" : "bg-black/15"
        } ${locked ? "cursor-default opacity-75" : ""}`}
      >
        <span
          className={`inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-black shadow-sm transition ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        >
          {enabled ? <Check className="h-3.5 w-3.5" /> : null}
        </span>
      </button>
    </div>
  );
}

export default function CookieConsentManager({
  measurementId,
}: CookieConsentManagerProps) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isMounted, setIsMounted] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    const storedConsent = readCookieConsent();

    if (storedConsent) {
      setConsent(storedConsent);
      setAnalyticsEnabled(storedConsent.analytics);
      setIsBannerVisible(false);
      setIsSettingsOpen(false);
      applyAnalyticsPreference(storedConsent.analytics, measurementId);
    } else {
      setIsBannerVisible(true);
      setIsSettingsOpen(false);
      setAnalyticsEnabled(false);
      applyAnalyticsPreference(false, measurementId);
    }

    setIsMounted(true);

    const handleOpenSettings = () => {
      const currentConsent = readCookieConsent();
      setConsent(currentConsent);
      setAnalyticsEnabled(currentConsent?.analytics ?? false);
      setIsBannerVisible(true);
      setIsSettingsOpen(true);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
    return () => window.removeEventListener(COOKIE_SETTINGS_EVENT, handleOpenSettings);
  }, [measurementId]);

  const saveConsent = (nextAnalytics: boolean) => {
    const nextConsent = createCookieConsent(nextAnalytics);
    persistCookieConsent(nextConsent);
    applyAnalyticsPreference(nextAnalytics, measurementId);
    setConsent(nextConsent);
    setAnalyticsEnabled(nextAnalytics);
    setIsBannerVisible(false);
    setIsSettingsOpen(false);
  };

  if (!isMounted) {
    return null;
  }

  const shouldLoadAnalytics = consent?.analytics === true && Boolean(measurementId);

  return (
    <>
      {shouldLoadAnalytics ? (
        <>
          <Script
            id="ga4-library"
            src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
            strategy="afterInteractive"
          />
          <Script
            id="ga4-bootstrap"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
window['ga-disable-${measurementId}'] = false;
gtag('js', new Date());
gtag('consent', 'update', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('config', '${measurementId}', { anonymize_ip: true });`,
            }}
          />
        </>
      ) : null}

      {!isBannerVisible ? (
        <button
          type="button"
          onClick={() => openCookieSettings()}
          className="fixed bottom-4 left-4 z-40 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white/90 px-4 py-2 text-sm font-medium text-black shadow-lg backdrop-blur"
        >
          <Cookie className="h-4 w-4 text-[color:var(--gold2)]" />
          Nastavení cookies
        </button>
      ) : null}

      {isBannerVisible ? (
        <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-6">
          <div className="mx-auto max-h-[calc(100dvh-5rem)] max-w-5xl overflow-y-auto overscroll-contain rounded-[1.75rem] border border-black/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(247,244,237,0.98))] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.18)] backdrop-blur-xl sm:max-h-[calc(100dvh-4rem)] sm:rounded-[2rem] sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <div className="inline-flex items-center gap-2 rounded-full bg-[color:var(--gold1)]/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/70">
                  <ShieldCheck className="h-4 w-4 text-[color:var(--gold2)]" />
                  Souhlas s cookies
                </div>
                <h2 className="mt-3 text-xl font-semibold text-black sm:text-2xl">
                  Správa cookies a měření návštěvnosti
                </h2>
                <p className="mt-3 max-w-3xl text-sm leading-relaxed text-black/70 sm:text-base">
                  Web používá nezbytné cookies pro technické fungování. Analytické cookies
                  používáme pouze s vaším souhlasem pro měření návštěvnosti v Google
                  Analytics 4. Souhlas můžete kdykoliv změnit.
                </p>
                <p className="mt-3 text-xs leading-relaxed text-black/55 sm:text-sm">
                  Podrobnosti najdete na stránkách{" "}
                  <Link href="/cookies" className="font-medium text-black hover:text-black/70">
                    Zásady cookies
                  </Link>{" "}
                  a{" "}
                  <Link href="/gdpr" className="font-medium text-black hover:text-black/70">
                    GDPR
                  </Link>
                  .
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsSettingsOpen(false);
                  if (consent) {
                    setIsBannerVisible(false);
                  }
                }}
                className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-black/10 bg-white text-black/60"
                aria-label="Zavřít nastavení cookies"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {isSettingsOpen ? (
              <div className="mt-6 space-y-4">
                <CookieTypeRow
                  title="Nezbytné cookies"
                  description="Umožňují základní fungování webu, uložení vaší volby a bezpečný provoz. Tyto cookies nelze vypnout."
                  enabled
                  locked
                />
                <CookieTypeRow
                  title="Analytické cookies"
                  description="Pomáhají nám měřit návštěvnost a zlepšovat obsah pomocí Google Analytics 4. Bez souhlasu je nenačítáme."
                  enabled={analyticsEnabled}
                  onChange={setAnalyticsEnabled}
                />
              </div>
            ) : null}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={() => saveConsent(false)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 bg-white px-5 py-3 text-sm font-semibold text-black"
              >
                Pouze nezbytné
              </button>
              <button
                type="button"
                onClick={() => saveConsent(true)}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-black/15 bg-black px-5 py-3 text-sm font-semibold text-white"
              >
                Povolit analytické
              </button>
              <button
                type="button"
                onClick={() => {
                  if (isSettingsOpen) {
                    saveConsent(analyticsEnabled);
                    return;
                  }
                  setIsSettingsOpen(true);
                }}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-black/15 bg-[color:var(--gold1)]/15 px-5 py-3 text-sm font-semibold text-black"
              >
                <Settings2 className="h-4 w-4" />
                {isSettingsOpen ? "Uložit nastavení" : "Nastavení"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
