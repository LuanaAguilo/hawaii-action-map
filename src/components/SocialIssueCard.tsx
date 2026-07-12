"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import { statusColor, urgencyColor } from "@/lib/helpers";
import { getSocial } from "@/lib/social";
import { Issue } from "@/lib/types";

type Comment = { author: string; text: string; time: string };

const REACTIONS = [
  { key: "unacceptable", label: "Unacceptable", emoji: "😤" },
  { key: "mahalo", label: "Mahalo", emoji: "🙏" },
  { key: "onit", label: "I'm on it", emoji: "💪" },
] as const;

export default function SocialIssueCard({ issue }: { issue: Issue }) {
  const social = getSocial(issue.id);

  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState(social.reactions);
  const [myReaction, setMyReaction] = useState<string | null>(null);
  const [comments, setComments] = useState<Comment[]>(
    social.topComment
      ? [{ author: social.topComment.author, text: social.topComment.text, time: "2h ago" }]
      : []
  );
  const [newComment, setNewComment] = useState("");

  const totalReactions =
    reactions.unacceptable + reactions.mahalo + reactions.onit;

  function react(key: string) {
    setReactions((prev) => {
      const copy = { ...prev } as Record<string, number>;
      if (myReaction === key) {
        copy[key] -= 1;
        setMyReaction(null);
      } else {
        if (myReaction) copy[myReaction] -= 1;
        copy[key] += 1;
        setMyReaction(key);
      }
      return copy as typeof prev;
    });
  }

  function postComment() {
    if (!newComment.trim()) return;
    setComments((prev) => [{ author: "You", text: newComment.trim(), time: "just now" }, ...prev]);
    setNewComment("");
  }

  return (
    <div className="card-lift overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)]">
      {/* Poster header */}
      <div className="flex items-center gap-3 px-5 pt-4">
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-white"
          style={{ backgroundColor: social.poster.color }}
        >
          {social.poster.initials}
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-[var(--foreground)]">
              {social.poster.name}
            </span>
            <span className="rounded-full bg-forest/10 px-2 py-0.5 text-[10px] font-medium text-forest">
              {social.poster.level}
            </span>
          </div>
          <p className="text-xs text-neutral-500">
            {issue.locationName} · {social.timeAgo}
          </p>
        </div>
        {social.hot && (
          <span className="flex items-center gap-1 rounded-full bg-rose/10 px-2.5 py-1 text-[10px] font-semibold text-rose">
            🔥 Heating up
          </span>
        )}
      </div>

      {/* Title + badges */}
      <div className="px-5 pt-3">
        <div className="flex items-start justify-between gap-3">
          <Link
            href={`/issue/${issue.id}`}
            className="font-display text-lg font-semibold text-[var(--foreground)] hover:text-forest"
          >
            {issue.title}
          </Link>
          <div className="flex shrink-0 flex-col items-end gap-1.5">
            <Badge className={statusColor(issue.status)}>{issue.status}</Badge>
            <Badge className={urgencyColor(issue.urgency)}>{issue.urgency}</Badge>
          </div>
        </div>
        <p className="mt-2 text-sm text-neutral-600">{issue.publicSummary}</p>
      </div>

      {/* Photo */}
      {social.photo && (
        <div className="mt-3 flex h-52 items-center justify-center bg-gradient-to-br from-[var(--surface-2)] to-[#e3ddcd] text-sm text-neutral-400">
          <span className="flex items-center gap-2">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909M18 12h.008M6.75 21h10.5A2.25 2.25 0 0 0 19.5 18.75V5.25A2.25 2.25 0 0 0 17.25 3H6.75A2.25 2.25 0 0 0 4.5 5.25v13.5A2.25 2.25 0 0 0 6.75 21Z" />
            </svg>
            Community photo
          </span>
        </div>
      )}

      {/* Reaction summary */}
      <div className="flex items-center justify-between px-5 pt-3 text-xs text-neutral-500">
        <span>{totalReactions} reactions · {issue.confirmations} confirmations</span>
        <span>{comments.length} comments</span>
      </div>

      {/* Reaction buttons */}
      <div className="mt-2 grid grid-cols-3 gap-1 px-3">
        {REACTIONS.map((r) => (
          <button
            key={r.key}
            onClick={() => react(r.key)}
            className={
              myReaction === r.key
                ? "flex items-center justify-center gap-1.5 rounded-lg bg-forest/10 py-2 text-xs font-semibold text-forest"
                : "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-neutral-500 hover:bg-[var(--surface-2)] hover:text-forest"
            }
          >
            <span>{r.emoji}</span>
            {r.label}
            <span className="text-neutral-400">
              {(reactions as Record<string, number>)[r.key]}
            </span>
          </button>
        ))}
      </div>

      {/* Action bar */}
      <div className="mt-1 grid grid-cols-4 gap-1 border-t border-[var(--border)] px-3 py-1">
        <ActionButton active={false} onClick={() => setShowComments((s) => !s)} label="Comment" />
        <ActionButton active={reposted} onClick={() => setReposted((r) => !r)} label="Repost" />
        <ActionButton active={saved} onClick={() => setSaved((s) => !s)} label="Save" />
        <Link
          href={`/issue/${issue.id}`}
          className="flex items-center justify-center rounded-lg py-2 text-xs font-medium text-forest hover:bg-[var(--surface-2)]"
        >
          View Case ›
        </Link>
      </div>

      {/* Top comment preview (when not expanded) */}
      {!showComments && comments.length > 0 && (
        <button
          onClick={() => setShowComments(true)}
          className="mx-5 mb-4 block w-[calc(100%-2.5rem)] rounded-lg bg-[var(--surface-2)] px-3 py-2 text-left"
        >
          <span className="text-xs font-semibold text-forest">{comments[0].author} </span>
          <span className="text-sm text-neutral-700">{comments[0].text}</span>
          {comments.length > 1 && (
            <span className="mt-0.5 block text-[11px] text-neutral-400">
              View all {comments.length} comments
            </span>
          )}
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
            <button
              onClick={postComment}
              className="rounded-lg bg-forest px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
            >
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

function ActionButton({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "flex items-center justify-center rounded-lg py-2 text-xs font-semibold text-forest"
          : "flex items-center justify-center rounded-lg py-2 text-xs font-medium text-neutral-500 hover:bg-[var(--surface-2)] hover:text-forest"
      }
    >
      {label}
    </button>
  );
}
