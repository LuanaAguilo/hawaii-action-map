"use client";

import { useState } from "react";
import Icon from "@/components/Icon";
import { FeedPost, POST_TYPES } from "@/lib/posts";

function ActionIcon({ name }: { name: string }) {
  const c = "h-[18px] w-[18px]";
  if (name === "react")
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75a.75.75 0 0 1 .75-.75 2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23H5.904m10.598-9.75H14.25M5.904 18.5c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 0 1-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 9.953 4.167 9.5 5 9.5h1.053c.472 0 .745.556.5.96a8.958 8.958 0 0 0-1.302 4.665c0 1.194.232 2.333.654 3.375Z" />
      </svg>
    );
  if (name === "comment")
    return (
      <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z" />
      </svg>
    );
  return (
    <svg className={c} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
    </svg>
  );
}

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
    <div
      className="card-lift overflow-hidden rounded-2xl border border-[var(--border)] bg-white shadow-sm"
      style={{ borderLeft: `3px solid ${type.color}` }}
    >
      {/* Poster row */}
      <div className="flex items-start gap-3 px-5 pt-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full font-display text-xs font-bold text-white"
          style={{ backgroundColor: post.poster.color }}
        >
          {post.poster.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-sm font-bold text-[var(--foreground)]">{post.poster.name}</span>
            <span className="rounded-md bg-[var(--surface-2)] px-1.5 py-0.5 text-[10px] font-semibold text-neutral-500">
              {post.poster.level}
            </span>
            <span
              className="rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide"
              style={{ backgroundColor: type.color + "1a", color: type.color }}
            >
              {type.label}
            </span>
          </div>
          <p className="mt-0.5 text-xs text-neutral-400">
            {post.location} · {post.timeAgo}
          </p>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1">
          {post.verified ? (
            <span className="flex items-center gap-1 text-[10px] font-bold text-forest">
              <Icon name="check" className="h-3.5 w-3.5" />
              VERIFIED
            </span>
          ) : (
            <span className="text-[10px] font-semibold text-neutral-400">UNVERIFIED</span>
          )}
          {post.hot && (
            <span
              className="rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: "#c17b8a" }}
            >
              Trending
            </span>
          )}
        </div>
      </div>

      {/* Body */}
      <div className="px-5 pt-3">
        <h3 className="font-display text-[17px] font-bold leading-snug text-[var(--foreground)]">
          {post.title}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-neutral-600">{post.body}</p>
      </div>

      {/* Counts */}
      <div className="flex items-center gap-3 px-5 pb-2 pt-3 text-xs text-neutral-400">
        <span>
          <span className="font-bold text-neutral-600">{reactions}</span> reactions
        </span>
        <span>·</span>
        <span>
          <span className="font-bold text-neutral-600">{comments.length}</span>{" "}
          {comments.length === 1 ? "comment" : "comments"}
        </span>
      </div>

      {/* Action bar */}
      <div className="mx-5 mb-4 grid grid-cols-3 gap-2">
        <ActionBtn active={reacted} onClick={toggleReact} icon="react" label="React" />
        <ActionBtn active={showComments} onClick={() => setShowComments((s) => !s)} icon="comment" label="Comment" />
        <ActionBtn active={saved} onClick={() => setSaved((s) => !s)} icon="save" label={saved ? "Saved" : "Save"} />
      </div>

      {/* Top comment preview */}
      {!showComments && comments.length > 0 && (
        <button
          onClick={() => setShowComments(true)}
          className="flex w-full items-start gap-2.5 border-t border-[var(--border)] bg-[var(--surface)] px-5 py-3 text-left transition hover:bg-[var(--surface-2)]"
        >
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-[9px] font-bold text-white">
            {comments[0].author.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <div className="text-[11px] font-bold text-[var(--foreground)]">{comments[0].author}</div>
            <div className="text-sm leading-snug text-neutral-600">{comments[0].text}</div>
          </div>
        </button>
      )}

      {/* Expanded comments */}
      {showComments && (
        <div className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-4">
          <div className="mb-3 flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && postComment()}
              placeholder="Add your voice..."
              className="flex-1 rounded-xl border border-[var(--border)] bg-white px-3.5 py-2.5 text-sm text-[var(--foreground)] placeholder-neutral-400 focus:border-forest focus:outline-none"
            />
            <button
              onClick={postComment}
              style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
              className="rounded-xl px-4 py-2.5 text-sm font-bold hover:opacity-90"
            >
              Post
            </button>
          </div>

          <div className="flex flex-col gap-2.5">
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-neutral-300 text-[9px] font-bold text-white">
                  {c.author.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 rounded-xl bg-white px-3.5 py-2.5 shadow-sm">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] font-bold text-[var(--foreground)]">{c.author}</span>
                    <span className="text-[10px] text-neutral-400">{c.time}</span>
                  </div>
                  <p className="mt-0.5 text-sm leading-snug text-neutral-600">{c.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function ActionBtn({
  active,
  onClick,
  icon,
  label,
}: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      style={active ? { backgroundColor: "#2d4a3e", color: "#fff", borderColor: "#2d4a3e" } : {}}
      className="flex items-center justify-center gap-1.5 rounded-xl border border-[var(--border)] bg-[var(--surface)] py-2.5 text-xs font-bold text-neutral-500 transition hover:border-forest/40 hover:text-forest"
    >
      <ActionIcon name={icon} />
      {label}
    </button>
  );
}