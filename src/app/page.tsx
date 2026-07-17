import Image from "next/image";

export default function MapPage() {
  return (
    <div className="relative min-h-screen bg-white">
      {/* Island selector floating top-left */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-white/90 px-3 py-1.5 text-sm font-semibold text-forest shadow-sm backdrop-blur">
        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
        Kauaʻi
        <svg className="h-3.5 w-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
        </svg>
      </div>

      {/* Map fills the width, vertically centered in available space */}
      <div className="flex min-h-[calc(100vh-7rem)] items-center">
        <Image
          src="/kauai-map.png"
          alt="Live action map of Kauaʻi"
          width={1600}
          height={1000}
          priority
          className="h-auto w-full animate-rise object-contain"
        />
      </div>
    </div>
  );
}