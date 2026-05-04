import { requireAdmin } from "@/lib/route-protection/user-check";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireAdmin();

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r p-6 hidden md:block">
        <h2 className="font-bold mb-8">Portfolio CMS V1.5</h2>

        <nav className="space-y-3">
          <a href="/admin" className="block hover:text-primary">
            Dashboard
          </a>
          <a href="/admin/posts" className="block hover:text-primary">
            Posts
          </a>
          <a href="/admin/posts/new" className="block hover:text-primary">
            Create Post
          </a>
        </nav>
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}