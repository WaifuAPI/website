import Link from "next/link";
import { FaExclamationTriangle } from "react-icons/fa"; // Adding an error icon for authentication failure

export default function AuthFailure() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-100 text-center mt-20">
      <div className="flex items-center mb-4">
        <FaExclamationTriangle className="text-red-600 text-5xl mr-3" />
        <h1 className="text-5xl font-bold text-red-500 mb-2">
          Authentication Failed!
        </h1>
      </div>
      <p className="text-2xl font-semibold mb-2 text-yellow-300">
        Uh-oh! We couldn't verify your identity. 🚨
      </p>
      <p className="text-lg mb-6 text-gray-300">
        Something went wrong, but we're not sure what. 🤔 Try again or contact
        support if the issue persists.
      </p>

      <div className="flex space-x-4">
        <Link
          href="/dashboard"
          className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
        >
          Re-authenticate 🔄
        </Link>
        <Link
          href="/"
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
        >
          Home 🏠
        </Link>
      </div>

      <p className="mt-6 text-sm text-gray-400">
        Need help?{" "}
        <Link
          href="https://discord.gg/yyW389c"
          className="text-blue-400 hover:underline"
        >
          Contact support
        </Link>{" "}
        via Discord before the system locks you out! ⏳
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
