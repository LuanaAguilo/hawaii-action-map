"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import CountUp from "@/components/CountUp";
import { AVATARS, ACHIEVEMENTS, PROFILE_STATS } from "@/lib/profile";
import { LEVELS, getLevel, isAlii } from "@/lib/levels";

const NAME = "Malia Kahananui";
const INITIALS = "MK";

export default function ProfilePage() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

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

  function handleToggle() {
    if (!isPublic) setShowConfirm(true);
    else setIsPublic(false);
  }

  return (
    <div className="mx-auto max-w-md px-4 pb-10 pt-6">
      {/* Membership card */}
      <div
        className="membership-card card-sheen animate-rise rounded-3xl p-6"
        style={{ animationDelay: "0s" }}
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="section-label text-[10px]">Hawaiʻi Action Map</p>
            <h1 className="mt-2 text-2xl font-extrabold tracking-tight text-white">
              {NAME}
            </h1>
            <div className="mt-2 flex items-center gap-2">
              <span className="rounded-md border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] font-semibold text-white">
                {current.name} · Lvl {current.rank}
              </span>
              {alii && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[11px] font-bold text-black">
                  ✓
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setShowPicker((s) => !s)}
            className="flex h-16 w-16 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-lg ring-1 ring-white/15 transition hover:opacity-90"
            style={{ backgroundColor: avatar.color }}
            title="Change avatar"
          >
            {INITIALS}
          </button>
        </div>

        {/* Progress */}
        <div className="mt-6">
          <div className="mb-2 flex items-end justify-between">
            <span className="text-[11px] font-medium uppercase tracking-wider text-white/50">
              {next ? `${next.minPoints - points} pts to ${next.name}` : "Max level"}
            </span>
            <span className="text-lg font-bold text-white">
              <CountUp value={points} /> <span className="text-xs font-medium text-white/50">pts</span>
            </span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-white transition-all duration-[1200ms] ease-out"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Member since Mar 2025
          </span>
          <span className="text-[10px] font-semibold uppercase tracking-widest text-white/40">
            Kauaʻi
          </span>
        </div>

        {showPicker && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-3">
            <p className="section-label mb-2 text-[10px]">Card color</p>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAvatarIndex(i);
                    setShowPicker(false);
                  }}
                  className="h-9 w-9 rounded-xl ring-1 ring-white/15 transition hover:scale-110"
                  style={{ backgroundColor: a.color }}
                  title={a.label}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Stats row */}
      <div
        className="animate-rise mt-4 grid grid-cols-4 divide-x divide-[var(--border)] rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
        style={{ animationDelay: "0.08s" }}
      >
        {stats.map((s) => (
          <div key={s.label} className="px-2 py-4 text-center">
            <div className="text-2xl font-extrabold tracking-tight text-white">
              <CountUp value={s.value} />
            </div>
            <div className="mt-1 text-[10px] font-semibold uppercase tracking-widest text-[var(--muted-2)]">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Privacy row */}
      <button
        onClick={handleToggle}
        className="animate-rise mt-4 flex w-full items-center justify-between rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-4 text-left"
        style={{ animationDelay: "0.12s" }}
      >
        <div>
          <div className="text-sm font-semibold text-white">
            {isPublic ? "Public profile" : "Private profile"}
          </div>
          <div className="text-xs text-[var(--muted)]">
            {isPublic ? "Neighbors can see your activity" : "Only you can see your activity"}
          </div>
        </div>
        <div
          className={`flex h-7 w-12 items-center rounded-full p-1 transition ${
            isPublic ? "justify-end bg-white" : "justify-start bg-white/15"
          }`}
        >
          <div className={`h-5 w-5 rounded-full ${isPublic ? "bg-black" : "bg-white"}`} />
        </div>
      </button>

      {/* Achievements */}
      <div className="animate-rise mt-6" style={{ animationDelay: "0.16s" }}>
        <div className="mb-3 flex items-baseline justify-between px-1">
          <h2 className="text-sm font-bold text-white">Achievements</h2>
          <span className="text-xs text-[var(--muted)]">
            {ACHIEVEMENTS.filter((a) => a.earned).length} of {ACHIEVEMENTS.length}
          </span>
        </div>
        <div className="scrollbar-hide flex gap-3 overflow-x-auto pb-1">
          {ACHIEVEMENTS.map((a) => (
            <div
              key={a.id}
              className="flex w-28 shrink-0 flex-col items-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center"
            >
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${
                  a.earned ? "bg-white text-black" : "bg-white/5 text-[var(--muted-2)]"
                }`}
              >
                <Icon name={a.icon} className="h-6 w-6" />
              </div>
              <div
                className={`mt-2.5 text-[11px] font-medium leading-tight ${
                  a.earned ? "text-white" : "text-[var(--muted-2)]"
                }`}
              >
                {a.description}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Journey */}
      <div className="animate-rise mt-6" style={{ animationDelay: "0.2s" }}>
        <h2 className="mb-3 px-1 text-sm font-bold text-white">Your Journey</h2>
        <div className="scrollbar-hide flex gap-0 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-4 py-5">
          {LEVELS.map((level, i) => {
            const reached = points >= level.minPoints;
            const isCurrent = level.rank === current.rank;
            return (
              <div key={level.rank} className="flex shrink-0 flex-col items-center" style={{ width: 82 }}>
                <div className="flex w-full items-center">
                  <div className={`h-px flex-1 ${i === 0 ? "opacity-0" : reached ? "bg-white/40" : "bg-white/10"}`} />
                  <div
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition ${
                      isCurrent
                        ? "animate-soft-pulse bg-white text-black"
                        : reached
                        ? "bg-white/10 text-white"
                        : "bg-white/[0.03] text-[var(--muted-2)]"
                    }`}
                  >
                    <Icon name={level.icon} className="h-5 w-5" />
                  </div>
                  <div className={`h-px flex-1 ${i === LEVELS.length - 1 ? "opacity-0" : points >= LEVELS[i + 1].minPoints ? "bg-white/40" : "bg-white/10"}`} />
                </div>
                <span className={`mt-2 text-center text-[10px] font-medium leading-tight ${isCurrent ? "text-white" : "text-[var(--muted-2)]"}`}>
                  {level.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirm popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <div className="animate-rise w-full max-w-sm rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <h3 className="text-lg font-bold text-white">Switch to public?</h3>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Your name, achievements, and activity become visible to other members.
              You can switch back anytime.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] py-3 text-sm font-semibold text-[var(--muted)] hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsPublic(true);
                  setShowConfirm(false);
                }}
                className="flex-1 rounded-xl bg-white py-3 text-sm font-bold text-black hover:opacity-90"
              >
                Make Public
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}