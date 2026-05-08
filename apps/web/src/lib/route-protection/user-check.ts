import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth/auth";

export async function requireAdmin() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  if (session.user.role !== "ADMINISTRATOR") {
    redirect("/");
  }

  return session;
}