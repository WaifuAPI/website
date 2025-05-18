import { useRouter } from "next/router";
import { useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { FaSignOutAlt } from "react-icons/fa"; // Logout icon
import Link from "next/link";
import Image from "next/image";
import Cookies from "js-cookie";
import axios from "axios";
import NotificationsPopup from "./NotificationsPopup";
import HeaderAvatarLoading from "@/components/effects/HeaderAvatarLoading";

export default function Header({ toggleSidebar }) {
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const avatarRef = useRef(null);
  const [user, setUser] = useState(null);
  const [userFetched, setUserFetched] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");

    // Check if user data is cached
    const cachedUser = Cookies.get("user");
    if (cachedUser) {
      setUser(JSON.parse(cachedUser));
      setUserFetched(true);
      return;
    }

    // The user has a valid access token, fetch user details
    const fetchDiscordUserDetails = async () => {
      const access_token = Cookies.get("access_token");

      try {
        const response = await axios.get("/api/discord/users/@me", {
          headers: { Authorization: access_token },
        });

        //  console.log("Response from Header:", data); // ✅ Now works!

        await axios.post(
          "/api/auth/user", // Send the request to the server-side API route
          {
            id: response.data.id,
            email: response.data.email,
            access_token: access_token,
          }
        );

        const data = {
          id: response.data.id,
          username: response.data.username,
          avatar: response.data.avatar,
        };

        // Save user data in cache
        Cookies.set("user", JSON.stringify(data), {
          expires: 7,
          secure: false,
          sameSite: "Strict",
          path: "/",
        });

        setUser(data);
        setUserFetched(true);
      } catch (error) {
        console.error("Error fetching user details", error);
        // Handle error, like clearing invalid tokens from cookies and local storage
        // Cookies.remove("access_token");
      }
    };
    fetchDiscordUserDetails();
  }, []); // Empty dependency array to run only once on mount

  // Toggle dropdown menu visibility
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        !avatarRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    // Add event listener on mount
    document.addEventListener("mousedown", handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    Cookies.remove("access_token");
    Cookies.remove("user");
    sessionStorage.removeItem("toastShown");
    router.push("/");
  };

  return (
    <header className="relative bg-slate-800/90 text-white shadow-lg py-4 px-6 lg:px-8 flex justify-between items-center">
      {/* Menu button for smaller screens */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md bg-gray-700 hover:bg-gray-600 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
      >
        <FiMenu className="w-6 h-6" />
      </button>

      {/* Header Title with better font style */}
      <h2 className="select-none text-2xl font-semibold tracking-wide text-gray-100 ml-2">
        Dashboard
        <span className="select-none absolute text-white text-xs font-bold ml-1 px-2 py-0.5 rounded-md border border-sky-700 hover:shadow-[0_0_12px_4px_rgba(56,189,248,0.5)] transition-shadow duration-500 ease-in-out max-[1219px]:hidden">
          BETA
        </span>
      </h2>

      {/* Right side with avatar and logout button */}
      <div className="select-none flex items-center space-x-4 lg:mr-2 relative">
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
            target="_blank"
            href="/premium"
            className="text-white font-medium px-4 py-2 rounded-md bg-gray-800 hover:bg-white hover:text-gray-900 transition duration-300 border border-gray-600"
          >
            🌟 Upgrade to Premium!
          </Link>
        </div>

        {/* Notification icon button */}
        <NotificationsPopup />

        {/* Avatar */}
        {!userFetched ? (
          <HeaderAvatarLoading />
        ) : (
          <>
            <div
              ref={avatarRef}
              onClick={toggleDropdown}
              className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-600 cursor-pointer"
            >
              <Image
                src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                alt={user.username}
                width={100} // Specify width (adjust as needed)
                height={100} // Specify height (adjust as needed)
                className="w-full h-full object-cover"
              />
            </div>
          </>
        )}

        {/* Avatar dropdown menu for small screens */}
        {/* {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-12 right-0 bg-slate-700 text-white p-3 rounded-lg shadow-md w-40 lg:hidden transition-all duration-300 transform origin-top scale-95 hover:scale-100"
          >
            <Link
              href="/"
              className="block py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-500 transition-all duration-200"
            >
              Home
            </Link>
            <Link
              target="_blank"
              href="https://discord.gg/yyW389c"
              className="block py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-500 transition-all duration-200"
            >
              Support
            </Link>
            <Link
              target="_blank"
              href="https://ko-fi.com/Aeryk"
              className="block py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-500 transition-all duration-200"
            >
              Donate Us
            </Link>
            <Link
              target="_blank"
              href="https://github.com/WaifuAPI"
              className="block py-2 px-3 text-sm font-medium rounded-md hover:bg-gray-500 transition-all duration-200"
            >
              GitHub
            </Link>
            <Link
              href="/premium"
              className="block py-2 px-3 mt-2 rounded-md bg-blue-600 text-white font-medium text-sm hover:bg-blue-500 transition-all duration-200"
            >
              🌟 Get Premium!
            </Link>
          </div>
        )} */}

        {/* Logout button */}
        <button
          onClick={handleLogout}
          className=" hover:bg-red-700 text-white rounded-md p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-500"
        >
          <FaSignOutAlt className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
