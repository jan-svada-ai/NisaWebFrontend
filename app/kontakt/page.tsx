"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle, Mail, MapPin, Phone } from "lucide-react";
import { apiUrl } from "@/lib/api";

export default function Page() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
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
      }
    } catch (error) {
      console.error("Chyba pri odeslani formulare:", error);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-24">
      <div className="mb-12">
        <p className="text-sm uppercase tracking-[0.2em] text-black/60">
          Nisa Centrum Reality
        </p>
        <h1 className="mt-2 text-5xl font-semibold">Kontaktujte nas</h1>
        <p className="mt-4 max-w-3xl text-black/70">
          Mate otazky? Chcete domluvit konzultaci nebo zjistit realny postup pro
          prodej, pronajem nebo vyhledavani nemovitosti? Napiste nam nebo
          zavolejte. Odpovime rychle, vecne a s respektem k vasim prioritam.
        </p>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        <div id="formular" className="lg:col-span-2">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-8 shadow-sm">
            <h2 className="mb-6 text-2xl font-semibold">Napiste nam</h2>

            {submitted && (
              <div className="mb-6 flex items-center gap-3 rounded-lg bg-green-50 px-4 py-3 text-sm text-green-800">
                <CheckCircle className="h-5 w-5" />
                <span>
                  Dekujeme. Vase zprava byla odeslana a brzy se vam ozveme.
                </span>
              </div>
            )}

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-black"
                  >
                    Vase jmeno *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                    placeholder="Jan Novak"
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
                  placeholder="+420 702 064 442"
                />
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-black"
                >
                  Predmet *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                >
                  <option value="">Vyberte predmet...</option>
                  <option value="prodej">Chci prodat nemovitost</option>
                  <option value="pronajem">Chci pronajmout nemovitost</option>
                  <option value="koupe">Hledam nemovitost ke koupi</option>
                  <option value="vyhledavani">Hledam nemovitost k pronajmu</option>
                  <option value="oceneni">Chci ocenit nemovitost</option>
                  <option value="jine">Jiny dotaz</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-black"
                >
                  Zprava *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="mt-1 w-full rounded-lg border border-black bg-white px-4 py-2 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black/30"
                  placeholder="Napisete nam, co resite, jakou mate lokalitu a casovou predstavu..."
                />
              </div>

              <button
                type="submit"
                className="btn-main w-full rounded-full bg-[color:var(--gold1)] px-6 py-3 text-sm font-semibold text-black"
              >
                Odeslat zpravu
              </button>
            </form>

            <div className="mt-8 border-t border-black/10 pt-6">
              <p className="text-sm font-medium text-black">
                Kontaktujte konkretniho maklere
              </p>
              <p className="mt-3 mb-4 text-sm text-black/70">
                Chcete se poradit primo s clenem naseho tymu? Vyberte si maklere,
                ktery je vam nejblize.
              </p>
              <Link
                href="/nas-tym"
                className="btn-main inline-flex items-center justify-center rounded-full bg-black px-6 py-2 text-sm font-semibold text-white"
              >
                Kontaktuj konkretniho maklere
              </Link>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">Kontakt</h3>

            <div className="space-y-4">
              <div className="flex gap-3">
                <Phone className="mt-1 h-5 w-5 flex-shrink-0 text-black/60" />
                <div className="text-sm">
                  <p className="font-medium text-black">Telefon</p>
                  <a
                    href="tel:+420702064442"
                    className="text-black/70 hover:text-black"
                  >
                    +420 702 064 442
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
                    Zamecnicka 563/8
                    <br />
                    Liberec IV - Perstyn
                    <br />
                    46001 Liberec
                  </p>
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
              Jak se k nam dostanete
            </a>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold">O firme</h3>

            <div className="space-y-3 text-sm text-black/70">
              <div>
                <p className="font-medium text-black">NISACENTRUM s.r.o.</p>
              </div>

              <div>
                <p className="font-medium text-black/60">ICO</p>
                <p className="text-black">27273385</p>
              </div>

              <div>
                <p className="font-medium text-black/60">DIC</p>
                <p className="text-black">CZ27273385</p>
              </div>

              <div>
                <p className="font-medium text-black/60">Datova schranka</p>
                <p className="text-black">yqkqb7n</p>
              </div>

              <div className="border-t border-black/10 pt-3">
                <p className="text-xs text-black/60">
                  Firma je zapsana v obchodnim rejstriku.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-black/10 bg-white/70 p-6 shadow-sm">
            <h3 className="mb-3 text-lg font-semibold">Oceneni zdarma</h3>
            <p className="mb-4 text-sm text-black/70">
              Chcete vedet, kolik muze mit vase nemovitost realnou trzni hodnotu?
            </p>
            <a
              href="https://leady.valuo.cz/kalkulace/5dfdb68a089d608a996823b2bc0f53d9"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-main flex w-full items-center justify-center rounded-full bg-[color:var(--gold1)] px-4 py-2 text-sm font-semibold text-black"
            >
              Ocenit nemovitost
            </a>
          </div>
        </div>
      </div>

      <div className="mt-16">
        <h2 className="mb-6 text-2xl font-semibold">Kde nas najdete</h2>
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
          Konzultaci je idealni domluvit predem telefonicky nebo e-mailem.
          Pripravime si podklady a schuzka bude rychla a vecna.
        </p>
      </div>
    </div>
  );
}
