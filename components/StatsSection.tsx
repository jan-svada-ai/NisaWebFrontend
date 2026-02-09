"use client";

import { useEffect, useRef, useState } from "react";
import { Home, Building2, Star, Briefcase } from "lucide-react";

interface StatItem {
  value: number;
  label: string;
  suffix?: string;
  duration?: number;
  icon?: "home" | "building" | "star" | "briefcase";
}

interface StatsSectionProps {
  stats: StatItem[];
}

function AnimatedNumber({
  value,
  duration = 1.5,
}: {
  value: number;
  duration?: number;
}) {
  const [displayValue, setDisplayValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;

          const startTime = Date.now();
          const startValue = 0;

          const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / (duration * 1000), 1);

            const currentValue = Math.floor(
              startValue + (value - startValue) * progress,
            );
            setDisplayValue(currentValue);

            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };

          requestAnimationFrame(animate);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, duration]);

  return <div ref={ref}>{displayValue}</div>;
}

function getIcon(iconName?: string) {
  const iconProps = "h-6 w-6";
  switch (iconName) {
    case "home":
      return <Home className={iconProps} />;
    case "building":
      return <Building2 className={iconProps} />;
    case "star":
      return <Star className={iconProps} />;
    case "briefcase":
      return <Briefcase className={iconProps} />;
    default:
      return null;
  }
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="border-t border-black/10">
      <div className="mx-auto max-w-screen-2xl px-6 py-16 md:py-24">
        {/* Heading */}
        <div className="mb-16 text-center md:mb-20">
          <p className="mb-3 text-sm uppercase tracking-[0.2em] text-black/60">
            Naše zkušenosti
          </p>
          <h2 className="text-3xl font-semibold text-black md:text-4xl">
            <span className="inline-flex flex-col items-center">
              <span>Stovky uskutečněných obchodů</span>
              <span className="mt-3 h-[6px] w-full [clip-path:polygon(0_50%,30%_0,70%_0,100%_50%,70%_100%,30%_100%)] bg-[linear-gradient(90deg,rgba(230,194,94,0.25)_0%,rgba(230,194,94,0.95)_25%,rgba(230,194,94,0.95)_75%,rgba(230,194,94,0.25)_100%)]" />
            </span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group rounded-3xl border border-black/10 bg-white/85 p-8 shadow-md backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col items-center text-center"
            >
              {/* Icon */}
              {stat.icon && (
                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F6E3B1] text-black ring-1 ring-black/10 group-hover:scale-110 transition-transform duration-300">
                  {getIcon(stat.icon)}
                </div>
              )}

              {/* Number Container */}
              <div className="mb-4">
                <div className="text-5xl font-bold text-[color:var(--gold1)] tabular-nums flex flex-row items-center gap-1">
                  <AnimatedNumber
                    value={stat.value}
                    duration={stat.duration || 1.5}
                  />
                  {stat.suffix && (
                    <span className="text-5xl">{stat.suffix}</span>
                  )}
                </div>
              </div>

              {/* Label */}
              <p className="text-sm font-semibold text-black/80">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
