import Link from "next/link";
import { notFound } from "next/navigation";
import Badge from "@/components/Badge";
import { getIssueById } from "@/lib/issues";
import { statusColor, urgencyColor } from "@/lib/helpers";

export default async function IssueDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const issue = getIssueById(id);

  if (!issue) {
    notFound();
  }

  const timeline = [
    { step: "Reported", done: true },
    { step: "AI categorized", done: true },
    { step: "Community confirmed", done: issue.confirmations > 5 },
    { step: "Sent to county", done: issue.status === "Sent to county" || issue.status === "County responded" },
    { step: "County responded", done: issue.status === "County responded" },
    { step: "Resolved", done: issue.status === "Fixed" || issue.status === "Resolved" },
  ];

  const actions = [
    "I saw this too",
    "Add photo",
    "Follow issue",
    "Notify county",
    "Volunteer",
    "Mark fixed",
  ];

  return (
    <div className="mx-auto max-w-3xl px-8 py-6">
      <Link href="/dashboard" className="text-sm text-neutral-400 hover:text-mint">
        ← Back to dashboard
      </Link>

      <div className="mt-3 mb-4">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <Badge className={statusColor(issue.status)}>{issue.status}</Badge>
          <Badge className={urgencyColor(issue.urgency)}>{issue.urgency}</Badge>
          <span className="text-xs font-medium text-mint">{issue.category}</span>
        </div>
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          {issue.title}
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          {issue.locationName} · {issue.daysOpen} days open
        </p>
      </div>

      <div className="mb-4 flex h-56 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-sm text-neutral-600">
        Photo coming soon
      </div>

      <div className="mb-4 flex flex-wrap gap-4 text-sm text-neutral-400">
        <span className="flex items-center gap-1.5"><span className="text-mint">●</span> {issue.confirmations} confirmations</span>
        <span>{issue.comments} comments</span>
      </div>

      <Section title="Resident report">
        <p className="text-sm text-neutral-300">“{issue.description}”</p>
      </Section>

      <Section title="AI public summary">
        <p className="text-sm text-neutral-300">{issue.publicSummary}</p>
      </Section>

      <Section title="AI county-facing summary">
        <p className="text-sm text-neutral-300">{issue.countySummary}</p>
        <p className="mt-2 text-xs text-neutral-500">
          Suggested department: <span className="text-mint">{issue.department}</span>
        </p>
      </Section>

      <Section title="Status timeline">
        <ol className="space-y-2.5">
          {timeline.map((t) => (
            <li key={t.step} className="flex items-center gap-3 text-sm">
              <span
                className={
                  t.done
                    ? "flex h-5 w-5 items-center justify-center rounded-full bg-mint text-xs font-bold text-black"
                    : "flex h-5 w-5 items-center justify-center rounded-full bg-[var(--surface-2)] text-xs text-neutral-600"
                }
              >
                {t.done ? "✓" : "•"}
              </span>
              <span className={t.done ? "text-neutral-200" : "text-neutral-500"}>
                {t.step}
              </span>
            </li>
          ))}
        </ol>
      </Section>

      <div className="mt-5 flex flex-wrap gap-2">
        {actions.map((action) => (
          <button
            key={action}
            className="rounded-lg border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-medium text-neutral-300 hover:border-mint hover:text-mint"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <h2 className="section-label mb-2">{title}</h2>
      {children}
    </div>
  );
}