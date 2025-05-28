import { FaSpinner } from "react-icons/fa"; // Cute spinning icon
import { useState, useEffect } from "react";

export default function AuthLoader() {
  const [dots, setDots] = useState("...");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prev) => (prev.length < 3 ? prev + "." : ""));
    }, 300);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center text-gray-100 text-center animate-fadeIn">
      <div className="flex items-center mb-4">
        <FaSpinner className="text-sky-400 text-5xl animate-spin mr-3" />
        {/* Spinning loader */}
        <h1 className="text-4xl font-bold text-sky-400 transition-opacity duration-500 ease-in-out">
          Authenticating<span className="animate-blink">{dots}</span>
        </h1>
      </div>
      <p className="text-xl font-semibold mb-2 text-sky-300">
        Hold tight, we&apos;re checking your credentials! (◕‿◕✿)
      </p>
      <p className="text-lg text-gray-300">
        This won&apos;t take long, promise! 🚀
      </p>

      {/* Animations */}
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
        @keyframes blink {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </div>
  );
}
