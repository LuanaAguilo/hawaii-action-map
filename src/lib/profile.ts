export const AVATARS = [
  { id: "forest", color: "#2d4a3e", label: "Forest" },
  { id: "clay", color: "#8b6f52", label: "Clay" },
  { id: "sage", color: "#6b8f71", label: "Sage" },
  { id: "rose", color: "#c17b8a", label: "Rose" },
  { id: "mustard", color: "#c9a227", label: "Mustard" },
  { id: "ocean", color: "#4a6d7c", label: "Ocean" },
  { id: "terracotta", color: "#b5643f", label: "Terracotta" },
  { id: "plum", color: "#7c5e7a", label: "Plum" },
  { id: "moss", color: "#5c6e4a", label: "Moss" },
  { id: "sand", color: "#a89170", label: "Sand" },
];

export type Achievement = {
  id: string;
  label: string;
  description: string;
  icon: string;
  earned: boolean;
};

export const ACHIEVEMENTS: Achievement[] = [
  { id: "first-report", label: "First Report", description: "Submitted your first pin", icon: "pin", earned: true },
  { id: "ten-reports", label: "10 Reports", description: "Submitted 10 pins", icon: "trophy", earned: false },
  { id: "first-volunteer", label: "First Volunteer", description: "Volunteered for a cause", icon: "heart", earned: true },
  { id: "donor", label: "Community Donor", description: "Donated to a verified cause", icon: "dollar", earned: true },
  { id: "verified-hero", label: "Verified Hero", description: "5 of your pins were verified", icon: "check", earned: false },
  { id: "island-guardian", label: "Island Guardian", description: "Active for 6+ months", icon: "shield", earned: true },
];

export const PROFILE_STATS = {
  reports: 4,
  donated: 3,
  volunteered: 12,
  following: 7,
};