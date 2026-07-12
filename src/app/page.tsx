import Image from "next/image";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className="mx-auto max-w-5xl px-8 py-6">
      <div className="mb-4 animate-rise">
        <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--foreground)]">
          Live Map
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Kauaʻi · 6 issues reported by your community
        </p>
      </div>

      <div
        className="animate-rise relative w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-[0_10px_40px_-20px_rgba(42,38,32,0.3)]"
        style={{ animationDelay: "0.05s" }}
      >
        <Image
          src="/kauai-map.png"
          alt="Live action map of Kauaʻi"
          width={1600}
          height={1000}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="mt-5 flex justify-center animate-rise" style={{ animationDelay: "0.1s" }}>
        <Link
          href="/report"
          style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
          className="rounded-lg px-6 py-2.5 text-sm font-semibold shadow-md transition hover:opacity-90"
        >
          + Report an Issue
        </Link>
      </div>
    </div>
  );
}