import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  FaQuoteLeft,
  FaImage,
  FaLink,
  FaTools,
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaCrown,
} from "react-icons/fa";
import { CiLocationArrow1 } from "react-icons/ci";
import { Transition } from "@headlessui/react";

// Function to retrieve a cookie's value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Handling login button click
const handleLogin = () => {
  const accessToken = getCookie("access_token");
  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds.members.read%20guilds.join%20guilds`;

  if (!accessToken) {
    window.location.href = oauthUrl;
  } else {
    window.location.href = "/dashboard";
  }
};

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredButton, setHoveredButton] = useState(null);
  const menuRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
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
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="author" content="Aeryk" />
        <title>Waifu.it - Home</title>
        <meta
          name="description"
          content="Discover a user-friendly open-source API designed to access a vast collection of 80,000+ anime waifu data and images, alongside a wide range of quotes, facts, and additional endpoints."
        />
        <meta
          name="keywords"
          content="anime, waifu, anime facts, anime quotes, waifu api, waifu pictures, anime api, open source api"
        />
        <meta property="og:title" content="Waifu.it" />
        <meta property="og:url" content="https://waifu.it" />
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/79479798?s=200&v=4"
        />
        <meta
          property="og:description"
          content="Discover a user-friendly open-source API designed to access a vast collection of 80,000+ anime waifu data and images, alongside a wide range of quotes, facts, and additional endpoints."
        />
        <meta name="theme-color" content="#1DA1F2" />
        <meta
          name="google-adsense-account"
          content="ca-pub-1733730047414795"
        ></meta>
      </Head>
      <div className="flex flex-col min-h-screen ">
        <main className="flex-shrink-0">
          {/* Navigation */}
          <nav className="bg-gray-900 relative">
            <div className="container mx-auto px-10 lg:px-12 py-6 lg:py-8 flex items-center justify-between">
              <Link href="/" className="text-white text-lg font-semibold">
                Waifu.it
              </Link>
              <button
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
                  className="text-white font-medium px-4 py-2 rounded-md bg-gray-800 hover:bg-white hover:text-gray-900 transition duration-300 border border-gray-600"
                >
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

          {/* Header */}
          <header className="bg-gray-900 py-16">
            <div className="container mx-auto px-5 lg:px-12 text-center lg:text-left">
              <div className="lg:flex lg:items-center lg:justify-between lg:pt-8">
                <div className="mb-10 lg:mb-0 lg:max-w-xl lg:text-left text-white">
                  <h1 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                    🌟 Unleash Anime Magic with Waifu.it!
                  </h1>
                  <p className="text-lg text-gray-300 mb-6">
                    🚀 Your ultimate source for anime data and insights.
                    Empowering developers and anime enthusiasts to create
                    exceptional experiences
                  </p>
                  <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <button
                      onClick={() =>
                        (window.location.href =
                          "https://docs.waifu.it/rest-api/start")
                      }
                      onMouseEnter={() => handleMouseEnter("getStarted")}
                      onMouseLeave={handleMouseLeave}
                      className="relative overflow-hidden btn-primary bg-blue-500 hover:bg-blue-600 text-white py-2 px-8 rounded-lg transition duration-300 ease-in-out"
                    >
                      <span
                        className={`inline-block transition-transform duration-300 ${
                          hoveredButton === "getStarted"
                            ? "-translate-x-2"
                            : "translate-x-0"
                        }`}
                      >
                        Get Started
                      </span>
                      <span
                        className={`absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 bg-transparent transform transition-transform duration-300 ${
                          hoveredButton === "getStarted"
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0"
                        }`}
                      >
                        {hoveredButton === "getStarted" && (
                          <CiLocationArrow1 className="h-4 w-4 text-white" />
                        )}
                      </span>
                    </button>
                    <button
                      onClick={handleLogin}
                      onMouseEnter={() => handleMouseEnter("dashboard")}
                      onMouseLeave={handleMouseLeave}
                      className="relative overflow-hidden btn-outline bg-transparent border border-gray-300 text-gray-300 py-2 px-8 rounded-lg hover:bg-gray-300 hover:text-gray-900 transition duration-300 ease-in-out"
                    >
                      <span
                        className={`inline-block transition-transform duration-300 ${
                          hoveredButton === "dashboard"
                            ? "-translate-x-2"
                            : "translate-x-0"
                        }`}
                      >
                        Dashboard
                      </span>
                      <span
                        className={`absolute right-0 top-0 bottom-0 flex items-center justify-center px-3 bg-transparent text-gray-300 transform transition-transform duration-300 ${
                          hoveredButton === "dashboard"
                            ? "translate-x-0 opacity-100"
                            : "translate-x-full opacity-0"
                        }`}
                      >
                        <CiLocationArrow1
                          className={`h-4 w-4 ${
                            hoveredButton === "dashboard"
                              ? "text-gray-900"
                              : "text-gray-300"
                          }`}
                        />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="lg:w-1/2 lg:text-center lg:pl-10 lg:pt-6 flex justify-center">
                  {/* Add image in right */}
                </div>
              </div>
            </div>
          </header>

          {/* Enhanced Features Section */}
          <section className="py-16" id="features">
            <div className="container mx-auto px-5">
              <div className="grid lg:grid-cols-2 gap-16">
                <div>
                  <h2 className="text-3xl font-bold mb-6">
                    Unlock the world of anime with our comprehensive API.
                  </h2>
                  <p className="text-lg mb-8">
                    Discover a treasure trove of anime content and enrich your
                    projects with ease using our powerful API.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                  <div className="flex flex-col items-start">
                    <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                      <FaQuoteLeft className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Anime Quotes & Facts
                    </h3>
                    <p>
                      Explore a vast collection of anime quotes, trivia, and
                      facts to captivate your audience and add depth to your
                      applications.
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                      <FaImage className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Anime GIFs & Images
                    </h3>
                    <p>
                      Access a library of animated GIFs and high-quality images
                      to visually enhance your anime-themed projects and
                      applications.
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                      <FaLink className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Comprehensive Anime Data
                    </h3>
                    <p>
                      Utilize a rich dataset covering characters, episodes,
                      series details, and more, empowering your applications
                      with in-depth anime information.
                    </p>
                  </div>
                  <div className="flex flex-col items-start">
                    <div className="bg-blue-600 p-4 rounded-full text-white mb-4">
                      <FaTools className="text-2xl" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      Developer-Friendly API
                    </h3>
                    <p>
                      Designed with simplicity in mind, our API offers intuitive
                      endpoints and comprehensive documentation, making
                      integration seamless for developers.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>

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
    </>
  );
};

export default Home;
