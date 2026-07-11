// Cute Hawaiian-themed badge levels.
// You level up based on total contributions (reports + volunteer hours + donations).

export type Level = {
  rank: number;
  name: string;
  emoji: string;
  minPoints: number;
};

export const LEVELS: Level[] = [
  { rank: 1, name: "Malihini", emoji: "🥚", minPoints: 0 },
  { rank: 2, name: "Sprout", emoji: "🌱", minPoints: 1 },
  { rank: 3, name: "Shell Seeker", emoji: "🐚", minPoints: 5 },
  { rank: 4, name: "Bloom", emoji: "🌺", minPoints: 10 },
  { rank: 5, name: "Honu", emoji: "🐢", minPoints: 20 },
  { rank: 6, name: "Wave Rider", emoji: "🌊", minPoints: 35 },
  { rank: 7, name: "Grove Keeper", emoji: "🌴", minPoints: 50 },
  { rank: 8, name: "Fire Keeper", emoji: "🔥", minPoints: 75 },
  { rank: 9, name: "Volcano", emoji: "🌋", minPoints: 100 },
  { rank: 10, name: "Aliʻi", emoji: "👑", minPoints: 150 },
];

// Given a point total, return the current level and the next level (if any).
export function getLevel(points: number): { current: Level; next: Level | null } {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (points >= level.minPoints) current = level;
  }
  const next = LEVELS.find((l) => l.minPoints > points) || null;
  return { current, next };
}

// Is this the top level (Aliʻi)? They get the verified star.
export function isAlii(points: number): boolean {
  return points >= LEVELS[LEVELS.length - 1].minPoints;
}