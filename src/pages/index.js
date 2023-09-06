import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import LoadingSpinner from "./components/LoadingSpinner";
import { FaUnderline } from "react-icons/fa";

// Component for the Dashboard button
const DashboardButton = ({ isSmallScreen }) => {
  // Function to retrieve a cookie's value
  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
  };

  // State for button hover effect
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <button
      onClick={handleLogin}
      className={`fixed z-10 bg-blue-500 text-white font-indie-flower px-4 py-2 rounded-lg ${
        isHovered ? "bg-blue-600" : ""
      } transition-all duration-300 ${
        isSmallScreen ? "bottom-12 right-10" : "top-8 right-20"
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Dashboard
    </button>
  );
};

// Main Home component
const Home = () => {
  // State for loading state
  const [loading, setLoading] = useState(true);

  // State for tracking screen size
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Simulating data fetching delay
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  // Handling window resize to determine screen size
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    // Initial call and event listener setup
    handleResize();
    window.addEventListener("resize", handleResize);

    // Cleanup for event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Triggering animation after the loader completes
  useEffect(() => {
    if (!loading) {
      const animateGridItems = () => {
        const gridItems = document.querySelectorAll(".grid-item");
        gridItems.forEach((item, index) => {
          item.style.animationDelay = `${index * 220}ms`;
          item.classList.add("animate-fadeInUp");
        });
      };

      animateGridItems();
    }
  }, [loading]);

  return (
    <div className="flex fnowrap flex-col items-center justify-center bg-gray-100 min-h-screen text-black">
      <Head>
        <title>Waifu.it</title>
        <meta
          name="description"
          content="Discover a user-friendly open-source API designed to access a vast collection of 80,000+ anime waifu data and images, alongside a wide range of quote, fact, and additional endpoint options!"
        />
        <meta charSet="utf-8" />
        <link rel="icon" href="../../public/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="anime, waifu, anime facts, anime quotes, waifu api, waifu pictures, anime api, opensource api"
        />
        <meta property="og:title" content="Waifu.it" />
        <meta property="og:url" content="https://waifu.it" />
        <meta
          property="og:image"
          content="https://avatars.githubusercontent.com/u/79479798?s=200&v=4"
        />
        <meta
          property="og:description"
          content="Discover a user-friendly open-source API designed to access a vast collection of 80,000+ anime waifu data and images, alongside a wide range of quote, fact, and additional endpoint options!"
        />
        <meta name="theme-color" content="#1DA1F2" />
        <link rel="apple-touch-icon" href="../../public/logo192.png" />
        {/* Add other meta tags as needed */}
      </Head>

      {loading ? (
        <div className="min-h-screen flex flex-grow items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <div style={{minWidth:'320px'}} className="flex flex-grow min-h-screen90  items-center justify-between flex-col">
          <DashboardButton isSmallScreen={isSmallScreen} />
          <main className="max-w-screen-lg py-20 px-4  flex flex-col nowrap items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 text-center">
              <Link
                className="text-blue-500 hover:underline focus:underline active:underline"
                href="/"
              >
                Waifu.it
              </Link>
            </h1>

            <p className="text-xl text-center mb-12 ">
              An Open-source API Serving Bunch of Anime stuff
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                target="_blank"
                href="https://docs.waifu.it"
                className="border border-gray-300 rounded-lg p-6 flex flex-col justify-between hover:bg-blue-100 grid-item animate-fadeInUp"
              >
                <h3 className="text-xl font-bold mb-4">Documentation &rarr;</h3>
                <p className="text-lg">
                  Find in-depth information about Waifu.it features and
                  endpoints.
                </p>
              </Link>

              <Link
                target="_blank"
                href="https://github.com/WaifuAPI"
                className="border border-gray-300 rounded-lg p-6 flex flex-col justify-between hover:bg-blue-100 grid-item animate-fadeInUp"
              >
                <h3 className="text-xl font-bold mb-4">GitHub &rarr;</h3>
                <p className="text-lg">
                  Learn about Waifu.it codes or perhaps just contribute?
                </p>
              </Link>

              <Link
                target="_blank"
                href="https://discord.gg/yyW389c"
                className="border border-gray-300 rounded-lg p-6 flex flex-col justify-between hover:bg-blue-100 grid-item animate-fadeInUp"
              >
                <h3 className="text-xl font-bold mb-4">Support &rarr;</h3>
                <p className="text-lg">
                  Have issues and couldn&apos;t find in documentation? Then join
                  this discord server.
                </p>
              </Link>

              <Link
                target="_blank"
                href="https://ko-fi.com/Aeryk"
                className="border border-gray-300 rounded-lg p-6 flex flex-col justify-between hover:bg-blue-100 grid-item animate-fadeInUp"
              >
                <h3 className="text-xl font-bold mb-4">Donate &rarr;</h3>
                <p className="text-lg">
                  Glad with the service and want to keep the project alive?
                </p>
              </Link>
            </div>
          </main>
          <footer className="w-full h-12 border-t border-gray-300 flex justify-center items-center mb-6 md:mt-10 lg:mt-20 text-black">
            Made with ❤️ by <a className="underline" href="https://github.com/WaifuAPI/website/commits?author=kyrea"> Aeryk</a> 
          </footer>
        </div>
      )}
    </div>
  );
};

export default Home;
