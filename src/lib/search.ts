import { FEED_POSTS, FeedPost, POST_TYPES } from "@/lib/posts";

// A lightweight searchable copy of the verified Pins.
export type SearchPin = {
  id: string;
  title: string;
  location: string;
  category: string;
  status: string;
  summary: string;
};

export const SEARCH_PINS: SearchPin[] = [
  {
    id: "c1",
    title: "Illegal dumping site near Wailua River access",
    location: "Wailua · Kauaʻi",
    category: "Illegal Dumping",
    status: "Needs Volunteers",
    summary: "Verified dumping site with furniture and construction debris. Community cleanup organizing now.",
  },
  {
    id: "c2",
    title: "Kealia Beach bathroom needs repair",
    location: "Kealia Beach · Kauaʻi",
    category: "Public Facility",
    status: "Sent to County",
    summary: "Verified unsanitary conditions at Kealia Beach restroom. Routed to Parks and Recreation.",
  },
  {
    id: "c3",
    title: "Large pothole on Kuhio Highway",
    location: "Near Wailua · Kauaʻi",
    category: "Road Hazard",
    status: "In Progress",
    summary: "Verified road hazard confirmed by multiple drivers. Public Works notified.",
  },
  {
    id: "c4",
    title: "Taro farm storm damage — Hanalei Valley",
    location: "Hanalei Valley · Kauaʻi",
    category: "Community Relief",
    status: "Needs Volunteers",
    summary: "Verified storm damage to family taro farm. Cleanup crew and equipment needed this weekend.",
  },
  {
    id: "c5",
    title: "Blocked public beach access on North Shore",
    location: "North Shore · Kauaʻi",
    category: "Public Access",
    status: "Needs Funding",
    summary: "Verified blocked public access path. Legal review and signage funding needed to restore access.",
  },
  {
    id: "c6",
    title: "Wailua River cleanup",
    location: "Wailua · Kauaʻi",
    category: "Environmental",
    status: "Resolved",
    summary: "4,800 lbs of debris removed by 38 volunteers. Site fully restored.",
  },
];

// Known Kauaʻi places, so search can be location-aware.
const PLACES = [
  "kapaʻa", "kapaa", "hanalei", "wailua", "kealia", "waimea", "hanapēpē",
  "hanapepe", "princeville", "kilauea", "anahola", "līhuʻe", "lihue",
  "kōloa", "koloa", "poʻipū", "poipu", "donkey beach", "north shore",
];

// Light synonym expansion — makes keyword search *feel* like it understands intent.
const SYNONYMS: Record<string, string[]> = {
  dangerous: ["hazard", "safety", "accident", "pothole", "wreck", "unsafe"],
  danger: ["hazard", "safety", "accident"],
  safe: ["safety", "crime", "break", "suspicious"],
  safety: ["crime", "break", "suspicious", "alert", "theft"],
  crime: ["break", "theft", "suspicious", "safety"],
  help: ["volunteer", "cleanup", "relief"],
  volunteer: ["cleanup", "relief", "help"],
  donate: ["fund", "funding", "money", "contribute"],
  fund: ["funding", "donate", "money"],
  road: ["pothole", "highway", "hwy", "traffic", "accident"],
  traffic: ["accident", "wreck", "road", "highway"],
  pet: ["dog", "cat", "animal", "lost", "found"],
  dog: ["pet", "lost", "found", "animal"],
  trash: ["dumping", "debris", "cleanup"],
  beach: ["ocean", "shore", "access"],
  wildlife: ["animal", "dog", "river", "cleanup", "dumping", "habitat", "environmental"],
  protection: ["wildlife", "environmental", "cleanup", "river"],
  environment: ["cleanup", "river", "dumping", "environmental", "wildlife"],
  nature: ["environmental", "river", "cleanup", "wildlife"],
};

export type SearchResult = {
  query: string;
  matchedLocation: string | null;
  summary: string;
  pins: SearchPin[];
  posts: FeedPost[];
  isEmpty: boolean;
};

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\sʻāēīōū]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1 && !["the", "and", "near", "for", "what", "whats", "is", "are", "in", "on", "me", "my", "a", "of", "to", "at"].includes(t));
}

function expand(tokens: string[]): Set<string> {
  const set = new Set(tokens);
  for (const t of tokens) {
    (SYNONYMS[t] || []).forEach((s) => set.add(s));
  }
  return set;
}

function scoreText(text: string, terms: Set<string>): number {
  const lower = text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (lower.includes(term)) score += 1;
  }
  return score;
}

export function searchAll(rawQuery: string): SearchResult {
  const query = rawQuery.trim();
  const lower = query.toLowerCase();

  // Detect a location mention.
  const matchedLocation =
    PLACES.find((p) => lower.includes(p)) || null;
  const prettyLocation = matchedLocation
    ? matchedLocation.charAt(0).toUpperCase() + matchedLocation.slice(1)
    : null;

  const terms = expand(tokenize(query));

  // Score & filter pins.
  const scoredPins = SEARCH_PINS.map((pin) => {
    const blob = `${pin.title} ${pin.summary} ${pin.location} ${pin.category} ${pin.status}`;
    let score = scoreText(blob, terms);
    if (matchedLocation && pin.location.toLowerCase().includes(matchedLocation)) score += 3;
    return { pin, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.pin);

  // Score & filter community posts.
  const scoredPosts = FEED_POSTS.map((post) => {
    const typeLabel = POST_TYPES[post.type].label;
    const blob = `${post.title} ${post.body} ${post.location} ${typeLabel}`;
    let score = scoreText(blob, terms);
    if (matchedLocation && post.location.toLowerCase().includes(matchedLocation)) score += 3;
    if (post.hot) score += 0.5;
    return { post, score };
  })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.post);

  const total = scoredPins.length + scoredPosts.length;
  const isEmpty = total === 0;

  // Build a natural-language "AI" summary.
  let summary = "";
  if (isEmpty) {
    summary = prettyLocation
      ? `I couldn't find anything active in ${prettyLocation} right now. Try a broader search, or check the map.`
      : `I couldn't find anything matching "${query}" yet. Try a place name like "Wailua" or a topic like "safety."`;
  } else {
    const where = prettyLocation ? ` near ${prettyLocation}` : "";
    const parts: string[] = [];
    if (scoredPins.length) {
      parts.push(`${scoredPins.length} verified pin${scoredPins.length > 1 ? "s" : ""}`);
    }
    if (scoredPosts.length) {
      parts.push(`${scoredPosts.length} community post${scoredPosts.length > 1 ? "s" : ""}`);
    }
    summary = `Here's what I found${where}: ${parts.join(" and ")}. `;

    // Add a notable detail.
    const trending = scoredPosts.find((p) => p.hot);
    const needsHelp = scoredPins.find((p) => p.status === "Needs Volunteers" || p.status === "Needs Funding");
    if (trending) {
      summary += `"${trending.title}" is trending right now. `;
    }
    if (needsHelp) {
      summary += `"${needsHelp.title}" ${needsHelp.status === "Needs Funding" ? "needs funding" : "needs volunteers"}.`;
    }
  }

  return {
    query,
    matchedLocation: prettyLocation,
    summary: summary.trim(),
    pins: scoredPins,
    posts: scoredPosts,
    isEmpty,
  };
}

// A few example prompts to show before the user types.
export const SEARCH_SUGGESTIONS = [
  "What's happening near Wailua?",
  "Where can I volunteer?",
  "Any safety alerts?",
  "Dangerous roads",
  "Lost dogs",
  "Beach cleanups",
];