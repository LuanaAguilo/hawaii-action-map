"use client";

import { useState } from "react";
import Link from "next/link";
import Badge from "@/components/Badge";
import { statusColor, urgencyColor } from "@/lib/helpers";
import { Issue } from "@/lib/types";

type Comment = {
  author: string;
  text: string;
  time: string;
};

export default function SocialIssueCard({ issue }: { issue: Issue }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(issue.confirmations);
  const [saved, setSaved] = useState(false);
  const [reposted, setReposted] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([
    { author: "Keoni M.", text: "I drive past this every day, glad someone reported it.", time: "2h ago" },
    { author: "Leilani K.", text: "Confirmed, saw it this morning too.", time: "5h ago" },
  ]);
  const [newComment, setNewComment] = useState("");

  function toggleLike() {
    setLiked((prev) => {
      setLikeCount((c) => (prev ? c - 1 : c + 1));
      return !prev;
    });
  }

  function postComment() {
    if (!newComment.trim()) return;
    setComments((prev) => [
      { author: "You", text: newComment.trim(), time: "just now" },
      ...prev,
    ]);
    setNewComment("");
  }

  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <Link
            href={`/issue/${issue.id}`}
            className="font-display text-base font-semibold text-white hover:text-mint"
          >
            {issue.title}
          </Link>
          <p className="mt-0.5 text-xs text-neutral-500">
            {issue.locationName} · Kauaʻi · {issue.daysOpen}d ago
          </p>
        </div>
        <div className="flex flex-col items-end gap-1.5">
          <Badge className={statusColor(issue.status)}>{issue.status}</Badge>
          <Badge className={urgencyColor(issue.urgency)}>{issue.urgency}</Badge>
        </div>
      </div>

      {/* Summary */}
      <p className="mt-3 text-sm text-neutral-400">{issue.publicSummary}</p>

      {/* Counts row */}
      <div className="mt-3 flex items-center gap-4 text-xs text-neutral-500">
        <span>{likeCount} confirmations</span>
        <span>{comments.length} comments</span>
        {reposted && <span className="text-mint">You reposted</span>}
        {saved && <span className="text-mint">Saved</span>}
      </div>

      {/* Action bar */}
      <div className="mt-3 grid grid-cols-4 gap-1 border-t border-[var(--border)] pt-2">
        <ActionButton active={liked} onClick={toggleLike} label="Confirm" icon="👍" />
        <ActionButton
          active={showComments}
          onClick={() => setShowComments((s) => !s)}
          label="Comment"
          icon="💬"
        />
        <ActionButton
          active={reposted}
          onClick={() => setReposted((r) => !r)}
          label="Repost"
          icon="🔁"
        />
        <ActionButton
          active={saved}
          onClick={() => setSaved((s) => !s)}
          label="Save"
          icon="🔖"
        />
      </div>

      {/* Comments section */}
      {showComments && (
        <div className="mt-3 border-t border-[var(--border)] pt-3">
          {/* Add comment */}
          <div className="mb-3 flex gap-2">
            <input
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && postComment()}
              placeholder="Write a comment..."
              className="flex-1 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-white placeholder-neutral-600 focus:border-mint focus:outline-none"
            />
            <button
              onClick={postComment}
              className="rounded-lg bg-mint px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
            >
              Post
            </button>
          </div>

          {/* Comment list */}
          <div className="flex flex-col gap-2">
            {comments.map((c, i) => (
              <div
                key={i}
                className="rounded-lg bg-[var(--surface-2)] px-3 py-2"
              >
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold text-mint">{c.author}</span>
                  <span className="text-[10px] text-neutral-600">{c.time}</span>
                </div>
                <p className="mt-0.5 text-sm text-neutral-300">{c.text}</p>
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
  icon,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  icon: string;
}) {
  return (
    <button
      onClick={onClick}
      className={
        active
          ? "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-semibold text-mint"
          : "flex items-center justify-center gap-1.5 rounded-lg py-2 text-xs font-medium text-neutral-400 hover:bg-[var(--surface-2)] hover:text-white"
      }
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}