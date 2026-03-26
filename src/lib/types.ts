export type Reward = {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  shippingNote: string;
};

export type BrandCategory = "fitness" | "streetwear" | "lifestyle";

export type Brand = {
  id: string;
  name: string;
  handle: string;
  /** Sidebar filter: fitness / streetwear rows */
  category: BrandCategory;
  /** Short line for ecosystem cards and CTAs */
  tagline: string;
  themeGradient: string;
  logoUrl: string;
  heroImageUrl: string;
  rewardCatalog: Reward[];
};

export type TokenRarity = "Common" | "Rare" | "Legendary";

export type Token = {
  id: string;
  brandId: string;
  name: string;
  rarity: TokenRarity;
  artUrl: string;
  earnedAt: string;
  burn: {
    feeUsd: number;
    rewardId: string;
  };
};

export type User = {
  id: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  topBrands: string[];
  tokens: Token[];
  /** Tokens already burned (status rewards Shipped / unlocked) */
  burnedTokenIds?: string[];
};

export type LeaderboardRow = {
  userId: string;
  displayName: string;
  avatarUrl: string;
  score: number;
  rank: number;
};

export type BrandQuestChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type BrandQuestStatus = "not_started" | "in_progress";

export type BrandQuest = {
  id: string;
  brandId: string;
  title: string;
  summary: string;
  status: BrandQuestStatus;
  /** Optional spend tracker toward token unlock */
  spendProgress?: { spentUsd: number; targetUsd: number };
  tokenRewardName: string;
  tokenPreviewArtUrl: string;
  rarityLabel: string;
  checklist: BrandQuestChecklistItem[];
};

