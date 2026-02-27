"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Building2,
  ChevronDown,
  CheckCircle,
  Facebook,
  HandCoins,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Send,
  Youtube,
  UserRound,
} from "lucide-react";
import { apiUrl } from "@/lib/api";

type SubjectOption = {
  value: string;
  label: string;
};

const SUBJECT_OPTIONS: SubjectOption[] = [
  { value: "prodej", label: "Chci prodat nemovitost" },
  { value: "pronajem", label: "Chci pronajmout nemovitost" },
  { value: "koupe", label: "Hledám nemovitost ke koupi" },
  { value: "vyhledavani", label: "Hledám nemovitost k pronájmu" },
  { value: "oceneni", label: "Chci ocenit nemovitost" },
  { value: "jine", label: "Jiný dotaz" },
];

const INSTAGRAM_URL =
  "https://www.instagram.com/nisa_centrum_reality?igsh=MW92NnF3MHdiZ243OQ==";
const FACEBOOK_URL =
  "https://www.facebook.com/realitynisacentrum?locale=cs_CZ";
const YOUTUBE_URL = "https://www.youtube.com/@nisacentrumreality";

function SubjectDropdown({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextValue: string) => void;
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const selectedLabel =
    SUBJECT_OPTIONS.find((option) => option.value === value)?.label ??
    "Vyberte předmět...";

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

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
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
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
        setTimeout(() => setSubmitted(false), 5000);
        formRef.current?.reset();
      } else {
        const errorData = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        setSubmitError(
          errorData?.error ?? "Odeslání se nepodařilo. Zkuste to prosím znovu.",
        );
      }
    } catch (error) {
      console.error("Chyba při odeslání formuláře:", error);
      setSubmitError("Odeslání se nepodařilo. Zkuste to prosím znovu.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-2xl px-4 py-24 sm:px-6 xl:px-8 xl:pr-24">
      <div className="mb-12 text-center">
        <p className="text-sm uppercase tracking-[0.2em] text-black/60">
          Nisa Centrum Reality
        </p>
        <h1 className="mt-2 text-5xl font-semibold text-black">
          <span className="inline-flex flex-col items-center">
            <span>Kontaktujte nás</span>
            <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-3xl text-center text-black/70">
          Máte otázky? Chcete domluvit konzultaci nebo zjistit reálný postup pro
          prodej, pronájem nebo vyhledávání nemovitosti? Napište nám nebo
          zavolejte. Odpovíme rychle, věcně a s respektem k vašim prioritám.
        </p>
      </div>

      <div className="grid gap-8 xl:gap-12 lg:grid-cols-12">
        <div id="formular" className="lg:col-span-8">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold text-black">
              <span className="inline-flex flex-col items-start">
                <span>Napište nám</span>
                <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h2>

            {submitted && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span>
                  Děkujeme. Vaše zpráva byla odeslána a brzy se vám ozveme.
                </span>
              </div>
            )}
            {submitError ? (
              <div className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
                {submitError}
              </div>
            ) : null}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black"
                  >
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black"
                  >
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
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-black"
                >
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
                <label className="block text-sm font-medium text-black">
                  Předmět *
                </label>
                <SubjectDropdown
                  value={formData.subject}
                  onChange={(nextValue) =>
                    setFormData((prev) => ({ ...prev, subject: nextValue }))
                  }
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black"
                >
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
                  placeholder="Napište nám, co řešíte, jakou máte lokalitu a časovou představu..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn-main inline-flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
              >
                <Send className="h-4 w-4" />
                {submitting ? "Odesílám..." : "Odeslat zprávu"}
              </button>
            </form>

            <div className="mt-8 border-t border-black/10 pt-6">
              <h3 className="text-[1.05rem] font-semibold text-black">
                <span className="inline-flex flex-col items-start">
                  <span>Kontaktujte konkrétního makléře</span>
                  <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
                </span>
              </h3>
              <p className="mt-3 mb-4 text-sm text-black/70">
                Chcete se poradit přímo s členem našeho týmu? Vyberte si makléře,
                který je vám nejblíže.
              </p>
              <Link
                href="/nas-tym"
                className="btn-main inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-2 text-sm font-semibold text-white"
              >
                <UserRound className="h-4 w-4" />
                Kontaktuj konkrétního makléře
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-4">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-black">
              <span className="inline-flex flex-col items-start">
                <span className="inline-flex items-center gap-2">
                  <Phone className="h-4 w-4 text-[color:var(--gold2)]" />
                  Kontakt
                </span>
                <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-black/60" />
                <div className="text-sm">
                  <p className="font-medium text-black">Telefon</p>
                  <a
                    href="tel:+420721292462"
                    className="text-black/70 hover:text-black"
                  >
                    +420 721 292 462
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <Mail className="mt-1 h-5 w-5 flex-shrink-0 text-black/60" />
                <div className="text-sm">
                  <p className="font-medium text-black">E-mail</p>
                  <a
                    href="mailto:info@nisacentrum.cz"
                    className="text-black/70 hover:text-black"
                  >
                    info@nisacentrum.cz
                  </a>
                </div>
              </div>

              <div className="flex gap-3">
                <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-black/60" />
                <div className="text-sm">
                  <p className="font-medium text-black">Adresa</p>
                  <p className="text-black/70">
                    Zámečnická 563/8
                    <br />
                    Liberec IV - Perštýn
                    <br />
                    46001 Liberec
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <a
                      href={INSTAGRAM_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-2 text-sm font-semibold text-black/80 transition hover:border-[color:var(--gold2)] hover:text-black"
                    >
                      <Instagram className="h-4 w-4 text-[color:var(--gold2)]" />
                      Instagram
                    </a>
                    <a
                      href={FACEBOOK_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-2 text-sm font-semibold text-black/80 transition hover:border-[color:var(--gold2)] hover:text-black"
                    >
                      <Facebook className="h-4 w-4 text-[color:var(--gold2)]" />
                      Facebook
                    </a>
                    <a
                      href={YOUTUBE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-3.5 py-2 text-sm font-semibold text-black/80 transition hover:border-[color:var(--gold2)] hover:text-black"
                    >
                      <Youtube className="h-4 w-4 text-[color:var(--gold2)]" />
                      YouTube
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <a
              href="https://www.google.com/maps/search/Z%C3%A1me%C4%8Dnick%C3%A1%20563%2F8%2C%20Liberec"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-4 py-2 text-sm font-semibold text-black"
            >
              <MapPin className="h-4 w-4" />
              Jak se k nám dostanete
            </a>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-black">
              <span className="inline-flex flex-col items-start">
                <span className="inline-flex items-center gap-2">
                  <Building2 className="h-4 w-4 text-[color:var(--gold2)]" />
                  O firmě
                </span>
                <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h3>

            <div className="space-y-3 text-sm text-black/70">
              <div>
                <p className="font-medium text-black">NISACENTRUM s.r.o.</p>
              </div>

              <div>
                <p className="font-medium text-black/60">IČO</p>
                <p className="text-black">27273385</p>
              </div>

              <div>
                <p className="font-medium text-black/60">DIČ</p>
                <p className="text-black">CZ27273385</p>
              </div>

              <div>
                <p className="font-medium text-black/60">Datová schránka</p>
                <p className="text-black">yqkqb7n</p>
              </div>

              <div className="border-t border-black/10 pt-3">
                <p className="text-xs text-black/60">
                  Firma je zapsaná v obchodním rejstříku.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold text-black">
              <span className="inline-flex flex-col items-start">
                <span className="inline-flex items-center gap-2">
                  <HandCoins className="h-4 w-4 text-[color:var(--gold2)]" />
                  Ocenění zdarma
                </span>
                <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
              </span>
            </h3>
            <p className="mb-4 text-sm text-black/70">
              Chcete vědět, jakou může mít vaše nemovitost reálnou tržní hodnotu?
            </p>
            <Link
              href="/oceneni-zdarma/"
              className="btn-main flex w-full items-center justify-center gap-2 rounded-full bg-[color:var(--gold1)] px-4 py-2 text-sm font-semibold text-black"
            >
              <HandCoins className="h-4 w-4" />
              Ocenit nemovitost
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold text-black">
          <span className="inline-flex flex-col items-start">
            <span>Kde nás najdete</span>
            <span className="mt-2 h-[5px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
          </span>
        </h2>
        <div className="overflow-hidden rounded-3xl border border-black/10 shadow-sm">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2545.5566850897673!2d15.037066!3d50.763476!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471095c7d8f5f5f5%3A0x1234567890abcdef!2sZ%C3%A1me%C4%8Dn%C3%ADcka%20563%2F8%2C%20Liberec!5e0!3m2!1scs!2scz!4v1234567890"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <p className="mt-4 text-sm text-black/70">
          Konzultaci je ideální domluvit předem telefonicky nebo e-mailem.
          Připravíme si podklady a schůzka bude rychlá a věcná.
        </p>
      </div>
    </div>
  );
}



