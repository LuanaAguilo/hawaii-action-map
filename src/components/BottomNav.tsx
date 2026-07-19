"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

function TabIcon({ name }: { name: string }) {
  const c = "h-9 w-9";
  switch (name) {
    case "map":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75 3.75 4.5v12.75L9 19.5m0-12.75L15 4.5m-6 2.25v12.75m6-15L20.25 6.75V19.5L15 17.25m0-12.75v12.75" />
        </svg>
      );
    case "pins":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
      );
    case "community":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
        </svg>
      );
    default:
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.5 19.5a7.5 7.5 0 0 1 15 0v.75H4.5v-.75Z" />
        </svg>
      );
  }
}

const TABS = [
  { href: "/", label: "Map", icon: "map" },
  { href: "/dashboard", label: "Community", icon: "community" },
  { href: "/causes", label: "Pins", icon: "pins" },
  { href: "/profile", label: "Profile", icon: "profile" },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-1/2 z-50 w-full max-w-5xl -translate-x-1/2 border-t border-[var(--border)] bg-[var(--surface)]/98 backdrop-blur">
      <div className="mx-auto flex max-w-xl items-end justify-around px-4 pb-4 pt-4">
        {TABS.slice(0, 2).map((tab) => (
          <TabLink key={tab.href} tab={tab} active={pathname === tab.href} />
        ))}

        <Link href="/report" className="flex flex-col items-center" aria-label="Create a Pin">
          <span
            className="-mt-9 flex h-[72px] w-[72px] items-center justify-center rounded-full text-white shadow-2xl ring-4 ring-[var(--surface)]"
            style={{ backgroundColor: "#2d4a3e" }}
          >
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </span>
          <span className="mt-2 text-sm font-bold text-forest">Report</span>
        </Link>

        {TABS.slice(2).map((tab) => (
          <TabLink key={tab.href} tab={tab} active={pathname === tab.href} />
        ))}
      </div>
    </nav>
  );
}

function TabLink({
  tab,
  active,
}: {
  tab: { href: string; label: string; icon: string };
  active: boolean;
}) {
  return (
    <Link
      href={tab.href}
      className={`flex flex-1 flex-col items-center gap-1.5 py-1 transition ${
        active ? "text-forest" : "text-neutral-400 hover:text-neutral-600"
      }`}
    >
      <TabIcon name={tab.icon} />
      <span className="text-sm font-semibold">{tab.label}</span>
    </Link>
  );
}