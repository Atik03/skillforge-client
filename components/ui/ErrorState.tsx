interface ErrorStateProps {
  message?: string;
}

export default function ErrorState({
  message = "Something went wrong.",
}: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <h3 className="text-2xl font-bold mb-2">
        Failed to Load Data
      </h3>

      <p className="text-base-content/70">
        {message}
      </p>
    </div>
  );
}