"use client";

import * as React from "react";
import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, ScrollText, Sparkles } from "lucide-react";

import {
  QuestDetailDialog,
  QuestPreviewCard,
} from "@/components/app/quest-detail-dialog";
import { TokenCard } from "@/components/app/token-card";
import { TokenDetailDialog } from "@/components/app/token-detail-dialog";
import { LeaderboardCard } from "@/components/app/leaderboard-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getQuestsForBrand } from "@/lib/data/brand-quests";
import { getBrand } from "@/lib/data/brands";
import { getLeaderboard } from "@/lib/data/leaderboards";
import { currentUser } from "@/lib/data/users";
import type { BrandQuest, Token, TokenRarity } from "@/lib/types";

const rarityTabs: Array<{ id: "all" | TokenRarity | "Burnable"; label: string }> =
  [
    { id: "all", label: "All" },
    { id: "Common", label: "Common" },
    { id: "Rare", label: "Rare" },
    { id: "Legendary", label: "Legendary" },
    { id: "Burnable", label: "Burnable" },
  ];

export default function BrandPage() {
  const params = useParams<{ id: string }>();
  const brandId = params?.id;
  const brand = brandId ? getBrand(brandId) : null;
  if (!brand) return notFound();

  const [tab, setTab] = React.useState<(typeof rarityTabs)[number]["id"]>("all");
  const [activeToken, setActiveToken] = React.useState<Token | null>(null);
  const [open, setOpen] = React.useState(false);
  const [burnedIds, setBurnedIds] = React.useState<Set<string>>(
    () => new Set(currentUser.burnedTokenIds ?? [])
  );
  const [activeQuest, setActiveQuest] = React.useState<BrandQuest | null>(null);
  const [questOpen, setQuestOpen] = React.useState(false);

  const tokens = currentUser.tokens.filter((t) => t.brandId === brand.id);
  const quests = getQuestsForBrand(brand.id);
  const filtered =
    tab === "all"
      ? tokens
      : tab === "Burnable"
        ? tokens.filter((t) => !burnedIds.has(t.id))
        : tokens.filter((t) => t.rarity === tab);

  const selectedReward =
    activeToken
      ? brand.rewardCatalog.find((r) => r.id === activeToken.burn.rewardId) ??
        brand.rewardCatalog[0] ??
        null
      : null;

  const leaderboard = getLeaderboard(brand.id);

  return (
    <div className="space-y-8">
      <div className="grid gap-5 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className={`overflow-hidden rounded-[28px] heirloom-card bg-white/70 ${brand.themeGradient}`}>
          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={brand.logoUrl}
                  alt={brand.name}
                  className="size-12 rounded-3xl object-cover ring-1 ring-black/5"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h1 className="truncate font-[var(--font-heading)] text-2xl font-semibold tracking-tight sm:text-3xl">
                      {brand.name}
                    </h1>
                    <Badge variant="secondary" className="rounded-full">
                      {brand.handle}
                    </Badge>
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">
                    Your owned tokens + social leaderboard.
                  </div>
                </div>
              </div>

              <Button asChild variant="secondary" className="rounded-full">
                <Link href="/app/dashboard">
                  <ArrowLeft className="mr-2 size-4" /> Back
                </Link>
              </Button>
            </div>

            <Separator className="my-6 bg-border/70" />

            <div className="grid gap-3 sm:grid-cols-3">
              <Card className="rounded-3xl border-border/70 bg-white/70 p-4 shadow-sm">
                <div className="text-xs text-muted-foreground">Tokens owned</div>
                <div className="mt-1 text-2xl font-semibold">{tokens.length}</div>
              </Card>
              <Card className="rounded-3xl border-border/70 bg-white/70 p-4 shadow-sm">
                <div className="text-xs text-muted-foreground">Burns available</div>
                <div className="mt-1 text-2xl font-semibold">
                  {tokens.length - burnedIds.size}
                </div>
              </Card>
              <Card className="rounded-3xl border-border/70 bg-white/70 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Sparkles className="size-4" />
                  <span>Community rank</span>
                </div>
                <div className="mt-1 text-2xl font-semibold">
                  #{leaderboard.find((r) => r.userId === currentUser.id)?.rank ?? "—"}
                </div>
              </Card>
            </div>
          </div>
        </Card>

        <div className="lg:sticky lg:top-[104px] lg:self-start">
          <LeaderboardCard rows={leaderboard} brandName={brand.name} />
        </div>
      </div>

      <Card className="rounded-[28px] heirloom-card bg-white/70 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Flame className="size-4" />
              <span>Collection</span>
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              Your earned rewards
            </div>
            <div className="mt-1 text-sm text-muted-foreground">
              Tokens you unlocked from this brand. Tap one to burn for a physical reward
              or review details. Burn fee is ${tokens[0]?.burn.feeUsd ?? 10}.
            </div>
          </div>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as any)} className="mt-5">
          <TabsList className="h-auto flex flex-wrap justify-start gap-2 bg-transparent p-0">
            {rarityTabs.map((t) => (
              <TabsTrigger
                key={t.id}
                value={t.id}
                className="rounded-full border border-border/70 bg-white/60 px-4 py-2 text-xs data-[state=active]:bg-[oklch(0.29_0.08_305)] data-[state=active]:text-white"
              >
                {t.label}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={tab} className="mt-5">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filtered.map((t, idx) => (
                <motion.div
                  key={t.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.03 * idx, ease: "easeOut" }}
                >
                  <TokenCard
                    token={t}
                    brandName={brand.name}
                    disabled={burnedIds.has(t.id)}
                    onClick={() => {
                      setActiveToken(t);
                      setOpen(true);
                    }}
                  />
                </motion.div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="rounded-[28px] heirloom-card bg-white/70 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <ScrollText className="size-4" />
              <span>Quests</span>
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight">
              In progress and not started
            </div>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Complete spend targets, product bundles, and brand actions to earn the digital
              tokens shown below—open a quest for your checklist and progress.
            </p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quests.map((q, idx) => (
            <motion.div
              key={q.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: 0.04 * idx, ease: "easeOut" }}
            >
              <QuestPreviewCard
                quest={q}
                brandName={brand.name}
                onClick={() => {
                  setActiveQuest(q);
                  setQuestOpen(true);
                }}
              />
            </motion.div>
          ))}
        </div>
      </Card>

      <QuestDetailDialog
        open={questOpen}
        onOpenChange={(o) => {
          setQuestOpen(o);
          if (!o) setActiveQuest(null);
        }}
        quest={activeQuest}
        brand={brand}
      />

      <TokenDetailDialog
        open={open}
        onOpenChange={setOpen}
        token={activeToken}
        brand={brand}
        reward={selectedReward}
        burned={activeToken ? burnedIds.has(activeToken.id) : false}
        viewerName={currentUser.displayName}
        onBurn={() => {
          if (!activeToken) return;
          setBurnedIds((prev) => new Set(prev).add(activeToken.id));
        }}
      />
    </div>
  );
}

