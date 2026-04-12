import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession();

  if (session?.user?.email !== process.env.ADMIN_EMAIL) {
    redirect("/"); 
  }

  return <section>{children}</section>;
}