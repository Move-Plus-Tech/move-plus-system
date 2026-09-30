import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import EventForm from "@/components/admin/EventForm";
import { AUTH_COOKIE_NAME } from "@/app/api/auth/cookie";

const API_BASE_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL;

async function canAccessAdminPage() {
  const sessionToken = (await cookies()).get(AUTH_COOKIE_NAME)?.value;
  if (!sessionToken || !API_BASE_URL) return false;

  try {
    const apiBaseUrl = API_BASE_URL.replace(/\/$/, "");
    const response = await fetch(`${apiBaseUrl}/auth/me`, {
      headers: { cookie: `${AUTH_COOKIE_NAME}=${sessionToken}` },
      cache: "no-store",
    });
    if (!response.ok) return false;

    const profile = await response.json();
    return profile?.capabilities?.manageAdmin === true;
  } catch {
    return false;
  }
}

export default async function AdminKits() {
  if (!(await canAccessAdminPage())) {
    redirect("/");
  }

  return (
    <div className="bg-white min-h-screen py-30">
      <EventForm />
    </div>
  );
}
