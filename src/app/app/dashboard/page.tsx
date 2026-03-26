"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  QuestDetailDialog,
  QuestPreviewCard,
} from "@/components/app/quest-detail-dialog";
import { TokenCard } from "@/components/app/token-card";
import { TokenDetailDialog } from "@/components/app/token-detail-dialog";
import { getInProgressQuestsForBrands } from "@/lib/data/brand-quests";
import { brands, getBrand } from "@/lib/data/brands";
import { currentUser } from "@/lib/data/users";
import type { BrandQuest, Token } from "@/lib/types";

export default function DashboardPage() {
  const [activeToken, setActiveToken] = React.useState<Token | null>(null);
  const [open, setOpen] = React.useState(false);
  const [activeQuest, setActiveQuest] = React.useState<BrandQuest | null>(null);
  const [questOpen, setQuestOpen] = React.useState(false);
  const [burnedIds, setBurnedIds] = React.useState<Set<string>>(
    () => new Set(currentUser.burnedTokenIds ?? [])
  );

  const tokens = currentUser.tokens;
  const activeBrands = new Set(tokens.map((t) => t.brandId));
  const digitalTokens = tokens.filter((t) => !burnedIds.has(t.id));
  const burnedTokens = tokens.filter((t) => burnedIds.has(t.id));
  const inProgressQuests = getInProgressQuestsForBrands(activeBrands);
  const burnsAvailable = digitalTokens.length;

  const selectedBrand = activeToken ? getBrand(activeToken.brandId) ?? null : null;
  const selectedReward =
    activeToken && selectedBrand
      ? selectedBrand.rewardCatalog.find((r) => r.id === activeToken.burn.rewardId) ??
        selectedBrand.rewardCatalog[0] ??
        null
      : null;

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge className="rounded-full bg-[oklch(0.29_0.08_305)] text-white hover:bg-[oklch(0.29_0.08_305)]">
              Dashboard
            </Badge>
          </div>
          <h1 className="mt-4 font-[var(--font-heading)] text-3xl font-semibold tracking-tight sm:text-4xl">
            Your collection
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
            Digital tokens and fulfilled burns live together — open any card for
            burn details or shipping status.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Card className="rounded-[26px] heirloom-card bg-white/70 p-4">
            <div className="text-xs text-muted-foreground">Tokens owned</div>
            <div className="mt-1 text-2xl font-semibold">{tokens.length}</div>
          </Card>
          <Card className="rounded-[26px] heirloom-card bg-white/70 p-4">
            <div className="text-xs text-muted-foreground">Brands active</div>
            <div className="mt-1 text-2xl font-semibold">{activeBrands.size}</div>
          </Card>
          <Card className="rounded-[26px] heirloom-card bg-white/70 p-4">
            <div className="text-xs text-muted-foreground">Burns available</div>
            <div className="mt-1 text-2xl font-semibold">{burnsAvailable}</div>
          </Card>
        </div>
      </div>

      <Card className="overflow-hidden rounded-[28px] heirloom-card bg-white/70 p-6">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Sparkles className="size-4" />
              <span>Featured drops</span>
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              Explore brand ecosystems
            </div>
          </div>
          <Button asChild variant="secondary" className="rounded-full">
            <Link href="/app/profile">
              View your profile <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {brands
            .filter((b) => activeBrands.has(b.id))
            .map((b, idx) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.05 * idx, ease: "easeOut" }}
              >
                <Link href={`/app/brand/${b.id}`} className="group block">
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
                            <div className="truncate text-sm font-semibold">
                              {b.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {b.handle}
                            </div>
                          </div>
                        </div>
                        <Badge variant="secondary" className="rounded-full">
                          {tokens.filter((t) => t.brandId === b.id).length} tokens
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
              </motion.div>
            ))}
        </div>
      </Card>

      <section className="space-y-10">
        <div>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight">All tokens</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              In your wallet versus already redeemed for physical rewards.
            </p>
          </div>

          <div className="space-y-8">
            <div>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  Digital in wallet
                </h3>
                <span className="text-xs text-muted-foreground">
                  {digitalTokens.length} active
                </span>
              </div>
              {digitalTokens.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  You’ve redeemed every token for now — see fulfilled rewards
                  below or earn more on brand pages.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {digitalTokens.map((t) => {
                    const brand = getBrand(t.brandId);
                    return (
                      <TokenCard
                        key={t.id}
                        token={t}
                        brandName={brand?.name ?? "Brand"}
                        onClick={() => {
                          setActiveToken(t);
                          setOpen(true);
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>

            <div>
              <div className="mb-3 flex items-baseline justify-between gap-3">
                <h3 className="text-sm font-semibold tracking-tight text-foreground">
                  Fulfilled — reward shipping
                </h3>
                <span className="text-xs text-muted-foreground">
                  {burnedTokens.length} burned
                </span>
              </div>
              {burnedTokens.length === 0 ? (
                <p className="text-sm text-muted-foreground">
                  Burn a digital token to unlock a status reward — tracking will
                  appear here.
                </p>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {burnedTokens.map((t) => {
                    const brand = getBrand(t.brandId);
                    return (
                      <TokenCard
                        key={t.id}
                        token={t}
                        fulfilled
                        brandName={brand?.name ?? "Brand"}
                        onClick={() => {
                          setActiveToken(t);
                          setOpen(true);
                        }}
                      />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold tracking-tight">
                Quests in progress
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Spend and checklist milestones toward your next drops — from
                brands in your collection.
              </p>
            </div>
          </div>
          {inProgressQuests.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No active quests for your brands right now.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {inProgressQuests.map((q, idx) => {
                const brand = getBrand(q.brandId);
                return (
                  <motion.div
                    key={q.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: 0.05 * idx, ease: "easeOut" }}
                  >
                    <QuestPreviewCard
                      quest={q}
                      brandName={brand?.name ?? "Brand"}
                      onClick={() => {
                        setActiveQuest(q);
                        setQuestOpen(true);
                      }}
                    />
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <TokenDetailDialog
        open={open}
        onOpenChange={setOpen}
        token={activeToken}
        brand={selectedBrand}
        reward={selectedReward}
        burned={activeToken ? burnedIds.has(activeToken.id) : false}
        viewerName={currentUser.displayName}
        onBurn={() => {
          if (!activeToken) return;
          setBurnedIds((prev) => new Set(prev).add(activeToken.id));
        }}
      />

      <QuestDetailDialog
        open={questOpen}
        onOpenChange={setQuestOpen}
        quest={activeQuest}
        brand={activeQuest ? getBrand(activeQuest.brandId) ?? null : null}
      />
    </div>
  );
}

