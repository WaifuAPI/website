import React, { useState, useEffect, useRef } from "react";
import { useTypewriter } from "./components/hooks/useTypewriter.js";
import Head from "next/head";
import Link from "next/link";
import {
  FaCrown,
  FaChevronDown,
  FaChevronUp,
  FaCheck,
  FaTimes,
  FaExclamationCircle,
  FaInfoCircle,
  FaBolt,
  FaRocket,
  FaStar,
  FaShieldAlt,
  FaGem,
  FaFire,
  FaTrophy,
} from "react-icons/fa";
import { Transition } from "@headlessui/react";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const Premium = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnnual, setIsAnnual] = useState(false);
  const toggleNavbar = () => setIsOpen(!isOpen);
  const menuRef = useRef(null);
  const menuButtonRef = useRef(null);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch("/api/membership?q=plans"); // Adjust this URL as needed
        const data = await response.json();
        if (response.status === 500) {
          setPlans(null);
        } else {
          setPlans(data.membership.plans);
        }
      } catch (error) {
        console.error("Failed to fetch plans:", error);
      }
    };
    fetchPlans();
  }, []);

  const handleTogglePlan = (value) => {
    NProgress.start(); // Start progress bar when button is clicked

    setTimeout(() => {
      setIsAnnual(value);
      NProgress.done(); // Stop progress bar after a short delay
    }, 500);
  };

  const handleClickOutside = (event) => {
    if (
      menuRef.current &&
      !menuRef.current.contains(event.target) &&
      event.target !== menuButtonRef.current
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const featureIcons = [
    FaRocket,
    FaStar,
    FaShieldAlt,
    FaGem,
    FaBolt,
    FaFire,
    FaTrophy,
  ];

  const premiumFeatures = [
    "Higher Quota Limits",
    "Faster Response Times",
    "Access to All API Endpoints",
    "Early Access to Upcoming Features",
    "Priority Support",
    "API Integration Support",
    "Exclusive Discord Channel",
    "Bonus Quota",
  ];

  const premiumText = useTypewriter("Premium!", 150, 75, 1000); // Typing, erasing & delay

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

  const [premiumButtonText, setPremiumButtonText] = useState("");
  // Select a random button text on each render
  useEffect(() => {
    setPremiumButtonText(
      premiumButtonTexts[Math.floor(Math.random() * premiumButtonTexts.length)]
    );
  }, []);

  return (
    <>
      <Head>
        <title>Waifu.it - Premium</title>
        <meta
          name="description"
          content="Upgrade to Waifu.it Premium for exclusive features and benefits."
        />
      </Head>
      <div className="flex flex-col min-h-screen bg-gray-900 text-white">
        {/* Navbar */}
        <nav className="bg-gray-900 relative">
          <div className="container mx-auto px-10 lg:px-12 py-6 lg:py-8 flex items-center justify-between">
            <Link href="/" className="text-white text-lg font-semibold">
              Waifu.it
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
                {/* <span className="text-lg">💎 Unlock Premium!</span> */}
                <span className="text-lg">{premiumButtonText}</span>
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
        {/* Hero Section */}
        <header className="text-center py-20">
          <h1 className="text-4xl font-bold mb-4">
            Upgrade to <span className="text-blue-400">{premiumText}</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Get exclusive access to premium features and enhance your experience
            with Waifu.it!
          </p>
          <Link
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Prevent default anchor behavior
              const target = document.getElementById("billing-options");
              if (target) {
                window.scrollTo({
                  top: target.offsetTop - 80, // Adjusts for fixed headers (if needed)
                  behavior: "smooth",
                });
              }
            }}
            className="inline-block mt-6 px-8 py-3 text-lg font-semibold bg-blue-500 hover:bg-blue-600 text-white-900 rounded-lg transition"
          >
            Get Premium
          </Link>
        </header>
        {/* Features Section */}
        <section className="container mx-auto px-6 py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-white">
            Why Go Premium? <span className="text-yellow-400">✨</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {premiumFeatures.map((feature, index) => {
              const Icon = featureIcons[index % featureIcons.length]; // Cycle through unique icons
              return (
                <div
                  key={index}
                  className="bg-gray-900 p-6 rounded-xl text-center shadow-lg border border-gray-800 hover:border-sky-400 transition-all duration-300 focus:outline-none"
                >
                  <Icon className="text-sky-400 text-3xl mb-3 mx-auto" />
                  <p className="text-lg font-medium text-gray-200">{feature}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Plans Section */}
        <div className="container mx-auto px-4 py-4 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-8">
            Choose Your Plan
          </h2>
          <div id="billing-options" className="flex justify-center mb-8">
            <div className="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-l-lg focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  !isAnnual
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => handleTogglePlan(false)}
              >
                Monthly
              </button>
              <button
                type="button"
                className={`px-4 py-2 text-sm font-medium rounded-r-lg focus:z-10 focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                  isAnnual
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-900 hover:bg-gray-100"
                }`}
                onClick={() => handleTogglePlan(true)}
              >
                Annual
              </button>
            </div>
          </div>
          {!plans || plans.length === 0 ? (
            <div className="text-center text-red-500 text-lg font-semibold">
              🚨 No plans available. Please try again later.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className="bg-gray-800 rounded-lg shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 border border-gray-700"
                >
                  <div className="px-6 py-8 flex flex-col min-h-full">
                    <h3 className="text-2xl font-semibold text-center mb-4">
                      {plan.name}
                    </h3>

                    <div className="text-center mb-6">
                      <span className="text-4xl font-bold">
                        ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                      </span>
                      <span className="text-gray-500">
                        /{isAnnual ? "year" : "month"}
                      </span>
                    </div>

                    <ul className="space-y-3 mb-6">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center">
                          {feature.status === "available" ? (
                            <FaCheck className="text-green-500 mr-2" />
                          ) : feature.status === "limited" ? (
                            <FaExclamationCircle className="text-yellow-500 mr-2" />
                          ) : (
                            <FaTimes className="text-red-500 mr-2" />
                          )}
                          <span>{feature.text}</span>
                        </li>
                      ))}
                    </ul>

                    {plan.current ? (
                      <button
                        className="mt-auto w-full bg-gray-700 text-gray-400 rounded-md py-2 font-semibold cursor-not-allowed opacity-50"
                        disabled
                        aria-label="Current Plan"
                      >
                        ✅ Current Plan
                      </button>
                    ) : plan.available ? (
                      <button
                        className="mt-auto w-full bg-blue-600 text-white rounded-md py-2 font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        aria-label={`Choose ${plan.name} plan`}
                        href="https://discord.gg/yyW389c"
                      >
                        Choose Plan
                      </button>
                    ) : (
                      <button
                        className="mt-auto w-full bg-gray-700 text-gray-400 rounded-md py-2 font-semibold cursor-not-allowed opacity-50"
                        disabled
                        aria-label="Plan not available"
                      >
                        🚫 Not Available
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="mt-8 text-center text-gray-600">
            {" "}
            <p className="flex items-center justify-center">
              {" "}
              <FaInfoCircle className="mr-2" /> Prices are in USD. VAT may
              apply.{" "}
            </p>{" "}
          </div>
          {/* Footer */}
          <footer className="bg-gray-900 py-4 px-12 lg:px-18 mt-auto">
            <div className="container mx-auto px-5 text-center lg:text-left -translate-y-2">
              <div className="flex flex-col space-y-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="text-white">&copy; Waifu.it 2025</div>
                <div className="flex justify-center lg:justify-start space-x-4">
                  <Link
                    target="_blank"
                    href="https://raw.githubusercontent.com/WaifuAPI/Waifu.it/production/PRIVACY_POLICY.md"
                    className="text-gray-400 hover:text-white"
                  >
                    Privacy
                  </Link>
                  <Link
                    target="_blank"
                    href="https://docs.waifu.it/tos"
                    className="text-gray-400 hover:text-white"
                  >
                    Terms of Service
                  </Link>
                  <Link
                    target="_blank"
                    href="https://ko-fi.com/Aeryk"
                    className="text-gray-400 hover:text-white"
                  >
                    Get me a Coffee!
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
};

export default Premium;
