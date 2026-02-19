"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthUser } from "@/hooks/useAuthUser";

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

  if (loading) return <div>Carregando...</div>;
  if (!user || user.role !== "ADMIN") return null;

  return (
    <div>
      <h1>Kits</h1>
      <p>Conteúdo somente para ADMIN</p>
    </div>
  );
}
