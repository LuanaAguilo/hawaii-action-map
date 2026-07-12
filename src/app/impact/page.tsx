import CountUp from "@/components/CountUp";
import { SAMPLE_ISSUES } from "@/lib/issues";

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="card-lift rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      <div className="font-display text-3xl font-bold text-forest">{value}</div>
      <div className="mt-1 text-xs text-neutral-500">{label}</div>
    </div>
  );
}

export default function ImpactPage() {
  const total = SAMPLE_ISSUES.length;
  const verified = SAMPLE_ISSUES.filter((i) =>
    ["Verified", "Sent to county", "County responded", "Fixed", "Resolved"].includes(i.status)
  ).length;
  const resolved = SAMPLE_ISSUES.filter((i) =>
    ["Fixed", "Resolved"].includes(i.status)
  ).length;

  return (
    <div className="mx-auto max-w-4xl px-8 py-6">
      <div className="mb-6 animate-rise">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Community Impact
        </h1>
        <p className="mt-1 text-sm text-neutral-500">This month · Kauaʻi</p>
      </div>

      {/* Highlight card */}
      <div className="hero-gradient animate-rise mb-6 rounded-2xl border border-[var(--border)] p-8 text-center shadow-[0_10px_40px_-20px_rgba(42,38,32,0.25)]">
        <div className="section-label">Total Raised This Month</div>
        <div className="mt-2 font-display text-5xl font-bold text-forest">$18,420</div>
        <div className="mt-2 text-sm text-neutral-500">from 124 community supporters</div>
      </div>

      {/* Stat grid */}
      <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
        <StatCard value={`${total}`} label="Reports Submitted" />
        <StatCard value={`${verified}`} label="Cases Verified" />
        <StatCard value={`${resolved}`} label="Cases Resolved" />
        <StatCard value="86" label="Volunteers" />
        <StatCard value="4,800" label="Lbs Removed" />
        <StatCard value="6" label="Pins Funded" />
      </div>

      {/* Case progress */}
      <div className="animate-rise rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6">
        <div className="section-label mb-4">Case Progress</div>
        <ProgressRow label="Submitted" value={total} max={total} />
        <ProgressRow label="Verified" value={verified} max={total} />
        <ProgressRow label="Resolved" value={resolved} max={total} />
      </div>
    </div>
  );
}

function ProgressRow({ label, value, max }: { label: string; value: number; max: number }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0;
  return (
    <div className="mb-4 last:mb-0">
      <div className="mb-1.5 flex justify-between text-sm">
        <span className="text-neutral-600">{label}</span>
        <span className="font-semibold text-forest">{value}</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--surface-2)]">
        <div
          className="h-full rounded-full bg-forest transition-all duration-1000 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}