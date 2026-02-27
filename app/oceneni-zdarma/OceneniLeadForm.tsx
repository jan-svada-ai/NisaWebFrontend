"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, ChevronDown, Send, Users } from "lucide-react";
import { apiUrl } from "@/lib/api";
import { trackEvent } from "@/lib/analytics";

type SubjectOption = {
  value: string;
  label: string;
};

function applyCzechValidationMessage(
  element: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement,
): void {
  if (element.validity.valid) {
    element.setCustomValidity("");
    return;
  }

  if (element.validity.valueMissing) {
    element.setCustomValidity("Vyplňte prosím toto pole.");
    return;
  }

  if (element.validity.typeMismatch) {
    element.setCustomValidity(
      element.type === "email"
        ? "Zadejte prosím platný e-mail."
        : "Zadejte prosím platnou hodnotu.",
    );
    return;
  }

  element.setCustomValidity("Zkontrolujte prosím vyplněné pole.");
}

const SUBJECT_OPTIONS: SubjectOption[] = [
  { value: "oceneni", label: "Chci přesné ocenění nemovitosti" },
  { value: "prodej", label: "Chci prodat nemovitost" },
  { value: "pronajem", label: "Chci pronajmout nemovitost" },
  { value: "koupe", label: "Hledám nemovitost ke koupi" },
  { value: "vyhledavani", label: "Hledám nemovitost k pronájmu" },
  { value: "jine", label: "Jiný dotaz" },
];

function SubjectDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextValue: string) => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const selectedLabel =
    SUBJECT_OPTIONS.find((option) => option.value === value)?.label ?? "Vyberte předmět...";

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as Node | null;
      if (!detailsRef.current || !target) return;
      if (!detailsRef.current.contains(target)) {
        detailsRef.current.removeAttribute("open");
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => document.removeEventListener("click", handleDocumentClick);
  }, []);

  return (
    <details ref={detailsRef} className="group relative z-20 mt-1 open:z-50">
      <summary className="list-none cursor-pointer rounded-2xl border border-black/20 bg-white px-4 py-2.5 pr-11 text-sm text-black shadow-sm transition marker:content-none focus-visible:border-[color:var(--gold1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--gold1)]/20 group-open:border-[color:var(--gold1)] group-open:ring-2 group-open:ring-[color:var(--gold1)]/20">
        <span>{selectedLabel}</span>
        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-black/45 transition group-open:rotate-180" />
      </summary>
      <div className="absolute z-[80] mt-2 w-full overflow-hidden rounded-2xl border border-black/20 bg-white p-1 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.35)]">
        <ul className="max-h-64 overflow-auto">
          {SUBJECT_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                onClick={() => {
                  onChange(option.value);
                  detailsRef.current?.removeAttribute("open");
                }}
                className={`w-full rounded-xl px-3 py-2.5 text-left text-sm transition ${
                  value === option.value
                    ? "bg-[color:var(--gold1)]/20 text-black"
                    : "text-black/85 hover:bg-black/5"
                }`}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}

export default function OceneniLeadForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "oceneni",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    if (!formData.subject) {
      setSubmitError("Vyberte prosím předmět.");
      setSubmitting(false);
      return;
    }

    try {
      const response = await fetch(apiUrl("/api/contact"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        trackEvent("generate_lead", {
          lead_source: "oceneni_presne_form",
          lead_type: formData.subject || "oceneni",
        });
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "oceneni",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
        formRef.current?.reset();
      } else {
        const errorData = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setSubmitError(errorData?.error ?? "Odeslání se nepodařilo. Zkuste to prosím znovu.");
      }
    } catch {
      setSubmitError("Odeslání se nepodařilo. Zkuste to prosím znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNativeInvalid: React.FormEventHandler<HTMLFormElement> = (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    ) {
      applyCzechValidationMessage(target);
    }
  };

  const handleNativeInput: React.FormEventHandler<HTMLFormElement> = (event) => {
    const target = event.target;
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLSelectElement ||
      target instanceof HTMLTextAreaElement
    ) {
      target.setCustomValidity("");
    }
  };

  return (
    <section id="formular" className="border-t border-black/10 py-20 md:py-24">
      <div className="mx-auto w-full max-w-screen-xl px-4">
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-semibold text-black md:text-5xl">
            <span className="inline-flex flex-col items-center">
              <span>Přesné ocenění od našeho týmu</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h2>
          <p className="mt-4 text-base leading-relaxed text-black/70 md:text-lg">
            Online kalkulace je automatický orientační odhad. Pro přesné ocenění nemovitosti nás
            kontaktujte. Můžete si vybrat konkrétního makléře, nebo poslat dotaz přes formulář níže.
          </p>
        </div>

        <div
          id="kontaktni-formular"
          className="mx-auto mt-10 max-w-4xl rounded-3xl border border-black/10 bg-white/70 p-8 shadow-sm"
        >
          <h3 className="mb-6 text-2xl font-semibold text-black">
            <span className="inline-flex flex-col items-start">
              <span>Napište nám pro přesný odhad</span>
              <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h3>

          {submitted ? (
            <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
              <CheckCircle className="h-5 w-5" />
              <span>Děkujeme. Vaše zpráva byla odeslána a brzy se ozveme.</span>
            </div>
          ) : null}

          {submitError ? (
            <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
              {submitError}
            </div>
          ) : null}

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            onInvalidCapture={handleNativeInvalid}
            onInputCapture={handleNativeInput}
            className="space-y-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-black">
                  Vaše jméno *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                  placeholder="Jan Novák"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black">
                  E-mail *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                  placeholder="jan@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-black">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                placeholder="+420 721 292 462"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-black">Předmět *</label>
              <SubjectDropdown
                value={formData.subject}
                onChange={(nextValue) => setFormData((prev) => ({ ...prev, subject: nextValue }))}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-black">
                Zpráva *
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                placeholder="Napište nám lokalitu, typ nemovitosti, stav a co od ocenění očekáváte..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="btn-main inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
            >
              <Send className="h-4 w-4" />
              {submitting ? "Odesílám..." : "Odeslat poptávku na přesné ocenění"}
            </button>
          </form>

          <div className="mt-8 border-t border-black/10 pt-6 text-center">
            <p className="text-sm leading-relaxed text-black/70 md:text-base">
              Nebo můžete kontaktovat konkrétního makléře podle lokality a typu
              nemovitosti.
            </p>
            <div className="mt-4">
              <Link
                href="/nas-tym/"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-black px-8 py-3 text-sm font-semibold text-white md:text-base"
              >
                <Users className="h-4 w-4" />
                Naši makléři
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
