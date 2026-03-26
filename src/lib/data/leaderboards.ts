import type { LeaderboardRow } from "@/lib/types";

export const leaderboards: Record<string, LeaderboardRow[]> = {
  halfwave: [
    {
      userId: "u_1",
      displayName: "Mila K",
      avatarUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1840,
      rank: 1,
    },
    {
      userId: "u_2",
      displayName: "Noah S",
      avatarUrl:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1620,
      rank: 2,
    },
    {
      userId: "u_sky",
      displayName: "Sam",
      avatarUrl:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1410,
      rank: 3,
    },
    {
      userId: "u_4",
      displayName: "Jules",
      avatarUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1205,
      rank: 4,
    },
  ],
  nectar: [
    {
      userId: "u_5",
      displayName: "Aya",
      avatarUrl:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 2120,
      rank: 1,
    },
    {
      userId: "u_sky",
      displayName: "Sam",
      avatarUrl:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1975,
      rank: 2,
    },
    {
      userId: "u_7",
      displayName: "Finn",
      avatarUrl:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1650,
      rank: 3,
    },
  ],
  orbit: [
    {
      userId: "u_8",
      displayName: "Rae",
      avatarUrl:
        "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1555,
      rank: 1,
    },
    {
      userId: "u_9",
      displayName: "Kenji",
      avatarUrl:
        "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1470,
      rank: 2,
    },
    {
      userId: "u_sky",
      displayName: "Sam",
      avatarUrl:
        "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=96&h=96&q=80",
      score: 1310,
      rank: 3,
    },
  ],
};

export function getLeaderboard(brandId: string) {
  return leaderboards[brandId] ?? [];
}

