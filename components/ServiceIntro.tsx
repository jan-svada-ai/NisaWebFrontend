import Link from "next/link";

type CTA = {
  label: string;
  href: string;
  external?: boolean;
};

export default function ServiceIntro({
  title,
  subtitle,
  primary,
  secondary,
  variant = "light",
}: {
  title: string;
  subtitle?: string;
  primary?: CTA;
  secondary?: CTA;
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";

  return (
    <section
      className={
        "relative overflow-hidden border-b border-black/10 pt-24 pb-16 " +
        (isDark
          ? "bg-[linear-gradient(180deg,rgba(246,227,177,0.08)_0%,rgba(246,227,177,0.06)_35%,rgba(255,255,255,0)_100%)]"
          : "bg-gradient-to-br from-[#F6E3B1]/20 via-white to-white")
      }
    >
      {isDark ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/5 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent" />
          <div className="pointer-events-none absolute inset-0 shadow-[inset_0_-140px_180px_rgba(0,0,0,0.18)]" />
        </>
      ) : null}

      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={isDark ? "text-center text-white" : "text-center"}>
          <h1
            className={
              "text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl " +
              (isDark ? "text-white" : "text-black")
            }
          >
            {title}
          </h1>
          {subtitle ? (
            <p
              className={
                "mx-auto mt-6 max-w-2xl text-lg leading-relaxed " +
                (isDark ? "text-white/85" : "text-black/70")
              }
            >
              {subtitle}
            </p>
          ) : null}

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            {primary ? (
              primary.external ? (
                <a
                  href={primary.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={
                    "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition " +
                    (isDark
                      ? "bg-[color:var(--gold1)] text-black shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
                      : "bg-[color:var(--gold1)] text-black")
                  }
                >
                  {primary.label}
                </a>
              ) : (
                <Link
                  href={primary.href}
                  className={
                    "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-base font-semibold transition " +
                    (isDark
                      ? "bg-[color:var(--gold1)] text-black shadow-[0_14px_40px_rgba(0,0,0,0.25)]"
                      : "bg-[color:var(--gold1)] text-black")
                  }
                >
                  {primary.label}
                </Link>
              )
            ) : null}

            {secondary ? (
              <Link
                href={secondary.href}
                className={
                  "inline-flex items-center justify-center rounded-full border px-8 py-3.5 text-base font-semibold transition " +
                  (isDark
                    ? "border-white/25 bg-white/10 text-white"
                    : "border-black/15 bg-white text-black")
                }
              >
                {secondary.label}
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
