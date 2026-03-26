"use client";

import { ProfileView } from "@/components/app/profile-view";
import { currentUser } from "@/lib/data/users";

export default function ProfilePage() {
  return <ProfileView user={currentUser} showLanding={false} />;
}

