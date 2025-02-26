import Link from "next/link";
import { FaTools } from "react-icons/fa"; // Adding a lock icon for restricted access

export default function Maintenance() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-100 text-center mt-20">
      {/* Large Screen Version */}
      <div className="hidden sm:flex items-center mb-4">
        <FaTools className="text-orange-500 text-5xl mr-3" />
        <h1 className="text-5xl font-bold text-orange-400">
          Under Maintenance
        </h1>
      </div>

      {/* Small Screen Version */}
      <div className="flex sm:hidden items-center mb-4">
        <FaTools className="text-orange-500 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-orange-400">
          Under Maintenance
        </h1>
      </div>

      <p className="text-2xl font-semibold text-orange-300 mb-2">
        Hold tight! We’re working on improvements. 🚧
      </p>
      <p className="text-lg mb-6 text-gray-300">
        Page is under maintenance. Please try again later.
      </p>
      <p className="text-gray-400 mb-6">
        We&apos;ll be back soon! Thanks for your patience. 🔧
      </p>

      <Link
        href="/dashboard"
        className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
      >
        Go Home 🏠
      </Link>

      <p className="mt-6 text-sm text-gray-500">
        Systems under repair… please check back later! (╯°□°）╯︵ ┻━┻
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
