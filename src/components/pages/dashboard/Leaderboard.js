import { useState, useEffect } from "react";
import axios from "axios";


export default function Leaderboard() {
  const [topUsers, setTopUsers] = useState([]);
  const [topUsersLoaded, setTopUsersLoaded] = useState(false);
  const [topEndpoints, setTopEndpoints] = useState([]);
  const [topEndpointsLoaded, setTopEndpointsLoaded] = useState(false);
  const [highestBalances, setHighestBalances] = useState([]);
  const [highestBalancesLoaded, setHighestBalancesLoaded] = useState(false);

  useEffect(() => {
    async function fetchTopEndpoints() {
      try {
        const response = await axios.get("/api/statistics/users/requests");
        setTopUsers(response.data); // Expecting top 6 endpoints
      } catch (err) {
        console.error(err);
      } finally {
        setTopUsersLoaded(true);
      }
    }

    fetchTopEndpoints();
  }, []);

  useEffect(() => {
    async function fetchTopEndpoints() {
      try {
        const response = await axios.get("/api/statistics/popular");
        setTopEndpoints(response.data.slice(0, 5)); // Expecting top 6 endpoints
      } catch (err) {
        console.error(err);
      } finally {
        setTopEndpointsLoaded(true);
      }
    }

    fetchTopEndpoints();
  }, []);

  useEffect(() => {
    async function fetchTopEndpoints() {
      try {
        const response = await axios.get("/api/statistics/users/quota");
        setHighestBalances(response.data); // Expecting top 6 endpoints
      } catch (err) {
        console.error(err);
      } finally {
        setHighestBalancesLoaded(true);
      }
    }

    fetchTopEndpoints();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 animate-fadeInUp ">
      {/* Top Users */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Top Users</strong>
        </header>

        <div className="p-6 space-y-4">
          {/* Table Header */}
          <div className="flex text-sm font-semibold text-gray-400 px-1">
            <span className="flex-1">Name</span>
            <span className="text-right">Requests</span>
          </div>

          {/* Users List */}
          <ul>
            {!topUsersLoaded
              ? // Skeleton Loader mimicking original UI
                Array.from({ length: 5 }).map((_, index) => (
                  <li
                    key={index}
                    className="py-4 px-2 animate-pulse rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="h-4 w-6 bg-gray-700 rounded"></span>
                        <span className="h-4 w-40 bg-gray-700 rounded"></span>
                      </div>
                      <span className="h-4 w-10 bg-gray-700 rounded"></span>
                    </div>
                    {index !== 4 && (
                      <hr className="border-gray-700 mt-3 opacity-50" />
                    )}
                  </li>
                ))
              : topUsers.map(({ rank, name, requests }, index) => (
                  <li
                    key={rank}
                    className="py-3 px-2 text-gray-300 transition rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-400">
                          #{index + 1}
                        </span>
                        <span className="text-opacity-90">{name}</span>
                      </div>
                      <span
                        className={`font-bold ${
                          index === 0 ? "text-red-400" : ""
                        }`}
                      >
                        {requests}
                      </span>{" "}
                    </div>
                    {/* Separating Line */}
                    {index !== topUsers.length - 1 && (
                      <hr className="border-gray-700 mt-3 opacity-50" />
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </div>

      {/* Top Endpoints */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Top Endpoints</strong>
        </header>

        <div className="p-6 space-y-4">
          {/* Table Header */}
          <div className="flex text-sm font-semibold text-gray-400 px-1">
            <span className="flex-1">Endpoint</span>
            <span className="text-right">Requests</span>
          </div>

          {/* Endpoints List */}
          <ul>
            {!topEndpointsLoaded
              ? // Skeleton Loader mimicking original UI
                Array.from({ length: 5 }).map((_, index) => (
                  <li
                    key={index}
                    className="py-4 px-2 animate-pulse rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="h-4 w-6 bg-gray-700 rounded"></span>
                        <span className="h-4 w-40 bg-gray-700 rounded"></span>
                      </div>
                      <span className="h-4 w-10 bg-gray-700 rounded"></span>
                    </div>
                    {index !== 4 && (
                      <hr className="border-gray-700 mt-3 opacity-50" />
                    )}
                  </li>
                ))
              : // Actual Data
                topEndpoints.map(({ rank, endpoint, requests }, index) => (
                  <li
                    key={rank}
                    className="py-3 px-2 text-gray-300 transition rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-400">
                          #{index + 1}
                        </span>
                        <span className="text-opacity-90 truncate max-w-[200px]">
                          {endpoint}
                        </span>
                      </div>
                      <span className="font-bold">{requests}</span>
                    </div>
                    {index !== topEndpoints.length - 1 && (
                      <hr className="border-gray-700 mt-3 opacity-50" />
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </div>

      {/* Highest Balances */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Highest Quota</strong>
        </header>

        <div className="p-6 space-y-4">
          {/* Table Header */}
          <div className="flex text-sm font-semibold text-gray-400 px-1">
            <span className="flex-1">Name</span>
            <span className="text-right">Quota</span>
          </div>

          {/* Balances List */}
          <ul>
            {!highestBalancesLoaded
              ? // Skeleton Loader mimicking original UI
                Array.from({ length: 5 }).map((_, index) => (
                  <li
                    key={index}
                    className="py-4 px-2 animate-pulse rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="h-4 w-6 bg-gray-700 rounded"></span>
                        <span className="h-4 w-40 bg-gray-700 rounded"></span>
                      </div>
                      <span className="h-4 w-10 bg-gray-700 rounded"></span>
                    </div>
                    {index !== 4 && (
                      <hr className="border-gray-700 mt-3 opacity-50" />
                    )}
                  </li>
                ))
              : highestBalances.map(({ rank, name, balance }, index) => (
                  <li
                    key={rank}
                    className="py-3 px-2 text-gray-300 transition rounded-lg"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-semibold text-gray-400">
                          #{index + 1}
                        </span>
                        <span className="truncate max-w-[200px]">{name}</span>
                      </div>
                      <span className="font-bold text-green-400">
                        {balance.toLocaleString()}
                      </span>
                    </div>
                    {/* Separating Line */}
                    {index !== highestBalances.length - 1 && (
                      <hr className="border-gray-700 mt-3 opacity-50" />
                    )}
                  </li>
                ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
