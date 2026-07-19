"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/Icon";
import { FeedPost, POST_TYPES } from "@/lib/posts";

function ActionIcon({ name }: { name: string }) {
  const c = "h-[17px] w-[17px]";
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
    <div className="card-lift overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--surface)]">
      {/* Poster row */}
      <div className="flex items-center gap-3 px-6 pt-5">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white"
          style={{ backgroundColor: post.poster.color }}
        >
          {post.poster.initials}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-semibold text-[var(--foreground)]">{post.poster.name}</span>
            {post.verified && <Icon name="check" className="h-3.5 w-3.5 text-forest" />}
          </div>
          <p className="text-xs text-[var(--muted-2)]">
            {post.location} · {post.timeAgo}
          </p>
        </div>

        <span
          className="shrink-0 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider"
          style={{ backgroundColor: type.color + "14", color: type.color }}
        >
          {type.label}
        </span>
      </div>

      {/* Body */}
      <div className="px-6 pt-4">
        <h3 className="text-[17px] font-bold leading-snug tracking-[-0.01em] text-[var(--foreground)]">
          {post.title}
        </h3>
        <p className="mt-1.5 text-[14px] leading-relaxed text-[var(--muted)]">{post.body}</p>
      </div>

      {/* Photo */}
      {post.image && (
        <div className="relative mt-4 aspect-[16/10] w-full">
          <Image src={post.image} alt={post.title} fill className="object-cover" />
        </div>
      )}

      {/* Meta */}
      <div className="flex items-center gap-1.5 px-6 pb-4 pt-4 text-[11px] text-[var(--muted-2)]">
        <span className="font-semibold text-[var(--foreground)]">{reactions}</span> reactions
        <span className="opacity-40">·</span>
        <span className="font-semibold text-[var(--foreground)]">{comments.length}</span>
        {comments.length === 1 ? "comment" : "comments"}
        {post.hot && (
          <>
            <span className="opacity-40">·</span>
            <span className="font-semibold text-rose">Trending</span>
          </>
        )}
      </div>

      {/* Action bar */}
      <div className="mx-6 mb-5 flex gap-2">
        <ActionBtn active={reacted} onClick={toggleReact} icon="react" label="React" />
        <ActionBtn active={showComments} onClick={() => setShowComments((s) => !s)} icon="comment" label="Comment" />
        <ActionBtn active={saved} onClick={() => setSaved((s) => !s)} icon="save" label={saved ? "Saved" : "Save"} />
      </div>

      {/* Top comment preview */}
      {!showComments && comments.length > 0 && (
        <button
          onClick={() => setShowComments(true)}
          className="flex w-full items-start gap-3 border-t border-[var(--border)] px-6 py-4 text-left transition hover:bg-[var(--surface-2)]/60"
        >
          <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--muted-2)] text-[9px] font-bold text-white">
            {comments[0].author.slice(0, 2).toUpperCase()}
          </div>
          <div className="min-w-0">
            <span className="text-xs font-semibold text-[var(--foreground)]">{comments[0].author} </span>
            <span className="text-[13px] text-[var(--muted)]">{comments[0].text}</span>
          </div>
        </button>
      )}

      {/* Expanded comments */}
      {showComments && (
        <div className="border-t border-[var(--border)] px-6 py-5">
          <div className="mb-4 flex gap-2.5">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && postComment()}
              placeholder="Add your voice..."
              className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--foreground)] placeholder-[var(--muted-2)] focus:border-forest focus:outline-none"
            />
            <button
              onClick={postComment}
              className="rounded-xl bg-forest px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
            >
              Post
            </button>
          </div>

          <div className="flex flex-col gap-3">
            {comments.map((c, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--muted-2)] text-[9px] font-bold text-white">
                  {c.author.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1 rounded-2xl bg-[var(--surface-2)] px-4 py-2.5">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xs font-semibold text-[var(--foreground)]">{c.author}</span>
                    <span className="text-[10px] text-[var(--muted-2)]">{c.time}</span>
                  </div>
                  <p className="mt-0.5 text-[13px] leading-snug text-[var(--muted)]">{c.text}</p>
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
      style={{ backgroundColor: "#2d4a3e", color: "#fff" }}
      className="flex flex-1 items-center justify-center gap-1.5 rounded-full py-2.5 text-xs font-semibold transition hover:opacity-90"
    >
      <ActionIcon name={icon} />
      {label}
    </button>
  );
}