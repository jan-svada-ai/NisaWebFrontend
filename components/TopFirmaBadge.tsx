import Image from "next/image";
import { ExternalLink, Star } from "lucide-react";

const FIRMY_REVIEW_URL =
  "https://www.firmy.cz/detail/13200814-nisa-centrum-reality-liberec.html#pridat-hodnoceni";

type TopFirmaBadgeProps = {
  variant?: "home" | "reference";
};

export default function TopFirmaBadge({ variant = "home" }: TopFirmaBadgeProps) {
  const isReference = variant === "reference";

  return (
    <a
      href={FIRMY_REVIEW_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={`group mx-auto mb-9 grid w-full max-w-4xl overflow-hidden rounded-[2rem] border border-[#d8b94f]/35 bg-[linear-gradient(135deg,#fffaf0_0%,#f3e5b5_45%,#fff8df_100%)] shadow-[0_22px_55px_rgba(57,43,14,0.13)] transition hover:-translate-y-1 hover:shadow-[0_28px_70px_rgba(57,43,14,0.18)] ${
        isReference ? "md:grid-cols-[auto_1fr_auto]" : "md:grid-cols-[auto_1fr_auto]"
      } items-center gap-5 p-5 text-left`}
      aria-label="Přidat hodnocení Nisa Centrum Reality na Firmy.cz"
    >
      <span className="relative mx-auto flex h-28 w-32 items-center justify-center rounded-3xl bg-white/70 p-3 ring-1 ring-black/5 md:mx-0">
        <Image
          src="/top-firma-2025.svg"
          alt="TOP firma 2025"
          width={138}
          height={120}
          className="h-full w-full object-contain"
        />
      </span>

      <span className="min-w-0 text-center md:text-left">
        <span className="inline-flex items-center gap-2 rounded-full bg-black/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-black/65">
          <Star className="h-3.5 w-3.5 fill-[#d8b94f] text-[#d8b94f]" />
          Ocenění Firmy.cz
        </span>
        <span className="mt-3 block text-2xl font-semibold tracking-tight text-black">
          Patříme mezi TOP firmy roku 2025
        </span>
        <span className="mt-2 block text-sm leading-relaxed text-black/70">
          Děkujeme klientům za důvěru. Pokud jste s námi byli spokojení, můžete
          nám na Firmy.cz zanechat hodnocení.
        </span>
      </span>

      <span className="mx-auto inline-flex items-center justify-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-semibold text-white transition group-hover:bg-[#2a2111] md:mx-0">
        Přidat hodnocení
        <ExternalLink className="h-4 w-4" />
      </span>
    </a>
  );
}
