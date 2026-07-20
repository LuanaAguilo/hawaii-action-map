"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Icon from "@/components/Icon";
import FeedPostCard from "@/components/FeedPostCard";
import { searchAll, SearchResult } from "@/lib/search";

const PLACEHOLDERS = [
  'Try "lost dogs"',
  'Try "what\'s happening in Wailua?"',
  'Try "beach cleanups"',
  'Try "any road closures?"',
];

const CATEGORIES = [
  { label: "Where can I volunteer?", sub: "Ways to show up for the island", icon: "volunteer", color: "#2d4a3e" },
  { label: "Safety alerts", sub: "Break-ins, hazards & warnings", icon: "safety", color: "#c0392b" },
  { label: "Lost & found", sub: "Pets, keys & belongings", icon: "lostfound", color: "#4a6d7c" },
  { label: "Road closures", sub: "Traffic, wrecks & potholes", icon: "roads", color: "#d97706" },
  { label: "Trending now", sub: "What the island is talking about", icon: "trending", color: "#c17b8a" },
  { label: "Wildlife protection", sub: "Habitat, cleanups & our ʻāina", icon: "wildlife", color: "#5c6e4a" },
];

function CategoryIcon({ name }: { name: string }) {
  const c = "h-6 w-6";
  switch (name) {
    case "volunteer":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        </svg>
      );
    case "safety":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
        </svg>
      );
    case "lostfound":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6Z" />
        </svg>
      );
    case "roads":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h8.25m-8.25 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
        </svg>
      );
    case "trending":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
        </svg>
      );
    case "wildlife":
      return (
        <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25M6.166 5.106l1.591 1.591M3 12h2.25m.916 5.834 1.591-1.591M12 18.75V21m4.243-4.757 1.59 1.59M18.75 12H21m-4.757-4.243 1.59-1.59M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
        </svg>
      );
    default:
      return null;
  }
}

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<SearchResult | null>(null);
  const [thinking, setThinking] = useState(false);
  const [phIndex, setPhIndex] = useState(0);

  useEffect(() => {
    if (query) return;
    const t = setInterval(() => setPhIndex((i) => (i + 1) % PLACEHOLDERS.length), 3000);
    return () => clearInterval(t);
  }, [query]);

  function runSearch(q: string) {
    const clean = q.trim();
    if (!clean) return;
    setQuery(clean);
    setThinking(true);
    setResult(null);
    setTimeout(() => {
      setResult(searchAll(clean));
      setThinking(false);
    }, 650);
  }

  return (
    <div className="mx-auto max-w-2xl px-5 py-6">
      {/* Header */}
      <div className="mb-5 animate-rise">
        <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
          Search
        </h1>
        <p className="mt-1 text-sm text-[var(--muted)]">
          Ask anything about Kauaʻi
        </p>
      </div>

      {/* Search bar */}
      <div className="animate-rise mb-7" style={{ animationDelay: "0.05s" }}>
        <div className="flex items-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--surface)] px-5 py-2 shadow-md focus-within:border-forest focus-within:shadow-lg transition-shadow">
          <svg className="h-6 w-6 shrink-0 text-[var(--muted-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && runSearch(query)}
            placeholder={PLACEHOLDERS[phIndex]}
            className="w-full bg-transparent py-4 text-lg text-[var(--foreground)] placeholder-[var(--muted-2)] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => { setQuery(""); setResult(null); }}
              className="shrink-0 text-sm font-semibold text-[var(--muted-2)] hover:text-forest"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => runSearch(query)}
            style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
            className="shrink-0 rounded-xl px-6 py-3 text-base font-bold shadow-sm hover:opacity-90"
          >
            Search
          </button>
        </div>
      </div>

      {/* Browse categories */}
      {!result && !thinking && (
        <div className="animate-rise" style={{ animationDelay: "0.1s" }}>
          <h2 className="mb-4 text-lg font-bold text-[var(--foreground)]">Explore</h2>
          <div className="flex flex-col gap-3">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.label}
                onClick={() => runSearch(cat.label)}
                className="card-lift flex w-full items-center gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 text-left shadow-sm"
              >
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: cat.color + "14", color: cat.color }}
                >
                  <CategoryIcon name={cat.icon} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-base font-bold text-[var(--foreground)]">{cat.label}</div>
                  <div className="mt-0.5 text-xs text-[var(--muted-2)]">{cat.sub}</div>
                </div>
                <svg className="h-5 w-5 shrink-0 text-[var(--muted-2)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Thinking state */}
      {thinking && (
        <div className="animate-rise flex items-center gap-3 rounded-2xl border border-forest/20 bg-forest/[0.04] p-6">
          <span className="relative flex h-3 w-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-forest opacity-60" />
            <span className="relative inline-flex h-3 w-3 rounded-full bg-forest" />
          </span>
          <span className="text-base font-medium text-[var(--muted)]">Searching Kauaʻi...</span>
        </div>
      )}

      {/* Results */}
      {result && !thinking && (
        <div className="flex flex-col gap-6">
          {/* AI answer */}
          <div className="membership-card card-sheen animate-rise rounded-3xl p-6">
            <div className="mb-2.5 flex items-center gap-2">
              <Icon name="sparkle" className="h-4 w-4 text-white" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/60">
                Answer
              </span>
            </div>
            <p className="text-base leading-relaxed text-white">{result.summary}</p>
          </div>

          {/* Pins */}
          {result.pins.length > 0 && (
            <div className="animate-rise" style={{ animationDelay: "0.08s" }}>
              <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">
                Pins <span className="text-sm font-semibold text-[var(--muted-2)]">({result.pins.length})</span>
              </h2>
              <div className="flex flex-col gap-3">
                {result.pins.map((pin) => (
                  <Link
                    key={pin.id}
                    href="/causes"
                    className="card-lift flex items-start gap-4 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 shadow-sm"
                  >
                    <div className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                      <Icon name="pin" className="h-6 w-6" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-base font-bold text-[var(--foreground)]">{pin.title}</div>
                      <div className="mt-1 text-sm text-[var(--muted-2)]">
                        {pin.location} · {pin.status}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Community posts */}
          {result.posts.length > 0 && (
            <div className="animate-rise" style={{ animationDelay: "0.14s" }}>
              <h2 className="mb-3 text-lg font-bold text-[var(--foreground)]">
                Community <span className="text-sm font-semibold text-[var(--muted-2)]">({result.posts.length})</span>
              </h2>
              <div className="flex flex-col gap-4">
                {result.posts.map((post) => (
                  <FeedPostCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}