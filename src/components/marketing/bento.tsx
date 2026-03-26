"use client";

import { Flame, Gem, Sparkles, Trophy } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type BentoTile = {
  eyebrow: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  className?: string;
};

export function MarketingBento({
  className,
  tiles,
}: {
  className?: string;
  tiles?: BentoTile[];
}) {
  const defaultTiles: BentoTile[] = [
    {
      eyebrow: "Status drops",
      title: "Burn to unlock the physical.",
      description:
        "Turn a token into premium goods — limited runs, real materials, and shipping built into the flow.",
      icon: <Flame className="size-4" />,
      className: "sm:col-span-2",
    },
    {
      eyebrow: "Display case",
      title: "A profile worth flexing.",
      description:
        "Your tokens, Your Brand: rarity, brand affiliation, and the stories you kept.",
      icon: <Gem className="size-4" />,
    },
    {
      eyebrow: "Leaderboards",
      title: "Culture is social.",
      description:
        "See top collectors per brand, then tap into their collections and status history.",
      icon: <Trophy className="size-4" />,
    },
    {
      eyebrow: "Earn loop",
      title: "Rewards that don’t feel like coupons.",
      description:
        "High-signal drops that map to your spend — designed with creators and premium brands.",
      icon: <Sparkles className="size-4" />,
      className: "sm:col-span-2",
    },
  ];

  const items = tiles ?? defaultTiles;

  return (
    <section className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8", className)}>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map((t) => (
          <Card
            key={t.title}
            className={cn(
              "rounded-[28px] heirloom-card bg-white/70 p-6 sm:p-7",
              t.className
            )}
          >
            <div className="flex items-center justify-between gap-3">
              <Badge variant="secondary" className="rounded-full">
                {t.eyebrow}
              </Badge>
              <span className="grid size-10 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                {t.icon}
              </span>
            </div>
            <div className="mt-4 text-xl font-semibold tracking-tight">
              {t.title}
            </div>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">
              {t.description}
            </p>
          </Card>
        ))}
      </div>
    </section>
  );
}

