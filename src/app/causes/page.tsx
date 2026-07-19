"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Icon from "@/components/Icon";

type Cause = {
  id: string;
  title: string;
  location: string;
  category: string;
  image: string;
  status: "Needs Volunteers" | "Needs Funding" | "Sent to County" | "In Progress" | "Resolved";
  backers: number;
  daysOpen: number;
  volunteersHave?: number;
  volunteersNeed?: number;
  raised?: number;
  goal?: number;
  summary: string;
};

const CAUSES: Cause[] = [
  {
    id: "c1",
    title: "Illegal dumping site near Wailua River access",
    location: "Wailua · Kauaʻi",
    category: "Illegal Dumping",
    image: "/pin-dumping.png",
    status: "Needs Volunteers",
    backers: 31,
    daysOpen: 14,
    volunteersHave: 12,
    volunteersNeed: 20,
    raised: 6420,
    goal: 7000,
    summary:
      "Verified dumping site with furniture and construction debris. Community cleanup organizing now — county has been notified.",
  },
  {
    id: "c2",
    title: "Kealia Beach bathroom needs repair",
    location: "Kealia Beach · Kauaʻi",
    category: "Public Facility",
    image: "/pin-bathroom.png",
    status: "Sent to County",
    backers: 23,
    daysOpen: 8,
    summary:
      "Verified unsanitary conditions at Kealia Beach restroom. Photos confirmed by 23 neighbors. Routed to Parks and Recreation.",
  },
  {
    id: "c3",
    title: "Large pothole on Kuhio Highway",
    location: "Near Wailua · Kauaʻi",
    category: "Road Hazard",
    image: "/pin-pothole.png",
    status: "In Progress",
    backers: 18,
    daysOpen: 10,
    summary:
      "Verified road hazard confirmed by multiple drivers. Jurisdiction under review — possible state road. Public Works notified.",
  },
  {
    id: "c4",
    title: "Taro farm storm damage — Hanalei Valley",
    location: "Hanalei Valley · Kauaʻi",
    category: "Community Relief",
    image: "/pin-taro-farm.png",
    status: "Needs Volunteers",
    backers: 44,
    daysOpen: 5,
    volunteersHave: 2,
    volunteersNeed: 10,
    summary:
      "Verified storm damage to family taro farm. Cleanup crew and equipment needed this weekend.",
  },
  {
    id: "c5",
    title: "Blocked public beach access on North Shore",
    location: "North Shore · Kauaʻi",
    category: "Public Access",
    image: "/pin-beach-access.png",
    status: "Needs Funding",
    backers: 27,
    daysOpen: 6,
    raised: 1850,
    goal: 5000,
    summary:
      "Verified blocked public access path. Legal review and signage funding needed to restore access.",
  },
  {
    id: "c6",
    title: "Wailua River cleanup",
    location: "Wailua · Kauaʻi",
    category: "Environmental",
    image: "/pin-river-cleanup.png",
    status: "Resolved",
    backers: 62,
    daysOpen: 0,
    summary:
      "4,800 lbs of debris removed by 38 volunteers. Site fully restored. Mahalo to everyone who showed up.",
  },
];

const STATUS_COLORS: Record<string, string> = {
  "Needs Volunteers": "#8b6f52",
  "Needs Funding": "#c9a227",
  "Sent to County": "#4a6d7c",
  "In Progress": "#d97706",
  Resolved: "#2d4a3e",
};

const FILTERS = ["All", "Needs Volunteers", "Needs Funding", "Sent to County", "Resolved"];

export default function CausesPage() {
  const [active, setActive] = useState(0);

  const filter = FILTERS[active];
  const causes = filter === "All" ? CAUSES : CAUSES.filter((c) => c.status === filter);

  return (
    <div className="mx-auto max-w-2xl px-4 py-5">
      <div className="mb-4 animate-rise">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Pins
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Verified reports the community is acting on
        </p>
      </div>

      <Link
        href="/report"
        style={{ backgroundColor: "#2d4a3e", color: "#fff", animationDelay: "0.05s" }}
        className="animate-rise mb-5 flex items-center justify-center gap-2 rounded-2xl px-5 py-4 text-base font-bold shadow-md transition hover:opacity-90"
      >
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
        Report an Issue
      </Link>

      <div
        className="mb-4 flex gap-2 overflow-x-auto pb-1 animate-rise"
        style={{ animationDelay: "0.1s", scrollbarWidth: "none" }}
      >
        {FILTERS.map((f, i) => (
          <button
            key={f}
            onClick={() => setActive(i)}
            style={active === i ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
            className={
              active === i
                ? "shrink-0 rounded-full px-4 py-1.5 text-xs font-semibold"
                : "shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-neutral-500 hover:text-forest"
            }
          >
            {f}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {causes.length > 0 ? (
          causes.map((cause, i) => (
            <div
              key={cause.id}
              className="card-lift animate-rise overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]"
              style={{ animationDelay: `${0.15 + i * 0.07}s` }}
            >
              <div className="relative aspect-[4/3] w-full bg-[var(--surface-2)]">
                <Image src={cause.image} alt={cause.title} fill className="object-cover" />
              </div>

              <div className="p-5">
                <div className="mb-2 flex items-center justify-between gap-2">
                  <span
                    className="rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ backgroundColor: STATUS_COLORS[cause.status] }}
                  >
                    {cause.status}
                  </span>
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-forest">
                    <Icon name="shield" className="h-3.5 w-3.5" />
                    Verified
                  </span>
                </div>

                <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">
                  {cause.title}
                </h3>
                <p className="mt-0.5 text-xs text-neutral-500">
                  {cause.category} · {cause.location}
                </p>
                <p className="mt-2 text-sm text-neutral-600">{cause.summary}</p>

                {cause.volunteersNeed && (
                  <div className="mt-4">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-neutral-500">Volunteers</span>
                      <span className="font-semibold text-clay">
                        {cause.volunteersHave} of {cause.volunteersNeed}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${((cause.volunteersHave || 0) / cause.volunteersNeed) * 100}%`,
                          backgroundColor: "#8b6f52",
                        }}
                      />
                    </div>
                  </div>
                )}

                {cause.goal && (
                  <div className="mt-3">
                    <div className="mb-1 flex justify-between text-xs">
                      <span className="text-neutral-500">Raised</span>
                      <span className="font-semibold text-mustard">
                        ${cause.raised?.toLocaleString()} of ${cause.goal.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${((cause.raised || 0) / cause.goal) * 100}%`,
                          backgroundColor: "#c9a227",
                        }}
                      />
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-4 border-t border-[var(--border)] pt-3 text-xs text-neutral-500">
                  <span className="font-semibold text-forest">{cause.backers} backers</span>
                  {cause.status !== "Resolved" && <span>{cause.daysOpen}d open</span>}
                </div>

                {cause.status !== "Resolved" && (
                  <div className="mt-3 grid grid-cols-2 gap-3">
                    <button
                      style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
                      className="rounded-lg py-2.5 text-sm font-semibold hover:opacity-90"
                    >
                      {cause.status === "Needs Funding" ? "Contribute" : "Volunteer"}
                    </button>
                    <button className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] py-2.5 text-sm font-medium text-neutral-600 hover:text-forest">
                      Follow
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-neutral-500">
            No pins in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}