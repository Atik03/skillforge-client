export default function LoadingSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300 rounded-2xl overflow-hidden">
      {/* Image */}
      <div className="skeleton h-56 w-full" />

      <div className="card-body">
        {/* Category */}
        <div className="skeleton h-6 w-24 rounded-full" />

        {/* Title */}
        <div className="space-y-2 mt-4">
          <div className="skeleton h-6 w-full" />
          <div className="skeleton h-6 w-3/4" />
        </div>

        {/* Description */}
        <div className="space-y-2 mt-4">
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-full" />
          <div className="skeleton h-4 w-2/3" />
        </div>

        {/* Meta */}
        <div className="flex justify-between mt-6">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-5 w-20" />
        </div>

        <div className="flex justify-between mt-3">
          <div className="skeleton h-5 w-20" />
          <div className="skeleton h-5 w-20" />
        </div>

        {/* Divider */}
        <div className="divider" />

        {/* Instructor */}
        <div className="skeleton h-5 w-40" />

        {/* Button */}
        <div className="skeleton h-12 w-full rounded-xl mt-4" />
      </div>
    </div>
  );
}