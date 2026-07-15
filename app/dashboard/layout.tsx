import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open">

      <input
        id="dashboard-drawer"
        type="checkbox"
        className="drawer-toggle"
      />

      <div className="drawer-content flex flex-col min-h-screen">

        <DashboardTopbar />

        <main className="p-6 bg-base-200 flex-1">
          {children}
        </main>

      </div>


      <DashboardSidebar />

    </div>
  );
}