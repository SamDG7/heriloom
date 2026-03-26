"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { brands } from "@/lib/data/brands";
import type { BrandCategory } from "@/lib/types";
import { cn } from "@/lib/utils";

const quickFilters: Array<{ id: "all" | BrandCategory; label: string }> = [
  { id: "all", label: "All" },
  { id: "fitness", label: "Fitness" },
  { id: "streetwear", label: "Street wear" },
];

function filterBrands(filter: (typeof quickFilters)[number]["id"]) {
  if (filter === "all") return brands;
  return brands.filter((b) => b.category === filter);
}

export function AppSidebar() {
  const pathname = usePathname();
  const [activeFilter, setActiveFilter] = React.useState<(typeof quickFilters)[number]["id"]>("all");
  const visibleBrands = filterBrands(activeFilter);

  return (
    <aside className="hidden w-[300px] shrink-0 border-r border-border/70 bg-white/40 backdrop-blur-xl lg:block">
      <div className="p-6">
        <div className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
          Brands
        </div>
      </div>
      <ScrollArea className="h-[calc(100dvh-88px)] px-4 pb-8">
        <div className="rounded-[26px] heirloom-card bg-white/70 p-4">
          <div className="flex flex-wrap gap-2">
            {quickFilters.map((f) => (
              <Button
                key={f.id}
                type="button"
                variant={activeFilter === f.id ? "default" : "secondary"}
                className={cn(
                  "h-8 rounded-full px-3 text-xs",
                  activeFilter === f.id &&
                    "bg-[oklch(0.29_0.08_305)] text-white hover:bg-[oklch(0.29_0.08_305)]"
                )}
                onClick={() => setActiveFilter(f.id)}
              >
                {f.label}
              </Button>
            ))}
          </div>

          <Separator className="my-4 bg-border/70" />

          <div className="space-y-1">
            <Link
              href="/app/dashboard"
              className={cn(
                "flex items-center justify-between rounded-2xl px-3 py-2 text-sm transition-colors hover:bg-black/[0.03] heirloom-focus",
                pathname === "/app/dashboard" && "bg-black/[0.04]"
              )}
            >
              <span className="font-medium">All brands</span>
              <span className="text-xs text-muted-foreground">Collection</span>
            </Link>

            {visibleBrands.map((b) => (
              <Link
                key={b.id}
                href={`/app/brand/${b.id}`}
                className={cn(
                  "group flex items-center gap-3 rounded-2xl px-3 py-2 transition-colors hover:bg-black/[0.03] heirloom-focus",
                  pathname === `/app/brand/${b.id}` && "bg-black/[0.04]"
                )}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={b.logoUrl}
                  alt={b.name}
                  className="size-9 rounded-2xl object-cover ring-1 ring-black/5"
                />
                <div className="min-w-0">
                  <div className="truncate text-sm font-medium">{b.name}</div>
                  <div className="text-xs text-muted-foreground">{b.handle}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </ScrollArea>
    </aside>
  );
}
