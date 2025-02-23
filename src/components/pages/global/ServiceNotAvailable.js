import { FaExclamationTriangle } from "react-icons/fa"; // Import warning icon from FontAwesome

export default function ServiceNotAvailable() {
  return (
    <div className="border-t border-gray-600 bg-slate-800 text-gray-300 px-6 py-4 shadow-md flex items-center space-x-2">
      <FaExclamationTriangle className="text-red-500 w-4 h-4" />
      <p className="text-sm text-gray-400">
        This service is currently unavailable. Please try again later.
      </p>
    </div>
  );
}
