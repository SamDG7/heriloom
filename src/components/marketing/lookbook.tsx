"use client";

import { motion } from "framer-motion";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type LookbookItem = {
  title: string;
  subtitle: string;
  imageUrl: string;
};

export function BrandLookbookStrip({
  className,
  items,
}: {
  className?: string;
  items: LookbookItem[];
}) {
  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
            Brand lookbooks
          </div>
          <h2 className="mt-3 font-[var(--font-heading)] text-2xl font-semibold tracking-tight sm:text-3xl">
            Editorial covers, brand-native worlds.
          </h2>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Each brand gets a distinct vibe. The UX stays consistent — clean,
            premium, and instantly legible.
          </p>
        </div>
      </div>

      {/* Uniform grid: equal columns, shared row baseline, consistent gaps & card height */}
      <div className="mx-auto mt-8 w-full max-w-7xl px-5 sm:px-8">
        <ul className="grid grid-cols-1 gap-5 sm:gap-6 md:grid-cols-3 md:items-stretch">
          {items.map((i, idx) => (
            <motion.li
              key={i.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: 0.06 * idx, ease: "easeOut" }}
              className="min-w-0 list-none"
            >
              <Card className="flex h-full flex-col overflow-hidden rounded-[26px] border border-border/60 bg-white/80 p-0 shadow-md ring-1 ring-black/[0.04]">
                <div className="relative aspect-[4/5] w-full min-h-[240px] shrink-0 overflow-hidden sm:min-h-[280px] md:aspect-[3/4]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={i.imageUrl}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                    <div className="text-sm font-semibold tracking-tight text-white">
                      {i.title}
                    </div>
                    <div className="mt-1 text-xs text-white/85">{i.subtitle}</div>
                  </div>
                </div>
              </Card>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
