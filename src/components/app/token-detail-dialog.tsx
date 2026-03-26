"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Flame, Gem, MapPin, Package, ShieldAlert } from "lucide-react";

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
import { previewShipmentForUser } from "@/lib/shipment-preview";
import type { Brand, Reward, Token } from "@/lib/types";
import { TokenRarityPill } from "@/components/app/token-rarity-pill";
import { cn } from "@/lib/utils";

type BurnStep = "view" | "confirm" | "shipped";

const shipMotion = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.06 },
    },
    exit: { opacity: 0, transition: { duration: 0.15 } },
  },
  item: {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 380, damping: 28 },
    },
  },
};

export function TokenDetailDialog({
  open,
  onOpenChange,
  token,
  brand,
  reward,
  burned,
  onBurn,
  viewerName = "Sam",
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  token: Token | null;
  brand: Brand | null;
  reward: Reward | null;
  burned: boolean;
  onBurn: () => void;
  /** Shown on shipping confirmation address */
  viewerName?: string;
}) {
  const [step, setStep] = React.useState<BurnStep>("view");

  React.useEffect(() => {
    if (!open) {
      setStep("view");
      return;
    }
    if (burned) setStep("shipped");
    else setStep("view");
  }, [open, token?.id, burned]);

  if (!token || !brand || !reward) return null;

  const fee = token.burn.feeUsd;
  const feeLabel = `$${fee}`;
  const shipPreview = previewShipmentForUser(viewerName);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "gap-0 p-0",
          step === "shipped"
            ? "w-[min(520px,calc(100vw-1.5rem))] max-w-[min(520px,calc(100vw-1.5rem))] md:!max-w-[min(520px,calc(100vw-1.5rem))]"
            : "w-[min(1100px,calc(100vw-1.5rem))] max-w-[min(1100px,calc(100vw-1.5rem))] md:!max-w-[min(1100px,calc(100vw-1.5rem))]",
          "max-h-[min(92dvh,calc(100dvh-1.25rem))]",
          "overflow-hidden rounded-[28px] border-border/70 bg-white/85 shadow-2xl backdrop-blur-xl",
          "ring-black/[0.08]"
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          {step === "shipped" ? (
            <motion.div
              key="shipped"
              variants={shipMotion.container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="flex max-h-[min(92dvh,calc(100dvh-1.25rem))] flex-col overflow-y-auto overscroll-contain"
            >
              <div className="relative overflow-hidden bg-[linear-gradient(145deg,oklch(0.97_0.04_145),oklch(0.96_0.03_310))] px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
                <motion.div
                  variants={shipMotion.item}
                  className="mx-auto flex size-14 items-center justify-center rounded-2xl bg-[oklch(0.29_0.08_305)] text-white shadow-lg"
                >
                  <Check className="size-7" strokeWidth={2.5} />
                </motion.div>
                <motion.h2
                  variants={shipMotion.item}
                  className="mt-5 text-center font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-foreground sm:text-[1.65rem]"
                >
                  Burn confirmed — your piece is on the way
                </motion.h2>
                <motion.p
                  variants={shipMotion.item}
                  className="mx-auto mt-2 max-w-sm text-center text-sm text-muted-foreground"
                >
                  We locked in your status reward. Here is where it is heading and
                  when to expect it.
                </motion.p>
              </div>

              <motion.div variants={shipMotion.item} className="px-6 sm:px-8">
                <div className="relative -mt-4 overflow-hidden rounded-2xl border border-border/70 bg-white shadow-md ring-1 ring-black/[0.04]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={reward.imageUrl}
                    alt={reward.title}
                    className="aspect-[16/10] w-full object-cover sm:aspect-[2/1]"
                  />
                  <div className="border-t border-border/60 bg-white/95 px-4 py-3 backdrop-blur-sm">
                    <div className="flex items-start gap-2 text-sm">
                      <Package className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                      <div>
                        <div className="font-semibold">{reward.title}</div>
                        <div className="text-xs text-muted-foreground">{reward.subtitle}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div variants={shipMotion.item} className="px-6 pt-5 sm:px-8">
                <Card className="rounded-2xl border-border/70 bg-secondary/40 p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    <MapPin className="size-3.5" />
                    Ship to
                  </div>
                  <address className="mt-3 not-italic text-sm leading-relaxed text-foreground">
                    <div className="font-medium">{shipPreview.nameLine}</div>
                    <div className="text-muted-foreground">{shipPreview.street}</div>
                    <div className="text-muted-foreground">{shipPreview.cityLine}</div>
                  </address>
                  <Separator className="my-4 bg-border/70" />
                  <div className="flex flex-wrap items-end justify-between gap-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                        {shipPreview.etaLabel}
                      </div>
                      <div className="mt-1 text-base font-semibold text-foreground">
                        {shipPreview.etaRange}
                      </div>
                    </div>
                    <div className="text-right text-xs text-muted-foreground">
                      <div className="font-medium text-foreground">{shipPreview.carrier}</div>
                      <div>{shipPreview.trackingId}</div>
                    </div>
                  </div>
                </Card>
              </motion.div>

              <motion.div variants={shipMotion.item} className="mt-auto px-6 pb-6 pt-4 sm:px-8">
                <Button
                  className="h-11 w-full rounded-full"
                  onClick={() => onOpenChange(false)}
                >
                  Done
                </Button>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              className="grid min-h-0 max-h-[min(92dvh,calc(100dvh-1.25rem))] grid-cols-1 gap-0 md:grid-cols-[minmax(300px,1fr)_minmax(340px,1.05fr)]"
            >
              <div
                className={cn(
                  "min-h-0 max-h-[min(92dvh,calc(100dvh-1.25rem))] overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8",
                  brand.themeGradient
                )}
              >
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-base font-semibold">
                    <span className="grid size-9 place-items-center rounded-2xl bg-white/35 text-foreground ring-1 ring-black/5 backdrop-blur">
                      <Gem className="size-4" />
                    </span>
                    {brand.name}
                    <Badge variant="secondary" className="ml-1 rounded-full">
                      Token
                    </Badge>
                  </DialogTitle>
                </DialogHeader>

                <div className="mt-5 overflow-hidden rounded-3xl border border-border/70 bg-white/70 shadow-sm">
                  <div className="relative h-[min(52dvh,440px)] overflow-hidden md:h-auto md:aspect-[4/5] md:max-h-[min(68dvh,620px)]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={token.artUrl}
                      alt={token.name}
                      className={cn(
                        "h-full w-full object-cover",
                        burned && "grayscale contrast-75 brightness-90"
                      )}
                    />
                    {burned && (
                      <div className="absolute inset-0 grid place-items-center bg-black/25">
                        <div className="rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-white backdrop-blur">
                          Burned
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <div className="truncate text-base font-semibold">
                        {token.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Earned {token.earnedAt}
                      </div>
                    </div>
                    <TokenRarityPill rarity={token.rarity} />
                  </div>
                </div>
              </div>

              <div className="relative flex min-h-0 max-h-[min(92dvh,calc(100dvh-1.25rem))] flex-col border-t border-border/60 md:border-l md:border-t-0">
                <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-5 sm:p-7 md:p-8">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
                        Burn for status
                      </div>
                      <div className="mt-2 text-xl font-semibold tracking-tight">
                        {reward.title}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {reward.subtitle}
                      </div>
                    </div>
                    <Badge className="rounded-full bg-[oklch(0.29_0.08_305)] text-white hover:bg-[oklch(0.29_0.08_305)]">
                      Status
                    </Badge>
                  </div>

                  <Card className="mt-5 overflow-hidden rounded-3xl border-border/70 bg-white/80 p-0 shadow-sm">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={reward.imageUrl}
                        alt={reward.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="p-4 text-xs text-muted-foreground">
                      {reward.shippingNote}
                    </div>
                  </Card>

                  <Separator className="my-6 bg-border/70" />

                  <div className="rounded-3xl border border-border/70 bg-white/70 p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold">Fee summary</div>
                        <div className="mt-1 text-xs text-muted-foreground">
                          Burn fee is confirmed at checkout.
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold">{feeLabel}</div>
                        <div className="text-xs text-muted-foreground">
                          Network fee included
                        </div>
                      </div>
                    </div>
                    <Separator className="my-4 bg-border/70" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Total</span>
                      <span className="font-semibold">{feeLabel}</span>
                    </div>
                  </div>

                  {step === "confirm" && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      transition={{ type: "spring", stiffness: 400, damping: 32 }}
                      className="mt-5 overflow-hidden rounded-3xl border border-border/70 bg-white/70 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 grid size-9 place-items-center rounded-2xl bg-secondary text-secondary-foreground">
                          <ShieldAlert className="size-4" />
                        </div>
                        <div>
                          <div className="text-sm font-semibold">Confirm burn</div>
                          <div className="mt-1 text-xs text-muted-foreground">
                            This spends your burn fee and marks the token as redeemed.
                            Your status reward ships to the address on your profile.
                          </div>
                          <div className="mt-3 flex flex-wrap gap-2">
                            <Button
                              onClick={() => {
                                onBurn();
                                setStep("shipped");
                              }}
                              className="rounded-full"
                              disabled={burned}
                            >
                              Burn token
                            </Button>
                            <Button
                              variant="secondary"
                              className="rounded-full"
                              onClick={() => setStep("view")}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                <div className="sticky bottom-0 z-10 mt-auto shrink-0 border-t border-border/70 bg-white/90 p-4 shadow-[0_-8px_24px_-8px_rgba(0,0,0,0.06)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/75">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Flame className="size-4" />
                      <span>
                        Burn fee:{" "}
                        <span className="font-medium text-foreground">{feeLabel}</span>
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {step !== "confirm" && (
                        <Button
                          className="rounded-full"
                          onClick={() => setStep("confirm")}
                          disabled={burned}
                        >
                          Burn token
                        </Button>
                      )}
                      <Button
                        variant="secondary"
                        className="rounded-full"
                        onClick={() => onOpenChange(false)}
                      >
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}
