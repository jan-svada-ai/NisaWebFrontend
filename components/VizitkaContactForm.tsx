"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";
import { fetchJsonWithRetry } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

type VizitkaContactFormProps = {
  maklerId: number;
  maklerSlug: string;
  maklerJmeno: string;
  recipientEmail: string | null;
};

export default function VizitkaContactForm({
  maklerId,
  maklerSlug,
  maklerJmeno,
  recipientEmail,
}: VizitkaContactFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);
  const [sendSuccess, setSendSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSending(true);
    setSendError(null);
    setSendSuccess(null);

    try {
      const response = await fetchJsonWithRetry<{ ok?: boolean; error?: string }>(
        "/api/contact",
        {
          timeoutMs: 25000,
          retries: 1,
          retryDelayMs: 800,
          init: {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: formData.name,
              email: formData.email,
              phone: formData.phone,
              message: formData.message,
              subject: `Kontakt z vizitky (${maklerJmeno})`,
              recipientEmail: recipientEmail ?? undefined,
            }),
          },
        },
      );

      if (response.ok) {
        trackEvent("generate_lead", {
          lead_source: "makler_vizitka_form",
          lead_type: "makler",
          makler_id: maklerId,
          makler_slug: maklerSlug,
        });
        trackEvent("qualify_lead", {
          lead_source: "makler_vizitka_form",
          lead_type: "makler",
          makler_id: maklerId,
          makler_slug: maklerSlug,
        });
        setSendSuccess("Zpráva byla odeslána. Makléř se vám brzy ozve.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setSendError(response.error ?? "Odeslání se nepodařilo. Zkuste to znovu.");
      }
    } catch {
      setSendError("Odeslání se nepodařilo. Zkuste to znovu.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="rounded-[28px] bg-white/92 p-5 shadow-[0_16px_45px_rgba(0,0,0,0.08)]">
      <h2 className="text-lg font-semibold text-black">Napište makléři</h2>
      <form className="mt-4 grid gap-3" onSubmit={handleSubmit}>
        {sendSuccess ? (
          <div className="rounded-2xl bg-green-50 px-4 py-3 text-sm text-green-800">
            {sendSuccess}
          </div>
        ) : null}
        {sendError ? (
          <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-800">
            {sendError}
          </div>
        ) : null}

        <input
          type="text"
          value={formData.name}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, name: event.target.value }))
          }
          placeholder="Jméno a příjmení"
          required
          className="w-full rounded-2xl bg-[color:var(--paper0)] px-4 py-3 text-sm text-black outline-none ring-1 ring-black/8 transition focus:ring-2 focus:ring-[color:var(--gold1)]/35"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, email: event.target.value }))
          }
          placeholder="E-mail"
          required
          className="w-full rounded-2xl bg-[color:var(--paper0)] px-4 py-3 text-sm text-black outline-none ring-1 ring-black/8 transition focus:ring-2 focus:ring-[color:var(--gold1)]/35"
        />
        <input
          type="tel"
          value={formData.phone}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, phone: event.target.value }))
          }
          placeholder="Telefon"
          className="w-full rounded-2xl bg-[color:var(--paper0)] px-4 py-3 text-sm text-black outline-none ring-1 ring-black/8 transition focus:ring-2 focus:ring-[color:var(--gold1)]/35"
        />
        <textarea
          value={formData.message}
          onChange={(event) =>
            setFormData((prev) => ({ ...prev, message: event.target.value }))
          }
          placeholder="Vaše zpráva"
          rows={4}
          required
          className="w-full rounded-2xl bg-[color:var(--paper0)] px-4 py-3 text-sm text-black outline-none ring-1 ring-black/8 transition focus:ring-2 focus:ring-[color:var(--gold1)]/35"
        />

        <button
          type="submit"
          disabled={sending}
          className="inline-flex items-center justify-center gap-2 rounded-2xl bg-black px-4 py-3 text-sm font-semibold text-white transition hover:bg-black/90 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <Send className="h-4 w-4" />
          {sending ? "Odesílám..." : "Odeslat zprávu"}
        </button>
      </form>
    </section>
  );
}
