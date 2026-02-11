import { formatDate } from "../../lib/utils";

interface Post {
  title: string;
  author: string | null;
  publishedAt: string;
  slug: string;
}

interface RecentPostsListProps {
  posts: Post[];
}

export default function RecentPostsList({ posts }: RecentPostsListProps) {
  if (posts.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No posts found.</p>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border text-left">
            <th className="pb-3 pr-4 font-medium text-muted-foreground">Title</th>
            <th className="pb-3 pr-4 font-medium text-muted-foreground">Author</th>
            <th className="pb-3 font-medium text-muted-foreground">Published</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.slug} className="border-b border-border last:border-0 hover:bg-muted/50">
              <td className="py-3 pr-4">
                <a
                  href={`/blog/${post.slug}`}
                  className="font-medium text-foreground hover:text-primary-600 hover:underline"
                >
                  {post.title}
                </a>
              </td>
              <td className="py-3 pr-4 text-muted-foreground">
                {post.author || "Unknown"}
              </td>
              <td className="py-3 text-muted-foreground whitespace-nowrap">
                {post.publishedAt ? formatDate(post.publishedAt) : "Draft"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
