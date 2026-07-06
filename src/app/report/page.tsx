"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import { SAMPLE_ISSUES } from "@/lib/issues";
import { urgencyColor } from "@/lib/helpers";
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

  if (submitted) {
    return (
      <div className="mx-auto max-w-2xl px-8 py-20 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 font-display text-2xl font-bold text-white">
          Report submitted
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Thank you. Your report has been added and the community can now confirm
          it. (Demo — not yet saved to a database.)
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/dashboard"
            className="rounded-lg bg-mint px-5 py-2.5 text-sm font-semibold text-black hover:opacity-90"
          >
            View dashboard
          </Link>
          <button
            onClick={() => {
              setSubmitted(false);
              setTitle("");
              setDescription("");
              setLocation("");
            }}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-neutral-300 hover:text-white"
          >
            Report another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-8 py-6">
      <h1 className="font-display text-3xl font-bold tracking-tight text-white">
        Report an Issue
      </h1>
      <p className="mb-6 mt-1 text-sm text-neutral-500">
        Describe what you see. Our AI will organize it for you.
      </p>

      <div className="flex flex-col gap-4">
        <Field label="Issue title">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Broken bathroom at Kealia Beach"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-mint focus:outline-none"
          />
        </Field>

        <Field label="Description">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            placeholder="Describe the problem in your own words..."
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-mint focus:outline-none"
          />
        </Field>

        <Field label="Location name">
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. Kealia Beach"
            className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface)] px-3 py-2.5 text-sm text-white placeholder-neutral-600 focus:border-mint focus:outline-none"
          />
        </Field>

        <Field label="Photo (coming soon)">
          <div className="flex h-24 items-center justify-center rounded-lg border border-dashed border-[var(--border)] bg-[var(--surface)]/50 text-xs text-neutral-600">
            Photo upload coming soon
          </div>
        </Field>

        {showAI && (
          <div className="relief-glow rounded-2xl border border-[var(--border)] p-5">
            <h2 className="section-label mb-3 text-mint">✨ AI Suggestions</h2>

            {isDuplicate && (
              <div className="mb-3 rounded-lg border border-amber-800/50 bg-amber-950/30 px-3 py-2 text-xs text-amber-300">
                ⚠ Possible duplicate — an issue near this location may already exist.
              </div>
            )}

            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="text-xs text-neutral-500">Category:</span>
              <span className="text-xs font-medium text-mint">{category}</span>
              <Badge className={urgencyColor(urgency)}>{urgency}</Badge>
              <span className="text-xs text-neutral-500">→ {department}</span>
            </div>

            <p className="mb-1 text-xs font-semibold text-neutral-400">Public summary</p>
            <p className="mb-3 text-sm text-neutral-300">{publicSummary}</p>

            <p className="mb-1 text-xs font-semibold text-neutral-400">County summary</p>
            <p className="text-sm text-neutral-300">{countySummary}</p>
          </div>
        )}

        <button
          onClick={() => setSubmitted(true)}
          disabled={!title.trim() || description.trim().length < 10}
          className="mt-2 rounded-lg bg-mint px-6 py-2.5 text-sm font-semibold text-black hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Submit Report
        </button>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-neutral-300">
        {label}
      </label>
      {children}
    </div>
  );
}