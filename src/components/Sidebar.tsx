"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_NAME, ISLANDS, NAV_LINKS } from "@/lib/constants";

function NavIcon({ name }: { name: string }) {
  const common = "h-5 w-5";
  switch (name) {
    case "map":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75 3.75 4.5v12.75L9 19.5m0-12.75L15 4.5m-6 2.25v12.75m6-15L20.25 6.75V19.5L15 17.25m0-12.75v12.75" />
        </svg>
      );
    case "feed":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm0 0H4.5m1.5 0a9 9 0 0 1 9 9m-9-13.5a13.5 13.5 0 0 1 13.5 13.5" />
        </svg>
      );
    case "help":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
        </svg>
      );
    case "impact":
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      );
    default:
      return (
        <svg className={common} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z" />
        </svg>
      );
  }
}

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-64 flex-col border-r border-[var(--border)] bg-[var(--surface)]">
      {/* Logo */}
      <div className="border-b border-[var(--border)] px-5 py-5">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--surface-2)] text-mint">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75 3.75 4.5v12.75L9 19.5m0-12.75L15 4.5m-6 2.25v12.75m6-15L20.25 6.75V19.5L15 17.25m0-12.75v12.75" />
            </svg>
          </div>
          <div className="leading-tight">
            <div className="font-display text-sm font-bold text-white">Hawaiʻi</div>
            <div className="font-display text-sm font-bold text-mint">Action Map</div>
          </div>
        </Link>
      </div>

      {/* Island selector */}
      <div className="px-4 pt-4">
        <div className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5">
          <span className="flex items-center gap-2 text-sm font-semibold text-mint">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
            </svg>
            Kauaʻi
          </span>
          <svg className="h-4 w-4 text-neutral-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </div>
      </div>

      {/* Nav links */}
      <nav className="flex flex-1 flex-col gap-1 px-3 py-4">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={
                isActive
                  ? "flex items-center gap-3 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-sm font-semibold text-mint"
                  : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-neutral-400 hover:bg-[var(--surface-2)] hover:text-white"
              }
            >
              <NavIcon name={link.icon} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom buttons */}
      <div className="flex flex-col gap-2 border-t border-[var(--border)] p-4">
        <Link
          href="/report"
          className="flex items-center justify-center gap-2 rounded-lg bg-mint px-4 py-2.5 text-sm font-semibold text-black hover:opacity-90"
        >
          + Report Issue
        </Link>
        <Link
          href="/needs-help"
          className="flex items-center justify-center gap-2 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm font-medium text-neutral-300 hover:text-white"
        >
          ♥ Community Relief
        </Link>
      </div>
    </aside>
  );
}