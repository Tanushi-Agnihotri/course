"use client";

import React from 'react';
import { useSession } from '@/lib/hooks';
import ProfileCard from '@/components/ui/ProfileCard';

const ProfilePage = () => {
  const { data: session, isLoading } = useSession();

  if (isLoading) return <div className="p-8 text-center">Loading profile...</div>;
  if (!session) return <div className="p-8 text-center">Please sign in to view your profile.</div>;

  return (
    <div className="container mx-auto p-8">
      <ProfileCard user={session} />
    </div>
  );
};

export default ProfilePage;
