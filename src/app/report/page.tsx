"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import { SAMPLE_ISSUES } from "@/lib/issues";
import {
  suggestCategory,
  suggestUrgency,
  suggestDepartment,
  generatePublicSummary,
  generateCountySummary,
  detectPossibleDuplicate,
} from "@/lib/ai";

export default function ReportPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const category = suggestCategory(description);
  const urgency = suggestUrgency(description, category);
  const department = suggestDepartment(category);
  const publicSummary = generatePublicSummary(description, category, location);
  const countySummary = generateCountySummary(category, location, department);
  const isDuplicate = detectPossibleDuplicate(
    location,
    SAMPLE_ISSUES.map((i) => i.locationName)
  );

  const showAI = description.trim().length > 10;

  const steps = [!!photo, title.trim().length > 0, description.trim().length >= 10, location.trim().length > 0];
  const done = steps.filter(Boolean).length;
  const canSubmit = done === steps.length;

  function handlePhoto(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setPhoto(URL.createObjectURL(file));
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <div className="animate-rise mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-forest text-white shadow-2xl">
          <Icon name="check" className="h-11 w-11" />
        </div>
        <h1 className="animate-rise mt-5 font-display text-2xl font-bold text-[var(--foreground)]">
          Pin submitted
        </h1>
        <p className="animate-rise mt-2 text-sm text-neutral-500">
          Pending community verification. Once neighbors confirm it, it becomes
          official and routes to the county.
        </p>
        <div className="animate-rise mt-7 flex justify-center gap-3">
          <Link
            href="/causes"
            style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
            className="rounded-xl px-6 py-3 text-sm font-semibold shadow-lg hover:opacity-90"
          >
            View Pins
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setTitle("");
              setDescription("");
              setLocation("");
              setPhoto(null);
            }}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface)] px-6 py-3 text-sm font-medium text-neutral-600 hover:text-forest"
          >
            Create another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 pb-8 pt-5">
      {/* Header */}
      <div className="mb-4 animate-rise">
        <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">
          Create a Pin
        </h1>
        <p className="mt-0.5 text-sm text-neutral-500">
          Snap it, describe it — we handle the rest
        </p>
      </div>

      {/* AI promise banner — sells the magic upfront */}
      <div
        className="animate-rise mb-4 flex items-start gap-3 rounded-2xl border border-forest/20 bg-forest/[0.04] p-4"
        style={{ animationDelay: "0.04s" }}
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-forest text-white">
          <Icon name="sparkle" className="h-5 w-5" />
        </div>
        <div className="text-xs leading-relaxed text-neutral-600">
          <span className="font-bold text-forest">AI does the work.</span> It reads your
          description, picks the category, sets urgency, writes a clean summary, checks
          for duplicates, and routes it to the right county department.
        </div>
      </div>

      {/* Photo hero */}
      <div className="animate-rise mb-4" style={{ animationDelay: "0.08s" }}>
        {photo ? (
          <div className="relative overflow-hidden rounded-2xl border border-[var(--border)] shadow-md">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={photo} alt="Your photo" className="aspect-[16/10] w-full object-cover" />
            <button
              onClick={() => setPhoto(null)}
              className="absolute right-3 top-3 rounded-full bg-black/60 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur hover:bg-black/80"
            >
              Replace
            </button>
            <span className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-forest px-3 py-1 text-xs font-semibold text-white shadow-lg">
              <Icon name="check" className="h-3.5 w-3.5" />
              Photo added
            </span>
          </div>
        ) : (
          <label className="group relative flex aspect-[16/10] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm transition hover:shadow-lg">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(135deg, #2d4a3e 0%, #3f6152 45%, #8b6f52 100%)",
              }}
            />
            <div className="relative flex flex-col items-center text-white">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 backdrop-blur transition group-hover:scale-110">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </div>
              <div className="mt-3 font-display text-lg font-bold">Add a photo</div>
              <div className="mt-0.5 text-xs text-white/70">
                Photos are how pins get verified
              </div>
            </div>
            <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
          </label>
        )}
      </div>

      {/* Details */}
      <div
        className="animate-rise rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
        style={{ animationDelay: "0.12s" }}
      >
        <div className="flex flex-col gap-5">
          <Field iconPath="title" label="Title">
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Broken bathroom at Kealia Beach"
              className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-1.5 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:border-forest focus:outline-none focus:ring-0"
            />
          </Field>

          <Field iconPath="describe" label="What's happening?">
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              placeholder="Describe the problem in your own words..."
              className="w-full resize-none border-0 border-b border-[var(--border)] bg-transparent px-0 py-1.5 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:border-forest focus:outline-none focus:ring-0"
            />
          </Field>

          <Field iconPath="location" label="Location">
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Kealia Beach"
              className="w-full border-0 border-b border-[var(--border)] bg-transparent px-0 py-1.5 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:border-forest focus:outline-none focus:ring-0"
            />
          </Field>
        </div>
      </div>

      {/* AI reveal */}
      {showAI && (
        <div className="animate-rise mt-4 overflow-hidden rounded-2xl border border-forest/25 shadow-md">
          <div className="flex items-center justify-between bg-forest px-5 py-3 text-white">
            <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide">
              <Icon name="sparkle" className="h-4 w-4" />
              AI Analysis
            </span>
            <span className="flex items-center gap-1.5 text-[10px] font-semibold text-white/70">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
              </span>
              LIVE
            </span>
          </div>

          <div className="bg-[var(--surface)] p-5">
            {isDuplicate && (
              <div className="mb-3 rounded-lg border border-mustard/40 bg-mustard/10 px-3 py-2 text-xs font-medium text-[#8a6d10]">
                Possible duplicate — a pin near this location may already exist.
              </div>
            )}

            <div className="mb-4 grid grid-cols-3 gap-2">
              <Chip label="Category" value={category} />
              <Chip label="Urgency" value={urgency} />
              <Chip label="Routes to" value={department} />
            </div>

            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
              Public summary
            </p>
            <p className="mb-3 text-sm text-neutral-600">{publicSummary}</p>

            <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-neutral-400">
              County summary
            </p>
            <p className="text-sm text-neutral-600">{countySummary}</p>
          </div>
        </div>
      )}

      {/* Submit */}
      <button
        onClick={() => setSubmitted(true)}
        disabled={!canSubmit}
        style={canSubmit ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
        className="mt-5 w-full rounded-xl py-4 text-sm font-bold shadow-lg transition disabled:cursor-not-allowed disabled:bg-[var(--surface-2)] disabled:text-neutral-400 disabled:shadow-none"
      >
        {canSubmit ? "Submit Pin" : "Submit Pin"}
      </button>
      {!canSubmit && (
        <p className="mt-2 text-center text-xs text-neutral-400">
          {4 - done} field{4 - done === 1 ? "" : "s"} left
        </p>
      )}
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl bg-[var(--surface-2)] px-3 py-2 text-center">
      <div className="text-[9px] font-bold uppercase tracking-wide text-neutral-400">{label}</div>
      <div className="mt-0.5 text-[11px] font-semibold leading-tight text-forest">{value}</div>
    </div>
  );
}

function FieldIcon({ name }: { name: string }) {
  const c = "h-4 w-4";
  if (name === "title")
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
      </svg>
    );
  if (name === "describe")
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
      </svg>
    );
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    </svg>
  );
}

function Field({
  iconPath,
  label,
  children,
}: {
  iconPath: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--surface-2)] text-forest">
        <FieldIcon name={iconPath} />
      </div>
      <div className="flex-1">
        <label className="mb-0.5 block text-[11px] font-bold uppercase tracking-wide text-neutral-400">
          {label}
        </label>
        {children}
      </div>
    </div>
  );
}