"use client";

import { Settings2 } from "lucide-react";
import { openCookieSettings } from "@/lib/cookie-consent";

export default function OpenCookieSettingsButton({
  className = "inline-flex items-center gap-2 rounded-full border border-black/15 bg-[color:var(--gold1)]/15 px-5 py-3 text-sm font-semibold text-black",
  label = "Otevrit nastaveni cookies",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <button type="button" onClick={() => openCookieSettings()} className={className}>
      <Settings2 className="h-4 w-4" />
      {label}
    </button>
  );
}
