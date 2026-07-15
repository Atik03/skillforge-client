export default function CourseSkeleton() {
  return (
    <div className="card bg-base-100 border border-base-300 shadow">

      <div className="skeleton h-52 w-full" />

      <div className="card-body space-y-3">

        <div className="skeleton h-5 w-20" />

        <div className="skeleton h-7 w-full" />

        <div className="skeleton h-4 w-full" />

        <div className="skeleton h-4 w-3/4" />

        <div className="skeleton h-10 w-full mt-4" />

      </div>

    </div>
  );
}