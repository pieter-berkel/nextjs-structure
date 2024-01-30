export function PostListSkeleton({ length = 5 }: { length?: number }) {
  return (
    <div className="flex flex-col gap-4">
      {Array.from({ length }).map((_, i) => (
        <div key={i} className="h-12 bg-slate-700 animate-pulse rounded-lg" />
      ))}
    </div>
  );
}
