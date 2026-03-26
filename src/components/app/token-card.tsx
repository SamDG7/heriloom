"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Flame, Package } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { Token } from "@/lib/types";
import { cn } from "@/lib/utils";
import { TokenRarityPill } from "@/components/app/token-rarity-pill";

export function TokenCard({
  token,
  brandName,
  onClick,
  disabled,
  /** Burned token — reward shipped; card stays clickable for tracking view */
  fulfilled = false,
}: {
  token: Token;
  brandName: string;
  onClick?: () => void;
  disabled?: boolean;
  fulfilled?: boolean;
}) {
  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (disabled || !onClick) return;
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onClick();
      }
    },
    [disabled, onClick]
  );

  return (
    <motion.div
      role="button"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled ? true : undefined}
      aria-label={
        fulfilled
          ? `View shipping status for ${token.name}`
          : `Open token ${token.name}`
      }
      onClick={disabled ? undefined : onClick}
      onKeyDown={onKeyDown}
      className={cn(
        "group relative w-full cursor-pointer text-left outline-none heirloom-focus",
        disabled && "cursor-not-allowed opacity-60"
      )}
      whileHover={disabled ? undefined : { y: -4, rotate: -0.35 }}
      whileTap={disabled ? undefined : { scale: 0.985 }}
      transition={{ type: "spring", stiffness: 420, damping: 28 }}
    >
      <Card className="overflow-hidden rounded-3xl border-border/70 bg-white/80 p-0 shadow-sm transition-shadow group-hover:shadow-md">
        <div className="relative aspect-[4/5] overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={token.artUrl}
            alt={token.name}
            className={cn(
              "h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]",
              fulfilled && "grayscale-[0.35] brightness-[0.92]"
            )}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

          <div className="absolute left-3 top-3 flex flex-wrap items-center gap-2">
            <TokenRarityPill rarity={token.rarity} className="text-[11px]" />
            {fulfilled && (
              <span className="rounded-full bg-white/90 px-2 py-0.5 text-[10px] font-semibold text-foreground shadow-sm ring-1 ring-black/5">
                Reward en route
              </span>
            )}
          </div>

          <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
            <div className="min-w-0">
              <div className="truncate text-sm font-semibold text-white">
                {token.name}
              </div>
              <div className="text-xs text-white/80">{brandName}</div>
            </div>
            <span
              className="pointer-events-none grid size-10 place-items-center rounded-2xl bg-white/15 text-white backdrop-blur"
              title={
                fulfilled
                  ? "Tap for shipping details"
                  : `Burn available (fee $${token.burn.feeUsd})`
              }
              aria-hidden
            >
              {fulfilled ? (
                <Package className="size-4" />
              ) : (
                <Flame className="size-4" />
              )}
            </span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

