import DashboardSidebar from "@/components/sidebar/Dashboard";
import Header from "@/components/pages/dashboard/Header";
import WorkInProgress from "@/components/pages/global/WorkInProgress";

export default function DashboardSettings() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col bg-gray-900 ">
        {/* Header */}
        <Header />

        {/* Dashboard Content */}
        <main className="text-white flex-1 p-8 overflow-auto min-h-[calc(100vh-4rem)] bg-gray-950">
          <WorkInProgress />
        </main>
      </div>
    </div>
  );
}
