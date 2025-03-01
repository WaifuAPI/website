import { useState } from "react";
import PageWrapper from "@/components/pages/global/PageWrapper";
import ContentWrapper from "@/components/pages/dashboard/ContentWrapper";
import DashboardSidebar from "@/components/sidebar/Dashboard";
import Header from "@/components/pages/dashboard/Header";
import WorkInProgress from "@/components/pages/dashboard/WorkInProgress";
import SubHeader from "@/components/pages/dashboard/myaccount/SubHeader";
import ServiceNotAvailable from "@/components/pages/dashboard/ServiceNotAvailable";
import ChangeEmail from "@/components/pages/dashboard/myaccount/ChangeEmail";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ChangeEmailProfile() {
  const [sidebarOpen, setIsSidebarOpen] = useState(false); // state for sidebar visibility

  const toggleSidebar = () => {
    setIsSidebarOpen((prevState) => !prevState); // toggle sidebar visibility
  };

  return (
    <PageWrapper pageName="change_email">
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
              { label: "Home", href: "/" },
              { label: "Profile", href: "/dashboard/profile" },
              { label: "Change Email" },
            ]}
          />

          <ServiceNotAvailable />

          <ContentWrapper pageName="change_email">
            {/* Dashboard Content */}
            <main className="text-white flex-1 p-8 overflow-auto min-h-[calc(100vh-4rem)] bg-gray-950">
              <ChangeEmail />
            </main>
          </ContentWrapper>
        </div>
      </div>
    </PageWrapper>
  );
}
