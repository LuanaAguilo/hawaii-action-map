"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { FeedPost, POST_TYPES } from "@/lib/posts";

export default function FeedPostCard({ post }: { post: FeedPost }) {
  const type = POST_TYPES[post.type];
  const [reactions, setReactions] = useState(post.reactions);
  const [reacted, setReacted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState(
    post.topComment ? [{ author: post.topComment.author, text: post.topComment.text, time: "1h ago" }] : []
  );
  const [newComment, setNewComment] = useState("");

  function toggleReact() {
    setReactions((r) => (reacted ? r - 1 : r + 1));
    setReacted((v) => !v);
  }

  function postComment() {
    if (!newComment.trim()) return;
    setComments((prev) => [{ author: "You", text: newComment.trim(), time: "just now" }, ...prev]);
    setNewComment("");
  }

  return (
    <div className="card-lift overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {/* Type bar */}
      <div
        className="flex items-center justify-between px-5 py-2"
        style={{ backgroundColor: type.color + "14" }}
      >
        <span className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide" style={{ color: type.color }}>
          <Icon name={type.icon} className="h-4 w-4" />
          {type.label}
        </span>
        {post.hot && (
          <span className="flex items-center gap-1 rounded-full bg-rose/10 px-2 py-0.5 text-[10px] font-semibold text-rose">
            🔥 Heating up
          </span>
        )}
      </div>

      {/* Poster */}
      <div className="flex items-center gap-3 px-5 pt-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-bold text-white"
          style={{ backgroundColor: post.poster.color }}
        >
          {post.poster.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--foreground)]">{post.poster.name}</span>
            <span className="rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-medium text-forest">{post.poster.level}</span>
          </div>
          <p className="text-xs text-neutral-500">{post.location} · {post.timeAgo}</p>
        </div>
        {post.verified ? (
          <span className="flex items-center gap-1 rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-semibold text-forest">
            ✓ Verified
          </span>
        ) : (
          <span className="rounded-full bg-neutral-200 px-2 py-0.5 text-[10px] font-medium text-neutral-500">
            Unverified
          </span>
        )}
      </div>

      {/* Body */}
      <div className="px-5 pt-3">
        <h3 className="font-display text-lg font-semibold text-[var(--foreground)]">{post.title}</h3>
        <p className="mt-1 text-sm text-neutral-600">{post.body}</p>
      </div>

      {/* Counts */}
      <div className="flex items-center justify-between px-5 pt-3 text-xs text-neutral-500">
        <span>{reactions} reactions</span>
        <span>{comments.length} comments</span>
      </div>

      {/* Actions */}
      <div className="mt-2 grid grid-cols-3 gap-1 border-t border-[var(--border)] px-3 py-1">
        <button
          onClick={toggleReact}
          className={reacted
            ? "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-forest"
            : "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-neutral-500 hover:bg-[var(--surface-2)] hover:text-forest"}
        >
          👍 React
        </button>
        <button
          onClick={() => setShowComments((s) => !s)}
          className="flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-neutral-500 hover:bg-[var(--surface-2)] hover:text-forest"
        >
          💬 Comment
        </button>
        <button
          onClick={() => setSaved((s) => !s)}
          className={saved
            ? "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-forest"
            : "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-neutral-500 hover:bg-[var(--surface-2)] hover:text-forest"}
        >
          🔖 {saved ? "Saved" : "Save"}
        </button>
      </div>

      {/* Top comment preview */}
      {!showComments && comments.length > 0 && (
        <button
          onClick={() => setShowComments(true)}
          className="mx-5 mb-4 block w-[calc(100%-2.5rem)] rounded-lg bg-[var(--surface-2)] px-3 py-2 text-left"
        >
          <span className="text-xs font-semibold text-forest">{comments[0].author} </span>
          <span className="text-sm text-neutral-700">{comments[0].text}</span>
        </button>
      )}

      {/* Expanded comments */}
      {showComments && (
        <div className="border-t border-[var(--border)] px-5 py-3">
          <div className="mb-3 flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && postComment()}
              placeholder="Add your voice..."
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:border-forest focus:outline-none"
            />
            <button onClick={postComment} className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:opacity-90">
              Post
            </button>
          </div>
          <div className="flex flex-col gap-2">
            {comments.map((c, i) => (
              <div key={i} className="rounded-lg bg-[var(--surface-2)] px-3 py-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-forest">{c.author}</span>
                  <span className="text-[10px] text-neutral-400">{c.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-neutral-700">{c.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}