"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import CountUp from "@/components/CountUp";
import JourneyTrack from "@/components/JourneyTrack";
import { AVATARS, ACHIEVEMENTS, PROFILE_STATS } from "@/lib/profile";
import { getLevel, isAlii } from "@/lib/levels";

const NAME = "Malia Kahananui";
const INITIALS = "MK";

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
      <h1 className="mb-6 animate-rise font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
        Profile
      </h1>

      {/* Header card — gradient hero */}
      <div className="hero-gradient animate-rise overflow-hidden rounded-2xl border border-[var(--border)] p-6 shadow-[0_10px_40px_-20px_rgba(42,38,32,0.25)]">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setShowPicker((s) => !s)}
            className="flex h-20 w-20 items-center justify-center rounded-full font-display text-2xl font-bold text-white shadow-lg ring-4 ring-white/60 transition hover:opacity-90"
            style={{ backgroundColor: avatar.color }}
            title="Change avatar"
          >
            {INITIALS}
          </button>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-[var(--foreground)]">{NAME}</h2>
              {alii && (
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-mustard text-[11px] font-bold text-white" title="Verified Aliʻi">
                  ✓
                </span>
              )}
            </div>
            <p className="text-sm text-neutral-500">Kauaʻi · Since March 2025</p>
            <span className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white">
              <Icon name={current.icon} className="h-3.5 w-3.5" />
              {current.name} · Level {current.rank}
            </span>
          </div>

          <button onClick={handleToggle} className="flex flex-col items-center gap-1">
            <div
              className={`flex h-7 w-14 items-center rounded-full p-1 transition ${
                isPublic ? "justify-end bg-forest" : "justify-start bg-neutral-300"
              }`}
            >
              <div className="h-5 w-5 rounded-full bg-white shadow" />
            </div>
            <span className="text-xs text-neutral-500">
              {isPublic ? "Public" : "Private"} profile
            </span>
          </button>
        </div>

        {/* Progress to next level */}
        <div className="mt-5">
          <div className="mb-1.5 flex justify-between text-xs">
            <span className="flex items-center gap-1 font-medium text-forest">
              <Icon name={current.icon} className="h-3.5 w-3.5" />
              {current.name}
            </span>
            {next ? (
              <span className="text-neutral-500">
                <span className="font-semibold text-clay">{next.minPoints - points} pts</span> to {next.name}
              </span>
            ) : (
              <span className="font-semibold text-mustard">Max level reached</span>
            )}
          </div>
          <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/70">
            <div
              className="h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPct}%`, background: "linear-gradient(90deg, var(--forest), var(--clay))" }}
            />
          </div>
          <p className="mt-1 text-right text-[11px] text-neutral-400">{points} points</p>
        </div>

        {showPicker && (
          <div className="mt-4 rounded-xl border border-[var(--border)] bg-white/60 p-3">
            <p className="section-label mb-2">Choose your color</p>
            <div className="flex flex-wrap gap-2">
              {AVATARS.map((a, i) => (
                <button
                  key={a.id}
                  onClick={() => {
                    setAvatarIndex(i);
                    setShowPicker(false);
                  }}
                  className="flex h-12 w-12 items-center justify-center rounded-full font-display text-sm font-bold text-white shadow transition hover:scale-110"
                  style={{ backgroundColor: a.color }}
                  title={a.label}
                >
                  {INITIALS}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-neutral-400">Upload your own photo coming soon</p>
          </div>
        )}
      </div>

      {/* Stats — counting up */}
      <div className="mt-4 grid grid-cols-4 gap-3">
        <StatBox value={PROFILE_STATS.reports} label="Reports" delay="0.05s" />
        <StatBox value={PROFILE_STATS.following} label="Following" delay="0.1s" />
        <StatBox value={PROFILE_STATS.volunteered} label="Vol. Hours" delay="0.15s" />
        <StatBox value={PROFILE_STATS.donated} label="Supported" delay="0.2s" />
      </div>

      {/* Featured achievement */}
      <div className="mt-4">
        <button
          onClick={() => setShowAllAchievements((s) => !s)}
          className="card-lift flex w-full items-center gap-4 rounded-2xl border border-mustard/30 bg-mustard/5 p-4 text-left"
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-mustard/15 text-mustard">
            <Icon name={featured.icon} />
          </div>
          <div className="flex-1">
            <div className="font-display text-base font-semibold text-[var(--foreground)]">
              {featured.description}
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-mustard">+{otherEarnedCount}</div>
            <div className="text-[10px] text-neutral-400">
              {showAllAchievements ? "hide" : "more"}
            </div>
          </div>
        </button>

        {showAllAchievements && (
          <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a, i) => (
              <div
                key={a.id}
                className={`card-lift animate-rise rounded-xl border p-4 text-center ${
                  a.earned
                    ? "border-mustard/25 bg-mustard/5"
                    : "border-[var(--border)] bg-[var(--surface)] opacity-50"
                }`}
                style={{ animationDelay: `${i * 0.05}s` }}
              >
                <div
                  className={`mx-auto flex h-11 w-11 items-center justify-center rounded-full ${
                    a.earned ? "bg-mustard/15 text-mustard" : "bg-[var(--surface-2)] text-neutral-400"
                  }`}
                >
                  <Icon name={a.icon} className="h-6 w-6" />
                </div>
                <div className="mt-2 text-sm font-medium text-[var(--foreground)]">{a.description}</div>
                {a.earned && (
                  <div className="mt-1 text-[10px] font-semibold tracking-wide text-mustard">EARNED</div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Journey spectrum — scrollable */}
      <div className="animate-rise mt-6 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <p className="section-label mb-4">Your Journey</p>
        <JourneyTrack points={points} currentRank={current.rank} />
      </div>

      {/* Confirmation popup */}
      {showConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="animate-rise w-full max-w-md rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-2xl">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-forest/10 text-forest">
              <Icon name="shield" />
            </div>
            <h3 className="font-display text-lg font-bold text-[var(--foreground)]">
              Switch to a public profile?
            </h3>
            <p className="mt-2 text-sm text-neutral-500">
              Your name, avatar, achievements, and community activity will be
              visible to other Hawaiʻi Action Map members. Your private details
              stay protected. You can switch back to private anytime.
            </p>
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-sm font-medium text-neutral-600 hover:text-forest"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setIsPublic(true);
                  setShowConfirm(false);
                }}
                className="flex-1 rounded-lg bg-forest py-2.5 text-sm font-semibold text-white hover:opacity-90"
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

function StatBox({ value, label, delay }: { value: number; label: string; delay: string }) {
  return (
    <div
      className="card-lift animate-rise rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-center"
      style={{ animationDelay: delay }}
    >
      <div className="font-display text-2xl font-bold text-forest">
        <CountUp value={value} />
      </div>
      <div className="mt-0.5 text-xs text-neutral-500">{label}</div>
    </div>
  );
}