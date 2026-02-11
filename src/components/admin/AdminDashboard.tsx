import { useEffect, useState } from "react";
import { createClient } from "@sanity/client";
import StatCard from "./StatCard";
import RecentPostsList from "./RecentPostsList";
import CategoryBreakdown from "./CategoryBreakdown";

const client = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || "",
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  useCdn: false,
  token: import.meta.env.PUBLIC_SANITY_API_TOKEN || "",
});

interface DashboardData {
  postCount: number;
  categoryCount: number;
  authorCount: number;
  categoriesWithCounts: { title: string; count: number }[];
  recentPosts: {
    title: string;
    publishedAt: string;
    author: string | null;
    slug: string;
  }[];
}

export default function AdminDashboard() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    setLoading(true);
    setError(null);

    try {
      const [postCount, categoryCount, authorCount, categoriesWithCounts, recentPosts] =
        await Promise.all([
          client.fetch<number>(`count(*[_type == "post"])`),
          client.fetch<number>(`count(*[_type == "category"])`),
          client.fetch<number>(`count(*[_type == "author"])`),
          client.fetch<{ title: string; count: number }[]>(
            `*[_type == "category"] { title, "count": count(*[_type == "post" && references(^._id)]) } | order(count desc)`
          ),
          client.fetch<DashboardData["recentPosts"]>(
            `*[_type == "post"] | order(publishedAt desc) [0...10] { title, publishedAt, "author": author->name, "slug": slug.current }`
          ),
        ]);

      setData({ postCount, categoryCount, authorCount, categoriesWithCounts, recentPosts });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch dashboard data");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-28 animate-pulse rounded-xl border border-border bg-muted" />
          ))}
        </div>
        <div className="h-64 animate-pulse rounded-xl border border-border bg-muted" />
        <div className="h-48 animate-pulse rounded-xl border border-border bg-muted" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="text-sm text-red-600">{error}</p>
        <button
          onClick={fetchData}
          className="mt-4 rounded-lg bg-primary-600 px-4 py-2 text-sm font-medium text-white hover:bg-primary-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="space-y-8">
      {/* Stat Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard title="Total Posts" value={data.postCount} />
        <StatCard title="Categories" value={data.categoryCount} />
        <StatCard title="Authors" value={data.authorCount} />
      </div>

      {/* Recent Posts */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Recent Posts</h2>
        <RecentPostsList posts={data.recentPosts} />
      </div>

      {/* Category Breakdown */}
      <div className="rounded-xl border border-border bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-lg font-semibold">Posts per Category</h2>
        <CategoryBreakdown categories={data.categoriesWithCounts} />
      </div>
    </div>
  );
}
