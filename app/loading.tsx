export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200">
      <div className="text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>

        <h2 className="mt-6 text-3xl font-bold">SkillForge</h2>

        <p className="text-base-content/70 mt-2">Loading, please wait...</p>
      </div>
    </div>
  );
}
