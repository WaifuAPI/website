import { useState } from "react";
import { CiLocationArrow1 } from "react-icons/ci";
import useTypewriter from "@/components/hooks/useTypewriter";

// Function to retrieve a cookie's value
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
};

// Handling login button click
const handleLogin = () => {
  const accessToken = getCookie("access_token");
  const oauthUrl = `https://discord.com/api/oauth2/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URL}&response_type=code&scope=identify%20email%20guilds.join%20guilds`;

  if (!accessToken) {
    window.location.href = oauthUrl;
  } else {
    window.location.href = "/dashboard";
  }
};

export default function Header() {
  const [hoveredButton, setHoveredButton] = useState(null);

  const handleMouseEnter = (button) => {
    setHoveredButton(button);
  };

  const handleMouseLeave = () => {
    setHoveredButton(null);
  };

  const introText = useTypewriter("Anime Magic with Waifu.it!", 150, 75, 1000); // Typing, erasing & delay

  return (
    <header className="bg-gray-900 py-16">
      <div className="container mx-auto px-5 lg:px-12 text-center lg:text-left">
        <div className="lg:flex lg:items-center lg:justify-between lg:pt-8">
          <div className="mb-10 lg:mb-0 lg:max-w-xl lg:text-left text-white">
            {/* Visible on small screens (sm and below), hidden on larger screens */}
            <h1 className="block sm:hidden text-3xl font-bold mb-4 leading-tight">
              🌟 Unleash{" "}
              <span className="text-blue-300">Anime Magic with Waifu.it!</span>
            </h1>

            {/* Hidden on small screens, visible on larger screens (sm and above) */}
            <h1 className="hidden sm:block text-4xl lg:text-5xl font-bold mb-4 leading-tight">
              🌟 Unleash <span className="text-blue-300">{introText}</span>
            </h1>
            <p className="text-lg text-gray-300 mb-6">
              🚀 Your ultimate source for anime data and insights. Empowering
              developers and anime enthusiasts to create exceptional experiences
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
  );
}
