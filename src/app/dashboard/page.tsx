"use client";

import { useState } from "react";
import SocialIssueCard from "@/components/SocialIssueCard";
import { SAMPLE_ISSUES } from "@/lib/issues";
import { Issue } from "@/lib/types";

const FILTERS: { label: string; filter: (issues: Issue[]) => Issue[] }[] = [
  { label: "🔥 Hot", filter: (issues) => [...issues].sort((a, b) => b.confirmations - a.confirmations) },
  { label: "Newest", filter: (issues) => [...issues].sort((a, b) => a.daysOpen - b.daysOpen) },
  { label: "Needs County Response", filter: (issues) => issues.filter((i) => i.status === "Verified" || i.status === "Sent to county") },
  { label: "Ignored / No Response", filter: (issues) => issues.filter((i) => i.status === "No response / ignored") },
  { label: "Needs Volunteers", filter: (issues) => issues.filter((i) => i.status === "Needs volunteers") },
  { label: "Resolved", filter: (issues) => issues.filter((i) => i.status === "Fixed" || i.status === "Resolved") },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState(0);
  const [postText, setPostText] = useState("");
  const visibleIssues = FILTERS[activeFilter].filter(SAMPLE_ISSUES);

  return (
    <div className="mx-auto max-w-2xl px-6 py-6">
      <div className="mb-4 animate-rise">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
            Community
          </h1>
          <span className="flex items-center gap-1.5 rounded-full bg-rose/10 px-3 py-1 text-xs font-semibold text-rose">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose"></span>
            </span>
            LIVE
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          <span className="font-semibold text-forest">142 neighbors</span> active now · 3 new reports today
        </p>
      </div>

      <div className="animate-rise mb-5 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4" style={{ animationDelay: "0.05s" }}>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-white">
            MK
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's happening on Kauaʻi? Report it, share it, rally your neighbors..."
              rows={2}
              className="w-full resize-none rounded-lg bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-neutral-400">Add a photo & location on the next step</span>
              <a href="/report" className="rounded-lg bg-forest px-4 py-1.5 text-sm font-semibold text-white hover:opacity-90">
                Post
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-5 flex flex-wrap gap-2 animate-rise" style={{ animationDelay: "0.1s" }}>
        {FILTERS.map((f, index) => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(index)}
            style={activeFilter === index ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
            className={
              activeFilter === index
                ? "rounded-full px-4 py-1.5 text-xs font-semibold"
                : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-neutral-500 hover:text-forest"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {visibleIssues.length > 0 ? (
          visibleIssues.map((issue, i) => (
            <div key={issue.id} className="animate-rise" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
              <SocialIssueCard issue={issue} />
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-neutral-500">
            No issues in this category yet.
          </p>
        )}
      </div>
    </div>
  );
}