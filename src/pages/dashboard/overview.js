import { useState } from "react";
import PageWrapper from "@/components/pages/global/PageWrapper";
import DashboardSidebar from "@/components/sidebar/Dashboard";
import Header from "@/components/pages/dashboard/Header";
import Charts from "@/components/pages/dashboard/Charts";
import Leaderboard from "@/components/pages/dashboard/Leaderboard";
import Footer from "@/components/footer/Dashboard";
import SubHeader from "@/components/pages/dashboard/SubHeader";
import { ToastContainer } from "react-toastify";

export default function DashboardOverview() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <PageWrapper pageName="dashboard">
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <ToastContainer />
        {/* Sidebar */}
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />
          <SubHeader
            breadcrumbs={[
              { label: "Home", href: "/" },
              { label: "Dashboard", href: "/dashboard" },
              { label: "Overview" },
            ]}
          />

          {/* Dashboard Content */}
          <main className="text-white flex-1 p-8 overflow-auto min-h-[calc(100vh-4rem)] bg-gray-950">
            {/* Charts Section */}
            <Charts />
            {/* Leaderboard */}
            <Leaderboard />
            {/* Footer */}
            <Footer />
          </main>
        </div>
      </div>
    </PageWrapper>
  );
}
