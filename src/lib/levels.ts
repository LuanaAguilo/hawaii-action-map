export type Level = {
  rank: number;
  name: string;
  icon: string;
  minPoints: number;
};

export const LEVELS: Level[] = [
  { rank: 1, name: "Malihini", icon: "leaf", minPoints: 0 },
  { rank: 2, name: "Sprout", icon: "leaf", minPoints: 1 },
  { rank: 3, name: "Shell Seeker", icon: "pin", minPoints: 5 },
  { rank: 4, name: "Bloom", icon: "sparkle", minPoints: 10 },
  { rank: 5, name: "Honu", icon: "shield", minPoints: 20 },
  { rank: 6, name: "Wave Rider", icon: "check", minPoints: 35 },
  { rank: 7, name: "Grove Keeper", icon: "leaf", minPoints: 50 },
  { rank: 8, name: "Fire Keeper", icon: "flame", minPoints: 75 },
  { rank: 9, name: "Volcano", icon: "flame", minPoints: 100 },
  { rank: 10, name: "Aliʻi", icon: "star", minPoints: 150 },
];

export function getLevel(points: number): { current: Level; next: Level | null } {
  let current = LEVELS[0];
  for (const level of LEVELS) {
    if (points >= level.minPoints) current = level;
  }
  const next = LEVELS.find((l) => l.minPoints > points) || null;
  return { current, next };
}

export function isAlii(points: number): boolean {
  return points >= LEVELS[LEVELS.length - 1].minPoints;
}