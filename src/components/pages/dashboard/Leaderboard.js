// Mock leaderboard data
const topUsers = [
  { rank: 1, name: "Aeryk", requests: 1200 },
  { rank: 2, name: "User456", requests: 1100 },
  { rank: 3, name: "User789", requests: 980 },
  { rank: 4, name: "User78", requests: 780 },
  { rank: 5, name: "User9", requests: 670 },
];

const topEndpoints = [
  { rank: 1, endpoint: "Waifu", requests: 5890 },
  { rank: 2, endpoint: "Husbando", requests: 4220 },
  { rank: 3, endpoint: "Quote", requests: 3020 },
  { rank: 4, endpoint: "Slap", requests: 2030 },
  { rank: 5, endpoint: "Kick", requests: 1230 },
];

const highestBalances = [
  { rank: 1, name: "Aeryk", balance: "10,500" },
  { rank: 2, name: "Shed", balance: "9,800" },
  { rank: 3, name: "Jenny", balance: "8,200" },
  { rank: 4, name: "Ash Ketchup", balance: "6,500" },
  { rank: 5, name: "May", balance: "2,800" },
];

export default function Leaderboard() {
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
            {topUsers.map(({ rank, name, requests }, index) => (
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
                  <span className="font-bold">{requests}</span>
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
            {topEndpoints.map(({ rank, endpoint, requests }, index) => (
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
                {/* Separating Line */}
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
            {highestBalances.map(({ rank, name, balance }, index) => (
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
