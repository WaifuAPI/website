import { useState } from "react";
import { FaUserSecret } from "react-icons/fa";
import ToggleSwitch from "./ToggleSwitch";

export default function PrivacySettings() {
  const [hideCountry, setHideCountry] = useState(false);
  const [disableLogging, setDisableLogging] = useState(false);
  const [anonymizeRequests, setAnonymizeRequests] = useState(false);
  const [restrictIPs, setRestrictIPs] = useState(false);
  const [disablePublicStats, setDisablePublicStats] = useState(false);
  const [autoExpireKeys, setAutoExpireKeys] = useState(false);
  const [enableRateLimits, setEnableRateLimits] = useState(false);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-fadeInUp mb-28">
      {/* Alert Message */}
      <div className="bg-blue-100 text-blue-700 px-4 py-3 rounded-lg shadow-md">
        This may take up to 10 minutes to be updated on the Dashboard.
      </div>

      {/* Privacy Card */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg rounded-lg overflow-hidden">
        <header className="bg-gray-700 px-6 py-3 flex items-center gap-2 border-b border-gray-600">
          <FaUserSecret className="text-gray-300" />
          <strong>Privacy</strong>
        </header>

        <div className="p-6 space-y-6">
          {/* Hide Country Toggle */}
          <ToggleSwitch
            label="Hide my country from other users"
            description="The small flag next to your name will be removed."
            checked={hideCountry}
            onChange={() => setHideCountry(!hideCountry)}
          />

          {/* Disable API Logging */}
          <ToggleSwitch
            label="Disable API Logging"
            description="Prevent logging of your API requests for privacy."
            checked={disableLogging}
            onChange={() => setDisableLogging(!disableLogging)}
          />

          {/* Anonymize Request Data */}
          <ToggleSwitch
            label="Anonymize Request Data"
            description="Remove personal identifiers from request logs."
            checked={anonymizeRequests}
            onChange={() => setAnonymizeRequests(!anonymizeRequests)}
          />

          {/* Restrict API Usage to Specific IPs */}
          <ToggleSwitch
            label="Restrict API Usage to Specific IPs"
            description="Allow requests only from whitelisted IPs."
            checked={restrictIPs}
            onChange={() => setRestrictIPs(!restrictIPs)}
          />

          {/* Disable Public Stats */}
          <ToggleSwitch
            label="Disable Public Stats"
            description="Prevent your API usage stats from being visible to others."
            checked={disablePublicStats}
            onChange={() => setDisablePublicStats(!disablePublicStats)}
          />

          {/* Auto-Expire API Keys */}
          <ToggleSwitch
            label="Auto-Expire API Keys"
            description="Set a timer for API keys to expire automatically."
            checked={autoExpireKeys}
            onChange={() => setAutoExpireKeys(!autoExpireKeys)}
          />

          {/* Enable API Request Rate Limits */}
          <ToggleSwitch
            label="Enable API Request Rate Limits"
            description="Enforce rate limits for added security."
            checked={enableRateLimits}
            onChange={() => setEnableRateLimits(!enableRateLimits)}
          />
        </div>
      </div>
    </div>
  );
}
