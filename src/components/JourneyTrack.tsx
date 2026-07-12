"use client";

import { useRef } from "react";
import Icon from "@/components/Icon";
import { LEVELS, Level } from "@/lib/levels";

export default function JourneyTrack({
  points,
  currentRank,
}: {
  points: number;
  currentRank: number;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = 260;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  }

  return (
    <div className="relative">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-forest shadow-md transition hover:bg-forest hover:text-white"
        aria-label="Scroll left"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
        </svg>
      </button>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-forest shadow-md transition hover:bg-forest hover:text-white"
        aria-label="Scroll right"
      >
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
      </button>

      {/* Scrolling track */}
      <div
        ref={scrollRef}
        className="scrollbar-hide flex gap-0 overflow-x-auto scroll-smooth px-11 py-2"
        style={{ scrollbarWidth: "none" }}
      >
        {LEVELS.map((level: Level, i) => {
          const reached = points >= level.minPoints;
          const isCurrent = level.rank === currentRank;
          const nextReached = i < LEVELS.length - 1 && points >= LEVELS[i + 1].minPoints;
          return (
            <div key={level.rank} className="flex shrink-0 flex-col items-center" style={{ width: 96 }}>
              <div className="flex w-full items-center">
                <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : reached ? "bg-forest" : "bg-[var(--surface-2)]"}`} />
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${
                    isCurrent
                      ? "animate-soft-pulse bg-forest text-white shadow-lg"
                      : reached
                      ? "bg-forest/15 text-forest"
                      : "bg-[var(--surface-2)] text-neutral-400"
                  }`}
                >
                  <Icon name={level.icon} className="h-5 w-5" />
                </div>
                <div className={`h-0.5 flex-1 ${i === LEVELS.length - 1 ? "opacity-0" : nextReached ? "bg-forest" : "bg-[var(--surface-2)]"}`} />
              </div>
              <span
                className={`mt-2 text-center text-[11px] leading-tight ${
                  isCurrent ? "font-semibold text-forest" : reached ? "text-neutral-600" : "text-neutral-400"
                }`}
              >
                {level.name}
              </span>
              <span className="mt-0.5 text-[9px] text-neutral-400">Lv {level.rank}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}