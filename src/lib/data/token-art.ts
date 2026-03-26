/**
 * Per-token artwork: distinct from brand hero/logos — styled as collectible / reward previews.
 * https://images.unsplash.com/photo-… URLs
 */
const u = (photo: string) =>
  `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=1200&q=85`;

export const tokenArtById: Record<string, string> = {
  // Halfwave — streetwear, graphics, studio goods (not the brand storefront hero)
  t_hw_001: u("photo-1680292783974-a9a336c10366"), // embroidered patch / crest detail
  t_hw_002: u("photo-1580044012112-bbef36a3b7d1"), // retail bags / drop-day energy
  t_mk_002: u("photo-1490114538077-0a7f8cb49891"), // elevated street still life
  t_ns_002: u("photo-1614732414444-096e5f1122d5"), // moody product / waveform vibe

  // Nectar — scent, warmth, home objects
  t_ne_001: u("photo-1670967473842-38cf7d288485"), // candle flame / amber glow
  
  t_mk_001: u("photo-1612198188060-c7c2a3b66eae"), // editorial candle / wax
  t_fn_001: u("photo-1590874103328-eac38a683ce7"), // linen / lifestyle carry

  // Orbit — performance, footwear, hydration (not the same sneaker wall hero)
  t_or_001: u("photo-1620945011325-8bf24c0ac765"), // iconic training shoe (color pop)
  t_or_002: u("photo-1584982442479-16e4ac81adff"), // cold bottle / hydration macro
  t_ns_001: u("photo-1595950653106-6c9ebd614d3a"), // alternate athletic shoe studio
  t_rae_001: u("photo-1576086213369-97a306d36557"), // stainless bottle / gym
};

export function artUrlForTokenId(tokenId: string) {
  return tokenArtById[tokenId] ?? "";
}

