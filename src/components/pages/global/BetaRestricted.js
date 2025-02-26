import Link from "next/link";
import { FaFlask } from "react-icons/fa"; // Flask icon for beta testing theme

export default function BetaRestricted() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-center p-4">
      {/* Large Screen Version */}
      <div className="hidden sm:flex items-center mb-4">
        <FaFlask className="text-green-400 text-5xl mr-3" />
        <h1 className="text-5xl font-bold text-green-300">Limited Access</h1>
      </div>

      {/* Small Screen Version */}
      <div className="flex sm:hidden items-center mb-4">
        <FaFlask className="text-green-400 text-3xl mr-3" />
        <h1 className="text-3xl font-bold text-green-300">Limited Access</h1>
      </div>

      <p className=" text-2xl font-semibold text-green-200 mb-2">
        🧪 Experimental Area – Beta Testers Only!
      </p>
      <p className="text-lg mb-6 text-gray-300 mt-1">
        You need the
        <span className="inline-block ml-1 px-2 py-1 rounded-lg text-[#00F455] bg-green-800 bg-opacity-25">
          @🧪 Beta Tester
        </span>{" "}
        role to proceed.
      </p>
      <p className="italic text-gray-400 mb-6">
        Unlock Beta Features – Join the Testers or Check Back Later. 🚀
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
      >
        Go Home 🏠
      </Link>

      <p className="mt-6 text-sm text-gray-500">
        Experimental features ahead... tread carefully! 🛠️
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
