"use client";

import { useState } from "react";
import IssueCard from "@/components/IssueCard";
import { SAMPLE_ISSUES } from "@/lib/issues";
import { Issue } from "@/lib/types";

const FILTERS: { label: string; filter: (issues: Issue[]) => Issue[] }[] = [
  { label: "Newest", filter: (issues) => [...issues].sort((a, b) => a.daysOpen - b.daysOpen) },
  { label: "Trending", filter: (issues) => [...issues].sort((a, b) => b.confirmations - a.confirmations) },
  { label: "Needs County Response", filter: (issues) => issues.filter((i) => i.status === "Verified" || i.status === "Sent to county") },
  { label: "Ignored / No Response", filter: (issues) => issues.filter((i) => i.status === "No response / ignored") },
  { label: "Needs Volunteers", filter: (issues) => issues.filter((i) => i.status === "Needs volunteers") },
  { label: "Needs Funding", filter: (issues) => issues.filter((i) => i.status === "Needs funding") },
  { label: "Resolved", filter: (issues) => issues.filter((i) => i.status === "Fixed" || i.status === "Resolved") },
];

export default function DashboardPage() {
  const [activeFilter, setActiveFilter] = useState(0);
  const visibleIssues = FILTERS[activeFilter].filter(SAMPLE_ISSUES);

  return (
    <div className="mx-auto max-w-3xl px-8 py-6">
      <div className="mb-5">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Community Dashboard
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Turning community complaints into trackable action.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        {FILTERS.map((f, index) => (
          <button
            key={f.label}
            onClick={() => setActiveFilter(index)}
            className={
              activeFilter === index
                ? "rounded-full bg-mint px-4 py-1.5 text-xs font-semibold text-black"
                : "rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-1.5 text-xs font-medium text-neutral-400 hover:text-white"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {visibleIssues.length > 0 ? (
          visibleIssues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
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