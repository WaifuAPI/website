/**
 * @description This section of code should be interpreted with caution.
 * Its presence in the production environment is not an indication that
 * the associated feature is slated for inclusion in the final product.
 * Instead, this code functions as a local testing prototype, allowing
 * developers to assess its functionality in an isolated environment.
 * As of the current state, it has been temporarily introduced into the
 * production codebase for the specific purpose of conducting internal checks
 * and evaluations. This inclusion does not guarantee the permanence or
 * implementation of the corresponding feature in future releases.
 * Developers are advised to regard this code as experimental and subject
 * to potential modifications or removal in subsequent development phases.
 * Any assumptions about its integration into the production version should
 * be avoided, as its primary role is to facilitate internal testing rather
 * than signify upcoming features.
 */
import Image from "next/image";
import { useState, useEffect } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import EditPopup from "./components/EditPopup";
import { useRouter } from "next/router";
import axios from "axios";
import Cookies from "js-cookie";
import LoadingSpinner from "./components/LoadingSpinner";
import AnimatedDot from "./components/AnimatedDot";
import ModerationPopup from "./components/ModerationPopup";

const API_URL = "https://jsonplaceholder.typicode.com"; // Placeholder API for testing

const ToolsPage = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [isEditPopupVisible, setIsEditPopupVisible] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [fetchedUser, setFetchedUser] = useState(null);
  const [fetched, setFetched] = useState(false); // Add fetched state
  const [isModerationPopupVisible, setIsModerationPopupVisible] =
    useState(false);

  const router = useRouter();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        if (searchInput) {
          // Fetch a specific user by ID
          const response = await fetch(`${API_URL}/users/${searchInput}`);

          // Check if the response status is 404 (Not Found)
          if (response.status === 404) {
            console.log("User not found");
            setFetchedUser(null); // Clear the fetchedUser state
          } else {
            const data = await response.json();
            setFetchedUser(data);
          }
        } else {
          // Fetch all users
          const response = await fetch(`${API_URL}/users`);
          const data = await response.json();
          setUsers(data);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setIsLoading(false);
      }
    };

    const fetchDiscordUserDetails = async () => {
      try {
        const accessToken = Cookies.get("access_token");
        if (accessToken) {
          const response = await axios.get(
            "https://discord.com/api/users/@me",
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          // // Fetch user guilds
          // const guildsResponse = await axios.get(
          //   "https://discord.com/api/users/@me/guilds",
          //   {
          //     headers: {
          //       Authorization: `Bearer ${accessToken}`,
          //     },
          //   }
          // );
          // console.log(guildsResponse.data)
          // Check if the user is a moderator (you may need to customize this check based on your Discord server's structure)
          const isModerator = false;
          // response.data.some((guild) =>
          //   guild.roles.includes("766875850150379560")
          // );

          setLoggedInUser({
            ...response.data,
            isModerator,
          });
          setFetched(true); // Mark user details as fetched
        }
      } catch (error) {
        console.error("Error fetching Discord user details:", error);
      }
    };

    fetchUsers();
    fetchDiscordUserDetails();
  }, [searchInput]);

  const deleteUser = async (id) => {
    try {
      // Simulate a DELETE request to the server (if needed)
      // await fetch(`${API_URL}/users/${id}`, {
      //   method: 'DELETE',
      // });
      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const showDeleteConfirmation = (id) => {
    confirmAlert({
      title: "Confirm Deletion",
      message: "Are you sure you want to delete this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => deleteUser(id),
        },
        {
          label: "No",
          onClick: () => console.log("Deletion canceled"),
        },
      ],
    });
  };

  const showEditPopup = (user) => {
    setEditingUser(user);
    setIsEditPopupVisible(true);
  };

  const closeEditPopup = () => {
    setEditingUser(null);
    setIsEditPopupVisible(false);
  };

  const showModerationPopup = (id) => {
    setEditingUser(id); // Assuming id is the user being moderated
    setIsModerationPopupVisible(true);
  };

  const handleSaveUser = (updatedUser) => {
    // Update the local state with the edited user
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    closeEditPopup(); // Close the edit popup
  };

  const handleLogoutClick = () => {
    // Clear the access token cookie
    Cookies.remove("access_token");

    // Redirect to the login page or any other desired page after logout
    router.push("/"); // Update with your login page route
  };

  const banUser = async (id) => {
    try {
      // Simulate a POST request to ban the user
      // You may replace the URL and payload with your actual API endpoint and data
      const response = await axios.post(`${API_URL}/ban-user/${id}`);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error banning user:", error);
    }
  };

  const unbanUser = async (id) => {
    try {
      // Simulate a POST request to unban the user
      // You may replace the URL and payload with your actual API endpoint and data
      const response = await axios.post(`${API_URL}/unban-user/${id}`);
      console.log(response.data); // Handle the response as needed
    } catch (error) {
      console.error("Error unbanning user:", error);
    }
  };

  const showBanConfirmation = (id) => {
    confirmAlert({
      title: "Confirm Ban",
      message: "Are you sure you want to ban this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => banUser(id),
        },
        {
          label: "No",
          onClick: () => console.log("Ban canceled"),
        },
      ],
    });
  };

  const showUnbanConfirmation = (id) => {
    confirmAlert({
      title: "Confirm Unban",
      message: "Are you sure you want to unban this user?",
      buttons: [
        {
          label: "Yes",
          onClick: () => unbanUser(id),
        },
        {
          label: "No",
          onClick: () => console.log("Unban canceled"),
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {!fetched ? (
        <div className="flex flex-grow items-center justify-center">
          <LoadingSpinner />
        </div>
      ) : (
        <>
          {/* Navbar */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-400 text-white p-4 font-sans">
            <nav className="max-w-screen-lg mx-auto flex flex-col md:flex-row items-center justify-between">
              <div className="text-white font-extrabold text-3xl mb-4 md:mb-0">
                Dashboard
              </div>
              <div className="space-x-4 flex items-center relative">
                <button
                  onClick={() => router.push("/dashboard")}
                  className="nav-button font-semibold text-sm uppercase tracking-wide hover:text-blue-200 transition duration-300"
                >
                  Home
                </button>
                <button
                  onClick={() => router.push("https://docs.waifu.it")}
                  className="nav-button font-semibold text-sm uppercase tracking-wide hover:text-blue-200 transition duration-300"
                >
                  Documentation
                </button>
                <button
                  onClick={() => router.push("/tools")}
                  className="nav-button font-semibold text-sm uppercase tracking-wide hover:text-blue-200 transition duration-300"
                >
                  Tools
                </button>
                {loggedInUser && (
                  <div className="flex items-center space-x-4">
                    <Image
                      src={`https://cdn.discordapp.com/avatars/${loggedInUser.id}/${loggedInUser.avatar}.png`}
                      alt={loggedInUser.username}
                      width={32} // Set the appropriate width
                      height={32} // Set the appropriate height
                      className="w-8 h-8 rounded-full cursor-pointer border-2 border-white"
                    />

                    <button
                      onClick={handleLogoutClick}
                      className="nav-button font-semibold text-sm uppercase tracking-wide hover:text-blue-200 transition duration-300"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </div>

          {/* Content */}
          <div className="container mx-auto mt-8 px-4 min-h-[54vw]">
            {/* Display authorization message if not a moderator */}
            {!loggedInUser?.isModerator ? (
              <div class="mt-40 mr-4 text-center">
                <div class="page_403">
                  <div class="four_zero_four_bg">
                    <h1 class="text-6xl font-bold text-gray-800">403</h1>
                  </div>
                  <div class="contant_box_404">
                    <h3 class="text-1xl font-bold text-gray-800">
                      Oops! Forbidden
                    </h3>
                    <p class="text-gray-600">
                      You are not authorized to access this page.
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <>
                {/* Centered heading */}
                <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
                  User Management
                </h1>
                <div className="mb-4 mx-auto max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl xl:max-w-3xl">
                  <label htmlFor="searchInput" className="sr-only">
                    Search by User ID:
                  </label>
                  <input
                    type="text"
                    id="searchInput"
                    placeholder="Enter User ID"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                    autoComplete="off"
                  />
                </div>

                {isLoading ? (
                  <div className="mt-16 flex flex-grow items-center justify-center">
                    <AnimatedDot />
                  </div>
                ) : (
                  <>
                    {searchInput && !fetchedUser ? (
                      <div className="mt-20 mr-4 text-center">
                        <div className="page_404">
                          <div className="four_zero_four_bg">
                            <h1 className="text-6xl font-bold text-gray-800">
                              404
                            </h1>
                          </div>
                          <div className="contant_box_404">
                            <h3 className="text-1xl font-bold text-gray-800">
                              Oops! User not found
                            </h3>
                            <p className="text-gray-600">
                              The user you are looking for may not exist.
                            </p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="min-w-full bg-white border border-gray-300 shadow-md">
                          <thead className="bg-gray-200">
                            <tr>
                              <th className="p-2">ID</th>
                              <th className="p-2">Name</th>
                              <th className="p-2">Username</th>
                              <th className="p-2">Email</th>
                              <th className="p-2">Phone</th>
                              <th className="p-2">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {searchInput && fetchedUser ? (
                              <tr key={fetchedUser.id}>
                                <td className="p-2">{fetchedUser.id}</td>
                                <td className="p-2">{fetchedUser.name}</td>
                                <td className="p-2">{fetchedUser.username}</td>
                                <td className="p-2">{fetchedUser.email}</td>
                                <td className="p-2">{fetchedUser.phone}</td>
                                <td className="p-2 flex flex-wrap items-center space-x-2 justify-center lg:justify-start">
                                  <button
                                    className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded mb-1 lg:mb-0"
                                    onClick={() => showEditPopup(fetchedUser)}
                                  >
                                    Edit
                                  </button>
                                  <button
                                    className="bg-orange-500 text-white hover:bg-orange-700 py-2 px-4 rounded mb-1 lg:mb-0"
                                    onClick={() =>
                                      showModerationPopup(fetchedUser.id)
                                    }
                                  >
                                    Moderation
                                  </button>
                                  <button
                                    className="bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded mb-1 lg:mb-0"
                                    onClick={() =>
                                      showDeleteConfirmation(fetchedUser.id)
                                    }
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ) : (
                              users.map((user) => (
                                <tr key={user.id}>
                                  <td className="p-2">{user.id}</td>
                                  <td className="p-2">{user.name}</td>
                                  <td className="p-2">{user.username}</td>
                                  <td className="p-2">{user.email}</td>
                                  <td className="p-2">{user.phone}</td>
                                  <td className="p-2 flex flex-wrap items-center space-x-2 justify-center lg:justify-start">
                                    <button
                                      className="bg-blue-500 text-white hover:bg-blue-700 py-2 px-4 rounded mb-1 lg:mb-0"
                                      onClick={() => showEditPopup(user)}
                                    >
                                      Edit
                                    </button>
                                    <button
                                      className="bg-orange-500 text-white hover:bg-orange-700 py-2 px-4 rounded mb-1 lg:mb-0"
                                      onClick={() =>
                                        showModerationPopup(user.id)
                                      }
                                    >
                                      Moderation
                                    </button>
                                    <button
                                      className="bg-red-500 text-white hover:bg-red-700 py-2 px-4 rounded mb-1 lg:mb-0"
                                      onClick={() =>
                                        showDeleteConfirmation(user.id)
                                      }
                                    >
                                      Delete
                                    </button>
                                  </td>
                                </tr>
                              ))
                            )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}

                {isModerationPopupVisible && (
                  <ModerationPopup
                    user={editingUser}
                    onClose={() => setIsModerationPopupVisible(false)}
                    onBan={() => banUser(editingUser)}
                    onUnban={() => unbanUser(editingUser)}
                  />
                )}

                {isEditPopupVisible && (
                  <EditPopup
                    user={editingUser}
                    onClose={closeEditPopup}
                    onSave={handleSaveUser}
                  />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ToolsPage;
