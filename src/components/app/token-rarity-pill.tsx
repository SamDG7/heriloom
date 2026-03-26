import { Badge } from "@/components/ui/badge";
import type { TokenRarity } from "@/lib/types";
import { cn } from "@/lib/utils";

const styles: Record<TokenRarity, string> = {
  Common: "bg-secondary text-secondary-foreground",
  Rare: "bg-[oklch(0.96_0.05_310/0.6)] text-foreground border border-border/70",
  Legendary:
    "bg-[oklch(0.95_0.07_30/0.55)] text-foreground border border-border/70",
};

export function TokenRarityPill({
  rarity,
  className,
}: {
  rarity: TokenRarity;
  className?: string;
}) {
  return (
    <Badge className={cn("rounded-full", styles[rarity], className)}>{rarity}</Badge>
  );
}

