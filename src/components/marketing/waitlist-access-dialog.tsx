"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

type JoinState = "idle" | "joined";

const EMAIL_REGEX = /^\S+@\S+\.\S+$/;

export function WaitlistAccessDialog({
  open,
  onOpenChange,
  redirectHref = "/app/dashboard",
  className,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  redirectHref?: string;
  className?: string;
}) {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState<string | null>(null);
  const [joinState, setJoinState] = React.useState<JoinState>("idle");

  const [accessCode, setAccessCode] = React.useState("");
  const [accessError, setAccessError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!open) return;

    // Keep this lightweight: if the user already joined, prefill their email.
    try {
      const stored = window.localStorage.getItem("heirloom_waitlist_email");
      if (stored) {
        setEmail(stored);
        setJoinState("joined");
      }
    } catch {
      // Ignore storage issues (private mode, blocked storage, etc).
    }
  }, [open]);

  const handleJoin = () => {
    setEmailError(null);
    setAccessError(null);

    const trimmed = email.trim();
    if (!EMAIL_REGEX.test(trimmed)) {
      setEmailError("Enter a valid email address.");
      return;
    }

    try {
      window.localStorage.setItem("heirloom_waitlist_email", trimmed);
    } catch {
      // Storage isn't required for the UI; we still show success feedback.
    }

    setJoinState("joined");
  };

  const handleAccess = () => {
    setAccessError(null);

    if (accessCode.trim() === "admin") {
      onOpenChange(false);
      router.push(redirectHref);
      return;
    }

    setAccessError("Incorrect access code.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className={cn(
          "gap-0 overflow-hidden rounded-[28px] border-border/70 bg-white/85 p-0 shadow-2xl backdrop-blur-xl ring-black/[0.08]",
          "w-[min(560px,calc(100vw-1.5rem))] max-w-[min(560px,calc(100vw-1.5rem))] md:!max-w-[min(560px,calc(100vw-1.5rem))]",
          className
        )}
      >
        <div className="bg-[linear-gradient(145deg,oklch(0.29_0.08_305),oklch(0.55_0.10_55))] px-6 pb-6 pt-8">
          <DialogHeader>
            <DialogTitle className="text-center font-[var(--font-heading)] text-2xl font-semibold tracking-tight text-white drop-shadow-sm">
              Join the waitlist
            </DialogTitle>
            <DialogDescription className="mt-2 text-center text-white/95">
              Get a waitlist invite, then unlock the app with your access code.
            </DialogDescription>
          </DialogHeader>
        </div>

        <div className="px-6 pb-6 pt-0">
          <div className="mt-4 space-y-5">
            <div>
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Waitlist email
              </div>
              <Input
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError(null);
                }}
                type="email"
                placeholder="you@domain.com"
                className="h-11 rounded-full"
                aria-label="Waitlist email"
              />
              {emailError && (
                <p className="mt-2 text-sm text-destructive">{emailError}</p>
              )}
              <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
                <Button
                  className="h-11 w-full rounded-full sm:w-auto"
                  onClick={handleJoin}
                  disabled={joinState === "joined"}
                >
                  {joinState === "joined" ? "Joined" : "Join waitlist"}
                </Button>
                <p className="text-sm text-muted-foreground">
                  {joinState === "joined"
                    ? "You're on the list. Check your inbox for an invite."
                    : "No spam—just your invite details."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-border/60 bg-white/70 p-4">
              <div className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Access code
              </div>

              <Input
                value={accessCode}
                onChange={(e) => {
                  setAccessCode(e.target.value);
                  setAccessError(null);
                }}
                type="password"
                placeholder="Have an access code?"
                className="h-11 rounded-full"
                aria-label="Access code"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleAccess();
                }}
              />

              {accessError && (
                <p className="mt-2 text-sm text-destructive">{accessError}</p>
              )}

              <Button
                className="mt-3 h-11 w-full rounded-full"
                onClick={handleAccess}
              >
                Enter app
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

