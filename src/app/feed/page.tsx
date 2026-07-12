"use client";

import { useState } from "react";
import SocialIssueCard from "@/components/SocialIssueCard";
import { SAMPLE_ISSUES } from "@/lib/issues";

const FILTERS = ["Newest", "Urgent", "Needs Funding", "Needs Volunteers", "Resolved"];

const RELIEF = [
  { title: "Kahaunaele Family Flood Recovery", location: "North Shore · Kauaʻi", needs: ["Volunteers", "Truck / Trailer", "Fans", "Storage Bins", "Cleanup Labor"] },
  { title: "Taro Farm Storm Damage — Hanalei Valley", location: "Hanalei Valley · Kauaʻi", needs: ["Volunteers", "Equipment", "Skilled Help", "Cleanup Labor"] },
];

export default function FeedPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <div className="mb-5 animate-rise">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Live Action Feed
        </h1>
        <p className="mt-1 text-sm text-neutral-500">Verified cases only · Kauaʻi</p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2 animate-rise" style={{ animationDelay: "0.05s" }}>
        {FILTERS.map((f, i) => (
          <button
            key={f}
            onClick={() => setActive(i)}
            style={active === i ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
            className={
              active === i
                ? "rounded-full px-4 py-1.5 text-xs font-semibold"
                : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-neutral-500 hover:text-forest"
            }
          >
            {f}
          </button>
        ))}
      </div>

      {/* Community Relief */}
      <div className="section-label mb-3 animate-rise" style={{ animationDelay: "0.1s" }}>Community Relief</div>
      <div className="mb-8 flex flex-col gap-4">
        {RELIEF.map((c, idx) => (
          <div
            key={c.title}
            className="relief-glow card-lift animate-rise overflow-hidden rounded-2xl border border-[var(--border)]"
            style={{ animationDelay: `${0.15 + idx * 0.08}s` }}
          >
            <div className="flex h-28 items-start p-3">
              <span className="rounded-md bg-forest/10 px-2 py-0.5 text-[10px] font-semibold text-forest">
                COMMUNITY RELIEF
              </span>
            </div>
            <div className="px-5 pb-5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-forest">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--foreground)]">{c.title}</h3>
                  <p className="text-xs text-neutral-500">{c.location}</p>
                </div>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.needs.map((n) => (
                  <span key={n} className="rounded-md bg-[var(--surface-2)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-600">{n}</span>
                ))}
              </div>
              <p className="mt-3 text-xs text-neutral-500">Exact address hidden for privacy</p>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button className="rounded-lg bg-forest py-2.5 text-sm font-semibold text-white hover:opacity-90">Volunteer</button>
                <button className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-sm font-medium text-neutral-600 hover:text-forest">Offer Supplies</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Active cases */}
      <div className="section-label mb-3 animate-rise" style={{ animationDelay: "0.2s" }}>{SAMPLE_ISSUES.length} Active Cases</div>
      <div className="flex flex-col gap-4">
        {SAMPLE_ISSUES.map((issue, i) => (
          <div key={issue.id} className="animate-rise" style={{ animationDelay: `${0.25 + i * 0.07}s` }}>
            <SocialIssueCard issue={issue} />
          </div>
        ))}
      </div>
    </div>
  );
}