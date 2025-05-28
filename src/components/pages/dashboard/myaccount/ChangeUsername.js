import { useState } from "react";
import { toast } from "react-toastify";

export default function ChangeUsername() {
  const [username, setUsername] = useState("");
  const isTooShort = username.length > 0 && username.length < 5;

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (isTooShort) {
      toast.error("Username must be at least 5 characters long!", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      return;
    }

    toast.warning("Service not available!", {
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
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-lg mb-16 mt-12 animate-fadeInUp">
      <h2 className="text-xl font-semibold">Change Username</h2>
      <p className="text-gray-400 text-sm mt-2">
        Your username must be unique and contain at least 5 characters.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-6">
          <label className="text-gray-400 text-sm">New Username</label>
          <input
            type="text"
            placeholder="Enter your new username"
            className={`w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none transition-all ${
              isTooShort
                ? "focus:outline-none focus:ring-2 focus:ring-red-500 focus:outline-none focus:shadow-[0_0_10px] focus:shadow-red-500 transition-all animate-pulse"
                : "focus:outline-none focus:shadow-[0_0_10px] focus:shadow-blue-400 transition-all"
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {isTooShort && (
            <p className="text-red-500 text-sm mt-1">
              Username must be at least 5 characters long!
            </p>
          )}
        </div>

        <button
          type="submit"
          className={`w-full text-white font-semibold p-2 rounded-md transition ${
            isTooShort
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 cursor-pointer"
          }`}
          disabled={isTooShort}
        >
          Change Username
        </button>
      </form>
    </div>
  );
}
