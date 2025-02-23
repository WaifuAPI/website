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
import { Line } from "react-chartjs-2";
import { Bar } from "react-chartjs-2";

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

// Mock data for API requests over months
const requestData = [
  { name: "Jan", requests: 4000 },
  { name: "Feb", requests: 3000 },
  { name: "Mar", requests: 5000 },
  { name: "Apr", requests: 7000 },
  { name: "May", requests: 6500 },
];

const topEndpoints = [
  { rank: 1, endpoint: "Waifu", requests: 10500 },
  { rank: 2, endpoint: "Husbando", requests: 7500 },
  { rank: 3, endpoint: "Kiss", requests: 6000 },
  { rank: 4, endpoint: "Quote", requests: 5000 },
  { rank: 5, endpoint: "Kick", requests: 4000 },
  { rank: 6, endpoint: "Slap", requests: 3000 },
];

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fadeInUp">
      {/* Requests Over Time */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Requests Over Time</strong>
        </header>

        <div className="p-6 space-y-4">
          <div style={{ height: "300px" }}>
            <Line
              data={{
                labels: requestData.map((item) => item.name),
                datasets: [
                  {
                    label: "Requests",
                    data: requestData.map((item) => item.requests),
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
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: "#D1D5DB",
                    },
                  },
                  tooltip: {
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    borderWidth: 1,
                    titleColor: "#6EE7B7",
                    bodyColor: "#D1D5DB",
                    displayColors: false,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      {/* Requests Over Time Bar Graph */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Most Popular Endpoints</strong>
        </header>

        <div className="p-6 space-y-4">
          <div style={{ height: "300px" }}>
            <Bar
              data={{
                labels: topEndpoints.map((item) => item.endpoint),
                datasets: [
                  {
                    label: "Requests",
                    data: topEndpoints.map((item) => item.requests),
                    backgroundColor: "#6EE7B7",
                    borderColor: "#374151",
                    borderWidth: 2,
                    hoverBackgroundColor: "#34D399",
                    hoverBorderColor: "#1F2937",
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
                plugins: {
                  legend: {
                    display: true,
                    labels: {
                      color: "#D1D5DB",
                    },
                  },
                  tooltip: {
                    backgroundColor: "#1F2937",
                    borderColor: "#374151",
                    borderWidth: 1,
                    titleColor: "#6EE7B7",
                    bodyColor: "#D1D5DB",
                    displayColors: false,
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
