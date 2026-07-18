"use client";

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
    <div className="mx-auto max-w-2xl px-4 py-5">
      {/* Header + live bar */}
      <div className="mb-4 animate-rise">
        <div className="flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold tracking-tight text-[var(--foreground)]">
            Community
          </h1>
          <span className="flex items-center gap-1.5 rounded-full bg-rose/10 px-3 py-1 text-xs font-semibold text-rose">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose"></span>
            </span>
            LIVE
          </span>
        </div>
        <p className="mt-1 text-sm text-neutral-500">
          <span className="font-semibold text-forest">142 neighbors</span> active now · 6 new posts today
        </p>
      </div>

      {/* Post box */}
      <div
        className="animate-rise mb-4 rounded-2xl border border-[var(--border)] bg-white p-4 shadow-sm"
        style={{ animationDelay: "0.05s" }}
      >
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-forest font-display text-sm font-bold text-white">
            MK
          </div>
          <div className="flex-1">
            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder="What's happening on Kauaʻi right now?"
              rows={2}
              className="w-full resize-none rounded-xl bg-[var(--surface-2)] px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:outline-none"
            />
            <div className="mt-2 flex items-center justify-end">
              <button
                style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
                className="rounded-xl px-5 py-2 text-sm font-bold hover:opacity-90"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Type filters */}
      <div
        className="mb-4 flex gap-2 overflow-x-auto pb-1 animate-rise"
        style={{ animationDelay: "0.1s", scrollbarWidth: "none" }}
      >
        {FILTERS.map((f, i) => (
          <button
            key={f.label}
            onClick={() => setActive(i)}
            style={active === i ? { backgroundColor: "#2d4a3e", color: "#fff" } : {}}
            className={
              active === i
                ? "shrink-0 rounded-full px-4 py-1.5 text-xs font-bold"
                : "shrink-0 rounded-full border border-[var(--border)] bg-white px-4 py-1.5 text-xs font-semibold text-neutral-500 hover:text-forest"
            }
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="flex flex-col gap-4">
        {posts.length > 0 ? (
          posts.map((post, i) => (
            <div key={post.id} className="animate-rise" style={{ animationDelay: `${0.15 + i * 0.07}s` }}>
              <FeedPostCard post={post} />
            </div>
          ))
        ) : (
          <p className="rounded-2xl border border-[var(--border)] bg-white p-8 text-center text-sm text-neutral-500">
            Nothing here yet.
          </p>
        )}
      </div>
    </div>
  );
}