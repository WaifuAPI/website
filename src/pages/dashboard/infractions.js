import { useState } from "react";
import PageWrapper from "@/components/pages/global/PageWrapper";
import ContentWrapper from "@/components/pages/dashboard/ContentWrapper";
import DashboardSidebar from "@/components/sidebar/Dashboard";
import Header from "@/components/pages/dashboard/Header";
import WorkInProgress from "@/components/pages/dashboard/WorkInProgress";
import InfractionsTable from "@/components/pages/dashboard/infractions/InfractionsTable";
import SubHeader from "@/components/pages/dashboard/SubHeader";
import ServiceNotAvailable from "@/components/pages/dashboard/ServiceNotAvailable";
import { ToastContainer } from "react-toastify";

export default function DashboardInfractions() {
  const [sidebarOpen, setIsSidebarOpen] = useState(false); // state for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState); // toggle sidebar visibility
  };

  return (
    <PageWrapper pageName="infractions">
      <div className="flex h-screen bg-gray-100 overflow-hidden">
        <ToastContainer />
        {/* Sidebar */}
        <DashboardSidebar
          sidebarOpen={sidebarOpen}
          toggleSidebar={toggleSidebar}
        />
        {/* pass state and toggle function to sidebar */}
        {/* Main Content */}
        <div className="flex-1 flex flex-col bg-gray-900">
          {/* Header */}
          <Header toggleSidebar={toggleSidebar} />

          <SubHeader
            breadcrumbs={[
              { label: "Home", href: "/dashboard" },
              { label: "Infractions" },
            ]}
          />

          <ContentWrapper pageName="infractions">
            {/* Dashboard Content */}
            <main className="text-white flex-1 p-8 overflow-auto min-h-[calc(100vh-4rem)] bg-gray-950">
              <InfractionsTable />
            </main>
          </ContentWrapper>
        </div>
      </div>
    </PageWrapper>
  );
}
