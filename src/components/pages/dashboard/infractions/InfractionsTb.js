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
    date: "2023-10-25 11:47:02",
    service: { category: "API", route: null },
  },
  {
    type: "UNBANNED",
    reason: "",
    duration: "-",
    date: "2023-10-25 12:03:48",
    service: { category: "Website", route: null },
  },
  {
    type: "WARNING",
    reason: "Fake Transactions",
    duration: "2023-05-20 09:20:37",
    date: "2023-10-18 11:22:22",
    service: { category: "API", route: "/v4/premium" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Mass Account Spam",
    duration: "-",
    date: "2023-10-18 05:35:29",
    service: { category: "Website", route: "/register" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Mass Account Spam",
    duration: "-",
    date: "2023-10-18 05:52:22",
    service: { category: "API", route: null },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Excessive Requests",
    duration: "2023-09-15 14:00:00",
    date: "2023-09-10 08:30:15",
    service: { category: "API", route: "/v1/users" },
  },
  {
    type: "WARNING",
    reason: "Chargeback Fraud",
    duration: "2023-07-01 12:30:00",
    date: "2023-06-25 10:00:45",
    service: { category: "API", route: "/v3/payments" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Hate Speech",
    duration: "-",
    date: "2023-08-05 15:40:30",
    service: { category: "Website", route: "/forum" },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Suspicious Activity",
    duration: "2023-09-20 18:00:00",
    date: "2023-09-18 09:15:10",
    service: { category: "API", route: "/v2/auth" },
  },
  {
    type: "PERMANENTLY BANNED",
    reason: "Bot Abuse",
    duration: "-",
    date: "2023-07-12 21:50:05",
    service: { category: "API", route: null },
  },
  {
    type: "TEMPORARILY BANNED",
    reason: "Spamming",
    duration: "2023-06-20 12:00:00",
    date: "2023-06-15 07:25:20",
    service: { category: "Website", route: "/comments" },
  },
];

export default function InfractionsTb() {
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
    <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden mb-28 animate-fadeInUp">
      <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
        <FaExclamationTriangle className="text-yellow-500" />
        <strong>Infraction History</strong>
      </header>

      <div className="p-6">
        {/* Table Container */}
        <div className="w-full overflow-x-auto">
          <table className="w-full border border-gray-700">
            <thead>
              <tr className="bg-gray-800">
                {["type", "reason", "duration", "date", "service"].map(
                  (key) => (
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
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-700 hover:bg-gray-800"
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-4">
          <button
            className="p-2 bg-gray-700 text-white rounded disabled:opacity-50"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <FaArrowLeft />
          </button>
          <span className="text-sm">
            Page {currentPage} of {Math.ceil(data.length / itemsPerPage)}
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
    </div>
  );
}
