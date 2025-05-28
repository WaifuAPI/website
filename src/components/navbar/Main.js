import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import { Transition } from "@headlessui/react";

export default function Navbar() {
  const [premiumButtonText, setPremiumButtonText] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const premiumButtonTexts = [
    "🌟 Upgrade to Premium!",
    "🚀 Go Premium Now!",
    "💎 Unlock Premium!",
    "🔥 Get Premium Access!",
    "🎉 Join Premium Today!",
    "🌟 Level Up with Premium!",
    "💖 Treat Yourself to Premium!",
    "🚀 Blast Off with Premium!",
    "🎁 Exclusive Perks Await!",
    "⭐ Access Premium Features",
    "💼 Upgrade More Benefits",
    "🔓 Unlock Exclusive Features",
    "🎯 Get Best Experience",
  ];

  //
  // useEffect(() => {
  //   setPremiumButtonText(
  //     premiumButtonTexts[Math.floor(Math.random() * premiumButtonTexts.length)]
  //   );
  // }, []);

  return (
    <nav className="bg-gray-900 relative">
      <div className="container mx-auto px-10 lg:px-12 py-6 lg:py-8 flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-semibold">
          Waifu.it
        </Link>
        <button onClick={toggleNavbar} className="text-white block lg:hidden">
          {isOpen ? (
            <FaChevronUp className="h-6 w-6" />
          ) : (
            <FaChevronDown className="h-6 w-6" />
          )}
        </button>
        <div className="hidden lg:flex lg:items-center lg:space-x-6">
          <Link href="/" className="text-white hover:text-gray-300">
            Home
          </Link>
          <Link
            target="_blank"
            href="https://discord.gg/yyW389c"
            className="text-white hover:text-gray-300"
          >
            Support
          </Link>
          <Link
            target="_blank"
            href="https://ko-fi.com/Aeryk"
            className="text-white hover:text-gray-300"
          >
            Donate Us
          </Link>
          <Link
            target="_blank"
            href="https://github.com/WaifuAPI"
            className="text-white hover:text-gray-300"
          >
            GitHub
          </Link>
          <Link
            href="/premium"
            className="text-white font-medium px-4 py-2 rounded-md bg-gray-800 hover:bg-white hover:text-gray-900 transition duration-300 border border-gray-600"
          >
            <span className="text-lg">🎁 Upgrade to Premium!</span>
          </Link>
        </div>
      </div>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-300"
        enterFrom="opacity-0 -translate-y-2"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-200"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 -translate-y-2"
      >
        {(ref) => (
          <div
            ref={menuRef}
            className="absolute w-full top-full left-0 lg:hidden bg-gray-900 z-50"
          >
            <div className="px-7 pt-2 pb-3 space-y-1">
              <Link
                href="/"
                className="block text-white mt-1 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Home
              </Link>
              <Link
                href="https://discord.gg/yyW389c"
                className="block text-white mt-1 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Support
              </Link>
              <Link
                href="https://ko-fi.com/Aeryk"
                className="block text-white mt-1 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                Donate Us
              </Link>
              <Link
                href="https://github.com/WaifuAPI"
                className="block text-white mt-1 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-base font-medium"
              >
                GitHub
              </Link>
              <Link
                href="/premium"
                className="inline-flex items-center gap-2 text-white font-semibold px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-600 transition duration-300"
              >
                <span className="text-lg">💖 Treat Yourself to Premium!</span>
                {/* <span className="text-lg">{premiumButtonText}</span> */}
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}
