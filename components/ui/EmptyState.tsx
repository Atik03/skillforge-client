interface EmptyStateProps {
  title?: string;
}

export default function EmptyState({
  title = "No Data Found",
}: EmptyStateProps) {
  return (
    <div className="text-center py-16">
      <h3 className="text-2xl font-bold">
        {title}
      </h3>
    </div>
  );
}