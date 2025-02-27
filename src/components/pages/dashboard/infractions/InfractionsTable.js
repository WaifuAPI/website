import { useState } from "react";
import {
  FaExclamationTriangle,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { BiSort } from "react-icons/bi";

const sampleData = [
  {
    type: "UNBANNED",
    reason: "",
    duration: "-",
    date: "2023-10-25T17:17:02+05:30",
    service: { category: "API", route: null },
  },
  {
    type: "UNBANNED",
    reason: "",
    duration: "-",
    date: "2023-10-25T17:33:48+05:30",
    service: { category: "Website", route: null },
  },
  {
    type: "WARNING",
    reason: "Fake Transactions",
    duration: "2025-02-17T14:50:37+05:30",
    date: "2025-01-01T16:52:22+05:30",
    service: { category: "API", route: "/v4/premium" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Mass Account Spam",
    duration: "-",
    date: "2023-10-18T11:05:29+05:30",
    service: { category: "Website", route: "/register" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Mass Account Spam",
    duration: "-",
    date: "2023-10-18T11:22:22+05:30",
    service: { category: "API", route: null },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Excessive Requests",
    duration: "2023-09-15T19:30:00+05:30",
    date: "2023-09-10T13:00:15+05:30",
    service: { category: "API", route: "/v1/users" },
  },
  {
    type: "WARNING",
    reason: "Chargeback Fraud",
    duration: "2023-07-01T18:00:00+05:30",
    date: "2023-06-25T15:30:45+05:30",
    service: { category: "API", route: "/v3/payments" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Hate Speech",
    duration: "-",
    date: "2023-08-05T21:10:30+05:30",
    service: { category: "Website", route: "/forum" },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Suspicious Activity",
    duration: "2023-09-20T23:30:00+05:30",
    date: "2023-09-18T14:45:10+05:30",
    service: { category: "API", route: "/v2/auth" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Bot Abuse",
    duration: "-",
    date: "2023-07-12T03:20:05+05:30",
    service: { category: "API", route: null },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Spamming",
    duration: "2023-06-20T17:30:00+05:30",
    date: "2023-06-15T12:55:20+05:30",
    service: { category: "Website", route: "/comments" },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Unauthorized Access",
    duration: "2024-12-01T10:00:00+05:30", // Future Ban
    date: "2024-11-28T14:15:30+05:30",
    service: { category: "API", route: "/v1/admin" },
  },
  {
    type: "WARNING",
    reason: "Data Scraping",
    duration: "2024-07-15T09:00:00+05:30", // Future Warning
    date: "2024-07-10T08:30:45+05:30",
    service: { category: "Website", route: "/v4/data" },
  },
];

const formatDuration = (timestamp) => {
  if (timestamp === "-") return "-"; // Keep "-" if it's already set

  const startTime = new Date(timestamp).getTime();
  const currentTime = new Date().getTime();
  const diffInMinutes = Math.floor((currentTime - startTime) / (1000 * 60)); // Convert ms → mins

  if (diffInMinutes === 0) return "Just now";

  const absDiff = Math.abs(diffInMinutes);
  const suffix = diffInMinutes < 0 ? "for" : "ago"; // Future or past

  if (absDiff < 60) {
    return `${absDiff} min${absDiff > 1 ? "s" : ""}`;
  } else if (absDiff < 1440) {
    return `${Math.floor(absDiff / 60)} hour${absDiff >= 120 ? "s" : ""}`;
  } else if (absDiff < 525600) {
    return `${Math.floor(absDiff / 1440)} day${absDiff >= 2880 ? "s" : ""}`;
  } else {
    return `${Math.floor(absDiff / 525600)} year${
      absDiff >= 1051200 ? "s" : ""
    }`;
  }
};

export default function InfractionsTable() {
  const [data, setData] = useState(sampleData);
  const [sortConfig, setSortConfig] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const sortTable = (key) => {
    let sortedData = [...data];
    let direction = "ascending";

    if (sortConfig?.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }

    sortedData.sort((a, b) => {
      if (a[key] < b[key]) return direction === "ascending" ? -1 : 1;
      if (a[key] > b[key]) return direction === "ascending" ? 1 : -1;
      return 0;
    });

    setSortConfig({ key, direction });
    setData(sortedData);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6 bg-gray-900 text-white shadow-lg rounded-lg mb-28 animate-fadeInUp">
      <h3 className="flex items-center text-xl font-semibold mb-4">
        <FaExclamationTriangle className="text-white-500 mr-2 mt-1" />
        Infraction History
      </h3>
      {/* Separating Line */}
      <hr className="border-gray-700 my-4" />

      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-700 hidden lg:table">
          <thead>
            <tr className="bg-gray-800">
              {["type", "reason", "duration", "date", "service"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-2 text-left cursor-pointer text-gray-300 hover:text-white"
                  onClick={() => sortTable(key)}
                >
                  <div className="flex items-center gap-1">
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    <BiSort className="text-gray-400" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="border border-gray-700 hover:bg-gray-800"
                >
                  <td className="px-4 py-2">
                    <span
                      className={`select-none px-2 py-0.5 text-xs font-medium text-white rounded ${
                        item.type === "UNBANNED"
                          ? "bg-green-600"
                          : item.type === "WARNING"
                          ? "bg-yellow-600"
                          : "bg-red-600"
                      }`}
                    >
                      {item.type}
                    </span>
                  </td>
                  <td className="px-4 py-2">{item.reason || "-"}</td>
                  <td className="px-4 py-2">{item.duration}</td>
                  <td className="px-4 py-2">{item.date}</td>
                  <td className="px-4 py-2">
                    <div className="flex flex-col">
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-md w-fit ${
                          item.service.category === "API"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}
                      >
                        {item.service.category}
                      </span>
                      {item.service.route ? (
                        <span className="text-xs text-gray-600 mt-1">
                          {item.service.route}
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500 mt-1">
                          All Routes
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-4 py-2 text-center text-gray-400">
                  Nothing to show here
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Responsive Table for smaller screens */}
        <div className="lg:hidden">
          {paginatedData.length > 0 ? (
            paginatedData.map((item, index) => (
              <div
                key={index}
                className="border-b border-gray-700 p-4 flex flex-col hover:bg-gray-800"
              >
                {/* Top section: Badge and Date */}
                <div className="flex justify-between items-center flex-wrap gap-2">
                  <span
                    className={`px-2 py-0.5 text-xs font-medium text-white rounded whitespace-nowrap ${
                      item.type === "UNBANNED"
                        ? "bg-green-600"
                        : item.type === "WARNING"
                        ? "bg-yellow-600"
                        : "bg-red-600"
                    }`}
                  >
                    {item.type}
                  </span>
                </div>

                {/* Reason and Duration */}
                <div className="mt-2">
                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">Date:</span>{" "}
                    {item.date}
                  </p>
                  <p className="text-sm text-gray-300 flex items-center gap-1">
                    <span className="font-semibold text-white">Reason:</span>
                    <span>
                      {!item.reason || item.reason === "-"
                        ? "N/A"
                        : item.reason}
                    </span>
                  </p>

                  <p className="text-sm text-gray-300">
                    <span className="font-semibold text-white">Duration:</span>{" "}
                    <span>
                      {!item.duration || item.duration === "-"
                        ? "N/A"
                        : item.duration}
                    </span>
                  </p>

                  <div className="text-sm text-gray-300 max-w-full">
                    <div className="text-sm text-gray-300 flex flex-wrap items-center gap-2">
                      <span className="font-semibold text-white">Service:</span>
                      <div
                        className={`inline-block px-2 py-0.5 text-xs font-semibold text-white rounded-md w-fit ${
                          item.service.category === "API"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}
                      >
                        {item.service.category}
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {item.service.route ? item.service.route : "All Routes"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Service Section with Badge and Route */}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-400 py-4">
              Nothing to show here
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          <FaArrowLeft />
        </button>
        <span className="text-sm">
          Page {currentPage} of{" "}
          {Math.max(1, Math.ceil(data.length / itemsPerPage))}
        </span>
        <button
          className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
          onClick={() =>
            setCurrentPage((prev) =>
              startIndex + itemsPerPage < data.length ? prev + 1 : prev
            )
          }
          disabled={startIndex + itemsPerPage >= data.length}
        >
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
}
