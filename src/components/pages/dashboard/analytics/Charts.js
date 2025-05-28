"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

// Register the necessary components for chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  Filler
);

// Mock user data (you should replace this with real API data)
const userStats = {
  totalRequests: 14500,
  requestsByEndpoint: [
    { endpoint: "Waifu", requests: 1500 },
    { endpoint: "Husbando", requests: 3500 },
    { endpoint: "Kiss", requests: 2500 },
    { endpoint: "Quote", requests: 2100 },
    { endpoint: "Kick", requests: 1500 },
  ],
  requestsOverTime: [
    { name: "Jan", requests: 1200 },
    { name: "Feb", requests: 950 },
    { name: "Mar", requests: 1600 },
    { name: "Apr", requests: 100 },
    { name: "May", requests: 1250 },
  ],
  lastLogin: "2025-02-01 14:30:00",
  activeSessions: 3,
  quotaUsed: 13500,
  remainingQuota: 500,
  milestones: ["1000 requests reached", "Premium User"],
  accountCreated: "2023-01-15",
  subscriptionStatus: "Premium",
  subscriptionEndDate: "2025-12-31",
};

export default function UserStatsCharts() {
  // Get the current month from the system date
  const currentMonth = new Date().toLocaleString("default", { month: "short" });

  // Filter the requests by endpoint for the current month (assuming it's February)
  const currentMonthRequests = userStats.requestsByEndpoint.map((item) => ({
    endpoint: item.endpoint,
    requests: item.requests, // Assuming you want to show the total requests in the current month
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 mb-12 animate-fadeInUp">
      {/* Requests Over Time Chart */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Requests Over Time (Last 5 Months)</strong>
        </header>

        <div className="p-6 space-y-4">
          <div style={{ height: "300px" }}>
            <Line
              data={{
                labels: userStats.requestsOverTime.map((item) => item.name),
                datasets: [
                  {
                    label: "Requests",
                    data: userStats.requestsOverTime.map(
                      (item) => item.requests
                    ),
                    borderColor: "#6EE7B7",
                    backgroundColor: "rgba(110, 231, 183, 0.2)",
                    fill: true,
                    tension: 0.3,
                    borderWidth: 3,
                    pointBackgroundColor: "#fff",
                    pointBorderColor: "#6EE7B7",
                    pointBorderWidth: 2,
                    pointRadius: 4,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    ticks: {
                      color: "#D1D5DB",
                      font: {
                        size: 12,
                      },
                    },
                    grid: {
                      color: "#374151",
                    },
                  },
                  y: {
                    ticks: {
                      color: "#D1D5DB",
                      font: {
                        size: 12,
                      },
                    },
                    grid: {
                      color: "#374151",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Requests by Endpoint Bar Chart for the Current Month */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Requests by Endpoint (Current Month)</strong>
        </header>

        <div className="p-6 space-y-4">
          <div style={{ height: "300px" }}>
            <Bar
              data={{
                labels: currentMonthRequests.map((item) => item.endpoint),
                datasets: [
                  {
                    label: "Requests",
                    data: currentMonthRequests.map((item) => item.requests),
                    backgroundColor: "#6EE7B7",
                    borderColor: "#4B5563",
                    borderWidth: 2,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  y: {
                    beginAtZero: true,
                    ticks: {
                      color: "#D1D5DB",
                      font: {
                        size: 12,
                      },
                    },
                    grid: {
                      color: "#374151",
                    },
                  },
                  x: {
                    ticks: {
                      color: "#D1D5DB",
                      font: {
                        size: 12,
                      },
                    },
                    grid: {
                      color: "#374151",
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
