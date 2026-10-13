"use client";

import { useAuthContext } from "@/context/AuthContext";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { PageHeader } from "@/components/shared/PageHeader";
import { Spinner } from "@/components/ui/Spinner";

export default function UserProfilePage() {
  const { user, isLoading } = useAuthContext();

  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-4xl space-y-8">
      <PageHeader
        title="My Profile"
        subtitle="View and update your personal and medical information."
      />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ProfileCard user={user} />
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-ink dark:text-white">
            Edit Profile
          </h2>
          <ProfileForm user={user} />
        </div>
      </div>
    </div>
  );
}