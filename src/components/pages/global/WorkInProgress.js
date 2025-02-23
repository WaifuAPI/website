import Link from "next/link";
import { FaRegClock } from "react-icons/fa"; // Adding a cute clock icon

export default function WorkInProgress() {
  return (
    <div className="flex flex-col items-center justify-center text-gray-100 text-center mt-20">
      <div className="flex items-center mb-4">
        <FaRegClock className="text-yellow-400 text-6xl mr-3" />{" "}
        {/* Clock Icon */}
        <h1 className="text-6xl font-bold text-sky-400 mb-2">WIP!</h1>{" "}
        {/* WIP Heading */}
      </div>
      <p className="text-2xl font-semibold mb-2 text-sky-300">
        Whoops! This page is still under construction... (´•̥﹏•̥`)
      </p>
      <p className="text-lg mb-6 text-gray-300">
        Please wait while we get this ready for you senpai! 🌸
      </p>

      <Link
        href="/"
        className="px-6 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-full text-lg font-semibold shadow-lg transition duration-300"
      >
        Take me home! 🏠
      </Link>

      <p className="mt-6 text-sm text-gray-400">
        Maybe it&apos;s just a little shy, please check back soon nya~ (´｡• ω
        •｡`)
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
