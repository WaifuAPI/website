// Mock data for user-specific stats
const userStats = {
  name: "User123",
  requests: 1200,
  rank: 1,
  lastLogin: "2025-02-13 10:00 AM",
  activeSessions: 5,
  quotaUsed: 450, // out of 500 requests
  accountCreationDate: "2023-06-15",
  subscriptionStatus: "Premium",
  quotaProgress: { total: 1000 },
  accountType: "Premium",
  lastAction: "Character Data",
  profileCompletion: 85,
  topEndpoints: [
    { rank: 1, endpoint: "Waifu", requests: 500 },
    { rank: 2, endpoint: "Husbando", requests: 400 },
    { rank: 3, endpoint: "Kiss", requests: 300 },
    { rank: 4, endpoint: "Quote", requests: 400 },
    { rank: 5, endpoint: "Hug", requests: 300 },
    { rank: 6, endpoint: "Kick", requests: 300 },
    { rank: 7, endpoint: "Slap", requests: 300 },
  ],
  requestDistribution: [
    { endpoint: "Waifu", requests: 500, percentage: 41.67 },
    { endpoint: "Husbando", requests: 400, percentage: 33.33 },
    { endpoint: "Kiss", requests: 300, percentage: 25.0 },
  ],
  quotaProgress: {
    used: 450,
    total: 500,
    remaining: 50,
    progress: 90, // percentage
  },
  requestTrends: [
    { date: "2025-02-15", requests: 220 },
    { date: "2025-02-14", requests: 220 },
    { date: "2025-02-13", requests: 200 },
    { date: "2025-02-12", requests: 180 },
    { date: "2025-02-11", requests: 130 },
    { date: "2025-02-10", requests: 150 },
    { date: "2025-02-09", requests: 150 },
  ],

  // New categories to enrich the user stats
  averageRequestsPerDay: 160, // Calculate from requestTrends
  peakRequestDay: "2025-02-14", // Date with the highest requests
  totalRequestsThisMonth: 1500, // Sum of requests from the trends
  totalRequestsLifetime: 18000, // Total requests ever made by the user

  // New sections to show in the dashboard
  activitySummary: {
    dailyAverage: 160,
    peakRequests: 220,
    quietestDay: "2025-02-16", // Day with the least requests
  },
};

export default function UserStatsLeaderboard() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-2 animate-fadeInUp">
      {/* User Overview */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Overview</strong>
        </header>

        <div className="p-6 space-y-4">
          {/* Rank */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Rank</span>
            <span className="font-semibold text-gray-100">
              {userStats.rank}
            </span>
          </div>

          {/* Requests */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Requests</span>
            <span className="font-semibold text-gray-100">
              {userStats.requests}
            </span>
          </div>

          {/* Last Login */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Last Login</span>
            <span className="font-semibold text-gray-100">
              {userStats.lastLogin}
            </span>
          </div>

          {/* Active Sessions */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Active Sessions</span>
            <span className="font-semibold text-gray-100">
              {userStats.activeSessions}
            </span>
          </div>

          {/* Quota Used */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Quota Used</span>
            <span className="font-semibold text-gray-100">
              {userStats.quotaUsed}/{userStats.quotaProgress.total}
            </span>
          </div>

          {/* Account Created */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Account Created</span>
            <span className="font-semibold text-gray-100">
              {userStats.accountCreationDate}
            </span>
          </div>

          {/* Subscription Status */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Subscription Status</span>
            <span className="font-semibold text-gray-100">
              {userStats.subscriptionStatus}
            </span>
          </div>

          {/* Account Type */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Account Type</span>
            <span className="font-semibold text-gray-100">
              {userStats.accountType}
            </span>
          </div>

          {/* Last Action */}
          <div className="flex justify-between border-b border-gray-700 pb-2">
            <span className="text-gray-400">Last Action</span>
            <span className="font-semibold text-gray-100">
              {userStats.lastAction}
            </span>
          </div>

          {/* Profile Completion */}
          <div className="flex justify-between">
            <span className="text-gray-400">Profile Completion</span>
            <span className="font-semibold text-gray-100">
              {userStats.profileCompletion}%
            </span>
          </div>
        </div>
      </div>

      {/* Most Used Endpoints */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>Your Top Endpoints</strong>
        </header>

        <div className="p-6 space-y-0">
          {/* Endpoint and Request Titles */}
          <div className="flex justify-between pb-2 text-gray-400 text-sm font-semibold">
            <span>Endpoint</span>
            <span>Requests</span>
          </div>

          <ul>
            {userStats.topEndpoints.map(
              ({ rank, endpoint, requests }, index) => (
                <li
                  key={rank}
                  className="py-3 text-gray-300 transition rounded-lg"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      {/* Adding trophies for top 3 ranks */}
                      {rank === 1 && (
                        <span className="mr-2 text-yellow-500">🏆</span>
                      )}
                      {rank === 2 && (
                        <span className="mr-2 text-gray-400">🥈</span>
                      )}
                      {rank === 3 && (
                        <span className="mr-2 text-yellow-600">🥉</span>
                      )}
                      <span className="font-medium truncate max-w-[200px]">
                        {rank}. {endpoint}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-100">
                      {requests}
                    </span>
                  </div>
                  {/* Separating Line */}
                  {index !== userStats.topEndpoints.length - 1 && (
                    <hr className="border-gray-700 mt-3 opacity-50" />
                  )}
                </li>
              )
            )}
          </ul>
        </div>
      </div>

      {/* Daily Request Count */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <strong>API Usage</strong>
        </header>

        <div className="p-6 space-y-0">
          {/* Date and Request Titles */}
          <div className="flex justify-between pb-2 text-gray-400 text-sm font-semibold">
            <span className="flex-1">Date</span>
            <span className="text-right">Requests</span>
          </div>

          <ul>
            {userStats.requestTrends.map(({ date, requests }, index) => (
              <li
                key={date}
                className="py-3 text-gray-300 transition rounded-lg"
              >
                <div className="flex justify-between items-center">
                  <span className="truncate max-w-[200px]">{date}</span>
                  <span className="text-lg font-semibold text-gray-100">
                    {requests}
                  </span>
                </div>
                {/* Separating Line */}
                {index !== userStats.requestTrends.length - 1 && (
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
