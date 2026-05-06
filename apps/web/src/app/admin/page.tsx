import { prisma } from "@/lib/prisma/prisma";
import { requireAdmin } from "@/lib/route-protection/user-check";

export default async function AdminDashboard() {
  await requireAdmin();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  const published = posts.filter((p) => p.status === "PUBLISHED");
  const drafts = posts.filter((p) => p.status === "DRAFT");

  const totalViews = posts.reduce((sum, p) => sum + p.views, 0);

  const topPost = posts.sort((a, b) => b.views - a.views)[0];

  const lastPost = posts[0];

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-sm text-gray-500">
          Smart overview of your content
        </p>
      </div>

      {/* ANALYTICS CARDS */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card title="Total Posts" value={posts.length} />
        <Card title="Published" value={published.length} />
        <Card title="Drafts" value={drafts.length} />
        <Card title="Total Views" value={totalViews} />
      </div>

      {/* SMART INSIGHTS */}
      <div className="border rounded-lg p-6 space-y-2">
        <h2 className="font-semibold">Insights</h2>

        <p>
          🧠 You have <b>{drafts.length}</b> drafts pending
        </p>

        <p>
          📅 Last post:{" "}
          <b>{lastPost?.title || "No posts yet"}</b>
        </p>

        <p>
          🔥 Top post:{" "}
          <b>{topPost?.title || "No data yet"}</b> (
          {topPost?.views || 0} views)
        </p>
      </div>

      {/* QUICK ACTIONS */}
      <div className="flex gap-3">
        <a
          href="/admin/blog/posts/new"
          className="px-4 py-2 border rounded-md"
        >
          + Create Post
        </a>

        <a href="/admin/blog/posts" className="px-4 py-2 border rounded-md">
          Manage Posts
        </a>
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
                href={`/admin/blog/posts/${post.id}`}
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
      <p className="text-xl font-bold">{value}</p>
    </div>
  );
}