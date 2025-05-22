import { useState } from "react";
import { useRouter } from "next/router";
import {
  FiAlertTriangle,
  FiBarChart,
  FiUsers,
  FiLock,
  FiUser,
  FiKey,
} from "react-icons/fi";
import { AiOutlineNotification } from "react-icons/ai";
import { LuBookmark } from "react-icons/lu";
import { TbDatabasePlus } from "react-icons/tb";
import { TfiDashboard } from "react-icons/tfi";
import { PiCatLight } from "react-icons/pi";

import Link from "next/link";

const overviewLinks = [
  {
    href: "/dashboard/overview",
    label: "Dashboard",
    icon: TfiDashboard,
    new: true,
  }, // Add 'new' flag here
  { href: "/dashboard/analytics", label: "Analytics", icon: FiBarChart },
];

const moderationLinks = [
  { href: "/dashboard/tools/users", label: "Users", icon: FiUsers },

  {
    href: "/dashboard/tools/logs",
    label: "Logs",
    icon: LuBookmark,
  },
  {
    href: "/dashboard/tools/notifications",
    label: "Notifications",
    icon: AiOutlineNotification,
  },
];

const adminLinks = [
  { href: "/dashboard/tools/admin", label: "Admin", icon: FiKey }, // Add 'new' flag here
  {
    href: "/dashboard/tools/database",
    label: "Database",
    icon: TbDatabasePlus,
  },
];

export default function ToolsSidebar({ sidebarOpen, toggleSidebar }) {
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  return (
    <>
      {/* Overlay (Mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity duration-300"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`select-none bg-gray-800 text-white w-64 py-7 px-5 fixed lg:relative inset-y-0 left-0 transform transition-transform duration-300 ease-out z-50 shadow-lg overflow-hidden
  ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center mb-8">
          <PiCatLight className="text-white text-4xl sm:text-3xl md:text-4xl lg:text-5xl" />{" "}
          {/* Responsive icon size */}
          <h1 className="text-xl font-semibold tracking-wide mr-16 lg:mr-14">
            Waifu.it
          </h1>
        </div>
        <div className="overflow-y-auto max-h-[calc(100vh-8rem)] scrollbar-hide">
          {/* Set height and make it scrollable */}
          {/* Navigation Links */}
          <nav className="space-y-4 overflow-y-auto">
            {/* Overview Section */}
            <div>
              <h2 className="text-gray-400 font-semibold mb-2">Overview</h2>
              <div className="space-y-2">
                {overviewLinks.map(
                  ({ href, highlight, label, icon: Icon, new: isNew }) => {
                    const pattern = new RegExp(
                      `^${(highlight || href).replace("/*", "/.*")}$`
                    );
                    const isActive = pattern.test(router.pathname);

                    return (
                      <Link
                        key={href}
                        href={href.replace("/*", "")}
                        className={`flex items-center px-4 py-3 rounded-md transition duration-300 font-medium tracking-wide
              ${
                isActive
                  ? "bg-gray-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-600/80 hover:text-gray-100"
              }
            `}
                      >
                        <Icon className="mr-3 text-lg" />
                        {label}
                        {isNew && (
                          <span className="ml-auto bg-sky-400 text-white rounded-sm px-2 text-xs">
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>

            {/* Management Section */}
            <div>
              <h2 className="text-gray-400 font-semibold mb-2">Moderation</h2>
              <div className="space-y-2">
                {moderationLinks.map(
                  ({ href, highlight, label, icon: Icon, new: isNew }) => {
                    const pattern = new RegExp(
                      `^${(highlight || href).replace("/*", "/.*")}$`
                    );
                    const isActive = pattern.test(router.pathname);

                    return (
                      <Link
                        key={href}
                        href={href.replace("/*", "")}
                        className={`flex items-center px-4 py-3 rounded-md transition duration-300 font-medium tracking-wide
              ${
                isActive
                  ? "bg-gray-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-600/80 hover:text-gray-100"
              }
            `}
                      >
                        <Icon className="mr-3 text-lg" />
                        {label}
                        {isNew && (
                          <span className="ml-auto bg-sky-400 text-white rounded-sm px-2 text-xs">
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>

            {/* Settings Section */}
            <div>
              <h2 className="text-gray-400 font-semibold mb-2">
                Admin & System Control
              </h2>
              <div className="space-y-2">
                {adminLinks.map(
                  ({ href, highlight, label, icon: Icon, new: isNew }) => {
                    const pattern = new RegExp(
                      `^${(highlight || href).replace("/*", "/.*")}$`
                    );
                    const isActive = pattern.test(router.pathname);

                    return (
                      <Link
                        key={href}
                        href={href.replace("/*", "")}
                        className={`flex items-center px-4 py-3 rounded-md transition duration-300 font-medium tracking-wide
              ${
                isActive
                  ? "bg-gray-600 text-white shadow-md"
                  : "text-gray-300 hover:bg-gray-600/80 hover:text-gray-100"
              }
            `}
                      >
                        <Icon className="mr-3 text-lg" />
                        {label}
                        {isNew && (
                          <span className="ml-auto bg-sky-400 text-white rounded-sm px-2 text-xs">
                            NEW
                          </span>
                        )}
                      </Link>
                    );
                  }
                )}
              </div>
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}
