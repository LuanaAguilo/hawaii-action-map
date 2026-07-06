"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { APP_TAGLINE, ISLANDS, NAV_LINKS } from "@/lib/constants";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-neutral-800 bg-neutral-900/95 backdrop-blur">
      {/* Top row: page title + island tabs */}
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="block">
          <h1 className="font-display text-lg font-bold tracking-tight text-neutral-100">
            Kauaʻi — Live Map
          </h1>
          <p className="text-xs text-neutral-400">{APP_TAGLINE}</p>
        </Link>

        <nav className="flex flex-wrap gap-2">
          {ISLANDS.map((island) => (
            <span
              key={island.id}
              className={
                island.active
                  ? "rounded-full bg-sky-500 px-3 py-1 text-sm font-medium text-white"
                  : "rounded-full bg-neutral-800 px-3 py-1 text-sm font-medium text-neutral-500"
              }
              title={island.active ? "" : "Coming soon"}
            >
              {island.name}
            </span>
          ))}
        </nav>
      </div>

      {/* Bottom row: main navigation links */}
      <div className="border-t border-neutral-800 bg-neutral-950/60">
        <nav className="mx-auto flex max-w-6xl flex-wrap gap-1 px-4 py-2">
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={
                  isActive
                    ? "rounded-md bg-neutral-800 px-3 py-1.5 text-sm font-semibold text-sky-400 shadow-sm"
                    : "rounded-md px-3 py-1.5 text-sm font-medium text-neutral-400 hover:bg-neutral-800 hover:text-sky-300"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}