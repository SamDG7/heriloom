import type { User } from "@/lib/types";

import { artUrlForTokenId } from "@/lib/data/token-art";

export const currentUser: User = {
  id: "u_sky",
  displayName: "Sam",
  avatarUrl:
    "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=160&h=160&q=80",
  bio: "Collecting drops across creator brands. Burn for status, keep the story.",
  topBrands: ["halfwave", "nectar", "orbit"],
  burnedTokenIds: ["t_hw_001", "t_ne_001"],
  tokens: [
    {
      id: "t_hw_001",
      brandId: "halfwave",
      name: "Halfwave Vibes",
      rarity: "Rare",
      artUrl: artUrlForTokenId("t_hw_001"),
      earnedAt: "2026-03-10",
      burn: { feeUsd: 10, rewardId: "halfwave-hoodie" },
    },
    {
      id: "t_hw_002",
      brandId: "halfwave",
      name: "Drop Ticket",
      rarity: "Common",
      artUrl: artUrlForTokenId("t_hw_002"),
      earnedAt: "2026-03-18",
      burn: { feeUsd: 10, rewardId: "halfwave-stickers" },
    },
    {
      id: "t_ne_001",
      brandId: "nectar",
      name: "Amber Bloom",
      rarity: "Legendary",
      artUrl: artUrlForTokenId("t_ne_001"),
      earnedAt: "2026-03-06",
      burn: { feeUsd: 10, rewardId: "nectar-candle" },
    },
    {
      id: "t_or_001",
      brandId: "orbit",
      name: "Orbit Runner",
      rarity: "Rare",
      artUrl: artUrlForTokenId("t_or_001"),
      earnedAt: "2026-03-01",
      burn: { feeUsd: 10, rewardId: "orbit-cap" },
    },
    {
      id: "t_or_002",
      brandId: "orbit",
      name: "Hydrate",
      rarity: "Common",
      artUrl: artUrlForTokenId("t_or_002"),
      earnedAt: "2026-03-22",
      burn: { feeUsd: 10, rewardId: "orbit-bottle" },
    },
  ],
};

export const users: User[] = [
  currentUser,
  {
    id: "u_1",
    displayName: "Mila K",
    avatarUrl:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=facearea&w=160&h=160&q=80",
    bio: "Apex collector. Always early to the drop.",
    topBrands: ["nectar", "halfwave"],
    tokens: [
      {
        id: "t_mk_001",
        brandId: "nectar",
        name: "Golden Hour",
        rarity: "Legendary",
        artUrl: artUrlForTokenId("t_mk_001"),
        earnedAt: "2026-03-09",
        burn: { feeUsd: 10, rewardId: "nectar-candle" },
      },
      {
        id: "t_mk_002",
        brandId: "halfwave",
        name: "Studio Pass",
        rarity: "Rare",
        artUrl: artUrlForTokenId("t_mk_002"),
        earnedAt: "2026-03-14",
        burn: { feeUsd: 10, rewardId: "halfwave-hoodie" },
      },
    ],
  },
  {
    id: "u_2",
    displayName: "Noah S",
    avatarUrl:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=facearea&w=160&h=160&q=80",
    bio: "Streetwear drops + clean utility. Minimal, curated, intentional.",
    topBrands: ["halfwave", "orbit"],
    tokens: [
      {
        id: "t_ns_001",
        brandId: "orbit",
        name: "Core Runner",
        rarity: "Rare",
        artUrl: artUrlForTokenId("t_ns_001"),
        earnedAt: "2026-03-04",
        burn: { feeUsd: 10, rewardId: "orbit-cap" },
      },
      {
        id: "t_ns_002",
        brandId: "halfwave",
        name: "Waveform",
        rarity: "Common",
        artUrl: artUrlForTokenId("t_ns_002"),
        earnedAt: "2026-03-21",
        burn: { feeUsd: 10, rewardId: "halfwave-stickers" },
      },
    ],
  },
  {
    id: "u_7",
    displayName: "Finn",
    avatarUrl:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=facearea&w=160&h=160&q=80",
    bio: "Utility-first, but never boring.",
    topBrands: ["nectar"],
    tokens: [
      {
        id: "t_fn_001",
        brandId: "nectar",
        name: "Amber Bloom",
        rarity: "Rare",
        artUrl: artUrlForTokenId("t_fn_001"),
        earnedAt: "2026-03-02",
        burn: { feeUsd: 10, rewardId: "nectar-tote" },
      },
    ],
  },
  {
    id: "u_8",
    displayName: "Rae",
    avatarUrl:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=facearea&w=160&h=160&q=80",
    bio: "Training, travel, and status drops.",
    topBrands: ["orbit"],
    tokens: [
      {
        id: "t_rae_001",
        brandId: "orbit",
        name: "Hydrate",
        rarity: "Common",
        artUrl: artUrlForTokenId("t_rae_001"),
        earnedAt: "2026-03-12",
        burn: { feeUsd: 10, rewardId: "orbit-bottle" },
      },
    ],
  },
];

export function getUser(id: string) {
  return users.find((u) => u.id === id);
}

