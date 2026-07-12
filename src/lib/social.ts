// Extra social data layered onto issues for the community feed.
// Maps issue id -> poster info, reactions, and a top comment.

export type PosterInfo = {
  name: string;
  initials: string;
  color: string;
  level: string;
};

export type SocialMeta = {
  poster: PosterInfo;
  reactions: { unacceptable: number; mahalo: number; onit: number };
  topComment: { author: string; text: string } | null;
  photo: boolean; // whether to show a photo placeholder
  hot: boolean;   // trending / heating up
  timeAgo: string;
};

export const SOCIAL: Record<string, SocialMeta> = {
  "issue-1": {
    poster: { name: "Malia K.", initials: "MK", color: "#2d4a3e", level: "Honu" },
    reactions: { unacceptable: 34, mahalo: 12, onit: 5 },
    topComment: { author: "Keoni M.", text: "This has been broken for MONTHS. County needs to act." },
    photo: true,
    hot: true,
    timeAgo: "8d ago",
  },
  "issue-2": {
    poster: { name: "Bruddah Kai", initials: "BK", color: "#8b6f52", level: "Wave Rider" },
    reactions: { unacceptable: 52, mahalo: 8, onit: 14 },
    topComment: { author: "Nani P.", text: "I'll bring my truck this weekend if others help." },
    photo: true,
    hot: true,
    timeAgo: "14d ago",
  },
  "issue-3": {
    poster: { name: "Leilani K.", initials: "LK", color: "#c17b8a", level: "Bloom" },
    reactions: { unacceptable: 18, mahalo: 4, onit: 3 },
    topComment: { author: "Sam T.", text: "Been there since last month, reported it too." },
    photo: false,
    hot: false,
    timeAgo: "21d ago",
  },
  "issue-4": {
    poster: { name: "Kimo R.", initials: "KR", color: "#4a6d7c", level: "Grove Keeper" },
    reactions: { unacceptable: 41, mahalo: 6, onit: 9 },
    topComment: { author: "Auntie Rose", text: "Almost blew my tire too! Dangerous." },
    photo: true,
    hot: true,
    timeAgo: "10d ago",
  },
  "issue-5": {
    poster: { name: "Kealoha M.", initials: "KM", color: "#5c6e4a", level: "Sprout" },
    reactions: { unacceptable: 9, mahalo: 3, onit: 2 },
    topComment: null,
    photo: false,
    hot: false,
    timeAgo: "4d ago",
  },
  "issue-6": {
    poster: { name: "Noa H.", initials: "NH", color: "#b5643f", level: "Shell Seeker" },
    reactions: { unacceptable: 15, mahalo: 7, onit: 4 },
    topComment: { author: "Malia K.", text: "This access has always been open, who blocked it??" },
    photo: true,
    hot: false,
    timeAgo: "6d ago",
  },
};

export function getSocial(id: string): SocialMeta {
  return (
    SOCIAL[id] || {
      poster: { name: "Community Member", initials: "CM", color: "#8b6f52", level: "Malihini" },
      reactions: { unacceptable: 0, mahalo: 0, onit: 0 },
      topComment: null,
      photo: false,
      hot: false,
      timeAgo: "recently",
    }
  );
}