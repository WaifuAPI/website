import Link from "next/link";

export default function ProfileCardLoading() {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md p-6 mx-auto sm:max-w-xl lg:max-w-6xl">
      <h3 className="text-xl font-semibold text-gray-100 flex items-center ">
        <i className="fas fa-user mr-2"></i> Profile
      </h3>
      {/* Separating Line */}
      <hr className="border-gray-700 my-4" />

      <div className="mt-4 space-y-4">
        {/* Avatar */}
        <div className="hidden sm:flex flex-col sm:flex-row items-center p-6 bg-gray-800 rounded-xl animate-pulse">
          <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
            Avatar
          </span>
          <div className="w-full sm:w-3/4 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-200 text-sm text-center sm:text-left">
              Your discord avatar will be displayed on the Dashboard.
            </p>
            <div className="w-20 h-20 rounded-full bg-gray-500" />
          </div>
        </div>
        {/* Small Screen Layout */}
        <div className="flex sm:hidden flex-row items-center justify-between p-6 bg-gray-800 rounded-xl animate-pulse">
          <div className="flex flex-col w-3/4">
            <span className="text-gray-400 text-sm uppercase">Avatar</span>
            <p className="text-gray-300 text-sm">
              Your discord avatar will be displayed on the Dashboard.
            </p>
          </div>
          <div className="w-20 h-20 rounded-full bg-gray-500 aspect-[1/1]" />
        </div>

        {/* Username */}
        <Link
          href="/dashboard/profile/change-username"
          className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse"
        >
          <div className="flex flex-col sm:flex-row items-center">
            <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
              Username
            </span>
            <h5 className="font-bold text-lg sm:text-xl text-gray-100 w-full sm:w-3/4 text-center sm:text-left">
              <div className="h-2 rounded bg-gray-500" />
            </h5>
          </div>
        </Link>
        {/* Small Screen Layout */}
        <Link
          href="/dashboard/profile/change-username"
          className="sm:hidden flex flex-row justify-between items-center bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse"
        >
          <div className="flex flex-col">
            <span className="text-gray-400 text-sm uppercase">Username</span>
            <h5 className="font-bold text-gray-100">
              <div className="h-2 rounded bg-gray-500" />
            </h5>
          </div>
        </Link>

        {/* Email */}
        <Link
          href="/dashboard/profile/change-email"
          className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse"
        >
          <div className="flex flex-col sm:flex-row items-center">
            <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
              Email
            </span>
            <div className="w-full sm:w-3/4 text-center sm:text-left">
              <div className="h-2 rounded bg-gray-500" />
            </div>
          </div>
        </Link>
        {/* Small Screen Layout */}
        <Link
          href="/dashboard/profile/change-email"
          className="sm:hidden flex flex-row bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse"
        >
          <div className="flex flex-col w-full">
            <span className="text-gray-400 text-sm uppercase">Email</span>
            <div className="h-2 rounded bg-gray-500" />
          </div>
        </Link>

        {/* Password */}
        <Link
          href="/dashboard/profile/change-password"
          className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse"
        >
          <div className="flex flex-col sm:flex-row items-center">
            <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
              Password
            </span>
            <h5 className="font-bold text-lg sm:text-xl text-gray-100 w-full sm:w-3/4 text-center sm:text-left">
              <div className="h-2 rounded bg-gray-500" />
            </h5>
          </div>
        </Link>
        {/* Small Screen Layout */}
        <Link
          href="/dashboard/profile/change-password"
          className="sm:hidden flex flex-row justify-between items-center bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse"
        >
          <div className="flex flex-col w-3/4">
            <span className="text-gray-400 text-sm uppercase">Password</span>
            <h5 className="font-bold text-gray-100">
              <div className="h-2 rounded bg-gray-500" />
            </h5>
          </div>
        </Link>

        {/* Token */}
        <div className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse">
          <div className="flex flex-col sm:flex-row items-center">
            <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
              Token
            </span>
            <div className="w-full sm:w-3/4 flex justify-between items-center">
              <div className="h-2 rounded bg-gray-500 w-full" />
            </div>
          </div>
        </div>

        {/* Small Screen Layout */}
        <div className="sm:hidden flex flex-col bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition animate-pulse">
          <div className="flex justify-between items-center">
            <span className="text-gray-400 text-sm uppercase">Token</span>
            <div className="h-2 rounded bg-gray-200 w-1/3" />
          </div>
          <h5 className="font-bold text-gray-100 mt-1">
            <div className="h-2 rounded bg-gray-500" />
          </h5>
        </div>
      </div>
    </div>
  );
}
