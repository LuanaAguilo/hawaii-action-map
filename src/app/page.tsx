import Image from "next/image";
import Link from "next/link";

export default function MapPage() {
  return (
    <div className="px-8 py-6">
      <div className="mb-6">
        <h1 className="font-display text-3xl font-bold tracking-tight text-white">
          Live Map
        </h1>
        <p className="mt-1 text-sm text-neutral-500">
          Kauaʻi · 6 issues reported by your community
        </p>
      </div>

      <div className="relative w-full overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] shadow-lg">
        <Image
          src="/kauai-map.png"
          alt="Live action map of Kauaʻi"
          width={1600}
          height={1000}
          priority
          className="h-auto w-full object-contain"
        />
      </div>

      <div className="mt-5 flex justify-center">
        <Link
          href="/report"
          className="rounded-lg bg-mint px-6 py-2.5 text-sm font-semibold text-black hover:opacity-90"
        >
          + Report an Issue
        </Link>
      </div>
    </div>
  );
}