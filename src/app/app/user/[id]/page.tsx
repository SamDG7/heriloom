"use client";

import { notFound, useParams } from "next/navigation";

import { ProfileView } from "@/components/app/profile-view";
import { getUser } from "@/lib/data/users";

export default function PublicUserProfilePage() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const user = id ? getUser(id) : undefined;
  if (!user) return notFound();

  return <ProfileView user={user} showLanding={false} />;
}

