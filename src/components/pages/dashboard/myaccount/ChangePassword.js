import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { toast } from "react-toastify";
import evaluatePasswordStrength from "@/utils/passwordStrengthChecker";

export default function ChangePassword() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [strengthLabel, setStrengthLabel] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setNewPassword(value);

    if (value.length === 0) {
      // If password is empty, reset the strength meter
      setStrengthLabel("");
      setPasswordStrength({
        width: "0%",
        meterColor: "transparent",
        textColor: "gray",
      });
      return;
    }

    const { strengthLabel, strengthStyle } = evaluatePasswordStrength(value);

    setStrengthLabel(`Your password is ${strengthLabel}.`);
    setPasswordStrength(strengthStyle);
  };

  const handleConfirmPassword = (e) => {
    const value = e.target.value;
    setConfirmPassword(value);
    setConfirmError(value !== newPassword ? "Passwords do not match!" : "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.dismiss();

    // if (confirmError || newPassword.length < 8) {
    //   toast.error("Please fix errors before submitting.", {
    //     position: "bottom-right",
    //     autoClose: 3000,
    //     theme: "dark",
    //   });
    //   return;
    // }

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
    <div className="max-w-lg mx-auto bg-gray-800 text-white p-6 rounded-xl shadow-lg mb-28 animate-fadeInUp">
      <h2 className="text-xl font-semibold">Change Password</h2>
      <p className="text-gray-400 text-sm mt-2">
        Choose a strong password. Avoid easy-to-guess passwords like your
        pet&apos;s name or birthday.
      </p>
      <p className="text-gray-400 text-sm mt-1">
        All sessions will be invalidated after changing your password.
      </p>
      <a
        href="https://www.howtogeek.com/195430/how-to-create-a-strong-password-and-remember-it/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 cursor-pointer hover:underline text-sm mt-2 inline-block"
      >
        Learn how to create a strong password.
      </a>

      <form onSubmit={handleSubmit} className="mt-5">
        {/* Current Password */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">Current Password</label>
          <div className="relative">
            <input
              type={showCurrentPassword ? "text" : "password"}
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:shadow-[0_0_10px] focus:shadow-blue-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
            >
              {showCurrentPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label className="text-gray-400 text-sm">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={handlePasswordChange}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:shadow-[0_0_10px] focus:shadow-blue-500 transition-all"
            />

            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
            >
              {showNewPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Password Strength Meter (Always Visible) */}
          <div className="mt-2">
            {/* Strength Meter */}
            <div className="w-full h-2 bg-gray-600 rounded-md overflow-hidden">
              <div
                className="h-full transition-all"
                style={{
                  width: passwordStrength.width,
                  backgroundColor: passwordStrength.meterColor,
                }}
              ></div>
            </div>

            {/* Strength Label */}
            {strengthLabel && (
              <p
                className="text-sm mt-1"
                style={{ color: passwordStrength.textColor }}
              >
                {strengthLabel}
              </p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-6">
          <label className="text-gray-400 text-sm">Confirm Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={handleConfirmPassword}
              className="w-full bg-gray-700 text-white p-2 rounded-md focus:outline-none focus:shadow-[0_0_10px] focus:shadow-blue-400 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-2 top-2 text-gray-400 hover:text-gray-200"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
          {confirmError && (
            <p className="text-red-500 text-sm mt-1">{confirmError}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-md transition cursor-pointer"
        >
          Change Password
        </button>
      </form>
    </div>
  );
}
