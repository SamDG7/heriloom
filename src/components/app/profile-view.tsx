"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Gem, Sparkles } from "lucide-react";

import { BurnedTokensShelf } from "@/components/app/burned-tokens-shelf";
import { TokenCard } from "@/components/app/token-card";
import { TokenDetailDialog } from "@/components/app/token-detail-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { brands, getBrand } from "@/lib/data/brands";
import { initials } from "@/lib/utils";
import type { Token, User } from "@/lib/types";

export function ProfileView({
  user,
  showBackToDashboard = true,
  showLanding = true,
}: {
  user: User;
  showBackToDashboard?: boolean;
  showLanding?: boolean;
}) {
  const [activeToken, setActiveToken] = React.useState<Token | null>(null);
  const [open, setOpen] = React.useState(false);
  const [burnedIds, setBurnedIds] = React.useState<Set<string>>(
    () => new Set(user.burnedTokenIds ?? [])
  );

  const tokens = user.tokens;
  const rarest = [...tokens]
    .filter((t) => !burnedIds.has(t.id))
    .sort((a, b) => {
      const score = (r: Token["rarity"]) => (r === "Legendary" ? 3 : r === "Rare" ? 2 : 1);
      return score(b.rarity) - score(a.rarity);
    });

  const burnedShelfItems = React.useMemo(() => {
    return tokens
      .filter((t) => burnedIds.has(t.id))
      .map((t) => {
        const b = getBrand(t.brandId);
        const r =
          b?.rewardCatalog.find((x) => x.id === t.burn.rewardId) ?? b?.rewardCatalog[0];
        return {
          id: t.id,
          tokenName: t.name,
          brandName: b?.name ?? "Brand",
          rewardTitle: r?.title ?? "Status reward",
          rewardImageUrl: r?.imageUrl ?? t.artUrl,
          detailLine: `Tracking updates when the carrier scans · Burned ${t.earnedAt}`,
        };
      });
  }, [tokens, burnedIds]);

  const selectedBrand = activeToken ? getBrand(activeToken.brandId) ?? null : null;
  const selectedReward =
    activeToken && selectedBrand
      ? selectedBrand.rewardCatalog.find((r) => r.id === activeToken.burn.rewardId) ??
        selectedBrand.rewardCatalog[0] ??
        null
      : null;

  const participatingBrands = brands.filter((b) => user.topBrands.includes(b.id));

  return (
    <div className="space-y-8">
      <Card className="overflow-hidden rounded-[28px] heirloom-card bg-white/70 p-6 sm:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="size-16 ring-1 ring-black/5">
              <AvatarImage src={user.avatarUrl} alt={user.displayName} />
              <AvatarFallback>{initials(user.displayName)}</AvatarFallback>
            </Avatar>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate font-[var(--font-heading)] text-2xl font-semibold tracking-tight sm:text-3xl">
                  {user.displayName}
                </h1>
                <Badge className="rounded-full bg-[oklch(0.29_0.08_305)] text-white hover:bg-[oklch(0.29_0.08_305)]">
                  Collector tier: Apex
                </Badge>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
                {user.bio}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {showBackToDashboard && (
              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/app/dashboard">
                  <ArrowLeft className="mr-2 size-4" /> Dashboard
                </Link>
              </Button>
            )}
            {showLanding && (
              <Button asChild className="rounded-full">
                <Link href="/">
                  <Gem className="mr-2 size-4" /> Landing
                </Link>
              </Button>
            )}
          </div>
        </div>

        <Separator className="my-6 bg-border/70" />

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="rounded-3xl border-border/70 bg-white/70 p-4 shadow-sm">
            <div className="text-xs text-muted-foreground">Tokens owned</div>
            <div className="mt-1 text-2xl font-semibold">{tokens.length}</div>
          </Card>
          <Card className="rounded-3xl border-border/70 bg-white/70 p-4 shadow-sm">
            <div className="text-xs text-muted-foreground">Brands active</div>
            <div className="mt-1 text-2xl font-semibold">{participatingBrands.length}</div>
          </Card>
          <Card className="rounded-3xl border-border/70 bg-white/70 p-4 shadow-sm">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-4" />
              <span>Display case</span>
            </div>
            <div className="mt-1 text-2xl font-semibold">Curated</div>
          </Card>
        </div>
      </Card>

      <Card className="rounded-[28px] heirloom-card bg-white/70 p-6">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Affiliated brands
          </div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {participatingBrands.map((b) => (
              <Link key={b.id} href={`/app/brand/${b.id}`} className="group block">
                <Card className="overflow-hidden rounded-3xl border-border/70 bg-white/80 p-0 shadow-sm transition-shadow group-hover:shadow-md">
                  <div className={`p-5 ${b.themeGradient}`}>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={b.logoUrl}
                          alt={b.name}
                          className="size-10 rounded-2xl object-cover ring-1 ring-black/5"
                        />
                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold">{b.name}</div>
                          <div className="text-xs text-muted-foreground">{b.handle}</div>
                        </div>
                      </div>
                      <Badge variant="secondary" className="rounded-full">
                        Active
                      </Badge>
                    </div>
                  </div>
                  <div className="border-t border-border/50 bg-white/90 p-5">
                    <p className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/90">
                      {b.tagline}
                    </p>
                    <div className="mt-4 flex items-center justify-end gap-1 text-sm font-semibold text-foreground transition-colors group-hover:text-[oklch(0.29_0.08_305)]">
                      View
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Card>

      <Card className="rounded-[28px] heirloom-card bg-white/70 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              Top shelf
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">Explore the Pieces</div>
            <div className="mt-1 text-sm text-muted-foreground">
              Tap a token to see details and the burn outcome.
            </div>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {rarest.slice(0, 8).map((t, idx) => {
            const brand = getBrand(t.brandId);
            return (
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.03 * idx, ease: "easeOut" }}
                className="relative"
              >
                <div className="pointer-events-none absolute -inset-1 -z-10 rounded-[32px] bg-gradient-to-b from-black/5 to-transparent blur-[10px]" />
                <TokenCard
                  token={t}
                  brandName={brand?.name ?? "Brand"}
                  disabled={burnedIds.has(t.id)}
                  onClick={() => {
                    setActiveToken(t);
                    setOpen(true);
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 border-t border-border/60 pt-8">
          <div className="flex items-end justify-between gap-4">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                Burned vault
              </div>
              <div className="mt-2 text-lg font-semibold tracking-tight">
                Status rewards in motion
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Physical items unlocked from burns—headed to the address on your profile.
              </div>
            </div>
          </div>
          <div className="mt-5">
            <BurnedTokensShelf items={burnedShelfItems} />
          </div>
        </div>
      </Card>

      <TokenDetailDialog
        open={open}
        onOpenChange={setOpen}
        token={activeToken}
        brand={selectedBrand}
        reward={selectedReward}
        burned={activeToken ? burnedIds.has(activeToken.id) : false}
        viewerName={user.displayName}
        onBurn={() => {
          if (!activeToken) return;
          setBurnedIds((prev) => new Set(prev).add(activeToken.id));
        }}
      />
    </div>
  );
}

