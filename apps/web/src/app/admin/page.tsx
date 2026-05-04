import { prisma } from "@/lib/prisma/prisma";
import { requireAdmin } from "@/lib/route-protection/user-check";

export default async function AdminDashboard() {
  const session = await requireAdmin();

  const posts = await prisma.post.findMany();
  const published = posts.filter((p) => p.status === "PUBLISHED");
  const drafts = posts.filter((p) => p.status === "DRAFT");

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="text-sm text-gray-500">
          Welcome back, {session.user?.name ||session.user?.email}
        </p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total Posts" value={posts.length} />
        <Card title="Published" value={published.length} />
        <Card title="Drafts" value={drafts.length} />
      </div>

      {/* Quick actions */}
      <div className="border rounded-lg p-6">
        <h2 className="font-semibold mb-4">Quick Actions</h2>

        <div className="flex gap-4">
          <a
            href="/admin/blog/posts/new"
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            + Create Post
          </a>

          <a
            href="/admin/blog/posts"
            className="px-4 py-2 border rounded-md hover:bg-gray-100"
          >
            View All Posts
          </a>
        </div>
      </div>

      {/* Recent posts */}
      <div>
        <h2 className="font-semibold mb-4">Recent Posts</h2>

        <div className="space-y-3">
          {posts.slice(0, 5).map((post) => (
            <div
              key={post.id}
              className="flex justify-between border p-3 rounded-md"
            >
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-xs text-gray-500">
                  {post.status}
                </p>
              </div>

              <a
                href={`/admin/posts/${post.id}`}
                className="text-sm text-blue-500"
              >
                Edit
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Small reusable card */
function Card({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="border rounded-lg p-4">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}