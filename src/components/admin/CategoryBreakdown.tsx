interface Category {
  title: string;
  count: number;
}

interface CategoryBreakdownProps {
  categories: Category[];
}

export default function CategoryBreakdown({ categories }: CategoryBreakdownProps) {
  if (categories.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">No categories found.</p>
    );
  }

  const maxCount = Math.max(...categories.map((c) => c.count));

  return (
    <div className="space-y-3">
      {categories.map((category) => (
        <div key={category.title}>
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-medium">{category.title}</span>
            <span className="text-muted-foreground">
              {category.count} {category.count === 1 ? "post" : "posts"}
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-muted">
            <div
              className="h-2.5 rounded-full bg-primary-600 transition-all"
              style={{
                width: maxCount > 0 ? `${(category.count / maxCount) * 100}%` : "0%",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
