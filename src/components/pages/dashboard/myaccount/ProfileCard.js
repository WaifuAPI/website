import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";
import { FiEye, FiEyeOff, FiRefreshCw } from "react-icons/fi";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileCardLoading from "@/components/effects/ProfileCardLoading";

export default function ProfileCard() {
  const router = useRouter();
  const [showToken, setShowToken] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [user, setUser] = useState(null);
  const [discordUserFetched, setDiscordUserFetched] = useState(false);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    // The user has a valid access token, fetch user details
    // Check if user data is already cached
    // const cachedUser = Cookies.get("user");
    // if (cachedUser) {
    //   const parsedUser = JSON.parse(cachedUser);

    //   // Ensure both email and token exist in the user object
    //   if (parsedUser.email && parsedUser.token) {
    //     setUser(parsedUser);
    //     setDiscordUserFetched(true);
    //     return;
    //   }
    // }

    const fetchDiscordUserDetails = async () => {
      try {
        const response = await axios.get("https://discord.com/api/users/@me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        fetchUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details", error);
        // Handle error, like clearing invalid tokens from cookies and local storage
        // Cookies.remove("access_token");
      }
    };
    fetchDiscordUserDetails();

    // Fetch user details function
    const fetchUserDetails = async (userData) => {
      if (!userData) {
        return; // Exit early if userData is undefined
      }
      const response = await axios.post(
        "/api/auth/user", // Send the request to the server-side API route
        {
          id: userData.id,
          email: userData.email,
          access_token: accessToken,
        }
      );

      const userObject = {
        id: userData.id,
        username: userData.username,
        email: userData.email,
        token: response.data.token,
        avatar: userData.avatar,
      };

      // Store user data in Cookies (7-day expiration)
      // Cookies.set("user", JSON.stringify(userObject), {
      //   secure: true,
      //   sameSite: "Strict",
      // });

      setUser(userObject);
      setDiscordUserFetched(true);
    };
  }, []); // Empty dependency array to run only once on mount

  const RATE_LIMIT_DECAY_WINDOW = 30 * 24 * 60 * 60 * 1000; // 30 days

  const BASE_WINDOWS = [
    30 * 1000, // 30 sec
    60 * 1000, // 1 min
    5 * 60 * 1000, // 5 min
    30 * 60 * 1000, // 30 min
    60 * 60 * 1000, // 1 hr
    24 * 60 * 60 * 1000, // 1 day
    48 * 60 * 60 * 1000, // 2 days
    72 * 60 * 60 * 1000, // 3 days
    7 * 24 * 60 * 60 * 1000, // 7 days
  ];

  // Helpers
  const encode = (obj) => btoa(JSON.stringify(obj));
  const decode = (str) => {
    try {
      return JSON.parse(atob(str));
    } catch {
      return null;
    }
  };

  function getCooldownDuration(count) {
    const cooldownIndex = count - 3; // Cooldowns start from 3rd attempt
    if (cooldownIndex < 0) return 0; // No cooldown for 1st and 2nd

    const maxIndex = BASE_WINDOWS.length - 1;
    if (cooldownIndex <= maxIndex + 1) return BASE_WINDOWS[cooldownIndex];
    return BASE_WINDOWS[maxIndex] * Math.pow(2, count - maxIndex - 1); // exponential growth
  }

  function formatMs(ms) {
    const seconds = Math.ceil(ms / 1000);
    if (seconds < 60) return `${seconds} sec`;
    if (seconds < 3600) return `${Math.ceil(seconds / 60)} min`;
    if (seconds < 86400) return `${(seconds / 3600).toFixed(1)} hr`;
    return `${(seconds / 86400).toFixed(1)} day${
      seconds / 86400 >= 2 ? "s" : ""
    }`;
  }

  const handleRegenerateClick = async () => {
    setIsRegenerating(true);
    toast.dismiss();

    const now = Date.now();
    const stored = decode(localStorage.getItem("__rlid"));
    const count = stored ? stored.count : 0;
    const last = stored ? stored.timestamp : 0;
    const cooldown = getCooldownDuration(count);

    // Decay logic: reset count if no regeneration for 30 days
    const shouldDecay = stored && now - last > RATE_LIMIT_DECAY_WINDOW;
    const effectiveCount = shouldDecay ? 0 : count;

    const effectiveCooldown = getCooldownDuration(effectiveCount);
    const remaining = effectiveCooldown - (now - last);

    if (stored && remaining > 0) {
      toast.error(
        `You've hit the rate limit. Please wait ${formatMs(
          remaining
        )} before regenerating again.`,
        { position: "bottom-right", autoClose: 4000, theme: "dark" }
      );
      setIsRegenerating(false);
      return;
    }

    // Save updated count and timestamp
    const newCount = effectiveCount + 1;
    localStorage.setItem("__rlid", encode({ count: newCount, timestamp: now }));

    const accessToken = Cookies.get("access_token");
    if (!accessToken) {
      throw new Error("Access token not found.");
    }

    const response = await axios.post("/api/auth/generate-random-token", {
      id: user.id,
    });

    //  Send the new token to the server to save it, similar to the original logic
    await axios.post("/api/auth/user", {
      id: user.id,
      token: response.data.token,
    });

    // Update the user state with the new token
    setUser((prevUser) => {
      const updatedUser = {
        ...prevUser,
        token: response.data.token,
      };

      // Update the user cookie with the new token
      // Cookies.set("user", JSON.stringify(updatedUser));

      return updatedUser;
    });

    // Show toast notification
    toast.success("Token regenerated successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
    // Reset animation after 1s
    setTimeout(() => setIsRegenerating(false), 1000);
    setShowToken(true);
  };

  const handleCopyToClipboard = () => {
    const token = user?.token; // Ensure it's defined
    if (!token) return;

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(token)
        .then(() => {
          showToast();
        })
        .catch(() => {
          fallbackCopyText(token);
        });
    } else {
      fallbackCopyText(token);
    }
  };

  // Fallback for mobile browsers (iOS & Android)
  const fallbackCopyText = (text) => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed"; // Avoids scrolling to the bottom
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    try {
      document.execCommand("copy");
      showToast();
    } catch (err) {
      console.error("Copy failed", err);
    }
    document.body.removeChild(textArea);
  };

  const showToast = () => {
    toast.dismiss();

    toast.success("Token copied to clipboard!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    });
  };

  return (
    <div className="p-0 space-y-6 mb-6 animate-fadeInUp">
      {!discordUserFetched ? (
        <ProfileCardLoading />
      ) : (
        <>
          {/* Profile Card */}
          <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md p-6 mx-auto sm:max-w-xl lg:max-w-6xl">
            <h3 className="text-xl font-semibold text-gray-100 flex items-center ">
              <i className="fas fa-user mr-2"></i> Profile
            </h3>
            {/* Separating Line */}
            <hr className="border-gray-700 my-4" />

            <div className="mt-4 space-y-4">
              {/* Avatar */}
              {/* Large Screen Layout */}
              <div className="hidden sm:flex flex-col sm:flex-row items-center p-6 bg-gray-800 rounded-xl">
                <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
                  Avatar
                </span>
                <div className="w-full sm:w-3/4 flex flex-col sm:flex-row justify-between items-center">
                  <p className="text-gray-300 text-sm text-center sm:text-left">
                    Your discord avatar will be displayed on the Dashboard.
                  </p>
                  <Image
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                    alt={user.username}
                    width={80} // Specify the width (adjust as needed)
                    height={80} // Specify the height (adjust as needed)
                    className="select-none w-20 h-20 rounded-full border-2 border-gray-600 mt-4 sm:mt-0"
                  />
                </div>
              </div>
              {/* Small Screen Layout */}
              <div className="flex sm:hidden flex-row items-center justify-between p-6 bg-gray-800 rounded-xl">
                <div className="flex flex-col w-3/4">
                  <span className="text-gray-400 text-sm uppercase">
                    Avatar
                  </span>
                  <p className="text-gray-300 text-sm">
                    Your discord avatar will be displayed on the Dashboard.
                  </p>
                </div>
                <Image
                  src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
                  alt={user.username}
                  width={80} // Width in pixels
                  height={80} // Height in pixels
                  className="select-none w-20 h-20 rounded-full border-2 border-gray-600"
                />
              </div>
              {/* Username */}
              {/* Large Screen Layout */}
              <Link
                href="/dashboard/profile/change-username"
                className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
                    Username
                  </span>
                  <h5 className="font-bold text-lg sm:text-xl text-gray-100 w-full sm:w-3/4 text-center sm:text-left">
                    {user.username}
                  </h5>
                </div>
              </Link>
              {/* Small Screen Layout */}
              <Link
                href="/dashboard/profile/change-username"
                className="sm:hidden flex flex-row justify-between items-center bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
              >
                <div className="flex flex-col">
                  <span className="text-gray-400 text-sm uppercase">
                    Username
                  </span>
                  <h5 className="font-bold text-gray-100">{user.username}</h5>
                </div>
              </Link>
              {/* Email */}
              {/* Large Screen Layout */}
              <Link
                href="/dashboard/profile/change-email"
                className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
                    Email
                  </span>
                  <div className="w-full sm:w-3/4 text-center sm:text-left">
                    <h5 className="font-bold text-gray-100">{user.email}</h5>
                    <small className="text-gray-400">
                      The email address at which staff can contact you about
                      unusual activity in your account or which you can use to
                      recover your account in case you get locked out.
                    </small>
                  </div>
                </div>
              </Link>
              {/* Small Screen Layout */}
              <Link
                href="/dashboard/profile/change-email"
                className="sm:hidden flex flex-row bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
              >
                <div className="flex flex-col w-full">
                  <span className="text-gray-400 text-sm uppercase">Email</span>
                  <h5 className="font-bold text-gray-100 mt-1">{user.email}</h5>
                  <small className="text-gray-400 mt-1">
                    The email address at which staff can contact you about
                    unusual activity in your account or which you can use to
                    recover your account in case you get locked out.
                  </small>
                </div>
              </Link>

              {/* Password */}
              {/* Large Screen Layout */}
              <Link
                href="/dashboard/profile/change-password"
                className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
              >
                <div className="flex flex-col sm:flex-row items-center">
                  <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
                    Password
                  </span>
                  <h5 className="font-bold text-gray-100 w-full sm:w-3/4 text-center sm:text-left">
                    ••••••••••
                  </h5>
                </div>
              </Link>
              {/* Small Screen Layout */}
              <Link
                href="/dashboard/profile/change-password"
                className="sm:hidden flex flex-row justify-between items-center bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition"
              >
                <div className="flex flex-col w-3/4">
                  <span className="text-gray-400 text-sm uppercase">
                    Password
                  </span>
                  <h5 className="font-bold text-gray-100">••••••••••</h5>
                </div>
              </Link>

              {/* API Token */}
              {/* Large Screen Layout */}
              <div className="hidden sm:block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
                <div className="flex flex-col sm:flex-row items-center">
                  <span className="text-gray-400 text-sm uppercase w-full sm:w-1/4 text-center sm:text-left">
                    Token
                  </span>
                  <div className="w-full sm:w-3/4 flex justify-between items-center">
                    {/* Clickable Token */}
                    <div
                      onClick={handleCopyToClipboard}
                      className="cursor-pointer"
                    >
                      <h5 className="font-bold text-gray-100">
                        {showToken ? user.token : "••••••••••"}
                      </h5>
                      <small className="text-gray-400 block mt-1">
                        Grants access to the API — keep it safe!
                      </small>
                    </div>
                    {/* Buttons */}
                    <div className="flex flex-col items-end mr-4">
                      <button
                        onClick={() => setShowToken(!showToken)}
                        className="text-gray-400 hover:text-gray-200"
                      >
                        {showToken ? (
                          <FiEyeOff size={20} />
                        ) : (
                          <FiEye size={20} />
                        )}
                      </button>
                      <button
                        onClick={handleRegenerateClick}
                        disabled={isRegenerating}
                        className={`mt-2 text-gray-400 hover:text-gray-200 transition-transform ${
                          isRegenerating ? "animate-spin" : ""
                        }`}
                      >
                        <FiRefreshCw size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Small Screen Layout */}
              <div className="sm:hidden flex flex-col bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-sm uppercase">Token</span>
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => setShowToken(!showToken)}
                      className="text-gray-400 hover:text-gray-200"
                    >
                      {showToken ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                    </button>
                    <button
                      onClick={handleRegenerateClick}
                      disabled={isRegenerating}
                      className={`text-gray-400 hover:text-gray-200 transition-transform ${
                        isRegenerating ? "animate-spin" : ""
                      }`}
                    >
                      <FiRefreshCw size={20} />
                    </button>
                  </div>
                </div>
                {/* Clickable Token */}
                <h5
                  onClick={handleCopyToClipboard}
                  className="font-bold text-gray-100 mt-1 cursor-pointer overflow-hidden text-ellipsis break-words max-w-[200px]"
                >
                  {showToken ? user.token : "••••••••••"}
                </h5>

                <small className="text-gray-400 mt-1">
                  Grants access to the API — keep it safe!
                </small>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
