"use client";

import Link from "next/link";
import { Gem, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { cn, initials } from "@/lib/utils";
import { currentUser } from "@/lib/data/users";

export function AppTopbar({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b border-border/70 bg-background/70 backdrop-blur-xl",
        className
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="grid size-9 place-items-center rounded-2xl bg-[oklch(0.29_0.08_305)] text-white shadow-sm">
              <Gem className="size-4" />
            </div>
            <span className="text-sm font-semibold tracking-tight">Heirloom</span>
          </Link>
        </div>

        <div className="relative hidden w-full max-w-md sm:block">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search tokens, brands…"
            className="h-11 rounded-full pl-10 bg-white/70"
          />
        </div>

        <Link
          href="/app/profile"
          className="flex items-center gap-3 rounded-full border border-border/70 bg-white/60 px-2 py-1.5 transition-colors hover:bg-white/80"
        >
          <Avatar className="size-7">
            <AvatarImage src={currentUser.avatarUrl} alt={currentUser.displayName} />
            <AvatarFallback>{initials(currentUser.displayName)}</AvatarFallback>
          </Avatar>
          <div className="hidden pr-2 text-sm font-medium sm:block">
            {currentUser.displayName}
          </div>
        </Link>
      </div>
    </header>
  );
}

