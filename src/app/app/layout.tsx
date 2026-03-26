import type { ReactNode } from "react";

import { AppSidebar } from "@/components/app/app-sidebar";
import { AppTopbar } from "@/components/app/app-topbar";

export default function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-[calc(100dvh)]">
      <AppTopbar />
      <div className="mx-auto flex w-full max-w-7xl gap-0 px-0 lg:px-0">
        <AppSidebar />
        <main className="flex-1 px-5 py-8 sm:px-8">{children}</main>
      </div>
    </div>
  );
}

