"use client";

import { useState } from "react";

type NeedCase = {
  title: string;
  location: string;
  type: "RELIEF" | "VERIFIED";
  urgency?: "HIGH" | "MEDIUM";
  needs: string[];
  volunteers?: string;
  raised?: string;
};

const CASES: NeedCase[] = [
  {
    title: "Kahaunaele Family Flood Recovery",
    location: "North Shore · Kauaʻi",
    type: "RELIEF",
    needs: ["Volunteers", "Truck / Trailer", "Fans", "Storage Bins", "Cleanup Labor"],
    volunteers: "6 of 8 volunteers signed up",
  },
  {
    title: "Taro Farm Storm Damage — Hanalei Valley",
    location: "Hanalei Valley · Kauaʻi",
    type: "RELIEF",
    needs: ["Volunteers", "Equipment", "Skilled Help", "Cleanup Labor"],
    volunteers: "2 of 10 volunteers signed up",
  },
  {
    title: "Illegal Dumping Near Wailua River Access",
    location: "Wailua Area · Kauaʻi",
    type: "VERIFIED",
    urgency: "HIGH",
    needs: ["Volunteers", "Cleanup Labor"],
    volunteers: "12 volunteers signed up — more needed",
    raised: "$6,420 of $7,000 raised",
  },
];

const FILTERS = ["All", "Needs Volunteers", "Needs Funding", "Needs Supplies", "Urgent Safety Concern", "Community Relief"];

export default function NeedsHelpPage() {
  const [active, setActive] = useState(0);

  return (
    <div className="mx-auto max-w-3xl px-8 py-6">
      <div className="mb-5 animate-rise">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Needs Help Now
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {CASES.length} active needs · Kauaʻi
        </p>
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

      <div className="section-label mb-3 animate-rise" style={{ animationDelay: "0.1s" }}>Community Relief</div>
      <div className="flex flex-col gap-4">
        {CASES.map((c, idx) => (
          <div
            key={c.title}
            className="relief-glow card-lift animate-rise rounded-2xl border border-[var(--border)] p-5"
            style={{ animationDelay: `${0.15 + idx * 0.08}s` }}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-forest/10 text-forest">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-[var(--foreground)]">
                    {c.title}
                  </h3>
                  <p className="text-xs text-neutral-500">{c.location}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="rounded-md bg-forest/10 px-2 py-0.5 text-[10px] font-semibold text-forest">
                  {c.type}
                </span>
                {c.urgency && (
                  <span className="rounded-md bg-rose/10 px-2 py-0.5 text-[10px] font-semibold text-rose">
                    {c.urgency}
                  </span>
                )}
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-[var(--border)] bg-[var(--surface-2)]/60 p-3">
              <div className="section-label mb-2 text-forest">Needs:</div>
              <div className="flex flex-wrap gap-2">
                {c.needs.map((n) => (
                  <span
                    key={n}
                    className="rounded-md bg-[var(--surface)] px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-neutral-600"
                  >
                    {n}
                  </span>
                ))}
              </div>
            </div>

            {c.volunteers && (
              <p className="mt-3 text-xs text-neutral-500">{c.volunteers}</p>
            )}
            {c.raised && (
              <>
                <p className="mt-1 text-xs text-neutral-500">{c.raised}</p>
                <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                  <div className="h-full rounded-full bg-forest" style={{ width: "91%" }} />
                </div>
              </>
            )}

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="rounded-lg bg-forest py-2.5 text-sm font-semibold text-white hover:opacity-90">
                Volunteer
              </button>
              <button className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-sm font-medium text-neutral-600 hover:text-forest">
                Offer Supplies
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}