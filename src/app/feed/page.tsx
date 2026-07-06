"use client";

import { useState } from "react";
import { SAMPLE_ISSUES } from "@/lib/issues";
import { statusColor, urgencyColor } from "@/lib/helpers";
import Badge from "@/components/Badge";

const FILTERS = ["Newest", "Urgent", "Needs Funding", "Needs Volunteers", "Resolved"];

const RELIEF = [
  { title: "Kahaunaele Family Flood Recovery", location: "North Shore · Kauaʻi", needs: ["Volunteers", "Truck / Trailer", "Fans", "Storage Bins", "Cleanup Labor"] },
  { title: "Taro Farm Storm Damage — Hanalei Valley", location: "Hanalei Valley · Kauaʻi", needs: ["Volunteers", "Equipment", "Skilled Help", "Cleanup Labor"] },
];

export default function FeedPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-4xl px-8 py-6">
      <div className="mb-5">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Live Action Feed
        </h1>
        <p className="mt-1 text-sm text-neutral-500">Verified cases only · Kauaʻi</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f, i) => (
          <button
            key={f}
            onClick={() => setActive(i)}
            style={active === i ? { backgroundColor: "#7fffd4", color: "#000" } : {}}
            className={
              active === i
                ? "rounded-full px-4 py-1.5 text-xs font-semibold"
                : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-neutral-400 hover:text-white"
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Community Relief cards with image header */}
      <div className="section-label mb-3">Community Relief</div>
      <div className="mb-8 flex flex-col gap-4">
        {RELIEF.map((c) => (
          <div key={c.title} className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
            <div className="relief-glow flex h-32 items-start p-3">
              <span className="rounded-md bg-[var(--surface-2)] px-2 py-0.5 text-[10px] font-semibold text-mint">
                COMMUNITY RELIEF
              </span>
            </div>
            <div className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-2)] text-mint">♥</div>
                <div>
                  <h3 className="font-display text-base font-semibold text-white">{c.title}</h3>
                  <p className="text-xs text-neutral-500">{c.location}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.needs.map((n) => (
                  <span key={n} className="rounded-md bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-300">{n}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-neutral-500">🔒 Exact address hidden for privacy</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="rounded-lg bg-mint py-2.5 text-sm font-semibold text-black hover:opacity-90">Volunteer</button>
                <button className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-sm font-medium text-neutral-300 hover:text-white">Offer Supplies</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active verified cases */}
      <div className="section-label mb-3">{SAMPLE_ISSUES.length} Active Cases</div>
      <div className="flex flex-col gap-4">
        {SAMPLE_ISSUES.map((issue) => (
          <div key={issue.id} className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="font-display text-base font-semibold text-white">{issue.title}</h3>
                <p className="text-xs text-neutral-500">{issue.locationName} · Kauaʻi</p>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <Badge className={statusColor(issue.status)}>{issue.status}</Badge>
                <Badge className={urgencyColor(issue.urgency)}>{issue.urgency}</Badge>
              </div>
            </div>
            <p className="mt-3 text-sm text-neutral-400">{issue.publicSummary}</p>
          </div>
        ))}
      </div>
    </div>
  );
}