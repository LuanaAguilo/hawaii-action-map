// Hawaiʻi-themed avatar pool. Each user gets auto-assigned one.
// Using emoji + a color so no image files are needed.
export const AVATARS = [
  { id: "honu", emoji: "🐢", color: "#2dd4bf", label: "Honu" },
  { id: "hibiscus", emoji: "🌺", color: "#f472b6", label: "Hibiscus" },
  { id: "wave", emoji: "🌊", color: "#38bdf8", label: "Wave" },
  { id: "volcano", emoji: "🌋", color: "#fb7185", label: "Volcano" },
  { id: "shaka", emoji: "🤙", color: "#fbbf24", label: "Shaka" },
  { id: "palm", emoji: "🌴", color: "#4ade80", label: "Palm" },
  { id: "pineapple", emoji: "🍍", color: "#facc15", label: "Pineapple" },
  { id: "dolphin", emoji: "🐬", color: "#60a5fa", label: "Dolphin" },
  { id: "rainbow", emoji: "🌈", color: "#a78bfa", label: "Rainbow" },
  { id: "sun", emoji: "🌅", color: "#fb923c", label: "Sunrise" },
];

// Achievement / badge definitions.
export type Achievement = {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-report", label: "First Report", description: "Submitted your first issue", icon: "📍", earned: true },
  { id: "ten-reports", label: "10 Reports", description: "Submitted 10 issues", icon: "📢", earned: false },
  { id: "first-volunteer", label: "First Volunteer", description: "Volunteered for a cause", icon: "🙌", earned: true },
  { id: "donor", label: "Community Donor", description: "Donated to a verified cause", icon: "💚", earned: true },
  { id: "verified-hero", label: "Verified Hero", description: "5 of your reports were verified", icon: "✅", earned: false },
  { id: "island-guardian", label: "Island Guardian", description: "Active for 6+ months", icon: "🌺", earned: true },
];

// The core stats shown on the profile.
export const PROFILE_STATS = {
  reports: 4,
  donated: 3,
  volunteered: 12,
  following: 7,
};