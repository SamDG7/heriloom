/**
 * Per-token artwork: distinct from brand hero/logos — styled as collectible / reward previews.
 * https://images.unsplash.com/photo-… URLs
 */
const u = (photo: string) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=85`;

export const tokenArtById: Record<string, string> = {
  // Halfwave — streetwear, graphics, studio goods (not the brand storefront hero)
  t_hw_001: "/halfwave-crest-token.png",
  t_hw_002: "/dropticket-token.png",
  t_mk_002: u("photo-1490114538077-0a7f8cb49891"), // elevated street still life
  t_ns_002: u("photo-1614732414444-096e5f1122d5"), // moody product / waveform vibe

  // Nectar — scent, warmth, home objects
  t_ne_001: "/amber-bloom-token.png",

  t_mk_001: u("photo-1612198188060-c7c2a3b66eae"), // editorial candle / wax
  t_fn_001: "/amber-bloom-token.png",

  // Orbit — performance, footwear, hydration (not the same sneaker wall hero)
  t_or_001: "/orbit-runner-token.png",
  t_or_002: "/hydrate-token.png",
  t_ns_001: u("photo-1595950653106-6c9ebd614d3a"), // alternate athletic shoe studio
  t_rae_001: "/hydrate-token.png",
};

export function artUrlForTokenId(tokenId: string) {
  return tokenArtById[tokenId] ?? "";
}

