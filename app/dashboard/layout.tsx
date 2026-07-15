import { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardTopbar from "@/components/dashboard/DashboardTopbar";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="drawer lg:drawer-open">

        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />

        <div className="drawer-content flex flex-col">

          <DashboardTopbar />

          <main className="p-6">
            {children}
          </main>

        </div>

        <DashboardSidebar />

      </div>
    </div>
  );
}