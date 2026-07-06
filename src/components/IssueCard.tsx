import Link from "next/link";
import Badge from "@/components/Badge";
import { statusColor, urgencyColor } from "@/lib/helpers";
import { Issue } from "@/lib/types";

export default function IssueCard({ issue }: { issue: Issue }) {
  return (
    <Link
      href={`/issue/${issue.id}`}
      className="block rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 transition hover:border-neutral-600"
    >
      {/* Top row: title + status */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-display text-base font-semibold text-white">
            {issue.title}
          </h3>
          <p className="mt-0.5 text-xs text-neutral-500">
            {issue.locationName} · Kauaʻi
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge className={statusColor(issue.status)}>{issue.status}</Badge>
          <Badge className={urgencyColor(issue.urgency)}>{issue.urgency}</Badge>
        </div>
      </div>

      {/* Summary */}
      <p className="mt-3 text-sm text-neutral-400">{issue.publicSummary}</p>

      {/* Stats row */}
      <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-[var(--border)] pt-3 text-xs text-neutral-500">
        <span className="flex items-center gap-1.5">
          <span className="text-mint">●</span> {issue.confirmations} confirmations
        </span>
        <span>{issue.comments} comments</span>
        <span>{issue.daysOpen}d open</span>
        <span className="ml-auto text-mint">View Case ›</span>
      </div>
    </Link>
  );
}