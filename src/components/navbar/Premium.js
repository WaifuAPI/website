import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { Transition } from "@headlessui/react";

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
  "🎯 Get Best Experience!",
];

export default function PremiumNavbar() {
  const [premiumButtonText, setPremiumButtonText] = useState("");
  const [type, setType] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);

  // Toggle Navbar state
  const toggleNavbar = () => setIsOpen((prev) => !prev);

  // Handle clicks outside the dropdown
  const handleClickOutside = useCallback((event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      menuButtonRef.current !== event.target
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (premiumButtonTexts.length > 0) {
      setPremiumButtonText(
        premiumButtonTexts[
          Math.floor(Math.random() * premiumButtonTexts.length)
        ]
      );
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]); // Dependency array ensures proper cleanup

  useEffect(() => {
    const fetchValidation = async () => {
      try {
        const res = await fetch("/api/validate?page=premium");
        const data = await res.json();

        if (data?.page?.maintenance?.status) {
          setType("maintenance");
        } else {
          setType(data?.page?.type);
        }
      } catch (error) {
        setType("production");
        console.log("Error checking page availability.");
      }
    };

    fetchValidation();
  }, []);

  // Determine the label based on the type
  const getLabel = () => {
    switch (type) {
      case "alpha":
        return {
          text: "ALPHA",
          color:
            "border-yellow-500 hover:shadow-[0_0_12px_4px_rgba(234,179,8,0.5)] transition-shadow duration-500 ease-in-out max-[1219px]:hidden",
        };
      case "beta":
        return {
          text: "BETA",
          color:
            "border-sky-700 hover:shadow-[0_0_12px_4px_rgba(56,189,248,0.5)] transition-shadow duration-500 ease-in-out max-[1219px]:hidden",
        };
      case "production":
        return null;
      case "maintenance":
        return {
          text: "MAINTENANCE",
          color:
            "border-red-500 hover:shadow-[0_0_12px_4px_rgba(239,68,68,0.5)] transition-shadow duration-500 ease-in-out max-[1219px]:hidden",
        };
    }
  };

  const label = getLabel();

  return (
    <nav className="bg-gray-900 relative">
      <div className="container mx-auto px-10 lg:px-12 py-6 lg:py-8 flex items-center justify-between">
        <Link href="/" className="text-white text-lg font-semibold">
          Waifu.it
          {label && (
            <span
              className={`select-none absolute text-white text-xs font-bold ml-1 px-2 py-0.5 rounded-md border ${label.color}`}
            >
              {label.text}
            </span>
          )}
        </Link>
        <button
          ref={menuButtonRef}
          onClick={toggleNavbar}
          className="text-white block lg:hidden"
        >
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
            className="text-gray-900 font-medium px-4 py-2 rounded-md bg-white border border-gray-600 transition duration-300 hover:bg-gray-800 hover:text-white"
          >
            <span className="text-lg">💎 Unlock Premium!</span>
            {/* <span className="text-lg">{premiumButtonText}</span> */}
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
                {/* <span className="text-lg">💎 Unlock Premium!</span> */}
                <span className="text-lg">{premiumButtonText}</span>
              </Link>
            </div>
          </div>
        )}
      </Transition>
    </nav>
  );
}
