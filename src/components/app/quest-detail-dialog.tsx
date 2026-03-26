"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Circle, Gem, ListTodo, Target } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { Brand, BrandQuest } from "@/lib/types";
import { cn } from "@/lib/utils";

export function QuestPreviewCard({
  quest,
  brandName,
  onClick,
}: {
  quest: BrandQuest;
  brandName: string;
  onClick: () => void;
}) {
  const pct = quest.spendProgress
    ? Math.min(100, Math.round((quest.spendProgress.spentUsd / quest.spendProgress.targetUsd) * 100))
    : 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group w-full text-left outline-none heirloom-focus",
        "overflow-hidden rounded-3xl border border-border/70 bg-white/85 shadow-sm transition-shadow ring-1 ring-black/[0.04] hover:shadow-md"
      )}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={quest.tokenPreviewArtUrl}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
        <div className="absolute left-3 top-3 flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className={cn(
              "rounded-full text-[10px] font-semibold",
              quest.status === "in_progress"
                ? "bg-white/90 text-foreground"
                : "bg-black/40 text-white backdrop-blur"
            )}
          >
            {quest.status === "in_progress" ? "In progress" : "Not started"}
          </Badge>
          <Badge className="rounded-full bg-[oklch(0.29_0.08_305)] text-[10px] text-white hover:bg-[oklch(0.29_0.08_305)]">
            {quest.rarityLabel}
          </Badge>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="truncate text-sm font-semibold text-white">{quest.title}</div>
          <div className="text-xs text-white/85">{brandName}</div>
        </div>
      </div>
      <div className="space-y-2 p-4">
        <p className="line-clamp-2 text-xs leading-relaxed text-muted-foreground">{quest.summary}</p>
        {quest.spendProgress && (
          <div>
            <div className="mb-1 flex justify-between text-[10px] font-medium text-muted-foreground">
              <span>Spend progress</span>
              <span>
                ${quest.spendProgress.spentUsd} / ${quest.spendProgress.targetUsd}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-[oklch(0.29_0.08_305)] transition-all duration-500"
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        )}
        <div className="text-[11px] font-medium text-[oklch(0.29_0.08_305)]">
          View quest →
        </div>
      </div>
    </button>
  );
}

export function QuestDetailDialog({
  open,
  onOpenChange,
  quest,
  brand,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  quest: BrandQuest | null;
  brand: Brand | null;
}) {
  if (!quest || !brand) return null;

  const pct = quest.spendProgress
    ? Math.min(100, Math.round((quest.spendProgress.spentUsd / quest.spendProgress.targetUsd) * 100))
    : 0;

  const doneCount = quest.checklist.filter((c) => c.done).length;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "gap-0 p-0",
          "w-[min(1100px,calc(100vw-1.5rem))] max-w-[min(1100px,calc(100vw-1.5rem))] md:!max-w-[min(1100px,calc(100vw-1.5rem))]",
          "max-h-[min(92dvh,calc(100dvh-1.25rem))]",
          "overflow-hidden rounded-[28px] border-border/70 bg-white/85 shadow-2xl backdrop-blur-xl ring-black/[0.08]"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring" as const, stiffness: 420, damping: 32 }}
          className="grid min-h-0 max-h-[min(92dvh,calc(100dvh-1.25rem))] grid-cols-1 gap-0 md:grid-cols-[minmax(280px,1fr)_minmax(320px,1.05fr)]"
        >
          <div
            className={cn(
              "min-h-0 overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8",
              brand.themeGradient
            )}
          >
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-base font-semibold">
                <span className="grid size-9 place-items-center rounded-2xl bg-white/35 text-foreground ring-1 ring-black/5 backdrop-blur">
                  <Gem className="size-4" />
                </span>
                Quest
                <Badge variant="secondary" className="ml-1 rounded-full">
                  {brand.name}
                </Badge>
              </DialogTitle>
            </DialogHeader>

            <div className="mt-5 overflow-hidden rounded-3xl border border-border/70 bg-white/70 shadow-sm">
              <div className="relative h-[min(48dvh,400px)] overflow-hidden md:h-auto md:aspect-[4/5] md:max-h-[min(64dvh,580px)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={quest.tokenPreviewArtUrl}
                  alt={quest.tokenRewardName}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-xs font-semibold uppercase tracking-wider text-white/80">
                    Token reward
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">{quest.tokenRewardName}</div>
                  <Badge className="mt-2 rounded-full bg-white/20 text-white hover:bg-white/25">
                    {quest.rarityLabel}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <div className="flex min-h-0 max-h-[min(92dvh,calc(100dvh-1.25rem))] flex-col border-t border-border/60 md:border-l md:border-t-0">
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                    {quest.status === "in_progress" ? "In progress" : "Not started yet"}
                  </div>
                  <h2 className="mt-2 font-[var(--font-heading)] text-2xl font-semibold tracking-tight">
                    {quest.title}
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{quest.summary}</p>
                </div>
              </div>

              {quest.spendProgress && (
                <Card className="mt-6 overflow-hidden rounded-2xl border-border/70 bg-white/80 p-4 shadow-sm">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    <Target className="size-3.5" />
                    Spend progress
                  </div>
                  <div className="mt-3 flex items-end justify-between gap-2">
                    <span className="text-2xl font-semibold tabular-nums">{pct}%</span>
                    <span className="text-xs text-muted-foreground">
                      ${quest.spendProgress.spentUsd} of ${quest.spendProgress.targetUsd}
                    </span>
                  </div>
                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-secondary">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ type: "spring" as const, stiffness: 180, damping: 22, delay: 0.1 }}
                      className="h-full rounded-full bg-[oklch(0.29_0.08_305)]"
                    />
                  </div>
                </Card>
              )}

              <div className="mt-6">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  <ListTodo className="size-3.5" />
                  Checklist · {doneCount}/{quest.checklist.length} complete
                </div>
                <ul className="mt-4 space-y-3">
                  <AnimatePresence initial={false}>
                    {quest.checklist.map((item, idx) => (
                      <motion.li
                        key={item.id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 * idx, duration: 0.25 }}
                        className={cn(
                          "flex gap-3 rounded-2xl border border-border/60 bg-white/70 px-4 py-3",
                          item.done && "border-[oklch(0.29_0.08_305)/0.25] bg-[oklch(0.29_0.08_305)/0.06]"
                        )}
                      >
                        <span className="mt-0.5 shrink-0">
                          {item.done ? (
                            <span className="grid size-8 place-items-center rounded-xl bg-[oklch(0.29_0.08_305)] text-white">
                              <Check className="size-4" />
                            </span>
                          ) : (
                            <span className="grid size-8 place-items-center rounded-xl border border-border/80 bg-white text-muted-foreground">
                              <Circle className="size-4" />
                            </span>
                          )}
                        </span>
                        <span
                          className={cn(
                            "text-sm leading-snug",
                            item.done ? "text-muted-foreground line-through" : "text-foreground"
                          )}
                        >
                          {item.label}
                        </span>
                      </motion.li>
                    ))}
                  </AnimatePresence>
                </ul>
              </div>
            </div>

            <div className="shrink-0 border-t border-border/70 bg-white/90 p-4 backdrop-blur-xl">
              <Button className="w-full rounded-full" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </div>
          </div>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
