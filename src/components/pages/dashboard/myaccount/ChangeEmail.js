import { useState } from "react";
import { toast } from "react-toastify";

const blockedEmails = ["blocked@example.com", "spam@domain.com"];
const blockedDomains = ["baddomain.com", "malicious.com"];

export default function ChangeEmail() {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [error, setError] = useState("");

  const isMismatch = confirmEmail && email !== confirmEmail; // Real-time mismatch detection

  const isBlockedEmail = (email) => {
    const domain = email.split("@")[1];
    return blockedEmails.includes(email) || blockedDomains.includes(domain);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (isBlockedEmail(newEmail)) {
      setError("This email address or domain is not allowed.");
    } else {
      setError("");
    }
  };

  const handleConfirmEmailChange = (e) => {
    setConfirmEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    if (isBlockedEmail(email)) {
      toast.error("This email or domain is not allowed!", {
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

    if (isMismatch) {
      toast.error("Emails do not match!", {
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
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-lg mb-16 mt-8 animate-fadeInUp">
      <h2 className="text-xl font-semibold">Change Email</h2>
      <p className="text-gray-400 text-sm mt-2">
        Your new email must be valid and accessible for verification.
      </p>

      <form onSubmit={handleSubmit} className="mt-5">
        {/* Email Input */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">New Email</label>
          <input
            type="email"
            placeholder="Enter your new email"
            className={`w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 ${
              error
                ? "focus:ring-red-500 focus:outline-none focus:shadow-[0_0_10px] focus:shadow-red-500 transition-all animate-pulse"
                : "focus:outline-none focus:shadow-[0_0_10px] focus:shadow-blue-400 transition-all"
            }`}
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Confirm Email Input */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">Confirm Email</label>
          <input
            type="email"
            placeholder="Confirm your new email"
            className={`w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:ring-2 transition-all ${
              isMismatch
                ? "focus:ring-red-500 focus:outline-none focus:shadow-[0_0_10px] focus:shadow-red-500 transition-all animate-pulse"
                : "focus:outline-none focus:shadow-[0_0_10px] focus:shadow-blue-400 transition-all"
            }`}
            value={confirmEmail}
            onChange={handleConfirmEmailChange}
          />
          {isMismatch && (
            <p className="text-red-500 text-sm mt-1">Emails do not match!</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full font-semibold p-2 rounded-md transition ${
            error || isMismatch
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white cursor-pointer"
          }`}
          disabled={error || isMismatch}
        >
          Change Email
        </button>
      </form>
    </div>
  );
}
