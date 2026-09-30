"use client";

import { useAuth } from "@/context/authContext";

export function useAuthUser() {
  const { user, hydrated } = useAuth();
  return { user, loading: !hydrated };
}
