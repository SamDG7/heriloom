"use client";

import Link from "next/link";
import { ArrowRight, Gem } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/** Outseta-inspired hero: soft horizontal mesh (peach / pink → warm yellow), large rounded bottom, centered type. */
export function MarketingHero({
  className,
  onOpenAppClick,
}: {
  className?: string;
  onOpenAppClick?: () => void;
}) {
  return (
    <section
      className={cn(
        "relative mx-3 mt-2 overflow-hidden rounded-b-[2rem] sm:mx-5 sm:rounded-b-[2.5rem] md:mx-6 md:rounded-b-[3rem] lg:mx-8",
        className
      )}
    >
      {/* Base wash — pink peach left → golden yellow right */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-[#ffd6e4] via-[#ffe4cc] to-[#fde047]"
        aria-hidden
      />
      {/* Mesh / atmosphere layers */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_10%_-10%,rgba(255,182,193,0.55),transparent_55%),radial-gradient(ellipse_80%_60%_at_90%_20%,rgba(253,224,71,0.45),transparent_50%),radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(255,237,213,0.7),transparent_45%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] mix-blend-soft-light bg-[linear-gradient(180deg,rgba(255,255,255,0.65)_0%,transparent_45%)]"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-4xl px-5 pb-16 pt-14 text-center sm:px-8 sm:pb-20 sm:pt-16 md:pt-20">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Badge
            variant="outline"
            className="rounded-full border-neutral-900/15 bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900/80 backdrop-blur-sm hover:bg-white/60"
          >
            Collectible loyalty
          </Badge>
          <Badge
            variant="outline"
            className="rounded-full border-neutral-900/15 bg-white/50 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-900/80 backdrop-blur-sm hover:bg-white/60"
          >
            Web3-ready
          </Badge>
        </div>

        <h1 className="mt-8 font-[var(--font-heading)] text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-neutral-950 sm:text-5xl md:text-6xl lg:text-[3.5rem]">
          Loyalty that feels like culture.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-pretty text-base leading-7 text-neutral-800/85 sm:text-lg">
          Earn brand-native tokens when you shop. Keep the ones you love, burn
          the rest to unlock{" "}
          <span className="font-semibold text-neutral-950">premium physical</span>{" "}
          rewards and{" "}
          <span className="font-semibold text-neutral-950">status drops</span>.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
          {onOpenAppClick ? (
            <Button
              size="lg"
              onClick={onOpenAppClick}
              className="h-12 rounded-full bg-[#c026d3] px-8 text-base font-semibold text-white shadow-md shadow-fuchsia-900/20 hover:bg-[#a21caf]"
            >
              Open the app <ArrowRight className="ml-2 size-4" />
            </Button>
          ) : (
            <Button
              asChild
              size="lg"
              className="h-12 rounded-full bg-[#c026d3] px-8 text-base font-semibold text-white shadow-md shadow-fuchsia-900/20 hover:bg-[#a21caf]"
            >
              <Link href="/app/dashboard">
                Open the app <ArrowRight className="ml-2 size-4" />
              </Link>
            </Button>
          )}
          <Button
            asChild
            size="lg"
            variant="outline"
            className="h-12 rounded-full border-neutral-900/20 bg-white/70 px-8 text-base font-semibold text-neutral-900 backdrop-blur-sm hover:bg-white/90"
          >
            <Link href="/app/profile">
              <Gem className="mr-2 size-4" /> View your collection
            </Link>
          </Button>
        </div>

        <div className="mx-auto mt-12 grid max-w-3xl gap-3 sm:grid-cols-2 sm:text-left">
          <div className="rounded-2xl border border-white/60 bg-white/55 p-5 shadow-sm backdrop-blur-md">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
              The model
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
              Collect → Curate → Burn
            </div>
            <div className="mt-2 text-sm leading-6 text-neutral-700">
              One display case for every brand you love—built to be shown off.
            </div>
          </div>
          <div className="rounded-2xl border border-white/60 bg-white/55 p-5 shadow-sm backdrop-blur-md">
            <div className="text-[10px] font-semibold uppercase tracking-[0.16em] text-neutral-600">
              Outcomes
            </div>
            <div className="mt-2 text-lg font-semibold tracking-tight text-neutral-950">
              Physical rewards, upgraded
            </div>
            <div className="mt-2 text-sm leading-6 text-neutral-700">
              Burn a token for limited runs and real materials—story stays in
              your profile.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
