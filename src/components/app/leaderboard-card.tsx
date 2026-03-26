"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { initials } from "@/lib/utils";
import type { LeaderboardRow } from "@/lib/types";

export function LeaderboardCard({
  rows,
  brandName,
}: {
  rows: LeaderboardRow[];
  brandName: string;
}) {
  return (
    <Card className="rounded-[28px] heirloom-card bg-white/70 p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Trophy className="size-4" />
            <span>Leaderboard</span>
          </div>
          <div className="mt-2 text-lg font-semibold tracking-tight">
            Top collectors
          </div>
          <div className="mt-1 text-xs text-muted-foreground">
            For <span className="font-medium text-foreground">{brandName}</span>
          </div>
        </div>
        <Badge
          variant="secondary"
          className="cursor-default rounded-full"
          title="Collector score based on tokens owned and status unlocks."
        >
          Score?
        </Badge>
      </div>

      <Separator className="my-4 bg-border/70" />

      <div className="space-y-2">
        {rows.map((r) => (
          <Link
            key={r.userId}
            href={`/app/user/${r.userId}`}
            className="flex items-center justify-between gap-3 rounded-2xl bg-white/60 px-3 py-2"
          >
            <div className="flex min-w-0 items-center gap-3">
              <div className="w-6 text-center text-xs font-semibold text-muted-foreground">
                #{r.rank}
              </div>
              <Avatar className="size-8">
                <AvatarImage src={r.avatarUrl} alt={r.displayName} />
                <AvatarFallback>{initials(r.displayName)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <div className="truncate text-sm font-medium">{r.displayName}</div>
                <div className="text-xs text-muted-foreground">Collector</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-semibold">{r.score}</div>
              <div className="text-[11px] text-muted-foreground">score</div>
            </div>
          </Link>
        ))}
      </div>
    </Card>
  );
}

