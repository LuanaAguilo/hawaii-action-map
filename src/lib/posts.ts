// Community feed posts — the "Rants & Raves replacement".
// A mix of safety alerts, accidents, civic issues, lost & found, and notices.

export type PostType =
  | "safety"
  | "accident"
  | "suspicious"
  | "lostfound"
  | "notice"
  | "civic";

export type FeedPost = {
  id: string;
  type: PostType;
  title: string;
  body: string;
  location: string;
  timeAgo: string;
  poster: { name: string; initials: string; color: string; level: string };
  verified: boolean;
  reactions: number;
  comments: number;
  topComment?: { author: string; text: string };
  hot: boolean;
};

// Colors + labels + icon name for each type.
export const POST_TYPES: Record<PostType, { label: string; color: string; icon: string }> = {
  safety: { label: "Safety Alert", color: "#c0392b", icon: "shield" },
  accident: { label: "Accident / Traffic", color: "#d97706", icon: "flame" },
  suspicious: { label: "Heads Up", color: "#8b6f52", icon: "check" },
  lostfound: { label: "Lost & Found", color: "#4a6d7c", icon: "pin" },
  notice: { label: "Community Notice", color: "#2d4a3e", icon: "megaphone" },
  civic: { label: "Civic Issue", color: "#5c6e4a", icon: "leaf" },
};

export const FEED_POSTS: FeedPost[] = [
  {
    id: "p1",
    type: "safety",
    title: "Someone breaking into cars at Donkey Beach",
    body: "Just saw a guy going car to car in the Donkey Beach lot around 6am. Lock your cars and don't leave anything visible. Called the police.",
    location: "Donkey Beach · Kauaʻi",
    timeAgo: "22m ago",
    poster: { name: "Bruddah Kai", initials: "BK", color: "#8b6f52", level: "Wave Rider" },
    verified: false,
    reactions: 87,
    comments: 34,
    topComment: { author: "Nani P.", text: "Saw him too! Dark hoodie, took off toward the highway." },
    hot: true,
  },
  {
    id: "p2",
    type: "accident",
    title: "Bad wreck on Kuhio Hwy near Kapaʻa",
    body: "Two-car accident by the Kapaʻa bypass, traffic backed up both directions. Take the bypass road if you can. Ambulance on scene.",
    location: "Kuhio Hwy · Kapaʻa",
    timeAgo: "44m ago",
    poster: { name: "Malia K.", initials: "MK", color: "#2d4a3e", level: "Honu" },
    verified: true,
    reactions: 112,
    comments: 28,
    topComment: { author: "Kimo R.", text: "Sat in this for 40 min. Bypass is moving now." },
    hot: true,
  },
  {
    id: "p3",
    type: "lostfound",
    title: "Found a brown dog near Hanalei",
    body: "Sweet brown dog, no collar, found wandering by the Hanalei bridge. He's friendly and safe with me. Trying to find the owner — please share!",
    location: "Hanalei · Kauaʻi",
    timeAgo: "1h ago",
    poster: { name: "Leilani K.", initials: "LK", color: "#c17b8a", level: "Bloom" },
    verified: true,
    reactions: 156,
    comments: 41,
    topComment: { author: "Auntie Rose", text: "Sharing! That looks like the Kahale family's dog." },
    hot: true,
  },
  {
    id: "p4",
    type: "suspicious",
    title: "Sketchy guy going door to door in Wailua",
    body: "Someone knocking on doors in Wailua Homesteads claiming to sell solar. Wouldn't show ID and left fast when I asked. Just a heads up neighbors.",
    location: "Wailua Homesteads · Kauaʻi",
    timeAgo: "2h ago",
    poster: { name: "Noa H.", initials: "NH", color: "#b5643f", level: "Shell Seeker" },
    verified: false,
    reactions: 63,
    comments: 19,
    topComment: { author: "Sam T.", text: "Came to my place too. Same story." },
    hot: false,
  },
  {
    id: "p5",
    type: "civic",
    title: "Huge pothole on Kuhio Hwy almost blew my tire",
    body: "This pothole near the Wailua turnoff is getting dangerous. Reported it to the county but figured everyone should know to avoid it.",
    location: "Kuhio Hwy · Wailua",
    timeAgo: "3h ago",
    poster: { name: "Kimo R.", initials: "KR", color: "#4a6d7c", level: "Grove Keeper" },
    verified: true,
    reactions: 41,
    comments: 12,
    topComment: { author: "Malia K.", text: "Confirmed, hit it yesterday. County needs to fix this." },
    hot: false,
  },
  {
    id: "p6",
    type: "notice",
    title: "Beach cleanup this Saturday at Kealia",
    body: "Community cleanup at Kealia Beach, 8am Saturday. Bringing gloves and bags — just show up. Coffee and malasadas after. All welcome!",
    location: "Kealia Beach · Kauaʻi",
    timeAgo: "5h ago",
    poster: { name: "Kealoha M.", initials: "KM", color: "#5c6e4a", level: "Sprout" },
    verified: true,
    reactions: 94,
    comments: 22,
    topComment: { author: "Nani P.", text: "Count me in! Bringing the whole family." },
    hot: false,
  },
];