import { FaSpinner } from "react-icons/fa"; // Cute spinning icon

export default function Loader() {
  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-gray-100 text-center animate-fadeIn">
      <div className="flex items-center mb-4">
        <FaSpinner className="text-sky-400 text-6xl animate-spin mr-3" />{" "}
        {/* Spinning loader */}
        <h1 className="text-5xl font-bold text-sky-400">Loading...</h1>
      </div>
      <p className="text-xl font-semibold mb-2 text-sky-300">
        Hold tight, we&apos;re getting things ready for you! (◕‿◕✿)
      </p>
      <p className="text-lg text-gray-300">
        This won&apos;t take long, promise! 🚀
      </p>

      {/* Fade-in animation */}
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}
