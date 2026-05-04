import { AdminLayout } from "@/components/blog-cms/admin/AdminLayout";
import { requireAdmin } from "@/lib/route-protection/user-check";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin

  return <AdminLayout>{children}</AdminLayout>;
}