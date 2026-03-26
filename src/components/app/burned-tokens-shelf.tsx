"use client";

import { motion } from "framer-motion";
import { Package, Truck } from "lucide-react";

import { Card } from "@/components/ui/card";

export type BurnedShelfItem = {
  id: string;
  tokenName: string;
  brandName: string;
  rewardTitle: string;
  rewardImageUrl: string;
  detailLine: string;
};

export function BurnedTokensShelf({
  items,
}: {
  items: BurnedShelfItem[];
}) {
  if (items.length === 0) {
    return (
      <Card className="rounded-3xl border border-dashed border-border/80 bg-white/50 p-8 text-center">
        <Package className="mx-auto size-10 text-muted-foreground" />
        <p className="mt-3 text-sm font-medium text-foreground">No burns yet</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Burn a token for a status reward and it will show up here with the physical
          item headed your way.
        </p>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, idx) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 * idx, ease: "easeOut" }}
        >
          <Card className="overflow-hidden rounded-3xl border-border/70 bg-white/85 p-0 shadow-sm ring-1 ring-black/[0.04]">
            <div className="relative aspect-[16/10] overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.rewardImageUrl}
                alt=""
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              <div className="absolute left-3 top-3 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur">
                <Truck className="size-3" />
                In transit
              </div>
            </div>
            <div className="space-y-1 p-4">
              <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                {item.rewardTitle}
              </div>
              <div className="truncate text-sm font-semibold tracking-tight">
                {item.tokenName}
              </div>
              <div className="text-xs text-muted-foreground">{item.brandName}</div>
              <div className="pt-1 text-[11px] leading-relaxed text-muted-foreground">
                {item.detailLine}
              </div>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
