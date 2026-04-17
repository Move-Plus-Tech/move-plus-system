"use client";

import { useEffect } from "react";
import EventForm from "@/components/admin/EventForm";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

export default function AdminKits() {
  const router = useRouter();
  const { user, loading } = useAuthUser();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "ADMIN") {
        router.replace("/login");
      }
    }
  }, [user, loading, router]);

  if (loading)
    return (
      <div className="flex bg-white items-center justify-center min-h-screen w-full">
        <LoadingSpinner />
      </div>
    );
  if (!user || user.role !== "ADMIN") return null;

  return (
    <div className="bg-white min-h-screen py-30">
      <EventForm />
    </div>
  );
}
