"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { brands, getBrand } from "@/lib/data/brands";
import { currentUser } from "@/lib/data/users";
import { MarketingHero } from "@/components/marketing/hero";
import { MarketingBento } from "@/components/marketing/bento";
import { BrandLookbookStrip } from "@/components/marketing/lookbook";
import { WaitlistAccessDialog } from "@/components/marketing/waitlist-access-dialog";

export default function Home() {
  const showcaseTokens = currentUser.tokens.slice(0, 6);
  const burnedIds = new Set(currentUser.burnedTokenIds ?? []);
  const [waitlistOpen, setWaitlistOpen] = React.useState(false);

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-2xl bg-[oklch(0.29_0.08_305)] text-white shadow-sm">
              <Gem className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Heirloom</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              className="rounded-full"
              onClick={() => setWaitlistOpen(true)}
            >
              Open the app <ArrowRight className="ml-2 size-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        <MarketingHero onOpenAppClick={() => setWaitlistOpen(true)} />

        {/* Bento overlaps hero slightly (Outseta-style depth) */}
        <div className="relative z-10 -mt-6 py-10 sm:-mt-8 sm:py-14">
          <MarketingBento />
        </div>

        <BrandLookbookStrip
          items={brands.map((b) => ({
            title: b.name,
            subtitle: b.handle,
            imageUrl: b.heroImageUrl,
          }))}
        />

        <section className="mx-auto w-full max-w-7xl px-5 pb-24 pt-12 sm:px-8 sm:pt-16">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr] lg:items-end">
            <div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Badge variant="secondary" className="rounded-full">
                  Collection preview
                </Badge>
              </div>
              <h2 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold tracking-tight sm:text-4xl">
                A display case you actually want to share.
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                Token art, rarity, burn outcomes — designed like a premium
                product catalog instead of a points dashboard.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Button
                  className="rounded-full"
                  onClick={() => setWaitlistOpen(true)}
                >
                  Open dashboard <ArrowRight className="ml-2 size-4" />
                </Button>
                <Button asChild variant="secondary" className="rounded-full">
                  <Link href="/app/profile">View profile</Link>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {showcaseTokens.slice(0, 4).map((t) => {
                const brand = getBrand(t.brandId);
                const isBurned = burnedIds.has(t.id);
                const reward =
                  isBurned && brand
                    ? brand.rewardCatalog.find((r) => r.id === t.burn.rewardId) ??
                      brand.rewardCatalog[0]
                    : null;
                // Amber Bloom is the one we want to visually match the shipping
                // reward art for (candle image).
                const shouldUseAmberBloomReward =
                  t.id === "t_ne_001" || t.name === "Amber Bloom";
                const imgSrc = shouldUseAmberBloomReward
                  ? (brand?.rewardCatalog.find((r) => r.id === t.burn.rewardId)
                      ?.imageUrl ?? reward?.imageUrl ?? t.artUrl)
                  : reward?.imageUrl ?? t.artUrl;

                return (
                  <Card
                    key={t.id}
                    className="overflow-hidden rounded-3xl border-border/70 bg-white/80 p-0 shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={imgSrc}
                        alt={t.name}
                        className="h-full w-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />
                      <div className="absolute bottom-3 left-3 right-3">
                        <div className="truncate text-sm font-semibold text-white">
                          {t.name}
                        </div>
                        <div className="text-xs text-white/80">{t.rarity}</div>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            <Card className="rounded-[26px] heirloom-card bg-white/70 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Built for brands
              </div>
              <div className="mt-3 text-lg font-semibold tracking-tight">
                Drops that feel native.
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Premium imagery, clean hierarchy, and a product-first burn flow
                that reads like commerce.
              </p>
            </Card>
            <Card className="rounded-[26px] heirloom-card bg-white/70 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Built for collectors
              </div>
              <div className="mt-3 text-lg font-semibold tracking-tight">
                Collectibles with utility.
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                A single collection across every brand — rarity, burn outcomes,
                and status history in one profile.
              </p>
            </Card>
            <Card className="rounded-[26px] heirloom-card bg-white/70 p-6">
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Built for momentum
              </div>
              <div className="mt-3 text-lg font-semibold tracking-tight">
                Social by default.
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Leaderboards route into public profiles — browse other
                collectors, their tokens, and their status unlocks.
              </p>
            </Card>
          </div>
        </section>
      </main>

      <WaitlistAccessDialog
        open={waitlistOpen}
        onOpenChange={setWaitlistOpen}
      />
    </div>
  );
}
