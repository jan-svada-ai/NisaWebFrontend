"use client";

import { Settings2 } from "lucide-react";
import { openCookieSettings } from "@/lib/cookie-consent";

export default function OpenCookieSettingsButton() {
  return (
    <button
      type="button"
      onClick={() => openCookieSettings()}
      className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-[color:var(--gold1)]/15 px-5 py-3 text-sm font-semibold text-black"
    >
      <Settings2 className="h-4 w-4" />
      Otevřít nastavení cookies
    </button>
  );
}
