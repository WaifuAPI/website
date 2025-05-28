import Link from "next/link";
import { FaLock } from "react-icons/fa"; // Adding a lock icon for restricted access

export default function StaffRestricted() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-100 text-center mt-28">
      <div className="flex items-center mb-4">
        <FaLock className="text-red-500 text-6xl mr-3" />
        <h1 className="text-5xl font-bold text-yellow-400">Staff Only</h1>
      </div>
      <p className="text-2xl font-semibold text-yellow-300 mb-2">
        Whoops! This area is off-limits. 🚧
      </p>
      <p className="text-lg mb-6 text-gray-300">
        This page is restricted to staff members only.
      </p>
      <p className="text-gray-400 mb-6">
        If you believe this is a mistake, please contact your senpai {">.<"}
      </p>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
      >
        Go Back 🔙
      </Link>

      <p className="mt-6 text-sm text-gray-500">
        Access denied... but don&apos;t worry, you&apos;re still awesome! (✿◕‿◕)
      </p>

      {/* Custom cursor */}
      <style jsx global>{`
        body {
          cursor: url("/cursors/foo603.cur"), auto;
        }
      `}</style>
    </div>
  );
}
