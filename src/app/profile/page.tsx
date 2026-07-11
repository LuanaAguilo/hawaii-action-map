"use client";

import { useState } from "react";
import { AVATARS, ACHIEVEMENTS, PROFILE_STATS } from "@/lib/profile";
import { LEVELS, getLevel, isAlii } from "@/lib/levels";

export default function ProfilePage() {
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [isPublic, setIsPublic] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showAllAchievements, setShowAllAchievements] = useState(true);

  const avatar = AVATARS[avatarIndex];

  const points =
    PROFILE_STATS.reports * 3 +
    PROFILE_STATS.volunteered +
    PROFILE_STATS.donated * 2;

  const { current, next } = getLevel(points);
  const alii = isAlii(points);

  const progressPct = next
    ? Math.round(((points - current.minPoints) / (next.minPoints - current.minPoints)) * 100)
    : 100;

  const earned = ACHIEVEMENTS.filter((a) => a.earned);
  const featured = earned[earned.length - 1];
  const otherEarnedCount = earned.length - 1;

  function handleToggle() {
    if (!isPublic) setShowConfirm(true);
    else setIsPublic(false);
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-6">
      <h1 className="mb-6 font-display text-3xl font-bold tracking-tight text-white">
        Profile
      </h1>

      {/* Header card */}
      <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPicker((s) => !s)}
            className="flex h-20 w-20 items-center justify-center rounded-full text-4xl transition hover:opacity-80"
            style={{ backgroundColor: avatar.color + "33", border: `2px solid ${avatar.color}` }}
            title="Change avatar"
          >
            {avatar.emoji}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-white">Malia Kahananui</h2>
              {alii && (
                <span
                  className="flex h-5 w-5 items-center justify-center rounded-full bg-mint text-[11px] font-bold text-black"
                  title="Verified Aliʻi"
                >
                  ✓
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500">Kauaʻi · Since March 2025</p>
            <span className="mt-1 inline-block rounded-full bg-mint/15 px-2.5 py-0.5 text-xs font-medium text-mint">
              {current.emoji} {current.name} · Level {current.rank}
            </span>
          </div>

          <button onClick={handleToggle} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-14 items-center rounded-full p-1 transition ${
                isPublic ? "justify-end bg-mint" : "justify-start bg-neutral-700"
              }`}
            >
              <div className="h-5 w-5 rounded-full bg-white" />
            </div>
            <span className="text-xs text-neutral-400">
              {isPublic ? "Public" : "Private"} profile
            </span>
          </button>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="text-neutral-400">
              {current.emoji} {current.name}
            </span>
            {next ? (
              <span className="text-neutral-500">
                {next.minPoints - points} pts to {next.emoji} {next.name}
              </span>
            ) : (
              <span className="text-mint">Max level reached 👑</span>
            )}
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
            <div
              className="h-full rounded-full bg-mint transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <p className="mt-1 text-right text-[11px] text-neutral-600">{points} points</p>
        </div>

        {showPicker && (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
            <p className="section-label mb-2">Choose your avatar</p>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAvatarIndex(i);
                    setShowPicker(false);
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full text-2xl transition hover:scale-110"
                  style={{ backgroundColor: a.color + "33", border: `2px solid ${a.color}` }}
                  title={a.label}
                >
                  {a.emoji}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-neutral-600">Upload your own photo coming soon</p>
          </div>
        )}
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        <StatBox value={PROFILE_STATS.reports} label="Reports" />
        <StatBox value={PROFILE_STATS.following} label="Following" />
        <StatBox value={PROFILE_STATS.volunteered} label="Vol. Hours" />
        <StatBox value={PROFILE_STATS.donated} label="Supported" />
      </div>

      {/* Featured achievement strip */}
      <div className="mt-4">
        <button
          onClick={() => setShowAllAchievements((s) => !s)}
          className="flex w-full items-center gap-4 rounded-2xl border border-mint/30 bg-mint/5 p-4 text-left transition hover:border-mint/50"
        >
          <div className="text-3xl">{featured.icon}</div>
          <div className="flex-1">
            <div className="font-display text-base font-semibold text-white">
              {featured.description}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-mint">+{otherEarnedCount}</div>
            <div className="text-[10px] text-neutral-500">
              {showAllAchievements ? "hide" : "more"}
            </div>
          </div>
        </button>

        {showAllAchievements && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a) => (
              <div
                key={a.id}
                className={`rounded-xl border p-4 text-center ${
                  a.earned
                    ? "border-mint/30 bg-mint/5"
                    : "border-[var(--border)] bg-[var(--surface)] opacity-50"
                }`}
              >
                <div className="text-3xl">{a.icon}</div>
                <div className="mt-2 text-sm font-medium text-white">{a.description}</div>
                {a.earned && (
                  <div className="mt-1 text-[10px] font-semibold text-mint">EARNED</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Journey spectrum */}
      <div className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="section-label mb-4">Your Journey</p>
        <div className="flex items-start justify-between gap-1 overflow-x-auto pb-2">
          {LEVELS.map((level, i) => {
            const reached = points >= level.minPoints;
            const isCurrent = level.rank === current.rank;
            return (
              <div key={level.rank} className="flex flex-1 flex-col items-center">
                <div className="flex w-full items-center">
                  <div
                    className={`h-0.5 flex-1 ${i === 0 ? "opacity-0" : reached ? "bg-mint" : "bg-[var(--surface-2)]"}`}
                  />
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-base transition ${
                      isCurrent
                        ? "bg-mint text-black ring-4 ring-mint/30"
                        : reached
                        ? "bg-mint/20 text-white"
                        : "bg-[var(--surface-2)] text-neutral-600 opacity-60"
                    }`}
                  >
                    {level.emoji}
                  </div>
                  <div
                    className={`h-0.5 flex-1 ${i === LEVELS.length - 1 ? "opacity-0" : points >= LEVELS[i + 1].minPoints ? "bg-mint" : "bg-[var(--surface-2)]"}`}
                  />
                </div>
                <span
                  className={`mt-1.5 text-center text-[9px] leading-tight ${
                    isCurrent ? "font-semibold text-mint" : reached ? "text-neutral-400" : "text-neutral-600"
                  }`}
                >
                  {level.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
            <div className="mb-3 text-3xl">🌐</div>
            <h3 className="font-display text-lg font-bold text-white">
              Switch to a public profile?
            </h3>
            <p className="mt-2 text-sm text-neutral-400">
              Your name, avatar, achievements, and community activity will be
              visible to other Hawaiʻi Action Map members. Your private details
              stay protected. You can switch back to private anytime.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-sm font-medium text-neutral-300 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsPublic(true);
                  setShowConfirm(false);
                }}
                className="flex-1 rounded-lg bg-mint py-2.5 text-sm font-semibold text-black hover:opacity-90"
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

function StatBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center">
      <div className="font-display text-2xl font-bold text-mint">{value}</div>
      <div className="mt-0.5 text-xs text-neutral-500">{label}</div>
    </div>
  );
}