import type { Brand } from "@/lib/types";

/** Single visual asset per brand (landing lookbook + logos + rewards in app). */
const HALFWAVE_IMG =
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop";
const NECTAR_IMG =
  "https://images.unsplash.com/photo-1445205170230-053b83016050?auto=format&fit=crop";
const ORBIT_IMG =
  "https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop";

export const brands: Brand[] = [
  {
    id: "halfwave",
    name: "Halfwave Studio",
    handle: "@halfwave",
    category: "streetwear",
    tagline:
      "Streetwear drops and studio-grade collectibles—built for the feed and the closet.",
    themeGradient:
      "bg-[radial-gradient(1200px_700px_at_10%_-10%,oklch(0.95_0.07_30/0.9),transparent_60%),radial-gradient(900px_600px_at_90%_-20%,oklch(0.96_0.06_310/0.9),transparent_55%)]",
    logoUrl: `${HALFWAVE_IMG}&w=160&h=160&q=85`,
    heroImageUrl: `${HALFWAVE_IMG}&w=1600&q=85`,
    rewardCatalog: [
      {
        id: "halfwave-hoodie",
        title: "Ultra-Soft Hoodie (Drop 01)",
        subtitle: "Premium weight, stitched crest",
        imageUrl: `${HALFWAVE_IMG}&w=1600&q=85`,
        shippingNote: "Ships in 5–7 business days. Limited run.",
      },
      {
        id: "halfwave-stickers",
        title: "Sticker Pack (7 pcs)",
        subtitle: "Holographic + matte mix",
        imageUrl: `${HALFWAVE_IMG}&w=1600&q=85`,
        shippingNote: "Ships in 3–5 business days.",
      },
    ],
  },
  {
    id: "nectar",
    name: "Nectar Lab",
    handle: "@nectarlab",
    category: "lifestyle",
    tagline:
      "Scent-forward rituals and small-batch objects for a slower, louder home.",
    themeGradient:
      "bg-[radial-gradient(1200px_700px_at_15%_-20%,oklch(0.97_0.06_95/0.9),transparent_55%),radial-gradient(1000px_700px_at_80%_-15%,oklch(0.95_0.06_20/0.9),transparent_55%)]",
    logoUrl: `${NECTAR_IMG}&w=160&h=160&q=85`,
    heroImageUrl: `${NECTAR_IMG}&w=1600&q=85`,
    rewardCatalog: [
      {
        id: "nectar-candle",
        title: "Scent Candle (Amber)",
        subtitle: "Small-batch, warm glow",
        imageUrl: `${NECTAR_IMG}&w=1600&q=85`,
        shippingNote: "Ships in 5–7 business days. Hand-finished.",
      },
      {
        id: "nectar-tote",
        title: "Everyday Tote",
        subtitle: "Canvas, embroidered mark",
        imageUrl: `${NECTAR_IMG}&w=1600&q=85`,
        shippingNote: "Ships in 5–7 business days. Limited stock.",
      },
    ],
  },
  {
    id: "orbit",
    name: "Orbit Athletics",
    handle: "@orbitathletics",
    category: "fitness",
    tagline:
      "Performance layers and everyday carry for miles, reps, and red-eye flights.",
    themeGradient:
      "bg-[radial-gradient(1200px_700px_at_10%_-20%,oklch(0.95_0.05_310/0.9),transparent_55%),radial-gradient(900px_700px_at_85%_-10%,oklch(0.96_0.06_160/0.8),transparent_55%)]",
    logoUrl: `${ORBIT_IMG}&w=160&h=160&q=85`,
    heroImageUrl: `${ORBIT_IMG}&w=1600&q=85`,
    rewardCatalog: [
      {
        id: "orbit-cap",
        title: "Performance Cap",
        subtitle: "Breathable, minimal logo",
        imageUrl: `${ORBIT_IMG}&w=1600&q=85`,
        shippingNote: "Ships in 3–5 business days.",
      },
      {
        id: "orbit-bottle",
        title: "Stainless Bottle",
        subtitle: "Cold all day",
        imageUrl: `${ORBIT_IMG}&w=1600&q=85`,
        shippingNote: "Ships in 3–5 business days.",
      },
    ],
  },
];

export function getBrand(id: string) {
  return brands.find((b) => b.id === id);
}
