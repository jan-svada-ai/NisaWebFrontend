"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Camera,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FileSignature,
  HandCoins,
  Home,
  Megaphone,
  SearchCheck,
  Users,
} from "lucide-react";

type IconName =
  | "users"
  | "handCoins"
  | "camera"
  | "megaphone"
  | "home"
  | "fileSignature"
  | "checkCircle"
  | "searchCheck";

type StepCard = {
  id: string;
  number: number;
  title: string;
  description: string;
  duration: string;
  icon: IconName;
};

const iconMap: Record<IconName, React.ComponentType<{ className?: string }>> = {
  users: Users,
  handCoins: HandCoins,
  camera: Camera,
  megaphone: Megaphone,
  home: Home,
  fileSignature: FileSignature,
  checkCircle: CheckCircle2,
  searchCheck: SearchCheck,
};

export default function StepCarousel({ steps }: { steps: StepCard[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % steps.length);
    }, 3200);

    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="relative mx-auto mt-10 max-w-4xl">
      <button
        type="button"
        onClick={() => setIndex((prev) => (prev - 1 + steps.length) % steps.length)}
        aria-label="Předchozí krok"
        className="absolute -left-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/95 text-black shadow-sm transition-colors hover:bg-white md:-left-8 md:h-14 md:w-14"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <div className="overflow-hidden rounded-3xl">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {steps.map((step) => {
            const Icon = iconMap[step.icon];
            return (
              <div key={step.id} className="w-full shrink-0 px-2 py-1">
                <article className="flex min-h-[430px] flex-col items-center rounded-3xl border border-black/10 bg-white/85 p-7 text-center shadow-sm backdrop-blur-sm">
                  <p className="text-5xl font-bold leading-none text-[color:var(--gold2)]">
                    {step.number}.
                  </p>
                  <div className="mt-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3B1] ring-1 ring-black/10">
                    <Icon className="h-5 w-5 text-black" />
                  </div>
                  <h3 className="mt-5 text-2xl font-semibold text-black">{step.title}</h3>
                  <p className="mt-3 max-w-2xl text-base leading-relaxed text-black/70">
                    {step.description}
                  </p>
                  <p className="mt-5 mb-6 inline-flex items-center gap-2 text-base font-semibold text-black/70">
                    <Clock3 className="h-4 w-4 text-[color:var(--gold2)]" />
                    Odhad: {step.duration}
                  </p>
                  <Link
                    href={`/co-vse-pro-vas-udelame#${step.id}`}
                    className="btn-main mt-auto inline-flex items-center gap-2 rounded-full bg-[color:var(--gold1)] px-6 py-3 text-base font-semibold text-black"
                  >
                    Detail
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </article>
              </div>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIndex((prev) => (prev + 1) % steps.length)}
        aria-label="Další krok"
        className="absolute -right-3 top-1/2 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-black/15 bg-white/95 text-black shadow-sm transition-colors hover:bg-white md:-right-8 md:h-14 md:w-14"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    </div>
  );
}
