"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import Icon from "@/components/Icon";
import CountUp from "@/components/CountUp";
import LanguageToggle from "@/components/LanguageToggle";
import { AVATARS, ACHIEVEMENTS, PROFILE_STATS } from "@/lib/profile";
import { LEVELS, getLevel, isAlii } from "@/lib/levels";

const NAME = "Malia Kahananui";
const INITIALS = "MK";

export default function ProfilePage() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const journeyRef = useRef<HTMLDivElement>(null);

  const avatar = AVATARS[avatarIndex];

  const points =
    PROFILE_STATS.reports * 3 + PROFILE_STATS.volunteered + PROFILE_STATS.donated * 2;
  const { current, next } = getLevel(points);
  const alii = isAlii(points);
  const progressPct = next
    ? Math.round(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100)
    : 100;

  const stats = [
    { value: PROFILE_STATS.reports, label: "Pins" },
    { value: PROFILE_STATS.following, label: "Following" },
    { value: PROFILE_STATS.volunteered, label: "Hours" },
    { value: PROFILE_STATS.donated, label: "Backed" },
  ];

  function scrollJourney(dir: "left" | "right") {
    journeyRef.current?.scrollBy({ left: dir === "left" ? -260 : 260, behavior: "smooth" });
  }

  function handleToggle() {
    if (!isPublic) setShowConfirm(true);
    else setIsPublic(false);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 pb-10 pt-6">
      {/* Title + language + search */}
      <div className="mb-3 flex items-center justify-between animate-rise">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Profile
        </h1>
        <div className="flex items-center gap-2">
          <LanguageToggle />
          <Link
            href="/search"
            aria-label="Search"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-forest/40 hover:text-forest"
          >
            <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Membership card */}
      <div className="membership-card card-sheen animate-rise rounded-3xl p-7">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-white/50">
              Hawaiʻi Action Map
            </p>
            <h2 className="mt-2.5 text-3xl font-extrabold tracking-tight text-white">{NAME}</h2>
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-lg border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-white">
                {current.name} · Lvl {current.rank}
              </span>
              {alii && (
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-xs font-bold text-[var(--forest)]">
                  ✓
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowPicker((s) => !s)}
            className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-lg ring-2 ring-white/20 transition hover:opacity-90"
            style={{ backgroundColor: avatar.color }}
            title="Change avatar"
          >
            {INITIALS}
          </button>
        </div>

        <div className="mt-7">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-white/60">
              {next ? `${next.minPoints - points} pts to ${next.name}` : "Max level"}
            </span>
            <span className="text-xl font-bold text-white">
              <CountUp value={points} /> <span className="text-sm font-medium text-white/60">pts</span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/15">
            <div
              className="h-full rounded-full bg-white transition-all duration-[1200ms] ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Member since Mar 2025
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-widest text-white/50">
            Kauaʻi
          </span>
        </div>

        {showPicker && (
          <div className="mt-4 rounded-2xl border border-white/15 bg-black/15 p-3">
            <p className="mb-2 text-[11px] font-bold uppercase tracking-widest text-white/60">Card color</p>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAvatarIndex(i);
                    setShowPicker(false);
                  }}
                  className="h-10 w-10 rounded-xl ring-2 ring-white/20 transition hover:scale-110"
                  style={{ backgroundColor: a.color }}
                  title={a.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats strip */}
      <div className="animate-rise mt-5 grid grid-cols-4 divide-x divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]" style={{ animationDelay: "0.08s" }}>
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-5 text-center">
            <div className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
              <CountUp value={s.value} />
            </div>
            <div className="mt-1.5 text-[11px] font-semibold uppercase tracking-widest text-[var(--muted-2)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Privacy row */}
      <button
        onClick={handleToggle}
        className="animate-rise mt-5 flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-6 py-5 text-left"
        style={{ animationDelay: "0.12s" }}
      >
        <div>
          <div className="text-base font-semibold text-[var(--foreground)]">
            {isPublic ? "Public profile" : "Private profile"}
          </div>
          <div className="text-sm text-[var(--muted)]">
            {isPublic ? "Neighbors can see your activity" : "Only you can see your activity"}
          </div>
        </div>
        <div className={`flex h-8 w-14 items-center rounded-full p-1 transition ${isPublic ? "justify-end bg-forest" : "justify-start bg-[var(--surface-2)]"}`}>
          <div className={`h-6 w-6 rounded-full ${isPublic ? "bg-white" : "bg-[var(--muted)]"}`} />
        </div>
      </button>

      {/* Achievements — full grid */}
      <div className="animate-rise mt-8" style={{ animationDelay: "0.16s" }}>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-[var(--foreground)]">Achievements</h2>
          <span className="text-sm text-[var(--muted)]">
            {ACHIEVEMENTS.filter((a) => a.earned).length} of {ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.id}
              className="card-lift flex flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 text-center"
            >
              <div className={`flex h-16 w-16 items-center justify-center rounded-full ${a.earned ? "bg-forest text-white" : "bg-[var(--surface-2)] text-[var(--muted-2)]"}`}>
                <Icon name={a.icon} className="h-8 w-8" />
              </div>
              <div className={`mt-3 text-xs font-medium leading-snug ${a.earned ? "text-[var(--foreground)]" : "text-[var(--muted-2)]"}`}>
                {a.description}
              </div>
              {a.earned && (
                <div className="mt-1.5 text-[10px] font-bold uppercase tracking-widest text-forest">Earned</div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Journey */}
      <div className="animate-rise mt-8" style={{ animationDelay: "0.2s" }}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-[var(--foreground)]">Your Journey</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scrollJourney("left")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-forest transition hover:bg-forest hover:text-white"
              aria-label="Scroll left"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
              </svg>
            </button>
            <button
              onClick={() => scrollJourney("right")}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-forest transition hover:bg-forest hover:text-white"
              aria-label="Scroll right"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
        <div ref={journeyRef} className="scrollbar-hide flex gap-0 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-6">
          {LEVELS.map((level, i) => {
            const reached = points >= level.minPoints;
            const isCurrent = level.rank === current.rank;
            return (
              <div key={level.rank} className="flex shrink-0 flex-col items-center" style={{ width: 92 }}>
                <div className="flex w-full items-center">
                  <div className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : reached ? "bg-forest/40" : "bg-[var(--border)]"}`} />
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full transition ${isCurrent ? "animate-soft-pulse bg-forest text-white" : reached ? "bg-forest/15 text-forest" : "bg-[var(--surface-2)] text-[var(--muted-2)]"}`} >
                    <Icon name={level.icon} className="h-6 w-6" />
                  </div>
                  <div className={`h-0.5 flex-1 ${i === LEVELS.length - 1 ? "opacity-0" : points >= LEVELS[i + 1].minPoints ? "bg-forest/40" : "bg-[var(--border)]"}`} />
                </div>
                <span className={`mt-2.5 text-center text-[11px] font-medium leading-tight ${isCurrent ? "text-forest" : "text-[var(--muted-2)]"}`}>
                  {level.name}
                </span>
                <span className="mt-0.5 text-[10px] text-[var(--muted-2)]">Lv {level.rank}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
          <div className="animate-rise w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-bold text-[var(--foreground)]">Switch to public?</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Your name, achievements, and activity become visible to other members. You can switch back anytime.
            </p>
            <div className="mt-5 flex gap-3">
              <button onClick={() => setShowConfirm(false)} className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] py-3 text-sm font-semibold text-[var(--muted)] hover:text-forest">
                Cancel
              </button>
              <button onClick={() => { setIsPublic(true); setShowConfirm(false); }} className="flex-1 rounded-xl bg-forest py-3 text-sm font-bold text-white hover:opacity-90">
                Make Public
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}