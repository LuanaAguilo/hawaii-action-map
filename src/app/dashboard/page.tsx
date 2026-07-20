"use client";

import Link from "next/link";
import { useState } from "react";
import FeedPostCard from "@/components/FeedPostCard";
import { FEED_POSTS, PostType } from "@/lib/posts";

const FILTERS: { label: string; match: PostType | "all" | "hot" }[] = [
  { label: "Hot", match: "hot" },
  { label: "All", match: "all" },
  { label: "Safety", match: "safety" },
  { label: "Traffic", match: "accident" },
  { label: "Heads Up", match: "suspicious" },
  { label: "Lost & Found", match: "lostfound" },
  { label: "Notices", match: "notice" },
  { label: "Civic", match: "civic" },
];

export default function DashboardPage() {
  const [active, setActive] = useState(0);
  const [postText, setPostText] = useState("");

  const filter = FILTERS[active].match;
  const posts =
    filter === "all"
      ? FEED_POSTS
      : filter === "hot"
      ? [...FEED_POSTS].sort((a, b) => b.reactions - a.reactions)
      : FEED_POSTS.filter((p) => p.type === filter);

  return (
    <div className="mx-auto max-w-2xl px-5 py-6">
      {/* Header */}
      <div className="mb-5 animate-rise">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--foreground)]">
            Community
          </h1>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1.5 rounded-full bg-rose/10 px-3 py-1 text-xs font-bold text-rose">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-rose"></span>
              </span>
              LIVE
            </span>
            <Link
              href="/search"
              aria-label="Search"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--muted)] transition hover:border-forest/40 hover:text-forest"
            >
              <svg className="h-[18px] w-[18px]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </Link>
          </div>
        </div>
        <p className="mt-1 text-sm text-[var(--muted)]">
          <span className="font-semibold text-forest">142 neighbors</span> active now · 6 new posts today
        </p>
      </div>

      {/* Green post box — membership-card style */}
      <div className="membership-card card-sheen animate-rise mb-5 rounded-3xl p-5" style={{ animationDelay: "0.05s" }}>
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-sm font-bold text-white ring-1 ring-white/20">
            MK
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's happening on Kauaʻi right now?"
              rows={2}
              className="w-full resize-none rounded-xl border border-white/20 bg-white px-4 py-3 text-sm text-[var(--foreground)] placeholder-[var(--muted)] focus:outline-none focus:ring-2 focus:ring-white/40"
            />
            <div className="mt-2.5 flex items-center justify-end">
              <button className="rounded-xl bg-white px-6 py-2 text-sm font-bold text-[var(--forest)] transition hover:opacity-90">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div
        className="mb-5 flex gap-2 overflow-x-auto pb-1 animate-rise"
        style={{ animationDelay: "0.1s", scrollbarWidth: "none" }}
      >
        {FILTERS.map((f, i) => (
          <button
            key={f.label}
            onClick={() => setActive(i)}
            style={active === i ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
            className={
              active === i
                ? "shrink-0 rounded-full px-4 py-2 text-xs font-bold"
                : "shrink-0 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--muted)] hover:text-forest"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-5">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <div key={post.id} className="animate-rise" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
              <FeedPostCard post={post} />
            </div>
          ))
        ) : (
          <p className="rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-8 text-center text-sm text-[var(--muted)]">
            Nothing here yet.
          </p>
        )}
      </div>
    </div>
  );
}