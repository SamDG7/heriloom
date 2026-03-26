import type { BrandQuest } from "@/lib/types";

const HW = "https://images.unsplash.com/photo-1711444077166-8abc8e33d3e1?auto=format&fit=crop&w=1200&q=85";
const NE = "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop&w=1200&q=85";
const OR = "https://images.unsplash.com/photo-1518214598173-1666bc921d66?auto=format&fit=crop";
const OR_T = "https://images.unsplash.com/photo-1634921363975-46fa99024422?auto=format&fit=crop";

export const brandQuests: BrandQuest[] = [
  {
    id: "q_hw_drop_loyalist",
    brandId: "halfwave",
    title: "Drop loyalist",
    summary: "Spend with Halfwave and complete the look to earn a rare crest token.",
    status: "in_progress",
    spendProgress: { spentUsd: 142, targetUsd: 350 },
    tokenRewardName: "Halfwave Crest",
    tokenPreviewArtUrl: HW,
    rarityLabel: "Rare",
    checklist: [
      { id: "c1", label: "Spend at least $300 at Halfwave Studio (online or flagship)", done: false },
      { id: "c2", label: "Purchase any Drop 01 hoodie or crew from the current season", done: true },
      { id: "c3", label: "Join the brand list and confirm your shipping region", done: true },
    ],
  },
  {
    id: "q_hw_early_adopter",
    brandId: "halfwave",
    title: "Early adopter stack",
    summary: "Bundle two accessories + one graphic to unlock a limited digital ticket.",
    status: "not_started",
    spendProgress: { spentUsd: 0, targetUsd: 500 },
    tokenRewardName: "Drop Ticket",
    tokenPreviewArtUrl: HW,
    rarityLabel: "Common",
    checklist: [
      { id: "c1", label: "Spend $500+ across Halfwave in a single quarter", done: false },
      { id: "c2", label: "Buy any hat and any bag in the same order", done: false },
      { id: "c3", label: "Redeem the welcome code within 14 days of signup", done: false },
    ],
  },
  {
    id: "q_or_mile_club",
    brandId: "orbit",
    title: "Mile club",
    summary: "Hit spend and product milestones for performance gear to earn the Orbit Runner token.",
    status: "in_progress",
    spendProgress: { spentUsd: 96, targetUsd: 180 },
    tokenRewardName: "Orbit Runner",
    tokenPreviewArtUrl: OR,
    rarityLabel: "Rare",
    checklist: [
      { id: "c1", label: "Spend $180+ on Orbit footwear or apparel", done: false },
      { id: "c2", label: "Purchase at least one training top and one bottom", done: true },
      { id: "c3", label: "Opt into Orbit training drops via the app", done: false },
    ],
  },
  {
    id: "q_or_hydration_duo",
    brandId: "orbit",
    title: "Hydration duo",
    summary: "Pair cap + bottle in one checkout to unlock the Hydrate utility token.",
    status: "in_progress",
    spendProgress: { spentUsd: 38, targetUsd: 75 },
    tokenRewardName: "Hydrate",
    tokenPreviewArtUrl: OR,
    rarityLabel: "Common",
    checklist: [
      { id: "c1", label: "Add Performance Cap and Stainless Bottle to cart", done: true },
      { id: "c2", label: "Complete checkout with same shipping address as your Heirloom profile", done: false },
      { id: "c3", label: "Order total must include both SKUs in one transaction", done: false },
    ],
  },
  {
    id: "q_ne_ritual_set",
    brandId: "nectar",
    title: "Ritual set",
    summary: "Layer home scent with carry goods to earn the Amber Bloom legendary token.",
    status: "not_started",
    spendProgress: { spentUsd: 0, targetUsd: 220 },
    tokenRewardName: "Amber Bloom",
    tokenPreviewArtUrl: NE,
    rarityLabel: "Legendary",
    checklist: [
      { id: "c1", label: "Spend $220+ on Nectar Lab products", done: false },
      { id: "c2", label: "Purchase an Amber candle and the Everyday Tote together", done: false },
      { id: "c3", label: "Leave a verified review within 10 days of delivery", done: false },
    ],
  },
];

export function getQuestsForBrand(brandId: string) {
  return brandQuests.filter((q) => q.brandId === brandId);
}

/** Quests the user is actively progressing (static demo data). */
export function getInProgressQuestsForBrands(brandIds: Set<string>) {
  return brandQuests.filter(
    (q) => q.status === "in_progress" && brandIds.has(q.brandId)
  );
}
