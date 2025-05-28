import Link from "next/link";
import { FaLock } from "react-icons/fa"; // Lock icon for restricted access

export default function Restricted({ message }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-center">
      {/* Large Screen Version */}
      <div className="hidden sm:flex items-center mb-4">
        <FaLock className="text-red-600 text-5xl mr-3" />
        <h1 className="text-5xl font-bold text-red-500">Access Denied</h1>
      </div>

      {/* Small Screen Version */}
      <div className="flex sm:hidden items-center mb-4">
        <FaLock className="text-red-600 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      </div>

      <p className="text-xl sm:text-2xl font-semibold text-red-400 mb-2">
        🚨 STOP! You do not have permission to access this area. 🚨
      </p>

      <p className="text-base sm:text-lg mb-6 text-gray-300">{message}</p>
      <p className="text-sm sm:text-base text-gray-400 mb-6">
        If you think this is a mistake, please contact support. 🚧
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
      >
        Return to Safety 🏠
      </Link>

      <p className="mt-6 text-xs sm:text-sm text-gray-500">
        You shall not pass... unless you have the right key! 🔑 (¬‿¬)
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
